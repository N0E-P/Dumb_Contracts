import "../styles/globals.css"
import { WagmiConfig, createClient } from "wagmi"
import { getDefaultProvider } from "ethers"

const client = createClient({
	autoConnect: true,
	provider: getDefaultProvider(),
})

export default function app({ Component, pageProps }) {
	return (
		<div>
			<WagmiConfig client={client}>
				<Component {...pageProps} />
			</WagmiConfig>
		</div>
	)
}
