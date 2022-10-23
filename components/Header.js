import Link from "next/link"
import { useAccount, useConnect, useDisconnect } from "wagmi"
import { InjectedConnector } from "wagmi/connectors/injected"

export default function Header() {
	const { isConnected } = useAccount()
	const { connect } = useConnect({
		connector: new InjectedConnector(),
	})
	const { disconnect } = useDisconnect()

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
				<div>
					{isConnected ? (
						<button onClick={() => disconnect()}>Connected</button>
					) : (
						<button onClick={() => connect()}>Connect</button>
					)}
				</div>
			</div>
		</div>
	)
}
