import { useWeb3Contract } from "react-moralis"
import { Form, useNotification } from "web3uikit"

import contractABI from "../contract/ABI.json"
const contractAddress = require("../contract/ADDRESS.json")["goerli"][0]

export default function Create() {
	const { runContractFunction } = useWeb3Contract()
	const dispatch = useNotification()

	async function CreateContract(data) {
		console.log("Creating a new contract...")
		const name = data.data[0].inputResult
		const text = data.data[1].inputResult
		const user2 = data.data[2].inputResult
		const collateral = data.data[3].inputResult * 1000000000000000000
		const amountFromUser1ToUser2 = data.data[4].inputResult * 1000000000000000000
		const amountFromUser2ToUser1 = data.data[5].inputResult * 1000000000000000000

		const Options = {
			abi: contractABI,
			contractAddress: contractAddress,
			functionName: "createAContract",
			msgValue: collateral + amountFromUser1ToUser2,
			params: {
				_name: name,
				_text: text,
				_user2: user2,
				_collateral: collateral,
				_amountFromUser1ToUser2: amountFromUser1ToUser2,
				_amountFromUser2ToUser1: amountFromUser2ToUser1,
			},
		}

		await runContractFunction({
			params: Options,
			onSuccess: () => handleSuccess(),
			onError: (error) => {
				console.log(error)
			},
		})
	}

	async function handleSuccess() {
		console.log("Contract created!")
		dispatch({
			type: "success",
			message: "Contract Creation",
			title: "Your Dumb Contract has been created!",
			position: "topR",
		})
	}

	return (
		<div>
			<Form
				onSubmit={CreateContract}
				data={[
					{
						name: "Contract Name",
						type: "text",
						inputWidth: "100%",
						value: "",
						key: "name",
					},
					{
						name: "What does it do?",
						type: "text",
						inputWidth: "100%",
						value: "",
						key: "text",
					},
					{
						name: "Second User ETH address",
						type: "text",
						inputWidth: "100%",
						value: "",
						key: "user2",
					},
					{
						name: "Collateral > 0.01 ETH",
						type: "number",
						inputWidth: "100%",
						value: "",
						key: "collateral",
					},
					{
						name: "ETH you will give to the Second User",
						type: "number",
						inputWidth: "100%",
						value: "",
						key: "amountFromUser1ToUser2",
					},
					{
						name: "ETH the Second User will give you",
						type: "number",
						inputWidth: "100%",
						value: "",
						key: "amountFromUser2ToUser1",
					},
				]}
				title="Create a Dumb Contract"
				id="form"
			/>
		</div>
	)
}
