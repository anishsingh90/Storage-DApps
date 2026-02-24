# Storage DApp - Complete Deployment Guide

## Step 1: Hardhat Node Start Karo (Terminal 1)

Project root folder mein ye command run karo:
```bash
npx hardhat node
```

Ye command run karne ke baad:
- Local blockchain start ho jayega (http://127.0.0.1:8545)
- 20 test accounts dikhenge with private keys
- Har account mein 10000 ETH hoga
- Is terminal ko running rehne do, band mat karo!

---

## Step 2: Contract Deploy Karo (Terminal 2 - Naya Terminal)

Dusra terminal kholo aur project root folder mein ye command run karo:
```bash
npx hardhat run scripts/deploy.js --network localhost
```

Deploy hone ke baad output aayega:
```
Storage contract deployed to: 0x5FbDB2315678afecb367f032d93F642f64180aa3
```

**IMPORTANT:** Is contract address ko copy kar lo!

---

## Step 3: Contract ABI Copy Karo

1. Is file ko kholo:
   ```
   artifacts/contracts/Storage.sol/Storage.json
   ```

2. Isme se "abi" array dhundo aur copy karo. Ye kuch aisa dikhega:
   ```json
   [
     {
       "anonymous": false,
       "inputs": [
         {
           "indexed": false,
           "internalType": "uint256",
           "name": "newValue",
           "type": "uint256"
         },
         {
           "indexed": false,
           "internalType": "address",
           "name": "updatedBy",
           "type": "address"
         }
       ],
       "name": "ValueUpdated",
       "type": "event"
     },
     {
       "inputs": [],
       "name": "getValue",
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
           "internalType": "uint256",
           "name": "_value",
           "type": "uint256"
         }
       ],
       "name": "setValue",
       "outputs": [],
       "stateMutability": "nonpayable",
       "type": "function"
     }
   ]
   ```

---

## Step 4: Config File Update Karo

File kholo: `frontend/src/config.js`

Aur update karo:
```javascript
export const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // Apna deployed address paste karo

export const CONTRACT_ABI = [
  // Yahan ABI array paste karo (upar se copy kiya hua)
];
```

---

## Step 5: MetaMask Setup Karo

### 5.1 Network Add Karo:
1. MetaMask kholo
2. Network dropdown click karo (top left)
3. "Add Network" → "Add a network manually" click karo
4. Ye details bharo:
   - **Network Name:** `Hardhat Local`
   - **New RPC URL:** `http://127.0.0.1:8545`
   - **Chain ID:** `31337`
   - **Currency Symbol:** `ETH`
5. "Save" click karo

### 5.2 Test Account Import Karo:
1. Terminal 1 (jahan hardhat node chal raha hai) mein dekho
2. Koi bhi ek private key copy karo (Account #0 ya #1 ka)
   ```
   Private Key: 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
   ```
3. MetaMask mein:
   - Account icon click karo (top right)
   - "Import Account" select karo
   - Private key paste karo
   - "Import" click karo

### 5.3 Network Switch Karo:
- MetaMask mein "Hardhat Local" network select karo
- Balance 10000 ETH dikhna chahiye

---

## Step 6: Frontend Start Karo (Terminal 3)

```bash
cd frontend
npm start
```

Browser mein `http://localhost:3000` khulega.

---

## Step 7: DApp Use Karo

1. "Connect MetaMask" button click karo
2. MetaMask popup mein "Connect" click karo
3. Wallet address dikhai dega
4. Number enter karo aur "Store Value" click karo
5. MetaMask popup mein transaction confirm karo
6. "Get Stored Value" click karke value dekho

---

## Troubleshooting

### Agar "Nonce too high" error aaye:
1. MetaMask → Settings → Advanced
2. "Clear activity tab data" click karo
3. Confirm karo

### Agar contract se connect nahi ho raha:
1. Check karo hardhat node chal raha hai (Terminal 1)
2. Check karo contract address sahi hai `config.js` mein
3. Check karo MetaMask "Hardhat Local" network pe hai

### Agar transaction fail ho:
1. MetaMask mein sufficient ETH hai check karo
2. Hardhat node restart karo aur contract dobara deploy karo
3. MetaMask activity clear karo (upar dekho)

---

## Quick Commands Summary

```bash
# Terminal 1 - Hardhat Node
npx hardhat node

# Terminal 2 - Deploy Contract
npx hardhat run scripts/deploy.js --network localhost

# Terminal 3 - Frontend
cd frontend
npm start
```

Bas! Aapka DApp ready hai! 🚀
