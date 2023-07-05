import express from "express"
import { recaptchaAssessmentProvider } from "../controllers/verifyRecaptcha.js"

const authRouter = express.Router()

authRouter.post("/create-assessment",recaptchaAssessmentProvider)

export { authRouter }