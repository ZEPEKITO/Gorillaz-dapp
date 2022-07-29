import {useState, useEffect} from 'react';
import {ethers} from 'ethers';
import Gorillaz from '../artifacts/contracts/Gorillaz.sol/Gorillaz.json';
import '../App.css';

const GOZaddress ='0xb3020789536402621a405F8aa2CfE276B641dF7c';

function Home() {

  const [error, setError] = useState('');
  const [data, setData] = useState({})


  useEffect(() => {
    fetchData();
  }, [])


  async function fetchData() {
    if(typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(GOZaddress, Gorillaz.abi, provider);
      try {
        const cost = await contract.cost();
        const totalSupply = await contract.totalSupply();
        const object = {"cost": String(cost), "totalSupply": String(totalSupply)}
        setData(object);
      }
      catch(err) {
        setError(err.message);
      }
    }
  }


  async function mint() {
    if(typeof window.ethereum !== 'undefined') {
      let accounts = await window.ethereum.request({method: 'eth_requestAccounts'});
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(GOZaddress, Gorillaz.abi, signer);
      try {
        let overrides = {
          from: accounts[0],
          value: data.cost
        }
        const transaction = await contract.mint(accounts[0], 1, overrides);
        await transaction.wait();
        fetchData();
      }
      catch(err) {
        setError(err.message);
      }
    }
  }




  //async function getOpenseaItems() {
    //if (!walletAddress) { return }
      //debugger
      //const items = `https://testnets-api.opensea.io/api/v1/assets?owner=${walletAddress}&order_direction=desc&offset=0&limit=20&include_orders=false`
      //.then((res) => res.json())
      //.then((res) => {
        //console.log(res))
        //debugger
      //console.log(res.assets)
      //setNfts( res.assets.map( nft => {return {name: nft.name, image_url: nft.image_url} }));
      //}
      //.catch((e) => {
        //console.error(e)
        //console.error('Could not talk to OpenSea')
        //return null
      //})
  //}







  return (
    //header


    <div className="Home">





      <div className="container2">
        <div className="partLeft">

          <div className="home">
            <div className="homeText">
              <h1>Welcom to the first club for <span className='colorGradiant'>Gorillaz</span></h1>
              <p>A small species that sprouts from the dirt in the garden.
                While they're earnestly driven by the desire to help their Azuki friends,
                 some BEANZ simply can't resist the allure of the alley...</p>
              <div className="data">
                <p className="count">{data.totalSupply } /6 </p>
                <p className="cost"> Each Gorillaz NFT costs {data.cost / 10**18} eth</p>
              </div>
            </div>

            <div className="homeButton">
                <div className="buttonLeft">
                  <form>
                    <button className='btmExplore' formAction="https://opensea.io/collection/meta-kongz-official">See on opensea</button>
                  </form>
                </div>
                <div className="buttonRight">
                  <button onClick={mint} className='btmMint'>Mint now</button>
                </div>
            </div>
           </div>

        </div>

        <div className="partRight">
          <div className="slider">

          </div>
        </div>
        {error && <p>{error}</p>}
        <div className="assets">
        </div>

      </div>
    </div>


  );
}

export default Home;
