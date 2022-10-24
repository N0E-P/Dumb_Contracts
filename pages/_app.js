import "../styles/globals.css"
import { WagmiConfig, createClient } from "wagmi"
import { getDefaultProvider } from "ethers"
import Head from "next/head"

const client = createClient({
	autoConnect: true,
	provider: getDefaultProvider(),
})

export default function app({ Component, pageProps }) {
	return (
		<div>
			<Head>
				<title>Dumb Contracts</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<body>
				<WagmiConfig client={client}>
					<Component {...pageProps} />
				</WagmiConfig>
			</body>
		</div>
	)
}
