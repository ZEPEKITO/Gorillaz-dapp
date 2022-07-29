import React from "react";
import {useState, useEffect} from 'react';
import {ethers} from 'ethers';
import Gorillaz from '../artifacts/contracts/Gorillaz.sol/Gorillaz.json';
import '../App.css';
import axios from "axios";

const GOZaddress ='0xb3020789536402621a405F8aa2CfE276B641dF7c';




export default async function useRetrieveAssets() {

  const [dataToken, setDataToken ] = useState([]);
  const [error, setError] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  console.log("debutBug")

  useEffect(() => {
    (async () => {
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
            const ret2 = ret.replace('.json','');
            console.log(ret2);
            const res = await axios.get("https://ipfs.io/ipfs/" + ret2);
            console.log(res);
            //ipfs://QmWLmRCKnfHqokvnQXS3RqH8RRK7uBt3gi56wrw5Mvfw9n/3.json

            const desc = await res.data.image_url;

            array.push(desc);
            console.log("array",array);

            //const contents = (await axios.get(tokenUri)).data;
            //return contents.dna;
            }
            console.log("array",array)
            setDataToken([...array]);
            console.log("test",dataToken)
            return dataToken;
          }
          catch(error) {
          setError(error.message);
          }

        }
    })();
  }, []);

  /*if(typeof window.ethereum !== 'undefined') {
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
        console.log("array",array);

        //const contents = (await axios.get(tokenUri)).data;
        //return contents.dna;
        }
        console.log("array",array)
        setDataToken([...array]);
        console.log("test",dataToken)
        return dataToken;
      }
      catch(error) {
      setError(error.message);
      }

    }*/
}
