import React,{createContext, useState} from "react";


export const ListOrder=createContext();

const ListOrderProvider=(props)=>{
    let [myListOrder,setmyListOrder]=useState([])


    // const [web3States,setWeb3State]=useState({web3Con:null,contractCon:null,accountCon:null,isOwner:false})
    return (
       <ListOrder.Provider value={{myListOrder,setmyListOrder}}>
           {props.children}
       </ListOrder.Provider>
    )
}

export default ListOrderProvider