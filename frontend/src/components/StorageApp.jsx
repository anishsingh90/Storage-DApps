import { useState, useEffect } from "react";
import { connectWallet, setValue, getValue } from "../utils/contract";

export default function StorageApp() {
  const [account, setAccount] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [storedValue, setStoredValue] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleConnect = async () => {
    try {
      setLoading(true);
      const address = await connectWallet();
      setAccount(address);
      setStatus("Wallet connected!");
    } catch (error) {
      setStatus(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSetValue = async () => {
    try {
      setLoading(true);
      setStatus("Transaction pending...");
      await setValue(inputValue);
      setStatus("Value stored successfully!");
    } catch (error) {
      setStatus(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleGetValue = async () => {
    try {
      setLoading(true);
      const value = await getValue();
      setStoredValue(value);
      setStatus("Value retrieved!");
    } catch (error) {
      setStatus(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        setAccount(accounts[0] || "");
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Storage DApp</h1>
        
        {!account ? (
          <button
            onClick={handleConnect}
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 disabled:opacity-50"
          >
            {loading ? "Connecting..." : "Connect MetaMask"}
          </button>
        ) : (
          <>
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Connected Wallet</p>
              <p className="text-xs font-mono text-gray-800 break-all">{account}</p>
            </div>

            <div className="space-y-4 mb-6">
              <input
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter a number"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
              />
              <button
                onClick={handleSetValue}
                disabled={loading || !inputValue}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 disabled:opacity-50"
              >
                {loading ? "Processing..." : "Store Value"}
              </button>
            </div>

            <div className="mb-6">
              <button
                onClick={handleGetValue}
                disabled={loading}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 disabled:opacity-50"
              >
                {loading ? "Loading..." : "Get Stored Value"}
              </button>
            </div>

            {storedValue && (
              <div className="mb-4 p-4 bg-green-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Stored Value</p>
                <p className="text-2xl font-bold text-green-700">{storedValue}</p>
              </div>
            )}

            {status && (
              <div className={`p-4 rounded-lg ${
                status.includes("Error") ? "bg-red-50 text-red-700" : "bg-blue-50 text-blue-700"
              }`}>
                <p className="text-sm">{status}</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
