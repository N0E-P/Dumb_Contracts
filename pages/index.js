import Head from "next/head"
import Connect from "../components/Connect"
import Home from "../components/Home"
import Create from "../components/Create"
import Contracts from "../components/Contracts"
import { useAccount } from "wagmi"

export default function Index() {
	const { isConnected } = useAccount()

	return (
		<div>
			<Head>
				<title>Dumb Contracts</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div>
				{isConnected ? (
					<div>
						<Home />
						<Create />
						<Contracts />
					</div>
				) : (
					<Connect />
				)}
			</div>
		</div>
	)
}
