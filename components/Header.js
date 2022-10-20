import Link from "next/link"
import { ConnectButton } from "web3uikit"

export default function Header() {
	return (
		<div>
			<h1>Dumb Contracts</h1>
			<div className="p-4 flex justify-center">
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
		</div>
	)
}
