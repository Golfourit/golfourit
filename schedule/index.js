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
        
        if(a.has(type)){
            console.log(schedule.cancelJob(a.get(type)))
            a.delete(type)
        }
        
        let j = schedule.scheduleJob(new Date(...cron_expression), function(){

            if(!url)return
            request(url)
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


