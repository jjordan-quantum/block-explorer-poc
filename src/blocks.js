exports.Blocks = (function() {
    const {Logger} = require('./logger');
    const blocks = {};
    let lock = false;
    let paused = false;
    let startBlockNumber = undefined;
    let maxBlockNumber = undefined;

    const pause = () => {
        paused = true;
    }

    const unpause = () => {
        paused = false;
    }

    const getStartBlockNumber = () => {
        return startBlockNumber;
    }

    const getMaxBlockNumber = () => {
        return maxBlockNumber;
    }

    const clear = () => {
        lock = true;
        startBlockNumber = undefined;
        maxBlockNumber = undefined;

        for(const blockNumber of Object.keys(blocks)) {
            delete blocks[blockNumber];
        }

        lock = false;
    }

    const getBlock = (blockNumber) => {
        return blocks[blockNumber];
    }

    const addBlock = (block) => {
        if(!paused && !lock && block) {
            const blockNumber = block.number;

            if(!blocks[blockNumber]) {
                Logger.info(`Adding block ${blockNumber}`);

                if(!startBlockNumber) {
                    startBlockNumber = blockNumber;
                }

                if(!maxBlockNumber || blockNumber > maxBlockNumber) {
                    maxBlockNumber = blockNumber;
                }

                blocks[blockNumber] = block;
            }

            return {success: true}
        }

        return {success: false}
    }

    return {
        pause,
        unpause,
        clear,
        getBlock,
        addBlock,
        getStartBlockNumber,
        getMaxBlockNumber,
    };
})();
