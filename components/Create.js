import * as React from "react"
import { ethers } from "ethers"
import { usePrepareContractWrite, useContractWrite, useWaitForTransaction } from "wagmi"

import contractABI from "../contract/ABI.json"
const contractAddress = require("../contract/ADDRESS.json")["goerli"][0]

export default function Create() {
	const [_name, setName] = React.useState("")
	const [_text, setText] = React.useState("")
	const [_user2, setUser2] = React.useState("")
	const [_ETHcollateral, setCollateral] = React.useState("0.01")
	const [_ETHamountFromUser1ToUser2, setAmountFromUser1ToUser2] = React.useState("0")
	const [_ETHamountFromUser2ToUser1, setAmountFromUser2ToUser1] = React.useState("0")

	let _collateral = ethers.utils.parseEther(_ETHcollateral).toString
	let _amountFromUser1ToUser2 = ethers.utils.parseEther(_ETHamountFromUser1ToUser2).toString
	let _amountFromUser2ToUser1 = ethers.utils.parseEther(_ETHamountFromUser2ToUser1).toString
	let priceToPay = ethers.utils.parseEther(_ETHcollateral + _ETHamountFromUser1ToUser2).toString

	console.log(_ETHcollateral)
	console.log(_collateral)
	console.log(priceToPay)

	const {
		config,
		error: prepareError,
		isError: isPrepareError,
	} = usePrepareContractWrite({
		address: contractAddress,
		abi: contractABI,
		functionName: "createAContract",
		overrides: {
			value: priceToPay,
		},
		args: [_name, _text, _user2, _collateral, _amountFromUser1ToUser2, _amountFromUser2ToUser1],
		onSuccess() {
			console.log("usePrepareContractWrite done")
		},
		onError(error) {
			console.log(error)
		},
	})

	const { data, error, isError, write } = useContractWrite(config)

	const { isLoading, isSuccess } = useWaitForTransaction({
		hash: data?.hash,
	})

	return (
		<div>
			<h2>Create a Dumb Contract</h2>
			<form
				onSubmit={(e) => {
					e.preventDefault()
					write?.()
				}}
			>
				<div>
					<label for="Name">
						<h4>Contract name: </h4>
					</label>
					<input
						id="Name"
						onChange={(e) => setName(e.target.value)}
						placeholder="My Dumb Contract"
						value={_name}
					/>
				</div>
				<div>
					<label for="Text">
						<h4>What it does: </h4>
					</label>
					<input
						id="Text"
						onChange={(e) => setText(e.target.value)}
						placeholder="Pay Patrick for his service"
						value={_text}
					/>
				</div>
				<div>
					<label for="User2">
						<h4>Second User Ethereum address: </h4>
					</label>
					<input
						id="User2"
						onChange={(e) => setUser2(e.target.value)}
						placeholder="0x21a2...357e4"
						value={_user2}
					/>
				</div>
				<div>
					<label for="Collateral">
						<h4>Collateral in ETH: </h4>
					</label>
					<input
						id="Collateral"
						onChange={(e) => setCollateral(e.target.value)}
						placeholder=" > 0.01"
						value={_ETHcollateral}
					/>
				</div>
				<div>
					<label for="AmountFromUser1ToUser2">
						<h4>ETH you will give to the Second User: </h4>
					</label>
					<input
						id="AmountFromUser1ToUser2"
						onChange={(e) => setAmountFromUser1ToUser2(e.target.value)}
						placeholder="0"
						value={_ETHamountFromUser1ToUser2}
					/>
				</div>
				<div>
					<label for="AmountFromUser2ToUser1">
						<h4>ETH the Second User will give you: </h4>
					</label>
					<input
						id="AmountFromUser2ToUser1"
						onChange={(e) => setAmountFromUser2ToUser1(e.target.value)}
						placeholder="0"
						value={_ETHamountFromUser2ToUser1}
					/>
				</div>
				<button disabled={!write || isLoading}>
					{isLoading ? "Creating The Contract..." : "Create Your Contract"}
				</button>
				{isSuccess && (
					<div>
						Successfully created your Dumb Contract!
						<div>
							<a href={`https://etherscan.io/tx/${data?.hash}`}>Etherscan</a>
						</div>
					</div>
				)}
				{(isPrepareError || isError) && (
					<div>Error: {(prepareError || error)?.message}</div>
				)}
			</form>
		</div>
	)
}
