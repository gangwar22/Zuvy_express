import express from 'express' 

const app = express()
import "dotenv/config"


app.delete("/delete",(req,res)=>{
    const id=Number(req.paramas.id)
    users=users.filter(user=>user.id !=id)
    res.json ({msg:"userdeleted sucessfully"})
    
})


app.listen((PORT)=>{
    console.log(`server running ${PORT}`)
})