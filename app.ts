import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import helmet from 'helmet'

import indexRouter from './src/routes/index'
import dotenv from 'dotenv'
dotenv.config()
import { getConnectionOrCreate } from './src/config/TypeOrm'
import { winstonMiddleware } from './src/config/winston'

const connection  = getConnectionOrCreate()
const app = express()
app.use(helmet())
app.use(winstonMiddleware)
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
// eslint-disable-next-line no-undef
app.use(express.static(path.join(__dirname, 'public')))

app.use('/api/v1/', indexRouter)

export default app
