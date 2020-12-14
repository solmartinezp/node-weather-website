const path= require('path');
const express= require('express');
const app= express();
const hbs= require('hbs');
const geocode= require('./utils/geocode');
const forecast= require('./utils/forecast');


//Define paths for Express config
const publicDirectoryPath= path.join(__dirname, '../public');
const viewPath= path.join(__dirname, '../templates/views'); //Cambio el nombre de views
const partialsPath= path.join(__dirname, '../templates/partials');

// Setup static directory to serve
app.use(express.static(publicDirectoryPath)); // sube todo lo que esté en el directorio public

// Setup handlebars and views location
app.set('view engine', 'hbs'); //To tell express which template engine we're going to use
app.set('views', viewPath);
hbs.registerPartials(partialsPath);

app.get('/', (req, res)=> {
    res.render('index', {
        title: "Weather App",
        name: "Sol Martinez"
    });
});

app.get('/about', (req, res)=> {
    res.render('about', {
        title:"About",
        name: "Sol Martinez"
    });
})

app.get('/help', (req, res)=> {
    res.render('help', {
        message: "Help Message",
        title: "Help",
        name: "Sol Martinez"
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "You must provide an address"
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location}= {})=> {
        if (error) {
            return res.send({error})
        }

        forecast(latitude, longitude, (error, forecastData)=> {
            if (error) {
                return res.send({error})
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })

});

app.get('/products', (req, res)=> {
    if (!req.query.search) {
        return res.send({
            error: "You must provide a search term"
        })
    }
    console.log(req.query);
    res.send({
        products: []
    })
})


//ERROR 404 PAGE

app.get('/help/*', (req, res)=> { //match anything after /help/ that hasn't been matched before
    res.render('error', {
        error: "Help article not found",
        title: "Error",
        name: "Sol Martinez"
    })
});

app.get('/*', (req, res)=> { //match anything thaht hasn't been matched before
    res.render('error', {
        error: "Page not found",
        title: "Error",
        name: "Sol Martinez"
    })
})

//Start server

app.listen(3000, ()=> {
    console.log('Server port 3000');
}) 
