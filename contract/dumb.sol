// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

error dumb__YouCannotCreateAContractWithYourself();
error dumb__GiveMeMoreMoney();
error dumb__YouNeedToBeThe2ndParticipantOfTheContract();
error dumb__YouHaveAlreadyChooseToAcceptOrRefuseTheContract();
error dumb__YourAreNotAUserOfTheContract();
error dumb__TheStateOfTheContractNeedToBeOngoingORDisputed();
error dumb__ChoiceHasToBeOneOf_complete_abandon_dispute();
error dumb__YourCollateralNeedToBeAbove0Point01ETH();
error dumb__ThereIsNoMoneyForYou();

contract dumb {
	uint256 numberOfContracts = 0;

	struct Contract {
		uint256 contractNumber;
		string name; //name of the contract
		string text; //description of what is the contract
		string state; // It can be : suggested / rejected / ongoing / completed / abandoned / disputed
		uint256 collateral; //have to be given by the 2 users (written in wei)
		address payable user1; //creator
		address payable user2; //2nd user
		uint256 amountFromUser1ToUser2; //written in wei
		uint256 amountFromUser2ToUser1; //written in wei
		string opinionUser1; // It can be : complete / abandon / dispute
		string opinionUser2; // It can be : complete / abandon / dispute
		uint256 moneyForUser1; //written in wei
		uint256 moneyForUser2; //written in wei
	}

	mapping(uint256 => Contract) contractList;

	function createAContract(
		string memory _name,
		string memory _text,
		address payable _user2,
		uint256 _collateral,
		uint256 _amountFromUser1ToUser2,
		uint256 _amountFromUser2ToUser1
	) external payable {
		//check if the user enter his own address in "user2"
		if (msg.sender == _user2) {
			revert dumb__YouCannotCreateAContractWithYourself();
		}

		//check if the collateral is above 0.01 ETH
		if (_collateral < 10000000000000000) {
			revert dumb__YourCollateralNeedToBeAbove0Point01ETH();
		}

		//check if the user send enough money
		if (msg.value < _collateral + _amountFromUser1ToUser2) {
			revert dumb__GiveMeMoreMoney();
		}

		//add the contract in the mapping using the struct object
		numberOfContracts = numberOfContracts + 1;
		contractList[numberOfContracts] = Contract(
			numberOfContracts,
			_name,
			_text,
			"suggested",
			_collateral,
			payable(msg.sender),
			_user2,
			_amountFromUser1ToUser2,
			_amountFromUser2ToUser1,
			"none",
			"none",
			0,
			0
		);
	}

	function refuseOrAcceptAContract(uint256 _contractNumber, bool _choice) external payable {
		//the person have to be the user2 of the contract
		if (msg.sender != contractList[_contractNumber].user2) {
			revert dumb__YouNeedToBeThe2ndParticipantOfTheContract();
		}

		//the contract have to be in the state "suggested"
		if (keccak256(abi.encode(contractList[_contractNumber].state)) != "suggested") {
			revert dumb__YouHaveAlreadyChooseToAcceptOrRefuseTheContract();
		}

		//if the contract has been rejected
		if (_choice = false) {
			//note the money due
			contractList[_contractNumber].moneyForUser1 =
				contractList[_contractNumber].collateral +
				contractList[_contractNumber].amountFromUser1ToUser2;

			//change the contract state
			contractList[_contractNumber].state = "rejected";
			return;
		}

		//if the contract has been accepted
		//user2 have to give enough ETH
		if (
			msg.value <
			contractList[_contractNumber].collateral +
				contractList[_contractNumber].amountFromUser2ToUser1
		) {
			revert dumb__GiveMeMoreMoney();
		}

		//change the state of the contract
		contractList[_contractNumber].state = "ongoing";
	}

	function withdrawYourMoney(uint256 _contractNumber) external payable {
		//user1
		if (msg.sender == contractList[_contractNumber].user1) {
			//Verify if there is money for this user
			if (contractList[_contractNumber].moneyForUser1 == 0) {
				revert dumb__ThereIsNoMoneyForYou();
			}

			//store the money due
			uint256 money1 = contractList[_contractNumber].moneyForUser1;

			//change the amount in the moneyForUser1 variable
			contractList[_contractNumber].moneyForUser1 = 0;

			//tranfer the funds
			contractList[_contractNumber].user1.transfer(money1);
			return;
		}

		//user2
		if (msg.sender == contractList[_contractNumber].user2) {
			//Verify if there is money for this user
			if (contractList[_contractNumber].moneyForUser2 == 0) {
				revert dumb__ThereIsNoMoneyForYou();
			}

			//store the money due
			uint256 money2 = contractList[_contractNumber].moneyForUser2;

			//change the amount in the moneyForUser1 variable
			contractList[_contractNumber].moneyForUser2 = 0;

			//tranfer the funds
			contractList[_contractNumber].user2.transfer(money2);
			return;
		}

		//if he isn't a contract user
		revert dumb__YourAreNotAUserOfTheContract();
	}

	function setYourOpinion(uint256 _contractNumber, string memory _choice) external {
		//The state of the contract need to be ongoing or disputed
		if (
			keccak256(abi.encode(contractList[_contractNumber].state)) != "ongoing" ||
			keccak256(abi.encode(contractList[_contractNumber].state)) != "disputed"
		) {
			revert dumb__TheStateOfTheContractNeedToBeOngoingORDisputed();
		}

		//verify if it is one of the users of the contract calling this function
		if (
			(msg.sender != contractList[_contractNumber].user1) ||
			(msg.sender != contractList[_contractNumber].user2)
		) {
			revert dumb__YourAreNotAUserOfTheContract();
		}

		//dispute (Will be improved later)
		if (keccak256(abi.encode(_choice)) == "dispute") {
			//user1
			if (msg.sender == contractList[_contractNumber].user1) {
				contractList[_contractNumber].opinionUser1 = "dispute";

				//user2
			} else {
				contractList[_contractNumber].opinionUser2 = "dispute";
			}

			//change the contract state
			contractList[_contractNumber].state = "disputed";
			return;
		}

		//choice has to be "complete" or "abandon"
		if (
			keccak256(abi.encode(_choice)) != "complete" ||
			keccak256(abi.encode(_choice)) != "abandon"
		) {
			revert dumb__ChoiceHasToBeOneOf_complete_abandon_dispute();
		}

		//user1
		if (msg.sender == contractList[_contractNumber].user1) {
			contractList[_contractNumber].opinionUser1 = _choice;

			//user2
		} else {
			contractList[_contractNumber].opinionUser2 = _choice;
		}

		//store the amount due
		uint256 amount1 = contractList[_contractNumber].collateral +
			contractList[_contractNumber].amountFromUser2ToUser1;
		uint256 amount2 = contractList[_contractNumber].collateral +
			contractList[_contractNumber].amountFromUser1ToUser2;

		//check if the 2 decide to set it as complete
		if (
			keccak256(abi.encode(contractList[_contractNumber].opinionUser1)) == "complete" &&
			keccak256(abi.encode(contractList[_contractNumber].opinionUser2)) == "complete"
		) {
			//note the money due
			contractList[_contractNumber].moneyForUser1 = amount1;
			contractList[_contractNumber].moneyForUser2 = amount2;

			//change the contract state
			contractList[_contractNumber].state = "completed";
		}

		//check if the 2 decide to abandon
		if (
			keccak256(abi.encode(contractList[_contractNumber].opinionUser1)) == "abandon" &&
			keccak256(abi.encode(contractList[_contractNumber].opinionUser2)) == "abandon"
		) {
			//note the money due
			contractList[_contractNumber].moneyForUser1 = amount2;
			contractList[_contractNumber].moneyForUser2 = amount1;

			//change the contract state
			contractList[_contractNumber].state = "abandoned";
		}
	}

	function getNumberOfContracts() external view returns (uint256) {
		return numberOfContracts;
	}

	function getContractInformations(uint256 _contractNumber)
		external
		view
		returns (Contract memory)
	{
		return contractList[_contractNumber];
	}
}
