'use-client';
// client validate
export const validateEmail = (email: string) => {
    const emailRegex =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return !!email.toLowerCase().match(emailRegex);
};

export const validatePassword = (password: string): number => {
    // Check for empty string
    if (password.length === 0) {
        return 3; // Code 3 for empty password
    }

    // Check password length (8 to 49 characters)
    if (password.length < 8) {
        return 1; // Code 1 for less than 8 characters
    } else if (password.length > 50) {
        return 2; // Code 2 for longer than 50 characters
    }

    // Regular expression for password complexity
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;

    // Check for complexity requirements
    if (!regex.test(password)) {
        return 4; // Code 4 for lack of complexity
    }

    // Password is valid (no errors)
    return 0;
};
