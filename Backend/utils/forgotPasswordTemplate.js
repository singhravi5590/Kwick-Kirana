function forgotPasswordTemplate({name, otp}){
    return `
    <div>
    <p>Dear ${name}</p>
    <p>You have requested a password reset. please use following code to reset password</p>
    <p style='background : White; color : black; padding : 10px'>${otp}</p>
    <p>The otp is only valid for 1 hour</p>
    <br />
    <br />
    <p>Thank You</p>
</div> `
}

export default forgotPasswordTemplate;

