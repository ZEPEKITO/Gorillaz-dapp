import React from "react";
import { Link } from "react-router-dom";
import {useState, useEffect} from 'react';
import {ethers} from 'ethers';
import Gorillaz from '../artifacts/contracts/Gorillaz.sol/Gorillaz.json';
import '../App.css';
import axios from "axios";
import imageLogo from '../img/logoArtrade.svg';

const GOZaddress ='0xb3020789536402621a405F8aa2CfE276B641dF7c';




function Navbar() {

  const [dataToken, setDataToken ] = useState([]);
  const [walletAddress, setWalletAddress] = useState('');
  const [error, setError] = useState('');


  useEffect(() => {
    retrieveAssets();
  }, [])



      async function connectWallet() {
        if(typeof window.ethereum !== 'undefined') {
          const accounts = await window.ethereum.request({method: 'eth_requestAccounts'});
          setWalletAddress(accounts[0]);
        }
      }



    async function retrieveAssets() {
      if(typeof window.ethereum !== 'undefined') {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contract = new ethers.Contract(GOZaddress, Gorillaz.abi, provider);
        const array = [];
        try {
          const TokenCount = await contract.balanceOf(walletAddress);
            for(let i = 0; i < TokenCount; i++ ) {
            const tokenId = await contract.tokenOfOwnerByIndex(walletAddress, i );
            console.log(tokenId)
            const tokenUri = await contract.tokenURI(tokenId);
            const ret = tokenUri.replace('ipfs://','');
            const ret2 = ret.replace('.json','')
            console.log(ret2);
            const res = await axios.get("https://ipfs.io/ipfs/" + ret2)
            console.log(res)
            //ipfs://QmWLmRCKnfHqokvnQXS3RqH8RRK7uBt3gi56wrw5Mvfw9n/3.json

            const desc = await res.data.image_url;

            array.push(desc);
            console.log("array",array)

            //const contents = (await axios.get(tokenUri)).data;
            //return contents.dna;
            }
            console.log("array",array)
            setDataToken([...array]);
            console.log("test",dataToken)
          }
          catch(error) {
          setError(error.message);
          }
        }
    }

  return (

    <div className="container1">
    <div className="header">
        <img src={imageLogo} alt="logo" />
        <div className="navbar">
            <nav><Link to="/"><p className='onglet'>Home</p></Link></nav>
            <p className='onglet'>Roadmap</p>
            <p className='onglet'>Collaction</p>
            <nav><Link to="/Assets"><p className='onglet'>Assets</p></Link></nav>
            <button onClick={retrieveAssets}  className='btnConnect'>My assets</button>
            <button onClick={connectWallet}  className='btnConnect'>Connect wallet</button>
            {dataToken}
        </div>
    </div>
  </div>

  )
}
export default Navbar;
