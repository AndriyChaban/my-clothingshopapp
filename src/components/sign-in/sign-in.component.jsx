import React, { useState } from "react";
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

import './sign-in.styles.scss';
// import { auth, signInWithGoogle } from "../../firebase/firebase.utils";
// import { signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";

import { googleSignInStart, emailSignInStart } from "../../redux/user/user.reducer";

const SignIn = () => {
    // constructor(props) {
    //     super(props);

    //     this.state = {
    //         email: '',
    //         password: ''
    //     }
    // }
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();


    const handleSubmit = async (event) => {
        event.preventDefault();

        dispatch(emailSignInStart({ email, password }));

        // const { email, password } = this.state;
        // signInWithEmailAndPassword(auth, email, password).catch((error) => { console.log(error); });
        // // this.setState({ email: '', password: '' })
        // setEmail('');
        // setPassword('');
    }


    const handleChange = (event) => {
        const { value, name } = event.target;
        // this.setState({ [name]: value })
        name === 'email' ? setEmail(value) : setPassword(value)
        // console.log('email', email)
    }



    return (<div className="sign-in">
        <h2>I already have an account</h2>
        <span>Sign in with email and password</span>

        <form onSubmit={handleSubmit} autoComplete="off">
            <FormInput name="email"
                label='Email'
                type='email'
                value={email}
                handleChange={handleChange}
                required />

            <FormInput name="password"
                label='Password'
                type='password'
                value={password}
                handleChange={handleChange}
                required />

            <div className="buttons">
                <CustomButton type='submit'>
                    SIGN IN
                </CustomButton>
                <CustomButton type='button' onClick={() => {
                    dispatch(googleSignInStart());
                    setEmail('');
                    setPassword('');
                }} isGoogleSignIn>
                    SIGN IN with google
                </CustomButton>
            </div>

        </form>
    </div>)

}

export default SignIn;