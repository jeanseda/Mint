
import './App.css';
import mintAbi from "./mintAbi.json";
import {ethers, BigNumber} from "ethers";
import {useEffect, useState} from "react";


const mintExampleAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

function App() {
  //Connecting
  const [accounts, setAccounts ] = useState([]); //save data that may change

  async function connectAccounts(){
    if(window.ethereum){
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts"
      });
      setAccounts(accounts);
    }
  }

  useEffect(()=> {
    connectAccounts();
  }, []);

  //Minting functionality
  const [mintAmount, setMintAmount] = useState(1);

  async function handleMint(){
    if(window.ethereum){
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        mintExampleAddress,
        mintAbi.abi,
        signer
      );
      try{
        const response = await contract.mint(BigNumber.from(mintAmount));
        console.log("response: ", response);
      } catch(err){
        console.log("error: ", err);
      }
    }
  }

  return (
    <div className= "App">
      This is how you create a mint button
      {accounts.length && (
        <div>
          <button onClick={()=> setMintAmount( mintAmount -1)}>-</button>
            {mintAmount}
          <button onClick={()=> setMintAmount(mintAmount+1)}>+</button>
          <button onClick={handleMint}>Mint</button>
        </div>
      )}
    </div>
  );

}


export default App;
