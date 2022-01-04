import React, { Component } from "react";
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

import './sign-in.styles.scss';
import { auth, signInWithGoogle } from "../../firebase/firebase.utils";
import { signInWithEmailAndPassword } from "firebase/auth";

export default class SignIn extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        }
    }


    handleSubmit = async (event) => {
        event.preventDefault();
        const {email, password} = this.state;
        signInWithEmailAndPassword(auth, email, password).catch((error)=>{console.log(error);});
        this.setState({email: '', password: ''})
    }


    handleChange = (event) => {
        const {value, name} = event.target;
        this.setState( {[name]: value})
    }

    render() {
        return (<div className="sign-in">
                    <h2>I already have an account</h2>
                    <span>Sign in with email and password</span>

                    <form onSubmit={this.handleSubmit}>
                        <FormInput name="email"
                               label='Email' 
                               type='email'
                               value={this.state.email}
                               handleChange={this.handleChange}
                               required/>
                        
                        <FormInput name="password"
                                label='Password' 
                               type='password' 
                               value={this.state.password}
                               handleChange={this.handleChange} 
                               required/>
                        
                        <div className="buttons">
                            <CustomButton type='submit'>
                                SIGN IN
                            </CustomButton>
                            <CustomButton onClick={signInWithGoogle} isGoogleSignIn>
                                SIGN IN with google
                            </CustomButton>
                        </div>
                        
                    </form>
                </div>)
    }
}