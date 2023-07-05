import { RecaptchaEnterpriseServiceClient } from "@google-cloud/recaptcha-enterprise"
import { RECAPTCHA_SITE_KEY, GCLOUD_PROJECT_ID } from "../utils/constants.js"
import dotenv from "dotenv"

dotenv.config({ path: ".env" })

const recaptchaAssessment = async ({ token, action }) => {
	//* Create Recaptcha Client
	const client = new RecaptchaEnterpriseServiceClient()
	const projectPath = client.projectPath(GCLOUD_PROJECT_ID)
	const payload = {
		assessment: {
			event: {
				token: token,
				siteKey: RECAPTCHA_SITE_KEY
			},
			expectedMetrics: {
				metricThresholds: [
					{
						metric: {
							type: "expected_action",
							action: action
						},
						threshold: {
							type: "min_likelihood",
							value: "possible"
						}
					}
				]
			}
		},
		parent: projectPath
	}

	//? Create Assessment to get scores
	return await client.createAssessment(payload)
}

export { recaptchaAssessment }
