import express from 'express'
import 'dotenv/config'
// ... all my other external imports, omitted for brevity

import authRouter from './controllers/auth.js'
// ... all my own code imports, omitted for brevity

const app = express()
const port = 3000

app.use(express.json())
app.use(cors())
app.use(morgan('dev'))
// ... all my other app.use, omitted for brevity 

app.use('/', authRouter)
// ... all my other routes, omitted for brevity

const startServers = async () => {
  try {
    // Database Connection
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('🔒 Database connection established')

    // Server Connection
    app.listen(port, () => console.log(`🚀 Server up and running on port ${port}`))
  } catch (error) {
    console.log(error)
  }
}

startServers()
