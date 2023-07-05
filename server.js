import express from "express"
import { authRouter } from "./src/routers/auth.js"
import cors from "cors"

const app = express()

// TODO: Set API port
const PORT = process.env.PORT || 8080

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use("/auth",authRouter)

app.listen(PORT, () => {
	console.log(
		`App Check Cloud function running successfully on http://localhost:${PORT}`
	)
})