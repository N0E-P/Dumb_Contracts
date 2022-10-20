import Head from "next/head"
import Link from "next/link"
import { ConnectButton } from "web3uikit"

export default function Contracts() {
	return (
		<div>
			<Head>
				<title>Your Contracts</title>
				<meta name="description" content="Your contracts" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<h1>Your Contracts</h1>
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
				<h3 className="py-4">Contracts en cours</h3>
				<h3 className="py-4">Contracts que l’on vous propose</h3>
				<h3 className="py-4">Contracts que vous avez proposé</h3>
			</div>
		</div>
	)
}
