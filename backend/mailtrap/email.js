import { VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplate.js"
import { mailtrapClient, sender } from "./mailtrap.config.js"

export const sendVerificationEmail = async (email,verificationToken) => {
    const recipient = [{email}]

    try {
        const response = await mailtrapClient.send({
            from:sender,
            to: recipient,
            subject: "Verify your email",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}",verificationToken),
            category: "Email Verification"
        })

        console.log("Email send ", response)
    } catch (error) {
        console.error(`error:`,error)
    }
}

export const sendWelcomeEmail = async (email, name) =>{
    const recipient = [{email}]

    try {
        const response = await mailtrapClient.send({
            from:sender,
            to: recipient,
            template_uuid: "de78d1ec-4f15-493e-840c-8a8e3d1b2c08",
            template_variables: {
                "company_info_name": "Random ecom site",
                "name": name
            }
        })

        console.log("Welcom Email sent ", response)
    } catch (error) {
        console.error(`error:`,error)
    }
}