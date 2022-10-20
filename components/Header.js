import Link from "next/link"
import { ConnectButton } from "web3uikit"

export default function Header() {
	return (
		<div>
			<div className="p-4 flex justify-center">
				<div className="mx-4">
					<Link href="/">
						<div className="flex">
							<div className="m-4">*logo*</div>
							<h1 className="mx-4">Dumb Contracts</h1>
						</div>
					</Link>
				</div>
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
