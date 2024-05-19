import toast from 'react-hot-toast';
import {setLoading, setToken} from '../../slices/authSlice'
import { setUser } from '../../slices/profileSlice';
import { apiConnector } from "../apiconnector";
import {settingEndpoints} from '../apis';
export function getPasswordResetToken(email, setEmailSent) {
    return async(dispatch) => {
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST", settingEndpoints.RESET_PASSWORD_TOKEN_API, {email});
            console.log("RESET PASSWORD TOKEN response...", response);

            if(!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success("Reset Email sent");
            setEmailSent(true);
        } catch(error){
            console.log('Exception caught while resetting password: ', error)
            toast.error("Failed to send email for resetting")
        }
        dispatch(setLoading(false));
    }
}

export function resetPassword(password, confirmPassword, token) {
    return async(dispatch) => {
        console.log("Password reset started...")
        dispatch(setLoading(true));
        try {
            const response = await apiConnector(
                "POST", 
                settingEndpoints.RESET_PASSWORD_API, 
                {
                    password: password, 
                    confirmPassword: confirmPassword,
                    token: token
                });
            console.log("RESET PASSWORD response...", response);
            if(!response.data.success) {
                console.log("Error occurred :", response.data.message);
                throw new Error(response.data.message);
            }
            toast.success("Password reset successfully");
        } catch(error){
            console.log('Exception caught while resetting password: ', error)
            toast.error("Failed to reset password")
        }
        dispatch(setLoading(false));
    }
}

export function signUp(
    accountType, 
    firstName, 
    lastName, 
    email, 
    password, 
    confirmPassword,
    otp, 
    navigate) {
    return async(dispatch) => {
        console.log("Sign up started...", accountType, firstName, lastName, email, password, confirmPassword, otp);
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST", settingEndpoints.SIGNUP_API, {
                accountType: accountType, 
                firstName: firstName, 
                lastName: lastName, 
                email: email, 
                password: password, 
                confirmPassword: confirmPassword, 
                otp: otp
            });
            console.log("SIGNUP response...", response);
            if(!response.data.success) {
                console.log("Error occurred :", response.data.message);
                throw new Error(response.data.message);
            }
            toast.success("Account created successfully");
            navigate('/login');
        } catch(error){
            console.log('Exception caught while signing up: ', error)
            toast.error("Failed to create account")
            navigate('/signup')
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId)
    }
}

export function sendOtp(email, navigate) {
    return async(dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST", settingEndpoints.SEND_OTP_API, {email, checkUserPresent: true});
            console.log("SEND OTP response...", response);
            if(!response.data.success) {
                console.log("Error occurred :", response.data.message);
                throw new Error(response.data.message);
            }
            
            toast.success("OTP sent successfully");
            navigate('/verify-email');
        } catch(error){
            console.log('Exception caught while sending OTP: ', error)
            toast.error("Failed to send OTP")
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}

export function login(email, password, navigate) {
    return async(dispatch) => {
        const toastId = toast.loading("Loading...");
        localStorage.clear();
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST", settingEndpoints.LOGIN_API, {email: email, password: password});
            console.log("LOGIN response...", response.data);
            if(!response.data.success) {
                console.log("Error occurred :", response.data.message);
                throw new Error(response.data.message);
            }
            await dispatch(setToken(response.data.token));
            toast.success("Login successful");

            // additional data required to be added post login success 
            const userImage = await response.data?.user?.image ? response.data.user.image : 
            `https://ui-avatars.com/api/?name=${response.data.user.firstName}+${response.data.user.lastName}&background=random`;

            await dispatch(setUser({
                ...response.data.user,
                image: userImage
            }))

            localStorage.setItem("token", JSON.stringify(response.data.token))
            localStorage.setItem("user", JSON.stringify(response.data.user));
            
            navigate('/dashboard/my-profile');
        } catch(error){
            console.log('Exception caught while signing up: ', error)
            toast.error("Failed to login")
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}


export function signout(navigate) {
    return async(dispatch) => {

        await dispatch(setToken(null));
        await dispatch(setUser(null));
        // add feature to reset the cart value 

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        toast.success("Logged out successfully");

        navigate('/');
    }
}