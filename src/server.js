exports.Server = (function() {
    const express = require('express');
    const bodyParser = require('body-parser');
    const {settings} = require('./settings');
    const {Scanner} = require('./scanner');
    const {Logger} = require('./logger');
    const port = settings.port;
    const app = express();
    app.use(express.static('./public'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    const router = express.Router();
    Scanner.updateProvider({providerUrl: settings.providerUrl}).then();

    router.use(function(req, res, next) {
        next();
    });

    // SCANNER REQUESTS
    //==================================================================================================================

    router.post('/getLatestBlockNumber', async function(req, res) {
        const result = await Scanner.getLatestBlockNumber();
        res.json({ message: {...result}});
    });

    router.post('/getStartBlockNumber', async function(req, res) {
        const result = await Scanner.getStartBlockNumber();
        res.json({ message: {...result}});
    });

    router.post('/getBlock', async function(req, res) {
        const result = await Scanner.getBlock({...req.body});
        res.json({ message: {...result}});
    });

    router.post('/updateProvider', async function(req, res) {
        const result = await Scanner.updateProvider({...req.body});
        res.json({ message: {...result}});
    });

    // REGISTER OUR ROUTES -------------------------------
    app.use('/scanner', router);

    app.listen(port, () => {
        Logger.info("Starting server");
        Logger.info("Listening on port: " + port);
    });

    return {};
})();
