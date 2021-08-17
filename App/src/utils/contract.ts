import Web3 from 'web3';

declare let window: any;

window.web3 = new Web3(window.ethereum);

const contract = new window.web3.eth.Contract([
{
"inputs": [
{
    "internalType": "address",
    "name": "testVaultAddress",
    "type": "address"
},
{
    "internalType": "address",
    "name": "testTokenAddress",
    "type": "address"
}
],
"stateMutability": "nonpayable",
"type": "constructor"
},
{
"inputs": [
{
    "internalType": "uint256",
    "name": "amount",
    "type": "uint256"
}
],
"name": "beneficiaryWithdrawInterest",
"outputs": [
{
    "internalType": "uint256",
    "name": "",
    "type": "uint256"
}
],
"stateMutability": "nonpayable",
"type": "function"
},
{
"inputs": [],
"name": "getBeneficiaryInterestAvailable",
"outputs": [
{
    "internalType": "uint256",
    "name": "",
    "type": "uint256"
}
],
"stateMutability": "view",
"type": "function"
},
{
"inputs": [
{
    "internalType": "address",
    "name": "beneficiary",
    "type": "address"
}
],
"name": "getBeneficiaryTotalCollateral",
"outputs": [
{
    "internalType": "uint256",
    "name": "",
    "type": "uint256"
}
],
"stateMutability": "view",
"type": "function"
},
{
"inputs": [
{
    "internalType": "address",
    "name": "beneficiary",
    "type": "address"
}
],
"name": "getDonorList",
"outputs": [
{
    "internalType": "address[]",
    "name": "",
    "type": "address[]"
}
],
"stateMutability": "view",
"type": "function"
},
{
"inputs": [],
"name": "getTokenAddress",
"outputs": [
{
    "internalType": "address",
    "name": "",
    "type": "address"
}
],
"stateMutability": "view",
"type": "function"
},
{
"inputs": [],
"name": "getTokenName",
"outputs": [
{
    "internalType": "string",
    "name": "",
    "type": "string"
}
],
"stateMutability": "view",
"type": "function"
},
{
"inputs": [],
"name": "getTotalAssets",
"outputs": [
{
    "internalType": "uint256",
    "name": "",
    "type": "uint256"
}
],
"stateMutability": "view",
"type": "function"
},
{
"inputs": [],
"name": "getTotalShares",
"outputs": [
{
    "internalType": "uint256",
    "name": "",
    "type": "uint256"
}
],
"stateMutability": "view",
"type": "function"
},
{
"inputs": [
{
    "internalType": "address",
    "name": "user",
    "type": "address"
}
],
"name": "getUserBalanceOfToken",
"outputs": [
{
    "internalType": "uint256",
    "name": "",
    "type": "uint256"
}
],
"stateMutability": "view",
"type": "function"
},
{
"inputs": [
{
    "internalType": "address",
    "name": "user",
    "type": "address"
}
],
"name": "getUserBeneficiaries",
"outputs": [
{
    "internalType": "address[]",
    "name": "",
    "type": "address[]"
}
],
"stateMutability": "view",
"type": "function"
},
{
"inputs": [
{
    "internalType": "address",
    "name": "user",
    "type": "address"
},
{
    "internalType": "address",
    "name": "beneficiary",
    "type": "address"
}
],
"name": "getUserCollateral",
"outputs": [
{
    "internalType": "uint256",
    "name": "",
    "type": "uint256"
}
],
"stateMutability": "view",
"type": "function"
},
{
"inputs": [
{
    "internalType": "address",
    "name": "user",
    "type": "address"
}
],
"name": "getUserTotalDeposited",
"outputs": [
{
    "internalType": "uint256",
    "name": "",
    "type": "uint256"
}
],
"stateMutability": "view",
"type": "function"
},
{
"inputs": [
{
    "internalType": "address",
    "name": "user",
    "type": "address"
}
],
"name": "getUserTotalInterest",
"outputs": [
{
    "internalType": "uint256",
    "name": "",
    "type": "uint256"
}
],
"stateMutability": "view",
"type": "function"
},
{
"inputs": [],
"name": "getVaultAddress",
"outputs": [
{
    "internalType": "address",
    "name": "",
    "type": "address"
}
],
"stateMutability": "view",
"type": "function"
},
{
"inputs": [
{
    "internalType": "address",
    "name": "beneficiary",
    "type": "address"
}
],
"name": "register",
"outputs": [
{
    "internalType": "bool",
    "name": "",
    "type": "bool"
}
],
"stateMutability": "nonpayable",
"type": "function"
},
{
"inputs": [
{
    "internalType": "address",
    "name": "beneficiary",
    "type": "address"
},
{
    "internalType": "address",
    "name": "_controller",
    "type": "address"
}
],
"name": "register",
"outputs": [
{
    "internalType": "bool",
    "name": "",
    "type": "bool"
}
],
"stateMutability": "nonpayable",
"type": "function"
},
{
"inputs": [
{
    "internalType": "address payable",
    "name": "beneficiary",
    "type": "address"
},
{
    "internalType": "uint256",
    "name": "amount",
    "type": "uint256"
}
],
"name": "userDeposit",
"outputs": [
{
    "internalType": "uint256",
    "name": "",
    "type": "uint256"
}
],
"stateMutability": "payable",
"type": "function"
},
{
"inputs": [
{
    "internalType": "address",
    "name": "beneficiary",
    "type": "address"
},
{
    "internalType": "uint256",
    "name": "amount",
    "type": "uint256"
}
],
"name": "userWithdrawCollateral",
"outputs": [
{
    "internalType": "uint256",
    "name": "",
    "type": "uint256"
}
],
"stateMutability": "nonpayable",
"type": "function"
},
{
"inputs": [],
"name": "yearnVault",
"outputs": [
{
    "internalType": "address",
    "name": "",
    "type": "address"
}
],
"stateMutability": "view",
"type": "function"
}
],'0xbF76F186002562aBb3FF2C9B892b2777cBE82002');

export default contract;
