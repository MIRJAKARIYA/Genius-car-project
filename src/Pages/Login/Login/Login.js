import React, { useRef } from "react";
import { Button, Form } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import auth from "../../../firebase.init";
import SocialLogin from "../SocialLogin/SocialLogin";
import { useSendPasswordResetEmail } from 'react-firebase-hooks/auth';
import Loading from "../../Shared/Loading/Loading";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PageTitle from "../../Shared/PageTitle/PageTitle";




const Login = () => {
    const emailRef = useRef('');
    const passwordRef = useRef('');
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';
    let errorElement;
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
      ] = useSignInWithEmailAndPassword(auth);
      const [sendPasswordResetEmail, sending, errorPassReset] = useSendPasswordResetEmail(
        auth
      );
    const handleSubmit = event =>{
        event.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        signInWithEmailAndPassword(email, password);
    }

    

    if(loading || sending){
      return <Loading></Loading>;
    }
  

    if(user){
       navigate(from, { replace: true });
    }

    if (error) {
      errorElement =<p className="text-danger">Error: {error?.message }</p>
      
    }

    const navigateRegister = event =>{
        navigate('/register')
    }
 
    const resetPassword = async() =>{
      const email = emailRef.current.value;
      if(email){
        await sendPasswordResetEmail(email);
        toast('Sent Email');
      }
      else{
        toast('please enter your email address')
      }
      
    }

  return (
    <div className="container w-50 mx-auto">
      <PageTitle title='Login'></PageTitle>
      <h2 className="text-primary text-center mt-2">This is login</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control ref={emailRef} type="email" required placeholder="Enter email" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control ref={passwordRef} type="password" required placeholder="Password" />
        </Form.Group>
        
        <Button variant="primary w-50 mx-auto d-block mb-2" type="submit">
          LogIn
        </Button>
      </Form>
      {errorElement}
      <p>New to Genius Car? <span className="text-primary" style={{cursor: 'pointer'}} onClick={navigateRegister}>Please Register...</span></p>
      <p>Forget Passoword? <span className="text-primary" style={{cursor: 'pointer'}} onClick={resetPassword}>Reset Password</span></p>
      <SocialLogin></SocialLogin>
      <ToastContainer />
    </div>
  );
};

export default Login;
