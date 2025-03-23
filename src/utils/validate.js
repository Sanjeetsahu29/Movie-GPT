export const checkValidateData = (email, password)=>{
    if(!email || !password) return "Please fill in all fields";
    const validateEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
    const validatePassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);
    if(!validateEmail) return "Invalid email address";
    if(!validatePassword) return "Password must contain at least 8 characters, including UPPER/lowercase and numbers";
    return null;
}