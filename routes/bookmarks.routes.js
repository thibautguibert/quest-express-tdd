const router = require("express").Router();
const connection = require("../connection");

router.post("/", (req, res) => {
    const { url, title } = req.body;
    if (!url || !title) {
        res.status(422).json({ error: "required field(s) missing" });
    } else {
        connection.query('INSERT INTO bookmark SET ?', req.body, (err, stats) => {
            if (err) return res.status(500).json({ error: err.message, sql: err.sql });

            connection.query('SELECT * FROM bookmark WHERE id = ?', stats.insertId, (err, records) => {
                if (err) return res.status(500).json({ error: err.message, sql: err.sql });
                return res.status(201).json(records[0]);
            });
        });
    }
});

router.get("/:id", (req, res) => {
    connection.query(
        "SELECT * from bookmark WHERE id=?",
        [req.params.id],
        (err, results) => {
            if (err) {
                res.status(500).send("Error retrieving data");
            } else if (results.length === 0) {
                res.status(404).json({ error: "Bookmark not found" })
            } else {
                res.status(200).json(results[0]);
            }
        })
});

module.exports = router;