const express = require('express');
const router = express.Router();
const validateExpense = require('../middlewares/validateExpense.js');
const db = require('../db/database.js');

router.get('/', function(req, res) {
    const sql = "SELECT * FROM expenses";
    db.all(sql, [], (err, rows) => {
        if (err) {
            return next(err);
        }
        res.json(rows);
    });
})

router.get('/:id', function(req, res)  {
    const id = req.params.id;
    const sql = "SELECT * FROM expenses WHERE id = ?";

    db.get(sql, [id], function(err, row) {
        if (err) {
            return next(err);
        }

        if (!row) {
            return res.status(404).json({ 
                error: "Expense not found!" 
            });
        }
        res.json(row);
    });
});

router.post('/', validateExpense, function(req, res) {
    const { category, amount, date } = req.body;
    const sql = `INSERT INTO expenses(category, amount, date) VALUES(?, ?, ?)`;
    const params = [category, amount, date];

    db.run(sql, params, function(err) {
        if(err) {
            return next(err);
        }

        const newExpense = {
            id: this.lastID,
            category,
            amount,
            date
        };

        res.status(201).json({
            message: "Expense added successfully!",
            data: newExpense
        });
    }); 
});

router.put('/:id', validateExpense, function(req, res) {
    const id = parseInt(req.params.id);
    const { category, amount, date } = req.body;
    const sql = `UPDATE expenses
                 SET category = ?, amount = ?, date = ?
                 WHERE id = ?`;
    const params = [category, amount, date, id];

    db.run(sql, params, function(err) {
        if (err) {
            return next(err);
        }

        if (this.changes === 0) {
            return res.status(404).json({ 
                error: "No expense with this ID found." 
            });
        }

        res.json({
            message: "The expense has been updated!",
            data: { id, category, amount, date }
        });
    });
});

router.delete('/:id', function(req, res){
    const id = parseInt(req.params.id);
    const sql = `DELETE FROM expenses WHERE id = ?`

    db.run(sql, [id], function(err) {
        if(err) {
            return next(err);
        }

        if(this.changes === 0) {
            return res.status(404).json({
                error: "There is nothing to delete, no record found for this ID."
            });
        }

         res.status(200).json({
            message: "Expense deleted successfully!",
            deletedCount: this.changes
        });
    });
});

router.get('/filter/:category', function(req, res){
    const category = req.params.category;
    const sql = "SELECT * FROM expenses WHERE category LIKE ?"

    db.all(sql, [category], function(err, rows) {
        if(err){
            return next(err);
        }

        res.json(rows);
    });
});

module.exports = router;