import { ethers } from "hardhat";
import hre from 'hardhat'
import getCCIPConfig from "../utils/getCCIPConfig";
import { encodeBytes32String } from "ethers";
import createDeterministicContract, { sleep } from "../utils/deterministicContract";
import { CCIPTokenSender__factory } from "../typechain-types";

async function main() {
  const network = await hre.network.name;
  const [owner] = await ethers.getSigners();
  console.log('network', network);
  console.log('owner', owner.address);
  // return

  const getConfig = getCCIPConfig.getRouterConfig(network)
  // console.log('getConfig', getConfig)
  
  const router = getConfig.address
  const token = getConfig.whitelistedTokens.BnM
  console.log('router', router)
  console.log('token', token)

  const deterministicFactory = await ethers.deployContract("DeterministicFactory")
  const deployment = await deterministicFactory.waitForDeployment();
  console.log(`DeterministicFactory deployed to: ${await deployment.getAddress()}`);

  // const deterministicFactory = await ethers.getContractAt("DeterministicFactory", "0x974c5169327eFFe61051E0Bf6fA866DCcAc8141f")

  // const factoryAddress = "0x974c5169327eFFe61051E0Bf6fA866DCcAc8141f"; // Deployed factory address
  // const factory = await ethers.getContractAt("DeterministicFactory", factoryAddress, owner);
  
  // Get the bytecode of MyContract
  const contractFactory = await ethers.getContractFactory("CCIPTokenSender");
  const bytecode = contractFactory.bytecode;

  // const myContractBytecode = CCIPTokenSender__factory.bytecode;
  const leadingZeroes = 3; // Number of leading zeroes desired in the address
  const deterministicSalt = await createDeterministicContract(await deterministicFactory.getAddress(), bytecode, owner.address, leadingZeroes);
  console.log('deterministicSalt', deterministicSalt)

  // Calculate the address where MyContract will be deployed
  const predictedAddress = await deterministicFactory.getDeploymentAddress(deterministicSalt, bytecode);
  console.log(`Predicted MyContract address: ${predictedAddress}`);

  // Deploy MyContract using the Factory
  // await deterministicFactory.deploy(deterministicSalt, myContractBytecode);
  // console.log(`ccipTokenSender deployed to address: ${predictedAddress}`);

  // Deploy the contract using the factory
  const deployTx = await deterministicFactory.deploy(deterministicSalt, bytecode);
  await deployTx.wait();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
