exports.Scanner = (function() {
    const {Blocks} = require('./blocks');
    const {Client} = require('./client');
    const {Logger} = require('./logger');
    let paused = false;

    const getLatestBlockNumber = async () => {
        const latest = Blocks.getMaxBlockNumber();

        return {
            success: !!latest,
            blockNumber: latest || -1
        }
    }

    const getStartBlockNumber = async () => {
        const start = Blocks.getStartBlockNumber();

        return {
            success: !!start,
            blockNumber: start || -1
        }
    }

    const updateProvider = async (params) => {
        const providerUrl = params.providerUrl;
        paused = true;
        Blocks.pause();
        Client.updateProvider(providerUrl);
        Blocks.clear();
        Blocks.unpause();
        paused = false;
    }

    const getBlock = async (params) => {
        const blockNumber = params.blockNumber;
        const block = Blocks.getBlock(blockNumber);

        return {
            success: !!block,
            block: block || {}
        }
    }

    (async () => {
        while(true) {
            try {
                if(!paused) {
                    let latest = Blocks.getMaxBlockNumber();

                    if(!paused) {
                        if(!latest) {
                            latest = await Client.getBlockNumber();
                            Logger.info(`Latest block for provider: ${latest}`);
                            const block = await Client.getBlock(latest);

                            if(block && !paused) {
                                Blocks.addBlock({...block});
                            }
                        } else {
                            const block = await Client.getBlock(latest + 1);

                            if(block && !paused) {
                                Blocks.addBlock({...block});
                            }
                        }
                    }
                }
            } catch(e) {
                console.log(e);
            }

            await new Promise((resolve) => { setTimeout(resolve, 1000) });
        }
    })();

    return {
        getLatestBlockNumber,
        getStartBlockNumber,
        updateProvider,
        getBlock,
    }
})();
