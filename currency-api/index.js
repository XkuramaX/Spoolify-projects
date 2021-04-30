const express = require('express')
const mongoose = require('mongoose')
const config = require('./config.json')
const cron = require('node-cron')
const url = "mongodb://localhost/currencyDB"
const rateController = require('./controller/CurrencyRateController')

mongoose.connect(url,{useNewUrlParser:true})
const con = mongoose.connection

// Connecting to MongoDB Client
con.on('open',() => {
    console.log('connected..')
})
// Scheduling task at 5:30 am everyday
cron.schedule('30 5 * * *', async () => {
    try{
        let currency = new rateController();
        let response = await currency.add();
        if(response.success){
            console.log("Success");
        } else {
            console.log("False")
        }
    } catch(err) {
        console.log(err)
        console.log("error")
    }
})

const app = express()

const routes = require('./routes/index')

app.use('/api',routes)

app.listen(3000,()=>{
    console.log("Server is running on port 3000")
})