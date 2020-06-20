// KOVAN
export const TokenInfoArray = [
    {
      'DAI': {
          "token_symbol":"DAI",
          "token_contract_address":"0x4f96fe3b7a6cf9725f59d353f723c1bdb64ca6aa",
          "decimals": 18
      },'WETH': {
          "token_symbol":"WETH",
          "token_contract_address":"0xd0A1E359811322d97991E03f863a0C30C2cF029C",
          "decimals": 18
      },'BAT': {
          "token_symbol":"BAT",
          "token_contract_address":"0x2d12186Fbb9f9a8C28B3FfdD4c42920f8539D738",
          "decimals": 18
      },'KNC': {
          "token_symbol":"KNC",
          "token_contract_address":"0xad67cB4d63C9da94AcA37fDF2761AaDF780ff4a2",
          "decimals": 18
      },'ZIL': {
          "token_symbol":"ZIL",
          "token_contract_address":"0xAb74653cac23301066ABa8eba62b9Abd8a8c51d6",
          "decimals": 18
      },'TKN': {
          "token_symbol":"TKN",
          "token_contract_address":"0xC4375B7De8af5a38a93548eb8453a498222C4fF2",
          "decimals": 18
      }
    }
  ];
  
export function getERCContractInstance(web3, tokenSymbol) {

    let abi;
    if(tokenSymbol == "DAI") {    
        // with permit kovan
        abi = '[{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"nonces","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"","type":"address"},{"name":"","type":"uint256"}],"name":"approve","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"","type":"address"},{"name":"","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"},{"name":"","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"bool"},{"name":"","type":"uint8"},{"name":"","type":"bytes32"},{"name":"","type":"bytes32"}],"name":"permit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]';
    } else {
        // without permit
        abi ='[{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"}]';
    }
    
    const address = TokenInfoArray[0][tokenSymbol].token_contract_address;
    const jsonAbi = JSON.parse(abi);
    const contract = new web3.eth.Contract(jsonAbi, address);    
    return contract;
}
