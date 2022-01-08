import React from "react";
import { useState } from "react";
import './sign-up.styles.scss';
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import { useDispatch } from "react-redux";
import { signUpStart } from "../../redux/user/user.reducer";

const SignUp = () => {

    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const dispatch = useDispatch();

    const handleSubmit = async event => {
        event.preventDefault();
        if (!password === confirmPassword) {
            alert("passwords don't match");
            return;
        }
        dispatch(signUpStart({ email, password, displayName }));
    };

    const handleChange = event => {
        const { name, value } = event.target;
        switch (name) {
            case 'displayName': setDisplayName(value); break;
            case 'email': setEmail(value); break;
            case 'password': setPassword(value); break;
            default: setConfirmPassword(value)
        }
    }

    return (
        <div className="sign-up">
            <h2 className="title">
                I do not have an account
            </h2>
            <span>Sign up with your email and password</span>
            <form className="sign-up-form" onSubmit={handleSubmit}>
                <FormInput
                    type="text"
                    name="displayName"
                    value={displayName}
                    onChange={handleChange}
                    label='Display Name'
                    required />

                <FormInput
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                    label='Email'
                    required />

                <FormInput
                    type="password"
                    name="password"
                    value={password}
                    onChange={handleChange}
                    label='Password'
                    required />

                <FormInput
                    type="password"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={handleChange}
                    label='Confirm Password'
                    required />

                <CustomButton type='submit'>
                    SIGN UP
                </CustomButton>

            </form>
        </div>
    )

}

export default SignUp;