const schedule = require('node-schedule');
const express = require('express')
const request = require('request')
const app = express()

let a = new Map()

app.route('/schedule',(req,res)=>{
    console.log("hi")
    const {cron_expression,url,type} = req.params

    if(a.has(type))a.get(type).cancel()

    const j = schedule.scheduleJob(new Date(...cron_expression), function(){
        console.log("send")
        request(url)
    });
    
    a.set(type,j)
    res.send('ok')
    
})
app.listen(5001,()=>{
    console.log("listen on 5001")
})


