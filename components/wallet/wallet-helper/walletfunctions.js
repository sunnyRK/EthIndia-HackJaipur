import {getWalletContractInstance} from './walletinstance'
import { ToastContainer, toast } from 'react-toastify';

export async function approve(web3, contractInstance, spender, value) {
    try{
        const accounts = await web3.eth.getAccounts();
        await contractInstance.methods.approve(
            spender,
            value
        ).send({
            from:accounts[0]
        }).on("transactionHash", (hash) => {
        }).once("confirmation", (confirmationCount, receipt) => {   
        }).on("error", (error)=>{
            console.log(error);
        });
    }catch(err){
        console.log(err);
    }
}

export async function transferErc20(web3, contractInstance, to, value) {
    let status;
    let transactionHash;
    try{
        const accounts = await web3.eth.getAccounts();
        await contractInstance.methods.transfer(
            to,
            value
        ).send({
            from:accounts[0]
        }).on("transactionHash", (hash) => {
            transactionHash = hash;
        }).once("confirmation", (confirmationCount, receipt) => {   
            console.log(receipt.status);
            status = receipt.status
        }).on("error", (error)=>{
            console.log(error);
        });
    }catch(err){
        console.log(err);
        return;
    }
    var resp = [status.toString(), transactionHash];
    return resp;
}

