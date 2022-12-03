exports.Client = (function() {
    const Web3 = require("web3");
    let web3 = undefined;

    const updateProvider = (providerUrl) => {
        web3 = new Web3(providerUrl);
    }

    const getBlock = async (number) => {
        if(number && web3) {
            return await web3.eth.getBlock(number, true);
        }

        return undefined;
    }

    const getBlockNumber = async () => {
        if(web3) {
            return await web3.eth.getBlockNumber();
        }

        return undefined;
    }

    return {
        getBlock,
        getBlockNumber,
        updateProvider,
    }
})();
