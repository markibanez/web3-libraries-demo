import React from 'react';
import { Web3Button, Web3NetworkSwitch } from '@web3modal/react';
import styles from '../../styles/Home.module.css';
import { useAccount, useDisconnect, useSigner } from 'wagmi';
import { ethers } from 'ethers';

const Web3ModalV2 = () => {
    const { address, isConnected } = useAccount();
    const { disconnect } = useDisconnect();
    const { data: signer } = useSigner();

    return (
        <>
            <div className={styles.description}>{`Web3Modal Version 2`}</div>
            <Web3Button />
            <Web3NetworkSwitch />
            {isConnected && (
                <>
                    <button className={styles.button} onClick={() => {
                        signer?.sendTransaction({
                            to: '0x68D99e952cF3D4faAa6411C1953979F54552A8F7',
                            value: ethers.utils.parseEther('0.01'),
                        });
                    }}>
                        Donate 0.01 ETH
                    </button>

                    <button
                        className={styles.button}
                        onClick={() => {
                            disconnect();
                        }}
                    >
                        {`Disconnect ${address}`}
                    </button>
                </>
            )}
        </>
    );
};

export default Web3ModalV2;
