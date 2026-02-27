const validateExpense = function(req, res, next) {
    const { category, amount, date } = req.body;

    if(!category || typeof category !== 'string' || category.trim() === '') {
        return res.status(400).json({ 
            error: "Category is required and must be string type."
        });
    }

    if (!amount || typeof amount !== 'number' || amount <= 0) {
        return res.status(400).json({ 
            error: "Amount is required and must be greater than 0."
        });
    }

    if (!date || typeof date !== 'string' ) {
        return res.status(400).json({
            error: "Please select correct date"
        });
    }

    if (date.trim() === '') {
        req.body.date = new Date().toISOString().split('T')[0];
    }

    next();
}

module.exports = validateExpense;