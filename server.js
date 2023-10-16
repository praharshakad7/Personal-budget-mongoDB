const express = require('express');
const mongo = require('mongoose');
const app = express();
const port = 3000;
const fs = require('fs');
const dataSchema = require('./mongoSchema');




// Serve static files
app.use(express.static(__dirname));
app.use('/', express.static('public'));
// use json parser
app.use(express.json());


// Connect to mongo
const url = 'mongodb://127.0.0.1:27017/Data';
mongo.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected successfully to MongoDB.'))
    .catch((err) => console.log(err));

const dataModel = mongo.model('data', dataSchema);

// Endpoint to serve budget.json
// app.get('/budget', (req, res) => {
//     fs.readFile('budget.json', 'utf8', (err, data) => {
//         if (err) {
//             res.status(500).send('Error reading budget.json');
//             return;
//         }
//         res.send(JSON.parse(data));
//     });
// });

app.post('/postBudget', async (req, res) => {
    const {title,budget,color}=req.body;
    const recievedData={ 
       title,
       budget,
       color
    }
    try {
      const newData = new dataModel(recievedData);
      await newData.save();
      res.status(201).json(newData);
    } catch (err) {
      res.json({ "Title":"encountered an error","Message": err.message });
    }
  });
app.get('/budget', async (req, res) => {
    try {
      const budgetData = await dataModel.find();
      res.status(201).json({"myBudget":budgetData});
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
});


app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});
