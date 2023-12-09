// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DeterministicFactory {
    function deploy(bytes32 salt, bytes memory bytecode) external {
        address addr;
        assembly {
            addr := create2(0, add(bytecode, 0x20), mload(bytecode), salt)
            if iszero(extcodesize(addr)) {
                revert(0, 0)
            }
        }
    }

    function getDeploymentAddress(bytes32 salt, bytes memory bytecode) public view returns (address) {
        bytes32 hash = keccak256(abi.encodePacked(bytes1(0xff), address(this), salt, keccak256(bytecode)));
        return address(uint160(uint256(hash)));
    }
}
