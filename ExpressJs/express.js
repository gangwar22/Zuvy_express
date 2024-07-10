import express from 'express';
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));

// Serve the HTML file
app.get('/', (req, res) => {
    res.send('Hello')
});

// Handle form submission and calculate BMI
app.post('/BMI_Calculator', (req, res) => {
    console.log('recived data -',req.body);

    const weightNum = parseFloat(req.body.weight);
    const heightNum = parseFloat(req.body.height);
    const bmi = weightNum / (heightNum * heightNum);

    res.send(`Your BMI is ${bmi}`);
});

app.listen(port, () => {
    console.log(`BMI Calculator app listening at http://localhost:${port}`);
});