// imports
const { ethers, network, run } = require("hardhat")
const { NomicLabsHardhatPluginError } = require("hardhat/plugins")
// async main
async function main() {
    const SimpleStorageFactory = await ethers.getContractFactory(
        "SimpleStorage"
    )

    console.log("deploying contract..............")
    const SimpleStorage = await SimpleStorageFactory.deploy()
    await SimpleStorage.deployed()

    console.log(`Deployed conntrat ${SimpleStorage.address}`)

    // -----verification the contract code
    console.log(network.config)
    if (network.config.chainId === 5 && process.env.ETHERSCAN_API_KEY) {
        await SimpleStorage.deployTransaction.wait(6)
        await verify(SimpleStorage.address, [])
    }

    const currentValue = await SimpleStorage.retrieve()
    console.log(`Current value is : ${currentValue}`)
    //update the value

    const transactionResponse = await SimpleStorage.store(7)
    await transactionResponse.wait(1)
    const updatedValue = await SimpleStorage.retrieve()
    console.log(`Updated Value is ${updatedValue}`)
}
async function verify(contractAddress, args) {
    try {
        console.log("Verifying Contract...")
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: args,
        })
    } catch (err) {
        if (err.message.toLowerCase().includes("already verified")) {
            console.log("Already verified!")
        } else {
            console.log(err)
        }
    }
}

//main

main()
    .then(() => process.exit(0))
    .catch((err) => {
        console.error(err)
        process.exit(1)
    })
