import * as React from "react"
import { ethers } from "ethers"
import { usePrepareContractWrite, useContractWrite, useWaitForTransaction } from "wagmi"

import contractABI from "../contract/ABI.json"
const contractAddress = require("../contract/ADDRESS.json")["goerli"][0]

export default function Create() {
	const [tokenId, setTokenId] = React.useState("")
	/*VARIABLES*/

	const { config } = usePrepareContractWrite({
		address: contractAddress,
		abi: contractABI,
		functionName: "createAContract",
		chainId: "5",
		overrides: {
			value: ethers.utils.parseEther("1" /*VARIABLES.toString*/),
		},
		args: [tokenId /*VARIABLES*/],
		onSuccess() {
			console.log("usePrepareContractWrite done")
		},
		onError(error) {
			console.log("Error", error)
		},
	})

	const { data, isLoading, isSuccess, write } = useContractWrite(config)

	return (
		<div>
			<h2>Create a Contract</h2>
			<form
				onSubmit={(e) => {
					e.preventDefault()
					write?.()
				}}
			>
				<label for="tokenId">Token ID</label>
				<input
					id="tokenId"
					onChange={(e) => setTokenId(e.target.value)}
					placeholder="420"
					value={tokenId}
				/>

				<button disabled={!write} onClick={() => write?.()}>
					Create Your Contract
				</button>
			</form>
		</div>
	)
}
