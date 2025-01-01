function generateOtp(){
    return Math.floor((Math.random() * 900000) + 100000);
}

console.log(generateOtp());

export default generateOtp;