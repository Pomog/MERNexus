import { FORM } from '../../config/appConfig'

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
    return password.length > FORM.passwordMinLen && password.length < FORM.passwordMaxLen;
}

export const validateMail = (mail) => {
    // TODO: Consider enhancing the regex
    return FORM.emailRegExp.test(mail) && mail.length < FORM.emailMaxLen;
}

const validateUsername = (userName) => {
    return userName.length > FORM.userNameMinLen && userName.length < FORM.userNameMaxLen;
}