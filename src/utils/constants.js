import dotenv from "dotenv"

dotenv.config({ path: ".env" })

export const RECAPTCHA_SITE_KEY = process.env.RECAPTCHA_SITE_KEY
export const GCLOUD_PROJECT_ID = process.env.GCLOUD_PROJECT_ID
export const APP_CHECK_HEADER = "X-Firebase-AppCheck"
