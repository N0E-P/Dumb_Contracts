import Head from "next/head";
import Link from "next/link";

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
      </div>
      <div className="p-4">
        <h3>Formulaire à remplir</h3>
        <div>Nom du contrat</div>
        <div>Texte expliquant le contract que l’on veut créer</div>
        <div>Addresse ou ENS name de la 2nd personne</div>
        <div>Collateral mis par chacunes des 2 personnes</div>
        <div>Une fois le contract validé :</div>
        <div className="px-3">vous récupérez chacuns vos collatéraux</div>
        <div className="px-3">? montant que vous donner a personne 2</div>
        <div className="px-3">? montant que personne 2 vous donnera</div>
        <div className="px-3">
          (l’argent donné et le collateral doit être payé sur le smart contract
          dès sa création)
        </div>
      </div>
    </div>
  );
}
