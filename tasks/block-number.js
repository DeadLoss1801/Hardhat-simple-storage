const { task } = require("hardhat/config")

task("block-number", "Prints the current blocknumber").setAction(
    async (taskArgs, hre) => {
        const blockNumber = await hre.ethers.provider.getBlockNumber()
        console.log(`Current blocknumber: ${blockNumber}`)
    }
)
