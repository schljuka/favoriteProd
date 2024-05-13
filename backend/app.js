const express = require('express');
const app = express();
const cors = require('cors'); // Importovanje cors modula

const cookieParser = require('cookie-parser')
const bodyparser = require('body-parser')
const fileUpload = require('express-fileupload')
const dotenv = require('dotenv');
const path = require('path')

const errorMiddleware = require('./middlewares/errors')

// Postavljanje config fajla
dotenv.config({ path: 'backend/config/config.env' });

app.use(express.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(fileUpload());

// Omogućavanje CORS politike za sve origin-e
app.use(cors());

// Importovanje ruta
const products = require('./routes/product');
const auth = require('./routes/auth');
const order = require('./routes/order');

app.use('/api', products);
app.use('/api', auth);
app.use('/api', order);

if (process.env.NODE_ENV === 'PRODUCTION') {
    app.use(express.static(path.join(__dirname, '../frontend/build')));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'));
    });
}
app.get('/test', (req, res) => {
    console.log(req.cookies); // Check if cookies are being parsed correctly
    res.send('Cookies logged in console');
  });
// Middleware za rukovanje greškama
app.use(errorMiddleware);

module.exports = app;
