import express from 'express'
import cookieParser from 'cookie-parser'
import fs from 'fs/promises'
import { createReadStream } from 'fs'
import { generateLinks } from './utils'
const app = express()

app.get('/*',async(req,res)=>{
    try {
        req.url =  decodeURIComponent(req.url)
        if(req.url === '/') req.url = '/home'
        const result = await fs.stat(req.url)
        if(result.isFile()){
           const rs =  createReadStream(req.url)
           rs.pipe(res)
           rs.on("end",()=>{rs.close()})
           
        }
        else if(result.isDirectory()){
            const dirContents = await fs.readdir(req.url)
            const htmlString = (generateLinks(dirContents,req.url))
            res.send(htmlString)

        }
    } catch (error) {
        console.log(error)
        res.status(404).json({path : req.url, error : "No such file or folder"})
    }
    
})

app.listen(3000)
