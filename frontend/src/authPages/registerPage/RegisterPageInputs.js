import React from 'react';
import InputWithLabel from "../../shared/components/InputWithLable";

const RegisterPageInputs = (props) => {
    const {
        mail, setMail,
        userName, setUsername,
        password, setPassword
    } = props;

    return (
        <>
            <InputWithLabel
                value={mail}
                setValue={setMail}
                label='E-mail'
                type='text'
                placeholder='Enter e-mail address'
            />

            <InputWithLabel
                value={userName}
                setValue={setUsername}
                label='Username'
                type='text'
                placeholder='Enter a username'
            />

            <InputWithLabel
                value={password}
                setValue={setPassword}
                label='Password'
                type='password'
                placeholder='Enter a password'
            />
        </>
    );
};

export default RegisterPageInputs;