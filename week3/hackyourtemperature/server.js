const express = require('express');
const exphbs = require('express-handlebars');
const axios = require('axios');
const API_KEY = require('./sources/keys.json').API_KEY;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'handlebars');
app.engine('handlebars', exphbs({ defaultLayout: false }));

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/weather', async (req, res) => {
    const cityName = req.body.cityName;
    const temperature = await getTemperature(cityName);
    if (cityName.length === 0) {
        res.status(404).render('index', { result: 'Please enter a city name.' });
        return;
    }
    else if (temperature === undefined) {
        res.status(404).render('index', { result: 'Can not fetch data!' });
        return;
    }
    else {
        res.status(200).render('index', {
            weatherText: `The temperature in ${cityName} is ${temperature} °C!`,
        });
    }
});

const getTemperature = async (cityName) => {
    let returnValue;
    try {
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&APPID=${API_KEY}`,
        );
        returnValue = response.data.main.temp.toFixed(0);
    } catch (error) { }

    return returnValue;
};

app.listen(3000);
