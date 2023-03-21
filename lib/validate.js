export default function login_validate(values){
    const errors = {

    }
    //validation for email

    if (!values.email) {
        errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
    }

    //validation for password
    if (!values.password) {
        errors.password = 'Required';
    } else if (values.password.length < 8 || values.password.length > 20) {
        errors.password = 'Must be greater than 8 and less than 20 characters long';
    }else if (values.password.includes(" ")){
        errors.password = "Invalid Password"
    }

    if (!values.confirmPassword) {
        errors.confirmPassword= 'Required';
    } else if (values.confirmPassword.length < 8 || values.confirmPassword.length > 20) {
        errors.confirmPassword = 'Must be greater than 8 and less than 20 characters long';
    }else if (values.confirmPassword.includes(" ")){
        errors.confirmPassword = "Invalid Password"
    }
 
    return errors
}

export function register_validate(values){
    const errors = {

    }
    //validation for name 
    if(!values.name){
        errors.name = 'Required';
    }
    //validation for email
    if (!values.email) {
        errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
    }

    //validation for password
    if (!values.password) {
        errors.password = 'Required';
    } else if (values.password.length < 8 || values.password.length > 20) {
        errors.password = 'Must be greater than 8 and less than 20 characters long';
    }else if (values.password.includes(" ")){
        errors.password = "Invalid Password"
    }


    if (!values.confirmPassword) {
        errors.confirmPassword = 'Required';
    } else if (values.confirmPassword.length < 8 || values.confirmPassword.length > 20) {
        errors.confirmPassword = 'Must be greater than 8 and less than 20 characters long';
    }else if (values.confirmPassword.includes(" ")){
        errors.confirmPassword = "Invalid Password"
    }else if(values.password !== values.confirmPassword){
        errors.confirmPassword="Password Does Not Match"
    }
    return errors
}

