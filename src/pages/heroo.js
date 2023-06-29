// import React from "react";
// import { useState, useEffect, useRef } from "react";
// import { providers, Contract } from "ethers";
// import Web3Modal from "web3modal";
// import { abi, contractAddress } from "../constants";

// export default function Home() {
//   const [value, setValue] = useState("");
//   const [nusd, setNusd] = useState("");
//   const [contract, setContract] = useState(null);
//   const [account, setaccount] = useState();
//   const web3modalRef = useRef();

//   // Run on page load
//   useEffect(() => {
//     web3modalRef.current = new Web3Modal({
//       network: "mumbai",
//       providerOptions: {},
//       disableInjectedProvider: false,
//     });

//     async function init() {
//       try {
//         // console.log("defined ethereum");
//         // const [account] = await window.ethereum.request({
//         //   method: "eth_requestAccounts",
//         // });
//         // const provider = new ethers.providers.Web3Provider(window.ethereum);
//         // const signer = provider.getSigner();
//         const getProviderorSigner = async (needSigner = false) => {
//           const provider = await web3modalRef.current.connect();
//           const web3Provider = new providers.Web3Provider(provider);
//           const { chainId } = await web3Provider.getNetwork();
//           if (chainId != 80001) {
//             window.alert("please connect to polygon mumbai");
//           }

//           if (needSigner) {
//             const signer = web3Provider.getSigner();
//             return signer;
//           }

//           return web3Provider;
//         };

//         const provider = await getProviderorSigner();
//         const signer = await getProviderorSigner(true);
//         const address = await signer.getAddress();
//         setaccount(address);

//         // Connect to your contract

//         const contractInstance = new Contract(
//           contractAddress,
//           abi,
//           signer
//         );

//         setContract(contractInstance);
//         console.log(contract);

//         // Load nUSD balance
//         loadBalance(contractInstance);
//       } catch (err) {
//         console.error(err);
//       }
//     }

//     init();
//   }, []);

//   async function loadBalance(contractInstance) {
//     const balance = await contractInstance.balanceOf(account);
//     setNusd(ethers.utils.formatEther(balance));
//   }

//   async function deposit() {
//     const transaction = await contract.depositETH({
//       value: ethers.utils.parseEther(value),
//       gasLimit: 21000,
//     });
//     await transaction.wait();
//     loadBalance(contract);
//   }

//   async function redeem() {
//     const transaction = await contract.redeem(ethers.utils.parseEther(nusd));
//     await transaction.wait();

//     loadBalance(contract);
//   }

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen py-2">
//       <input
//         type="text"
//         placeholder="Amount to deposit"
//         className="px-3 py-2 border border-gray-300"
//         onChange={(e) => setValue(e.target.value)}
//       />
//       <button
//         className="px-4 py-2 mt-2 font-semibold text-white bg-blue-600 hover:bg-blue-700"
//         onClick={deposit}
//       >
//         Deposit
//       </button>
//       <div className="mt-4">Your nUSD Balance: {nusd}</div>
//       <button
//         className="px-4 py-2 mt-2 font-semibold text-white bg-blue-600 hover:bg-blue-700"
//         onClick={redeem}
//       >
//         Redeem nUSD
//       </button>
//     </div>
//   );
// }
