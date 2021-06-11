const express = require ('express')
const path = require('path')
const hbs = require('hbs')
const app = express()
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


//Define paths for public folder and handlebar files 
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to setup
app.use(express.static(publicDirectoryPath))

app.get('',(req,res) =>{
    res.render('index',{
        title:'Weather App',
        name:'Shohan'
    })
})

app.get('/about',(req,res)=>{
    res.render('about', {
        title:'About Weather',
        name:'Shohan'
    })
})

app.get('/help', (req,res)=>{
    res.render('help',{
        title:'Help',
        details: 'This web application is about providing the weather forecast of a  particular city.',
        name:'Shohan'
    })
})

app.get('/weather', (req,res)=>{
if(!req.query.address){
    return res.send({
        error:'You must provide the address' 
    })
}
    geocode(req.query.address, (error, {latitude, longitude} = {})=>{
        if(error){
            return res.send({error})
        }
        
        forecast(latitude,longitude, (error, forecastdata)=>{
            if(error){
                return res.send({error})
            }
            
            res.send({
                forecast: forecastdata,
                address:req.query.address
            })
        })
    })
    
    // res.send({
    //     location:'Surathkal',
    //     forecast:'It is raining.',
    //     address: req.query.address
    // })
})

app.get('/products', (req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'Kinldy provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get('/help/*', (req,res) =>{
    res.render('404',{
        title:'No help article',
        name:'Shohan',
        errorMessage:'No Help article found.'
    })
})

app.get('*', (req,res) =>{
    res.render('404',{
        title:'404 page',
        name:'Shohan',
        errorMessage:'404 page not found.'
    })
})

app.listen(3000, ()=>{
    console.log('Server is up on port 3000')
}) 