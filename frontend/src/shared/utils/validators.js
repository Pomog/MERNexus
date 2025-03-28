export const validateLoginForm = ({ mail, password }) => {
    const isMailValid = validateMail(mail);
    const isPasswordValid = validatePassword(password);

    return isMailValid && isPasswordValid;
};

export const validateRegisterForm = ({mail, password, userName}) => {
    const isMailValid = validateMail(mail);
    const isPasswordValid = validatePassword(password);
    const isUserNameValid = validateUsername(userName);

    return isMailValid && isPasswordValid && isUserNameValid;
};


const validatePassword = (password) => {
    return password.length > 6 && password.length < 12;
}

const validateMail = (mail) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    // TODO: Consider enhancing the regex
    return emailPattern.test(mail);
}

const validateUsername = (userName) => {
    return userName.length > 2 && userName.length < 13;
}