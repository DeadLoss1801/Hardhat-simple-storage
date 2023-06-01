const { assert, expect } = require("chai")
const { ethers } = require("hardhat")
const {
    isCallTrace,
} = require("hardhat/internal/hardhat-network/stack-traces/message-trace")

describe("SimpleStorage", () => {
    let SimpleStorageFactory, SimpleStorage
    beforeEach(async function () {
        SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
        SimpleStorage = await SimpleStorageFactory.deploy()
    })

    it("Should start with a favourite Number of 0", async function () {
        const currentValue = await SimpleStorage.retrieve()
        const expectedValue = "0"
        //assert
        assert.equal(currentValue.toString(), expectedValue)
    })

    it("Should update when we call store", async function () {
        const expectedValue = "7"
        const transactionResponse = await SimpleStorage.store(expectedValue)
        await transactionResponse.wait(1)

        const currentValue = await SimpleStorage.retrieve()

        assert.equal(currentValue.toString(), expectedValue)
        // expect(expectedValue).to.equal(currentValue.toString());
    })
})
