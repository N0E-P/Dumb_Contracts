import { useDisconnect } from "wagmi"

export default function Home() {
	const { disconnect } = useDisconnect()

	return (
		<div>
			<div className="p-4 flex justify-center">
				<img className="mx-4" src={"nft-logo.png"} width="60px" height="60px" />
				<h1 className="mx-4">Dumb Contracts</h1>
				<button className="mx-4" onClick={() => disconnect()}>
					<h4>Disconnect</h4>
				</button>
			</div>
			<h4>Create decentralized and secured contracts between peoples.</h4>
		</div>
	)
}
