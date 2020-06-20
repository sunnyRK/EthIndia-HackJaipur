import Axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

export async function addTransaction(web3address, tokenSymbol, to, value, hash) {
    try {
    
        //add transation in transaction history
        const models = {
            "transactionHash": hash,
            "web3from": web3address,
            "to" : to,
            "value" : value,
            "tokenSymbol": tokenSymbol,
        }

        Axios.post('http://localhost:4000/api/create', models)
            .then(res => {
                if(res.statusText == "OK") {
                    console.log("Transaction added")
                } else {
                    console.log(res);
                    console.log("Transaction added error")
                }
            })
            .catch(err => {
                console.log(err);
                console.log("Transaction hostory catch")
            })
            toast.success("Transfer Successful and transaction added to transaction history!!", {
                position: toast.POSITION.TOP_RIGHT
            });
        
    } catch (error) {
        alert("Error: addtransaction");
        console.log(error)
    }   
}