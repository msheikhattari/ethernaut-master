import { Contract, Signer } from "ethers";
import { LogDescription } from "ethers/lib/utils";
import { ethers } from "hardhat";

export const ETHERNAUT_ADDRESS = `0xa3e7317E591D5A0F1c605be1b3aC4D2ae56104d6`;

// manually copied from the website while inspect the web console's `ethernaut.abi`
// const ETHERNAUT_ABI = [
//   {
//     anonymous: false,
//     inputs: [
//       {
//         indexed: true,
//         internalType: "address",
//         name: "player",
//         type: "address",
//       },
//       {
//         indexed: true,
//         internalType: "address",
//         name: "instance",
//         type: "address",
//       },
//       {
//         indexed: true,
//         internalType: "address",
//         name: "level",
//         type: "address",
//       },
//     ],
//     name: "LevelCompletedLog",
//     type: "event",
//     signature:
//       "0x5038a30b900118d4e513ba62ebd647a96726a6f81b8fda73c21e9da45df5423d",
//   },
//   {
//     anonymous: false,
//     inputs: [
//       {
//         indexed: true,
//         internalType: "address",
//         name: "player",
//         type: "address",
//       },
//       {
//         indexed: true,
//         internalType: "address",
//         name: "instance",
//         type: "address",
//       },
//       {
//         indexed: true,
//         internalType: "address",
//         name: "level",
//         type: "address",
//       },
//     ],
//     name: "LevelInstanceCreatedLog",
//     type: "event",
//     signature:
//     "0x8be8bd7b4324b3d47aca5c3f64cb70e8f645e6fe94da668699951658f6384179",
//   },
//   {
//     anonymous: false,
//     inputs: [
//       {
//         indexed: true,
//         internalType: "address",
//         name: "previousOwner",
//         type: "address",
//       },
//       {
//         indexed: true,
//         internalType: "address",
//         name: "newOwner",
//         type: "address",
//       },
//     ],
//     name: "OwnershipTransferred",
//     type: "event",
//     signature:
//     "0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0",
//   },
//   {
//     inputs: [
//       {
//         internalType: "contract Level",
//         name: "_level",
//         type: "address",
//       },
//     ],
//     name: "createLevelInstance",
//     outputs: [],
//     stateMutability: "payable",
//     type: "function",
//     payable: true,
//     signature: "0xdfc86b17",
//   },
//   {
//     constant: true,
//     inputs: [
//       {
//         internalType: "address",
//         name: "",
//         type: "address",
//       },
//     ],
//     name: "emittedInstances",
//     outputs: [
//       {
//         internalType: "address",
//         name: "player",
//         type: "address",
//       },
//       {
//         internalType: "contract Level",
//         name: "level",
//         type: "address",
//       },
//       {
//         internalType: "bool",
//         name: "completed",
//         type: "bool",
//       },
//     ],
//     stateMutability: "view",
//     type: "function",
//     signature: "0x4f17afd8",
//   },
//   {
//     constant: true,
//     inputs: [],
//     name: "owner",
//     outputs: [
//       {
//         internalType: "address",
//         name: "",
//         type: "address",
//       },
//     ],
//     stateMutability: "view",
//     type: "function",
//     signature: "0x8da5cb5b",
//   },
//   {
//     inputs: [
//       {
//         internalType: "contract Level",
//         name: "_level",
//         type: "address",
//       },
//     ],
//     name: "registerLevel",
//     outputs: [],
//     stateMutability: "nonpayable",
//     type: "function",
//     signature: "0x202023d4",
//   },
//   {
//     inputs: [
//       {
//         internalType: "address",
//         name: "",
//         type: "address",
//       },
//     ],
//     name: "registeredLevels",
//     outputs: [
//       {
//         internalType: "bool",
//         name: "",
//         type: "bool",
//       },
//     ],
//     stateMutability: "view",
//     type: "function",
//     signature: "0xcf004695",
//   },
//   {
//     inputs: [],
//     name: "renounceOwnership",
//     outputs: [],
//     stateMutability: "nonpayable",
//     type: "function",
//     signature: "0x715018a6",
//   },
//   {
//     inputs: [
//       {
//         internalType: "address", 
//         name: "_statProxy",
//         type: "address",
//       },
//     ],
//     name: "setStatistics",
//     outputs: [],
//     stateMutability: "nonpayable",
//     type: "function",
//     signature: "0xbe117dfd",
//   },
//   {
//     constant: true,
//     inputs: [],
//     name: "statistics",
//     outputs: [
//       {
//         internalType: "contract IStatistics",
//         name: "",
//         type: "address",
//       },
//     ],
//     stateMutability: "view",
//     type: "function",
//     signature: "0x95e272bd",
//   },
//   {
//     inputs: [
//       {
//         internalType: "address payable",
//         name: "_instance",
//         type: "address",
//       },
//     ],
//     name: "submitLevelInstance",
//     outputs: [],
//     stateMutability: "nonpayable",
//     type: "function",
//     signature: "0xc882d7c2",
//   },
//   {
//     inputs: [
//       {
//         internalType: "address",
//         name: "newOwner",
//         type: "address",
//       },
//     ],
//     name: "transferOwnership",
//     outputs: [],
//     stateMutability: "nonpayable",
//     type: "function",
//     signature: "0xf2fde38b",
//   },
// ];

const ETHERNAUT_ABI = [{"anonymous":false,"inputs":
[{"indexed":true,"internalType":"address","name":"player","type":"address"},
{"indexed":true,"internalType":"address","name":"instance","type":"address"},
{"indexed":true,"internalType":"address","name":"level","type":"address"}],
"name":"LevelCompletedLog",
"type":"event"},
{"anonymous":false,
"inputs":[
  {"indexed":true,"internalType":"address","name":"player","type":"address"},
  {"indexed":true,"internalType":"address","name":"instance","type":"address"},
  {"indexed":true,"internalType":"address","name":"level","type":"address"}],
  "name":"LevelInstanceCreatedLog",
  "type":"event"},
  {"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"inputs":[{"internalType":"contract Level","name":"_level","type":"address"}],"name":"createLevelInstance","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"emittedInstances","outputs":[{"internalType":"address","name":"player","type":"address"},{"internalType":"contract Level","name":"level","type":"address"},{"internalType":"bool","name":"completed","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"contract Level","name":"_level","type":"address"}],"name":"registerLevel","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"registeredLevels","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_statProxy","type":"address"}],"name":"setStatistics","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"statistics","outputs":[{"internalType":"contract IStatistics","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address payable","name":"_instance","type":"address"}],"name":"submitLevelInstance","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}]

export const submitLevel = async (address: string) => {
  try {
    const ethernaut = await ethers.getContractAt(
      ETHERNAUT_ABI,
      ETHERNAUT_ADDRESS
    );
    let tx = await ethernaut.submitLevelInstance(address);
    await tx.wait();

    const txReceipt = await ethernaut.provider!.getTransactionReceipt(tx.hash);
    if (txReceipt.logs.length === 0) return false;

    for(let log of txReceipt.logs) {
      if(log.address == ethernaut.address) {
        const event = ethernaut.interface.parseLog(log);
        return event.name === `LevelCompletedLog`; 
      }
    }
    return false;
  } catch (error) {
    console.error(`submitLevel: ${error.message}`);
    return false;
  }
};

export const createChallenge = async (
  contractLevel: string,
  value: any = `0`
) => {
  try {
    const ethernaut = await ethers.getContractAt(
      ETHERNAUT_ABI,
      ETHERNAUT_ADDRESS
    );
    let tx = await ethernaut.createLevelInstance(contractLevel, {
      value,
    });
    await tx.wait();

    const txReceipt = await ethernaut.provider!.getTransactionReceipt(tx.hash);
    if (txReceipt.logs.length === 0) throw new Error(`No event found`);
    const events: LogDescription[] = txReceipt.logs
      .map((log) => {
        try {
          return ethernaut.interface.parseLog(log);
        } catch {
          return undefined;
        }
      })
      .filter(Boolean) as LogDescription[];

    const event = events.find(
      (event) => event.name === `LevelInstanceCreatedLog` && event.args.instance
    );
    if (!event) throw new Error(`Invalid Event ${JSON.stringify(event)}`);

    return event.args.instance;
  } catch (error) {
    console.error(`createChallenge: ${error.message}`);
    throw new Error(`createChallenge failed: ${error.message}`);
  }
};
