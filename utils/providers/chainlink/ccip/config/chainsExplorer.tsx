const getChainsExplorer = (network: string) => {
  let rpcUrl;

  switch (network) {
    case '0x1':
      rpcUrl = `https://etherscan.io/`;
      break;
    case '0xaa36a7':
      rpcUrl = 'https://sepolia.etherscan.io/';
      break;
    case '0x5':
      rpcUrl = 'https://goerli.etherscan.io/';
      break;
    case '0x2105':
      rpcUrl = 'https://basescan.org/';
      break;
    case '0x14a33':
      rpcUrl = 'https://goerli.basescan.org/';
      break;
    case '0xa':
      rpcUrl = 'https://optimistic.etherscan.io/';
      break;
    case '0x1a4':
      rpcUrl = 'https://goerli-optimism.etherscan.io/';
      break;
    case '0xa4b1':
      rpcUrl = 'https://arbiscan.io/';
      break;
    case '0x66eed':
      rpcUrl = 'https://goerli.arbiscan.io/';
      break;
    case '0xa86a':
      rpcUrl = 'https://snowtrace.io/';
      break;
    case '0xa869':
      rpcUrl = 'https://testnet.snowtrace.io/';
      break;
    case '0x89':
      rpcUrl = 'https://polygonscan.com/';
      break;
    case '0x13881':
      rpcUrl = 'https://mumbai.polygonscan.com/';
      break;
    case '0x38':
      rpcUrl = 'https://bscscan.com/';
      break;
    case '0x61':
      rpcUrl = 'https://testnet.bscscan.com/';
      break;
    default:
      console.log(`Unknown network: ${network}`);
      rpcUrl = 'https://etherscan.com';
  }

  if (!rpcUrl)
    console.log(
      `rpcUrl empty for network ${network} - check your environment variables`
    );
  return rpcUrl;
};

export default getChainsExplorer;
