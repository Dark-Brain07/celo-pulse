"use client";

import React, { useState } from 'react';

const CONTRACTS = [
    { name: 'MicroAction.sol', address: '0x_DEPLOYED_MICRO_ACTION_ADDRESS' },
    { name: 'ActivityManager.sol', address: '0x_DEPLOYED_ACTIVITY_MANAGER_ADDRESS' }
];

export default function MassInteractionPanel() {
    const [selectedContract, setSelectedContract] = useState(CONTRACTS[0]);
    const [status, setStatus] = useState<string>('');
    const [mounted, setMounted] = useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    const handleInteract = async () => {
        try {
            setStatus('Initiating transaction via wallet...');
            if (typeof window === 'undefined' || !(window as any).ethereum) {
                setStatus('Error: No Web3 wallet found. Please install MetaMask or Core.');
                return;
            }
            
            setStatus(`Simulation: Transaction sent to ${selectedContract.name} at ${selectedContract.address}`);
            
            setTimeout(() => {
                setStatus(`Success! Confirmed interaction on ${selectedContract.name}`);
            }, 2000);
            
        } catch(e: any) {
            setStatus('Error: ' + e.message);
        }
    };

    if (!mounted) return null;

    return (
        <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 mt-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Celo Contract Interaction</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm">
                Interact with core network contracts directly from the frontend interface to boost your on-chain activity manually.
            </p>

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Select Target Contract
                    </label>
                    <select 
                        className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                        onChange={(e) => setSelectedContract(CONTRACTS[Number(e.target.value)])}
                    >
                        {CONTRACTS.map((c, i) => (
                            <option key={i} value={i}>{c.name}</option>
                        ))}
                    </select>
                </div>

                <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                    <p className="text-sm text-blue-800 dark:text-blue-200 break-all">
                        <strong>Target Address:</strong> {selectedContract.address}
                    </p>
                </div>

                <button 
                    onClick={handleInteract}
                    className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3 text-center transition-colors dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    Interact Manually
                </button>

                {status && (
                    <div className="mt-4 p-3 rounded-md text-sm bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-center">
                        {status}
                    </div>
                )}
            </div>
        </div>
    );
}
