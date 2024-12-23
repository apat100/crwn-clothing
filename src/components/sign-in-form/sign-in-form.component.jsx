import { useState } from 'react';

import { 
    signInWithGooglePopup, 
    signInAuthUserWithEmailAndPassword,
    createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils'

import FormInput from '../form-input/form-input.component'
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';

import { SignInContainer, ButtonsContainer } from './sign-in-form.styles';

const defaultFormFields = {
    email: '',
    password: '',
}

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    };

    const signInWithGoogle = async () => {
        signInWithGooglePopup();
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const { user } = await signInAuthUserWithEmailAndPassword(
                email, 
                password
            );

            resetFormFields();
        } catch(error) {
            if (error.code === 'auth/invalid-credential') {
                alert('Sign in failed');
            } else {
                console.log(error);
            }
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    };

    return (
        <SignInContainer>
            <h2>I already have an account</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput 
                    label='Email'
                    inputOptions={{
                        type:'email', 
                        required: true, 
                        onChange: handleChange, 
                        name: 'email', 
                        value: email, 
                    }}
                />

                <FormInput
                    label='Password' 
                    inputOptions={{
                        type:'password', 
                        required: true, 
                        onChange: handleChange, 
                        name: 'password', 
                        value: password, 
                    }}
                />

                <ButtonsContainer>
                    <Button type='submit'>Sign In</Button>
                    <Button 
                        type='button' 
                        buttonType={BUTTON_TYPE_CLASSES.google} 
                        onClick={signInWithGoogle}
                    >
                        Sign in with Google
                    </Button>
                </ButtonsContainer>
            </form>
        </SignInContainer>
    );
};

export default SignInForm;