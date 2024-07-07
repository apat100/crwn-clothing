import { useState } from 'react';

import { 
    signInWithGooglePopup, 
    signInAuthUserWithEmailAndPassword,
    createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils'

import FormInput from '../form-input/form-input.component'
import Button from '../button/button.component';

import './sign-in-form.styles.scss';

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
        const { user } = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user);
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
                console.log('user creation encountered an error', error);
            }
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    };

    return (
        <div className='sign-in-container'>
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

                <div className='buttons-container'>
                    <Button type='submit'>Sign In</Button>
                    <Button buttonType='google' onClick={signInWithGoogle}>Sign in with Google</Button>
                </div>
            </form>
        </div>
    );
};

export default SignInForm;