import { ethers } from "hardhat";
import { saveInfo } from "../utils/YamlUtilContract";
import hre from 'hardhat'

async function main() {
  const network = await hre.network.name;
  const [owner] = await ethers.getSigners();
  console.log('network', network);
  console.log('owner', owner.address);

  const deterministicFactory = await ethers.deployContract("DeterministicFactory")
  const deployment = await deterministicFactory.waitForDeployment();
  console.log(`DeterministicFactory deployed to: ${await deployment.getAddress()}`);

  saveInfo('DeterministicFactory', network, await deployment.getAddress());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
