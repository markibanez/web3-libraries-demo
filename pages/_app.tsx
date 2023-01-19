import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { EthereumClient, modalConnectors, walletConnectProvider } from '@web3modal/ethereum';
import { Web3Modal } from '@web3modal/react';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { goerli, mainnet } from 'wagmi/chains';

export default function App({ Component, pageProps }: AppProps) {
    const chains = [goerli, mainnet];
    const projectId = process.env.NEXT_PUBLIC_WC_CLOUD_ID || '';

    // Wagmi client
    const { provider } = configureChains(chains, [
        walletConnectProvider({ projectId }),
    ]);
    const wagmiClient = createClient({
        autoConnect: true,
        connectors: modalConnectors({ appName: 'web3Modal', chains }),
        provider,
    });

    // Web3Modal Ethereum Client
    const ethereumClient = new EthereumClient(wagmiClient, chains);

    return (
        <>
            <WagmiConfig client={wagmiClient}>
                <Component {...pageProps} />
            </WagmiConfig>

            <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
        </>
    );
}
