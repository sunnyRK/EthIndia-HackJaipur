import {
   KYBER_NETWORK_PROXY_ADDRESS, convertInWei, TokenInfoArray,
    KYBER_NETWORK_PROXY_CONTRACT, getSrcTokenContract
} from '../../../config/kyberconfig/kyberconfig';
import web3 from "../../../biconomyProvider/realweb3";

// Function to obtain conversion rate between src token and dst token
export async function getRates(SRC_TOKEN_ADDRESS,DST_TOKEN_ADDRESS,SRC_QTY_WEI) {
   const value = await KYBER_NETWORK_PROXY_CONTRACT.methods
   .getExpectedRate(SRC_TOKEN_ADDRESS, DST_TOKEN_ADDRESS, SRC_QTY_WEI)
   .call();

    return await KYBER_NETWORK_PROXY_CONTRACT.methods
      .getExpectedRate(SRC_TOKEN_ADDRESS, DST_TOKEN_ADDRESS, SRC_QTY_WEI)
      .call();
}
  
// Function to convert src token to dst token
export async function trade(
    srcTokenAddress,
    srcQtyWei,
    dstTokenAddress,
    dstAddress,
    maxDstAmount,
    minConversionRate,
    walletId, 
    SRC_TOKEN,
    DST_TOKEN, 
    Qty
   ) {
      console.log(`Converting ${SRC_TOKEN} to ${DST_TOKEN}`);
      const accounts = await web3.eth.getAccounts();

      let txData = await KYBER_NETWORK_PROXY_CONTRACT.methods
         .trade(
         srcTokenAddress,
         srcQtyWei,
         dstTokenAddress,
         dstAddress,
         maxDstAmount,
         minConversionRate,
         walletId
         ).send({
            from: accounts[0]
         })
}
  
// // Function to approve KNP contract
export async function approveContract(allowance, srcTokenAddress) {
   console.log("Approving KNP contract to manage my KNC");
   const accounts = await web3.eth.getAccounts();
   const alreadyAllowance = await getSrcTokenContract(srcTokenAddress).methods.
   allowance(accounts[0], KYBER_NETWORK_PROXY_ADDRESS).call(); 
   if (parseInt(alreadyAllowance) < parseInt(allowance)){
      let txData = await getSrcTokenContract(srcTokenAddress).methods
      .approve(KYBER_NETWORK_PROXY_ADDRESS, allowance).send({
         from: accounts[0]
      });
   } else {
      console.log("Allownace is given, No worry buddy!");
   }
}