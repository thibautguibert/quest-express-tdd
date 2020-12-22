const router = require('express').Router();
const bookmarksRoutes = require('./bookmarks.routes');

router.get('/', (req, res) => {
    res.status(200).json({
        message: "Hello World!"
    });
})

router.use("/bookmarks", bookmarksRoutes)


module.exports = router;