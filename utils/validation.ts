import { Dispatch, SetStateAction } from "react";

export interface Error {
    error: boolean;
    message: string;
}

export const defaultError: Error = {
    error: false,
    message: '',
};

const setError = (message: string): Error => {
    return {
        error: true,
        message,
    };
};

type ErrorFn = Dispatch<SetStateAction<Error>>


export const validateUsername = (username: string, setUsernameError: ErrorFn) => {
    if (username.length < 5) {
        setUsernameError(setError('Username must be at least 5 characters'));
        return false;
    }
    setUsernameError(defaultError);
    return true;
}

export const validateEmail = (email: string, setEmailError: ErrorFn) => {
    if (!email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
        setEmailError(setError('Please enter a valid email'));
        return false;
    }
    setEmailError(defaultError);
    return true;
}

export const validatePassword = (password: string, setPasswordError: ErrorFn) => {
    if (password.length < 8) {
        setPasswordError(setError('Password must be at least 8 characters'));
        return false;
    }
    if (!password.search(/[a-z]/)) {
        setPasswordError(setError('Password must contain at least one lowercase letter'));
        return false;
    }
    if (!password.search(/[A-Z]/)) {
        setPasswordError(setError('Password must contain at least one uppercase letter'));
        return false;
    }
    if (!password.search(/[0-9]/)) {
        setPasswordError(setError('Password must contain at least one number'));
        return false;
    }
    setPasswordError(defaultError);
    return true;
}

export const validateConfirmPassword = (password: string, confirmPassword: string, setConfirmPasswordError: ErrorFn) => {
    if (password !== confirmPassword) {
        setConfirmPasswordError(setError('Passwords do not match'));
        return false;
    }
    setConfirmPasswordError(defaultError);
    return true;
}