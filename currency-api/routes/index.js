const express = require('express')
const rateController = require('../controller/CurrencyRateController')
const app = express()

app.get('/addToday', async(req,res)=>{
    try{
        let rate = new rateController(req.body,req.params,req.file,req.query)
        let response = await rate.add()
        if ( response.success ){
            res.status(200).send(response)
        } else {
            res.status(500).send(response)
        }

    } catch(err) {
        return {
            success: false,
            message: "Error Occured",
            error: err
        }
    }
})

app.get("/get", async(req,res)=>{
    try {
        let rate = new rateController(req.body,req.params,req.file,req.query)
        let response = await rate.get()
        console.log(response)
        if (response.success){
            res.status(200).send(response)
        } else {
            res.status(500).send(response)
        }

    } catch(err) {
        return {
            success: false,
            message: "Error Occured!",
            error: err
        }
    }
})


module.exports = app