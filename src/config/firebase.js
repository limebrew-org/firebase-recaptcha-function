import { initializeApp, applicationDefault } from "firebase-admin/app"
import dotenv from "dotenv"

dotenv.config({ path: ".env" })

const firebaseApp = initializeApp(applicationDefault())
export { firebaseApp }