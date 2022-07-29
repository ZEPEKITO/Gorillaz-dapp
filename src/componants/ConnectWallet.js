import React from "react";
import { Link } from "react-router-dom";
import {useState, useEffect} from 'react';
import {ethers} from 'ethers';
import Gorillaz from '../artifacts/contracts/Gorillaz.sol/Gorillaz.json';
import '../App.css';
import axios from "axios";

const GOZaddress ='0xb3020789536402621a405F8aa2CfE276B641dF7c';



export default async function connectWallet() {

  const [walletAddress, setWalletAddress] = useState('');

  if(typeof window.ethereum !== 'undefined') {
    const accounts = await window.ethereum.request({method: 'eth_requestAccounts'});
    setWalletAddress(accounts[0]);
  }
}
