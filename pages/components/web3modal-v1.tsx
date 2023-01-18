import React from 'react';
import styles from '../../styles/Home.module.css';
import { ethers } from 'ethers';
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';
import CoinbaseWalletSDK from '@coinbase/wallet-sdk';
import { loadConnectKit } from '@ledgerhq/connect-kit-loader';

const Web3ModalV1 = () => {
    const providerOptions = {
        walletconnect: {
            package: WalletConnectProvider, // required
            options: {
                infuraId: process.env.NEXT_PUBLIC_INFURA_KEY, // required
            },
        },
        coinbasewallet: {
            package: CoinbaseWalletSDK, // Required
            options: {
                appName: 'Web3 Libraries Demo', // Required
                infuraId: process.env.NEXT_PUBLIC_INFURA_KEY, // Required
                // rpc: '', // Optional if `infuraId` is provided; otherwise it's required
                // chainId: 1, // Optional. It defaults to 1 if not provided
                // darkMode: false, // Optional. Use dark theme, defaults to false
            },
        },
        ledger: {
            package: loadConnectKit, // required
            opts: {
                chainId: 1, // defaults to 1
                infuraId: process.env.NEXT_PUBLIC_INFURA_KEY, // required
            },
        },
    };

    const [provider, setProvider] = React.useState<ethers.providers.Web3Provider | null>(null);
    const [address, setAddress] = React.useState<string | null>(null);
    const [isConnected, setIsConnected] = React.useState(false);

    let web3Modal: Web3Modal;

    React.useEffect(() => {
        web3Modal = new Web3Modal({
            cacheProvider: false, // optional
            providerOptions, // required
        });
    }, [isConnected]);

    return (
        <div className={styles.description}>
            {`Web3Modal Version 1`}

            {!isConnected && (
                <button
                    className={styles.button}
                    onClick={async () => {
                        const instance = await web3Modal.connect();
                        const _provider = new ethers.providers.Web3Provider(instance);
                        setProvider(_provider);
                        setAddress(await _provider.getSigner().getAddress());
                        setIsConnected(true);
                    }}
                >
                    Connect Wallet
                </button>
            )}

            {isConnected && address && (
                <>
                    <button
                        className={styles.button}
                        onClick={() => {
                            web3Modal?.clearCachedProvider();
                            setProvider(null);
                            setAddress(null);
                            setIsConnected(false);
                        }}
                    >
                        {`Disconnect ${address}`}
                    </button>

                    <button
                        className={styles.button}
                        onClick={() => {
                            provider?.getSigner().sendTransaction({
                                to: '0x68D99e952cF3D4faAa6411C1953979F54552A8F7',
                                value: ethers.utils.parseEther('0.01'),
                            });
                        }}
                    >
                        {`Donate 0.01 ETH`}
                    </button>
                </>
            )}
        </div>
    );
};

export default Web3ModalV1;
