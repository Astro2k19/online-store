import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import fileUpload from "express-fileupload";
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import { routes } from './src/routes.js'
import { config } from './src/configServer.js'

import { checkAccessToken} from './src/routes.js';


const { response, static: serveStatic } = express;

const DEFAULT_PORT = 5556

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express()

app.use('/', serveStatic(__dirname + '/frontend'))
app.use('/userPage', serveStatic(__dirname + '/frontend/userPage'))
app.use('/productPage', serveStatic(__dirname + '/frontend/productPage'))
app.use('/common', serveStatic(__dirname + '/frontend/common'))
app.use('/auth', serveStatic(__dirname + '/frontend/auth'))
app.use('/catalog', serveStatic(__dirname + '/frontend/catalog'))

app.use('/source', serveStatic(__dirname + '/frontend/source'))

app.use(express.json({ extended: true }))
app.use(fileUpload({}))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/', routes)
async function startConnection() {
    try {
        mongoose.connect(config.mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            autoIndex: true
        })
        app.listen(config.port || DEFAULT_PORT)
        console.log("Server has been started")
    }
    catch (e) {
        console.log(e);
    }
}
startConnection()

routes.get('/', async (req, res) => {
    res.sendFile(__dirname + "\\frontend\\homePage.html")
})
routes.get('/userPage', async (req, res) => {
    if(checkAccessToken(req.query.sessionID,"CHECK"))
    {res.sendFile(__dirname + "\\frontend\\userPage.html")}
    else{res.redirect('/')}
})
routes.get('/productPage', async (req, res) => {
    res.sendFile(__dirname + "\\frontend\\productPage.html")
})
routes.get('/catalog', async (req, res) => {
    res.sendFile(__dirname + "\\frontend\\catalog.html")
})
