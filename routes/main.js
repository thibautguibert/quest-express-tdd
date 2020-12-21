const router = require('express').Router();
const { connection } = require('../connection');

router.get('/', (req, res) => {
    res.status(200).json({
        message: "Hello World!"
    });
})


module.exports = router;