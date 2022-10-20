import "../styles/globals.css"
import { MoralisProvider } from "react-moralis"
import Header from "../components/Header"
import Head from "next/head"
import { NotificationProvider } from "web3uikit"

export default function MyApp({ Component, pageProps }) {
	return (
		<div>
			<Head>
				<title>Dumb Contracts</title>
				<meta name="description" content="Dumb Contracts" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<MoralisProvider initializeOnMount={false}>
				<NotificationProvider>
					<Header />
					<Component {...pageProps} />
				</NotificationProvider>
			</MoralisProvider>
		</div>
	)
}
