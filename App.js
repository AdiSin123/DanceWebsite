const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();
const port = 8000;

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')); // For serving static files
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies

// PUG SPECIFIC STUFF
app.set('view engine', 'pug'); // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')); // Set the views directory

// ENDPOINTS
app.get('/', (req, res) => {
    const params = {};
    res.status(200).render('index.pug', params);
});

app.get('/contact', (req, res) => {
    const params = {};
    res.status(200).render('contact.pug', params);
});

// START THE SERVER
app.listen(port, () => {
    console.log(`The application started successfully on port ${port}`);
});

// MONGODB CONNECTION AND MODEL
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/contactDance', { useNewUrlParser: true, useUnifiedTopology: true });

const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String
});

const contactModel = mongoose.model('contactModel', contactSchema);

app.post('/contact', (req, res) => {
    var myData = new contactModel(req.body);
    myData
      .save()
      .then(() => {
        res.render('contact.pug', { responseMessage: 'This item has been saved to the database' });
      })
      .catch(() => {
        res.status(400).send('Item was not saved to the database');
      });
});
