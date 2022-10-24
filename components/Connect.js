import { useConnect } from "wagmi"
import { InjectedConnector } from "wagmi/connectors/injected"

export default function Connect() {
	const { connect } = useConnect({
		connector: new InjectedConnector(),
	})

	return (
		<div>
			<div className="p-4 flex justify-center">
				<img className="mx-4" src={"nft-logo.png"} width="60px" height="60px" />
				<h1 className="mx-4">Dumb Contracts</h1>
			</div>
			<h3>Connect you to use the Dapp</h3>
			<button onClick={() => connect()}>
				<h4>Connect</h4>
			</button>
		</div>
	)
}
