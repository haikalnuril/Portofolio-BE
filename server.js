import dotenv from 'dotenv'
import express from 'express'
import cookiesParser from 'cookie-parser'
import cors from 'cors'
import helmet from 'helmet'
import ExpressMongoSanitize from 'express-mongo-sanitize'


dotenv.config()

const app = express()

app.use(cookiesParser())
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(helmet())
app.use(ExpressMongoSanitize());
app.use(express.static('./public'));

import userRoutes from './routes/user.route.js'

app.use('/api/v1/users', userRoutes)

export default app