import { APP_CHECK_HEADER } from "../utils/constants.js"
import { recaptchaAssessment } from "../utils/recaptcha.js"

export const recaptchaAssessmentProvider = async (req, res) => {
	//? Grab Token and Action from request
	const token = req.header(APP_CHECK_HEADER)
	const action = req.query.action

	//? Handle Edge cases
	if (!token || !action || action !== "login") {
		return res.status(401)?.json({
			reason: "Unauthorized! App Check token not passed in header or action might be missing",
			status: "failure"
		})
	}

	//* Handle Create Assessment to get scores
	try {
		const [response] = await recaptchaAssessment({ token, action })

		//? Valid Token
		if (response.tokenProperties?.valid) {
			return res.status(200)?.json({
				score: response?.riskAnalysis?.score,
				reason: response.riskAnalysis?.reasons,
				status: "Ok"
			})
		}

		//! Invalid token
		return res.status(400)?.json({
			message: "Invalid token",
			score: response?.riskAnalysis?.score,
			reason: response.tokenProperties?.invalidReason,
			status: "failure"
		})
	} catch (error) {
		//! Unknown error
		return res.status(500)?.json({
			message: "Unable to create assessment!",
			reason: error.message,
			status: "failure"
		})
	}
}
