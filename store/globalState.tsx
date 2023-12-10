import { createGlobalState } from 'react-hooks-global-state';
import { BigNumber } from 'ethers';
import { IS_LOCAL } from '@/constants/networks';
import { CCIPMenuEnum, GlobalTypes } from '@/utils/types/store';

const { useGlobalState } = createGlobalState<GlobalTypes>({
  isLoading: true,
  sideNavMenuOpen: false,
  updateBalances: false,
  balances: {
    nativeCoin: '0',
    wrappedCoin: '0',
    usdt: '0',
    usdc: '0',
    dai: '0',
    link: '0',
    bnm: '0',
  },
  ccipMenu: IS_LOCAL ? CCIPMenuEnum.GeneralAccess : CCIPMenuEnum.PrivateBeta,
  receiverAddress: '',
  // CCIP ROUTES
  fromNetwork: IS_LOCAL ? 'ethereumSepolia' : 'ethereumMainnet',
  toNetwork: IS_LOCAL ? 'polygonMumbai' : 'polygonMainnet',
  // CCIP MESSAGE
  ccipStore: {
    destinationAccount: '',
    tokenAddress: '',
    amount: BigNumber.from(0),
    feeTokenAddress: '',
  },
  ccipCategories: {
    // top
    topCategories: ['General Access', 'Private Beta', 'GA + PB'],
    topAddons: ['Single-Token', 'Single-Token', 'Multi-Token'],
    topExtra: ['CCIP ERC20','CCIP ERC20','COMMING SOON'],
    status: ['ACTIVE','',''],
    // bottom
    categories: ['General Access', 'Private Beta', 'Messages', 'NFT', 'DeFi', 'Random', 'Assets', 'Payments'],
    addons: ['Multi-Token', 'Multi-Token', 'Contract-Call', 'Crosschain', 'Liqudity LP', 'Events', 'Tokenization', 'P2P'],
    extra: ['ERC20/ERC677','ERC20/ERC677','CCIP','ERC721/ERC1155','VRF+Keepers','Crosschain', 'Proof of reserve','CCIP'],
  },
});

export default useGlobalState;
