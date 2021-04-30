const currencyModel = require('../models/currency_rate')
const fetch = require('node-fetch')
const config = require('../config.json')

class CurrencyRate{
    constructor(payload,params,file,query){
        this.payload = payload;
        this.query = query;
        this.file = file;
        this.params = params
    }
    async add(){
        try{
            let response = await fetch('http://api.currencylayer.com/live?access_key='+config.currency_access_key+'&format=1')
            response = await response.json()
            
            let time = new Date()
            let date = time.getDate()
            if (date/10<1){
                date = "0"+date
            }
            let month = time.getMonth() + 1
            if (month/10<1){
                month = "0"+month
            }
            let year = time.getFullYear()
            // console.log(date,month,year)
            let rates = response.quotes

            let obj = {}
            obj['currencies'] = {}

            obj['date'] = year+"-"+month+"-"+date
            obj['createdAt'] = time
            for( let key in rates){
                let currency = key.substring(3,);
                obj['currencies'][currency] = {
                    'midMarket':rates[key],
                    'margin': 0
                }
            }
            console.log(obj)

            let newObj = await currencyModel.create(obj)
            console.log(newObj)
            return {
                success: true,
                response: newObj
            }

        } catch(err) {
            console.log(err)
            return {
                success: false,
                message: "Error Occured",
                error: err
            }
        }
    }

    async get() {
        try{
            let time = new Date(this.query.date)
            let date = time.getDate()
            if (date/10<1){
                date = "0"+date
            }
            let month = time.getMonth() + 1
            if (month/10<1){
                month = "0"+month
            }
            let year = time.getFullYear()
            let str_date = year+"-"+month+"-"+date
            
            let response = await currencyModel.findOne({
                date : str_date
            })

            return {
                success: true,
                response: response
            }

        } catch (err) {
            return {
                success: false,
                message: "Error Occured",
                error: err
            }
        }
    }
}

module.exports = CurrencyRate