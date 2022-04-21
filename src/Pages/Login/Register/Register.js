import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';
import { useCreateUserWithEmailAndPassword, useUpdateProfile } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import SocialLogin from '../SocialLogin/SocialLogin';
import { async } from '@firebase/util';
import Loading from '../../Shared/Loading/Loading';
const Register = () => {
    const [agree, setAgree] = useState(false);
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
      ] = useCreateUserWithEmailAndPassword(auth, {sendEmailVerification: true});
    const [updateProfile, updating, updataError] = useUpdateProfile(auth);
    const navigate = useNavigate();
    const navigateLogin = event =>{
        navigate('/login');
    }

    if(loading || updating){
        return <Loading></Loading>;
      }
    

    if(user){
        console.log('user :', user)
    }
    let errorElement;
    if (error) {
        errorElement =<p className="text-danger">Error: {error?.message }</p>
        
      }

    const handleRegister =async (event) =>{
        event.preventDefault();
        const name = event.target.name.value;
        const email = event.target.email.value;
        const password = event.target.password.value;

        await createUserWithEmailAndPassword(email, password);
        await updateProfile({displayName: name,photoURL: ''})
        console.log('Updated profile');
        navigate('/home')
        
    }
    return (
        <div className='register-form'>
            <h1 style={{textAlign: 'center'}}>This is register</h1>
            <form onSubmit={handleRegister}>
                <input type="text" name='name' placeholder='your name' />

                <input type="email" name='email' placeholder='Email Address' required />

                <input type="password" name='password' placeholder='your password' required />
                <input onClick={()=>setAgree(!agree)} type="checkbox" name="terms" id="terms" />
                <label className={`ps-2 ${agree?'text-primary':'text-danger'}`} htmlFor="terms">Accepts Genius Car terms and conditions</label>
                <input 
                className='w-50 mx-auto btn btn-primary mt-2' 
                type="submit" 
                value='register' 
                disabled={!agree}
                />
            </form>
            {errorElement}
            <p>Already have an account? <span className="text-primary" style={{cursor: 'pointer'}} onClick={navigateLogin}>Please Login...</span></p>
            <SocialLogin></SocialLogin>
        </div>
    );
};

export default Register;