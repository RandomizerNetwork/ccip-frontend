import daiLogo from '@/public/images/tokens/multi-collateral-dai-logo.svg';
import usdtLogo from '@/public/images/tokens/tether-usdt-logo.svg';
import usdcLogo from '@/public/images/tokens/usd-coin-usdc-logo.svg';
import linkLogo from '@/public/images/tokens/chainlink-equal-width-height.svg';
import bnmLogo from '@/public/images/tokens/CCIPIcon.svg';
import BalancesRow from '../network/BalanceRow';
import useGlobalState from '@/store/globalState';
import { useWeb3ModalAccount } from '@web3modal/ethers5/react';
import getChainTokens from '@/utils/providers/chainlink/ccip/config/chainTokens';

export default function WalletTokenBalance() {
  const [balances] = useGlobalState('balances');
  const { chainId } = useWeb3ModalAccount()
  if (!balances) return null;
  if (!chainId) return null;
  const chainHexId = `0x${chainId.toString(16)}`;
  const chainTokens = getChainTokens(chainHexId);
  return (
    <div className="w-full mb-5">
      <ul className="w-full flex items-start flex-col">
        <BalancesRow
          logo={chainTokens.symbolLogo}
          label={chainTokens.nativeToken}
          balance={balances.nativeCoin}
          isLast={false}
        />
        <BalancesRow
          logo={chainTokens.symbolLogo}
          label={chainTokens.nativeWrappedToken}
          balance={balances.wrappedCoin}
          isLast={false}
        />
        <BalancesRow
          logo={linkLogo}
          label="LINK"
          balance={balances.link}
          isLast={false}
        />
        <BalancesRow
          logo={usdcLogo}
          label="USDC"
          balance={balances.usdc}
          isLast={false}
        />
        {chainHexId !== '0x2105' && chainHexId !== '0x14a33' && (
          <BalancesRow
            logo={usdtLogo}
            label="USDT"
            balance={balances.usdt}
            isLast={false}
          />
        )}
        <BalancesRow
          logo={daiLogo}
          label="DAI"
          balance={balances.dai}
          isLast={false}
        />
        <BalancesRow
          logo={bnmLogo}
          label="CCIP"
          balance={balances.bnm}
          isLast={true}
        />
      </ul>
    </div>
  );
}
