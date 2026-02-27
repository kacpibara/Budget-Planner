const validateExpense = function(req, res, next) {
    const { name, category, amount, date } = req.body;

    if(!name || typeof name !== 'string' || name.trim() === '') {
        return res.status(400).json({ error: "Name is required." });
    }
    if(!category || typeof category !== 'string' || category.trim() === '') {
        return res.status(400).json({ error: "Category is required." });
    }

    if (!amount || typeof amount !== 'number' || amount <= 0) {
        return res.status(400).json({ error: "Amount must be a positive number." });
    }

    if (!date || date.trim() === '') {
        req.body.date = new Date().toISOString().split('T')[0];
    } else if (typeof date !== 'string') {
        return res.status(400).json({ error: "Please select correct date format." });
    }

    next();
}

module.exports = validateExpense;