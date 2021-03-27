//require('dotenv').config()

import express from 'express'
//import { errors } from 'celebrate'
import routes from '../src/routes.js'


const app = express()
app.use(express.static('public'))
app.use(routes)
//app.use(errors())

export default app
