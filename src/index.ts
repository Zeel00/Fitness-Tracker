import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './routes/auth'
import googleFitRoutes from './routes/google-fit'

dotenv.config()

const app = express()

// Logging middleware for debugging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`, {
    headers: req.headers,
    body: req.body,
    query: req.query
  })
  next()
})

// Enable CORS
app.use(cors())

// Parse JSON bodies
app.use(express.json())

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/google-fit', googleFitRoutes)

// Health check route
app.get('/health', (req, res) => {
  res.json({ status: 'ok' })
})

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err)
  res.status(500).json({ error: 'Internal server error' })
})

const port = process.env.PORT || 3001

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})