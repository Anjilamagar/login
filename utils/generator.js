import otpGenerator from 'otp-generator'

export const generateOtp = () => {
    return otpGenerator.generate(6, { uppercase: false, specialChars: false })
}



console.log(generateOtp());