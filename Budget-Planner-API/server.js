const express = require('express');

// midlewares import
const myErrorHandler = require('./middlewares/errorHandler');
const myRequestLogger = require('./middlewares/logger');

// routes import
const indexRoutes = require('./routes/index');
const indexExpenses = require('./routes/expenses');

const app = express();
const PORT = 3000;

app.use(myRequestLogger);
app.use(express.json());

app.use('/', indexRoutes);
app.use('/expenses', indexExpenses);

app.use(myErrorHandler);

app.listen(PORT, () => {
    console.log(`Budget API works on http://localhost:${PORT}`);
})
