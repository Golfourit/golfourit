const schedule = require('node-schedule');
const express = require('express')
const request = require('request')
const app = express()

let a = new Map()

app.get('/schedule',(req,res)=>{
    console.log(req.query)
    let {cron_expression,url,type} = req.query
    try{
        cron_expression = cron_expression.split(',')
        
        cron_expression.push('0')
        cron_expression = cron_expression.map((x)=>parseInt(x))
        cron_expression[1] = cron_expression[1] - 1
        console.log(new Date(...cron_expression))
        if(a.has(type)){
            console.log(schedule.cancelJob(a.get(type)))
            a.delete(type)
        }
        
        let j = schedule.scheduleJob(new Date(...cron_expression), function(){
            console.log('send')
            if(!url)return
            request.get(url, function (error, response, body) {
                console.error('error:', error); // Print the error if one occurred
                console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
                console.log('body:', body); // Print the HTML for the Google homepage.
            })
        });

        a.set(type,j)
        res.send('ok')
    
    }
    catch(err){
        console.log(err)
        res.send("err")
    }
    
    
    
    
})
app.listen(5001,()=>{
    console.log("listen on 5001")
})


