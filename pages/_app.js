import "../styles/globals.css"
import Header from "../components/Header"
import Head from "next/head"

import { WagmiConfig, createClient } from "wagmi"
import { getDefaultProvider } from "ethers"

const client = createClient({
	autoConnect: true,
	provider: getDefaultProvider(),
})

export default function MyApp({ Component, pageProps }) {
	return (
		<div>
			<Head>
				<title>Dumb Contracts</title>
				<meta name="description" content="Dumb Contracts" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<WagmiConfig client={client}>
				<Header />
				<Component {...pageProps} />
			</WagmiConfig>
		</div>
	)
}
