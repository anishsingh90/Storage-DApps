# Storage DApp Frontend

## Setup Instructions

### 1. Install Dependencies
```bash
cd frontend
npm install
```

### 2. Configure Contract
After deploying your contract with Hardhat, update `src/config.js`:
- Replace `YOUR_CONTRACT_ADDRESS_HERE` with your deployed contract address
- Replace the `CONTRACT_ABI` array with your contract's ABI (found in `artifacts/contracts/YourContract.sol/YourContract.json`)

### 3. Connect MetaMask to Hardhat Local Network
1. Open MetaMask
2. Click network dropdown → Add Network → Add a network manually
3. Enter the following:
   - Network Name: `Hardhat Local`
   - RPC URL: `http://127.0.0.1:8545`
   - Chain ID: `31337`
   - Currency Symbol: `ETH`
4. Import a Hardhat test account:
   - Copy a private key from Hardhat's console output
   - MetaMask → Account → Import Account → Paste private key

### 4. Start Hardhat Node
In your project root:
```bash
npx hardhat node
```

### 5. Deploy Contract
In a new terminal:
```bash
npx hardhat run scripts/deploy.js --network localhost
```

### 6. Start Frontend
```bash
cd frontend
npm start
```

The app will open at `http://localhost:3000`

## Usage
1. Click "Connect MetaMask" to connect your wallet
2. Enter a number in the input field
3. Click "Store Value" to save it to the blockchain
4. Click "Get Stored Value" to retrieve the current value
5. Transaction status will be displayed below

## Troubleshooting
- If MetaMask shows "Nonce too high" error, reset your account: Settings → Advanced → Clear activity tab data
- Ensure Hardhat node is running before interacting with the contract
- Make sure you're connected to the Hardhat Local network in MetaMask
