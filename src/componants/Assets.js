import { useState, useEffect } from "react";
import React from "react";
import { ethers } from "ethers";
import Gorillaz from "../artifacts/contracts/Gorillaz.sol/Gorillaz.json";
import "../App.css";
import axios from "axios";
import { Navbar } from "./Navbar";
import { Link } from "react-router-dom";
import useRetrieveAssets from "./RetrieveAssets";

const GOZaddress = "0xb3020789536402621a405F8aa2CfE276B641dF7c";

function Assets() {
  const [dataTokenn, setDataToken] = useState([]);

    useEffect(() => {
      (async function useTest2() {
        console.log("popopopo");
        const test = await useRetrieveAssets();
        console.log("etettetete", test);
        setDataToken(test);
      })();
    }, []);

  console.log("testAAA", dataTokenn);

  return (
    //header
    <div className="Assets">
      <div>{dataTokenn}</div>
      <div>
        {dataTokenn.map((images) => (
          <img src={images} alt="img"></img>
        ))}
      </div>
    </div>
  );
}

export default Assets;
