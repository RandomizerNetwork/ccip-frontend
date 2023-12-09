import { ethers } from "hardhat";
import hre from 'hardhat'
import getCCIPConfig from "../utils/getCCIPConfig";
import { encodeBytes32String } from "ethers";
import createDeterministicContract, { create2Address, encoder, sleep } from "../utils/deterministicContract";
import { CCIPTokenSender__factory } from "../typechain-types";

async function main() {
  const network = await hre.network.name;
  const [owner] = await ethers.getSigners();
  console.log('network', network);
  console.log('owner', owner.address);

  const getConfig = getCCIPConfig.getRouterConfig(network)
  console.log('getConfig', getConfig)

  const ccipRouter = getConfig.address
  const ccipWhitelistedToken = getConfig.whitelistedTokens.BnM
  console.log('ccipRouter', ccipRouter)
  console.log('whitelistedCCIPToken', ccipWhitelistedToken)

  const deterministicFactory = await ethers.deployContract("DeterministicFactory")
  const deployment = await deterministicFactory.waitForDeployment();
  console.log(`DeterministicFactory deployed to: ${await deployment.getAddress()}`);

  // const deterministicFactory = await ethers.getContractAt("DeterministicFactory", "0x974c5169327eFFe61051E0Bf6fA866DCcAc8141f")
  
  // Get the bytecode of MyContract
  const contractFactory = await ethers.getContractFactory("CCIPTokenSender");
  const bytecode = contractFactory.bytecode;

  const leadingZeroes = 3; // Number of leading zeroes desired in the address
  const initCode = bytecode + encoder(["address", "address"], [ccipRouter, ccipWhitelistedToken]);
  const deterministicSalt = await createDeterministicContract(await deterministicFactory.getAddress(), initCode, owner.address, leadingZeroes);
  console.log('deterministicSalt', deterministicSalt)

  const create2Addr = create2Address(await deterministicFactory.getAddress(), deterministicSalt, initCode);
  console.log("precomputed address:", create2Addr);

  // Calculate the address where MyContract will be deployed
  // const predictedAddress = await deterministicFactory.getDeploymentAddress(deterministicSalt, bytecode);
  // console.log(`Predicted MyContract address: ${predictedAddress}`);

  // Deploy MyContract using the Factory
  // await deterministicFactory.deploy(deterministicSalt, myContractBytecode);
  // console.log(`ccipTokenSender deployed to address: ${predictedAddress}`);

  // Deploy the contract using the factory
  const deployTx = await deterministicFactory.deploy(deterministicSalt, initCode);
  await deployTx.wait();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
