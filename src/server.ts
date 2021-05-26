import express from 'express'
import cors from 'cors'
import routes from './api/routes/vendingMachine.routes'

const app = express()
app.use(express.json())
app.use(cors())

const PORT = process.env.PORT || 8000

app.use('/api', routes)

app.get('/', (req, res) => res.send('Express + TypeScript Server'))

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`)
})
