import Connect from "../components/Connect"
import Home from "../components/Home"
import Create from "../components/Create"
import Contracts from "../components/Contracts"
import { useAccount } from "wagmi"

export default function Index() {
	const { isConnected } = useAccount()

	return (
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
	)
}
