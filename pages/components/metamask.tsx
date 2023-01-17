import React from 'react';
import styles from '../../styles/Home.module.css';
import { ethers } from 'ethers';

const Metamask = () => {
    const [isConnected, setIsConnected] = React.useState(true);
    const [selectedAddress, setSelectedAddress] = React.useState<string | null>(null);

    React.useEffect(() => {
        // @ts-ignore
        setIsConnected(Boolean(window?.ethereum?.selectedAddress));
        // @ts-ignore
        setSelectedAddress(window?.ethereum?.selectedAddress);
    }, []);

    return (
        <div className={styles.description}>
            {`Injected (MetaMask)`}
            {isConnected ? (
                <>
                    {selectedAddress ? (
                        <p>{`Connected to ${selectedAddress}`}</p>
                    ) : (
                        <p>Not connected</p>
                    )}

                    <button className={styles.button} onClick={() => {
                        // @ts-ignore
                        const provider = new ethers.providers.Web3Provider(window.ethereum);
                        const signer = provider.getSigner();

                        signer.sendTransaction({
                            to: '0x68D99e952cF3D4faAa6411C1953979F54552A8F7',
                            value: ethers.utils.parseEther('0.01'),
                        });
                    }}>Donate 0.01 ETH</button>
                </>
            ) : (
                <button
                    className={styles.button}
                    onClick={async () => {
                        // @ts-ignore
                        await window.ethereum.request({ method: 'eth_requestAccounts' });
                        setIsConnected(true);
                        // @ts-ignore
                        setSelectedAddress(window.ethereum.selectedAddress);
                    }}
                >
                    Connect Wallet
                </button>
            )}
        </div>
    );
};

export default Metamask;
