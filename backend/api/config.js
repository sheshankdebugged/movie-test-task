module.exports = {
    port: Number(process.env.PORT),
    secret_key:process.env.SECRET_KEY,
    accountSid:process.env.TWILIO_ACCOUNT_SID,
    authToken:process.env.TWILIO_AUTH_TOKEN,
    twilioServiceId:process.env.TWILIO_SERVICE_ID,
    sendGridApiKey:process.env.SENDGRID_API_KEY,
    signupSendGridTemplateKey:process.env.SIGNUP_SENDGRID_TEMPLATE_KEY,
    bookingSendGridTemplateKey:process.env.BOOKING_SENDGRID_TEMPLATE_KEY,
    phoneTwilioServices:process.env.PHONE_TWILIO_SERVICE_ID,
   db: {
        db_host:process.env.DB_HOST ,
        user: process.env.DB_USER || '',
        password: process.env.PASSWORD || '',
        database: process.env.DB || '',
        db_port: process.env.DBPORT || '',
    },

}