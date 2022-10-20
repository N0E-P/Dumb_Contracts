import Head from "next/head"
import Link from "next/link"
import { ConnectButton } from "web3uikit"

export default function Home() {
	return (
		<div>
			<Head>
				<title>Dumb Contracts</title>
				<meta name="description" content="Home" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<h1>Dumb Contracts</h1>
			<div className="p-4 flex">
				<Link href="/">
					<button>Home</button>
				</Link>
				<div className="mx-4">
					<Link href="/create">
						<button>Create a contract</button>
					</Link>
				</div>
				<div className="mx-4">
					<Link href="/contracts">
						<button>Your contracts</button>
					</Link>
				</div>
				<ConnectButton moralisAuth={false} />
			</div>
			<div className="p-4">
				Créer des contracts entre deux personnes de manière decentralisés et assuré avec un
				collatéral.
			</div>
		</div>
	)
}
