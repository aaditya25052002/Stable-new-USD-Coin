import React from "react";
import { useState, useEffect, useRef } from "react";
import { providers, Contract, ethers } from "ethers";
import Web3Modal from "web3modal";
import { abi, contractAddress } from "../constants";

const hero = () => {
  const [walletConnected, setWalletConnected] = useState(false);
  const [val, setVal] = useState("");
  const [addr, setaddr] = useState("");
  const [nusd, setnusd] = useState("");

  const web3modalRef = useRef();

  const getProviderorSigner = async (needSigner = false) => {
    const provider = await web3modalRef.current.connect();
    console.log(provider);
    const web3Provider = new providers.Web3Provider(provider);
    console.log(web3Provider);
    const { chainId } = await web3Provider.getNetwork();
    if (chainId != 80001) {
      window.alert("please connect to polygon mumbai");
    }

    if (needSigner) {
      const signer = web3Provider.getSigner();
      return signer;
    }

    return web3Provider;
  };

  const balance = async () => {
    try {
      const signer = await getProviderorSigner(true); // Pass true to get the signer
      const contract = new Contract(contractAddress, abi, signer);
      const address = await signer.getAddress(); // Get the address from the signer
      console.log(address);
      setaddr(address);
      const tx = await contract.balanceOf(address);
      console.log(tx);
      const bal = ethers.utils.formatEther(tx);
      console.log(bal);
      setnusd(bal);
    } catch (err) {
      console.log(err);
    }
  };

  const depositEth = async () => {
    try {
      const signer = await getProviderorSigner(true);
      const contract = new Contract(contractAddress, abi, signer);
      const tx = await contract.depositETH({
        value: ethers.utils.parseEther(val),
      });
      await tx.wait();
      balance();
    } catch (err) {
      console.error(err);
    }
  };

  const redeem = async () => {
    try {
      const signer = await getProviderorSigner(true);
      const contract = new Contract(contractAddress, abi, signer);
      const transaction = await contract.redeem(ethers.utils.parseEther(nusd));
      await transaction.wait();
      balance();
    } catch (err) {
      console.log(err);
    }
  };

  const connectWallet = async () => {
    try {
      await getProviderorSigner();
      await balance();
      setWalletConnected(true);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!walletConnected) {
      web3modalRef.current = new Web3Modal({
        network: "mumbai",
        providerOptions: {},
        disableInjectedProvider: false,
      });
      connectWallet();
    }
  }, [walletConnected]);

  return (
    <div style={{ border: '1px solid black' }}>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        {walletConnected == true ? (
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            {addr}
          </button>
        ) : (
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={connectWallet}
          >
            Connect Wallet
          </button>
        )}
        <input
          type="text"
          placeholder="Amount to deposit"
          className="px-3 py-2 border border-gray-300 m-2"
          onChange={(e) => setVal(e.target.value)}
        />
        <button
          className="px-4 py-2 mt-2 font-semibold text-white bg-blue-600 hover:bg-blue-700 m-2"
          onClick={depositEth}
        >
          Deposit
        </button>
        <div className="mt-4">Your nUSD Balance: {nusd}</div>
        <button
          className="px-4 py-2 mt-2 font-semibold text-white bg-blue-600 hover:bg-blue-700 m-2"
          onClick={redeem}
        >
          Redeem nUSD
        </button>
      </div>
    </div>
  );
};

export default hero;
