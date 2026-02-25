const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

const myLogger = function (req, res, next) {
	console.log(`Logged ${req.method} ${req.url}`);
	next();
}

app.use(myLogger);

const expenses = [
    {id: 1, category: 'eat', amount: 50, date: '2026-02-25'},
    {id: 2, category: 'fun', amount: 100, date: '2026-02-25'},
];

app.get('/', function(req, res) {
    res.send('Hello Budget Planner!');
})

app.get('/expenses', function(req, res) {
    res.json(expenses);
})

app.get('/expenses/:id', function(req, res) {
    const id = parseInt(req.params.id);
    const expense = expenses.find(e => e.id === id);

    if(!expense) {
        return res.status(404).json({ error: "Expense with that ID - not found!"})
    }

    res.json(expense);
})

app.post('/addExpense', function(req, res) {
    const { category, amount, date } = req.body;

    const newExpense = {
        id: expenses.length + 1,
        category,
        amount,
        date
    }

    expenses.push(newExpense);
    res.status(201).json(newExpense);
})

app.put('/expenses/:id', function(req, res) {
    const id = parseInt(req.params.id);
    const { category, amount, date } = req.body;

    const expenseIndex = expenses.findIndex(e => e.id === id);

    if (expenseIndex === -1) {
        return res.status(404).json({ error: "No expense found to edit" });
    }

    expenses[expenseIndex] = {
        ...expenses[expenseIndex],
        category: category || expenses[expenseIndex].category,
        amount: amount || expenses[expenseIndex].amount,
        date: date || expenses[expenseIndex].date
    };

    res.json({ message: "Expense updated", data: expenses[expenseIndex] });
});

app.delete('/expenses/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = expenses.findIndex(e => e.id === id);

    if (index === -1) {
        return res.status(404).json({ error: "There is nothing to delete, no ID" });
    }

    expenses.splice(index, 1);
    res.json({ message: "Expense deleted successfully" });
});

app.get('/expenses/filter/:category', (req, res) => {
    const category = req.params.category.toLowerCase();
    const filtered = expenses.filter(e => e.category.toLowerCase() === category);
    res.json(filtered);
});

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.json({
        error: err.message,
        text: "stupid Flanders!"
    });
})

app.listen(PORT, () => {
    console.log(`Budget API works on http://locahlost:${PORT}`);
})
