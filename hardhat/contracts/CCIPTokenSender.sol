// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {IERC20} from "@chainlink/contracts-ccip/src/v0.8/vendor/openzeppelin-solidity/v4.8.0/contracts/token/ERC20/IERC20.sol";
import {SafeERC20} from "@chainlink/contracts-ccip/src/v0.8/vendor/openzeppelin-solidity/v4.8.0/contracts/token/ERC20/utils/SafeERC20.sol";
import {IRouterClient} from "@chainlink/contracts-ccip/src/v0.8/ccip/interfaces/IRouterClient.sol";
import {Client} from "@chainlink/contracts-ccip/src/v0.8/ccip/libraries/Client.sol";

contract CCIPTokenSender {
    using SafeERC20 for IERC20;

    error InvalidToken();
    error NoDataAllowed();
    error GasShouldBeZero();

    IRouterClient public immutable ccipRouter;
    address public immutable ccipWhitelistedToken;

    constructor(address _router, address _token) {
        ccipRouter = IRouterClient(_router);
        ccipWhitelistedToken = _token;
        IERC20(_token).approve(_router, type(uint256).max);
    }

    /** @notice Forwards Fee request to the CCIP router and returns the result
     *  @dev Reverts with appropriate reason upon invalid message.
     *  @param destinationChainSelector The destination chainSelector
     *  @param message The cross-chain CCIP message including data and/or tokens
     *  @return fee The transfer fee for message delivery to destination chain
     */
    function getFee(
        uint64 destinationChainSelector,
        Client.EVM2AnyMessage calldata message
    ) external view returns (uint256 fee) {
        _validateMessage(message);
        return ccipRouter.getFee(destinationChainSelector, message);
    }

    function getSupportedTokens(uint64 destinationChainSelector) external view returns (address[] memory supportedTokens) {
        return ccipRouter.getSupportedTokens(destinationChainSelector);
    }

    /** @notice Validates the message content, forwards it to the CCIP router and returns the result.
     *  @param destinationChainSelector The destination chainSelector
     *  @param message The cross-chain CCIP message including data and/or tokens
     *  @return messageId The CCIP transfer response from the destination chain
     */
    function ccipSend(
        uint64 destinationChainSelector,
        Client.EVM2AnyMessage calldata message
    ) external payable returns (bytes32 messageId) {
        _validateMessage(message);
        if (message.feeToken != address(0)) {
            uint256 feeAmount = ccipRouter.getFee(
                destinationChainSelector,
                message
            );
            IERC20(message.feeToken).safeTransferFrom(
                msg.sender,
                address(this),
                feeAmount
            );
            IERC20(message.feeToken).approve(address(ccipRouter), feeAmount);
        }

        // Transfer the tokens from the sender to this contract.
        IERC20(message.tokenAmounts[0].token).transferFrom(
            msg.sender,
            address(this),
            message.tokenAmounts[0].amount
        );

        return
            ccipRouter.ccipSend{value: msg.value}(
                destinationChainSelector,
                message
            );
    }

    /** @notice Validates the message content
     *  @dev allows a single token to be sent with no data
     */
    function _validateMessage(
        Client.EVM2AnyMessage calldata message
    ) internal view {
        if (
            message.tokenAmounts.length != 1 ||
            message.tokenAmounts[0].token != ccipWhitelistedToken
        ) revert InvalidToken();
        if (message.data.length > 0) revert NoDataAllowed();

        if (
            message.extraArgs.length == 0 ||
            bytes4(message.extraArgs) != Client.EVM_EXTRA_ARGS_V1_TAG
        ) revert GasShouldBeZero();

        if (
            abi
                .decode(message.extraArgs[4:], (Client.EVMExtraArgsV1))
                .gasLimit != 0
        ) revert GasShouldBeZero();
    }
}
