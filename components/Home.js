import { useDisconnect } from "wagmi"

export default function Home() {
	const { disconnect } = useDisconnect()

	return (
		<div>
			<div className="p-4 flex justify-center">
				<div className="m-4">*logo*</div>
				<h1 className="mx-4">Dumb Contracts</h1>
				<button className="mx-4" onClick={() => disconnect()}>
					Disconnect
				</button>
			</div>
			Create contracts between two people in a decentralized and secured way with a
			collateral.
		</div>
	)
}
