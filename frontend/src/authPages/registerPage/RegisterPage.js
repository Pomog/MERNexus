import React, {useEffect, useState} from 'react';
import AuthBox from '../../shared/components/AuthBox';
import {Typography} from "@mui/material";
import RegisterPageInputs from "./RegisterPageInputs";
import RegisterPageFooter from "./RegisterPageFooter";
import {validateRegisterForm} from "../../shared/utils/validators";
import {useNavigate} from 'react-router-dom';
import {getActions} from "../../store/actions/authActions";
import {connect} from "react-redux";

const RegisterPage = ({register}) => {
    const history = useNavigate();
    const [mail, setMail] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const [isFormValid, setIsFormValid] = useState(false);

    const handleRegister = () => {
        const userDetails = {
            mail,
            password,
            userName
        };

        register(userDetails, history);
    };

    useEffect(() => {
        setIsFormValid(validateRegisterForm({
            mail,
            userName,
            password,
        }));

    }, [mail, userName, password, setIsFormValid]);

    return (
        <AuthBox>
            <Typography variant='h5' sx={{
                color: 'white'
            }}>
                Create an account
            </Typography>
            <RegisterPageInputs
                mail={mail}
                setMail={setMail}
                userName={userName}
                setUsername={setUserName}
                password={password}
                setPassword={setPassword}

            />
            <RegisterPageFooter
                handleRegister={handleRegister}
                isFormValid={isFormValid}
            />
        </AuthBox>
    );
}

const mapActionsToProps = (dispatch) => {
    return {
        ...getActions(dispatch),
    };
};

export default connect(null, mapActionsToProps)(RegisterPage);