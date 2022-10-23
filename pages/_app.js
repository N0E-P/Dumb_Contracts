import "../styles/globals.css"
import Head from "next/head"
import Connect from "../components/Connect"
import Home from "../components/Home"
import Create from "../components/Create"
import Contracts from "../components/Contracts"

import { WagmiConfig, createClient, useAccount } from "wagmi"
import { getDefaultProvider } from "ethers"

const client = createClient({
	autoConnect: true,
	provider: getDefaultProvider(),
})

export default function app({ Component, pageProps }) {
	const { isConnected } = useAccount()

	return (
		<div>
			<Head>
				<title>Dumb Contracts</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div>
				<WagmiConfig client={client}>
					{isConnected ? (
						<div>
							<Home />
							<Create />
							<Contracts />
						</div>
					) : (
						<Connect />
					)}
				</WagmiConfig>
			</div>
		</div>
	)
}
