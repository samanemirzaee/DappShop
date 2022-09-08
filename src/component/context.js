import React,{createContext, useState} from "react";


export const Web3Context=createContext();

const ContextProvider=(props)=>{
    const [web3States,setWeb3State]=useState({web3:null,contract:null,account:null,isOwner:false})


    // const [web3States,setWeb3State]=useState({web3Con:null,contractCon:null,accountCon:null,isOwner:false})
    return (
       <Web3Context.Provider value={{web3States,setWeb3State}}>
           {props.children}
       </Web3Context.Provider>
    )
}

export default ContextProvider