import Head from "next/head"
import Link from "next/link"
import { ConnectButton, Form } from "web3uikit"

export default function Create() {
	return (
		<div>
			<Head>
				<title>Create a Contract</title>
				<meta name="description" content="Create a contract" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<h1>Create a Contract</h1>
			<div className="p-4 flex">
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
			<div className="p-4">
				<h3>Formulaire à remplir</h3>
				<Form
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
					title="hola"
					id="form"
				/>
			</div>
		</div>
	)
}
