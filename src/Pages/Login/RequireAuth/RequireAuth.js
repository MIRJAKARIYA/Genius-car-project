import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate, useLocation } from "react-router-dom";
import auth from "../../../firebase.init";
import Loading from "../../Shared/Loading/Loading";
import { useSendEmailVerification } from "react-firebase-hooks/auth";
import { ToastContainer, toast } from 'react-toastify';
const RequireAuth = ({ children }) => {
  const [user, loading] = useAuthState(auth);
  console.log(user);
  const [sendEmailVerification, sending, error] =
    useSendEmailVerification(auth);

  const location = useLocation();
  if (loading) {
    return <Loading></Loading>;
  }
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
  }
  console.log(user)
  if (user.providerData[0]?.providerId ==='password' && !user.emailVerified) {
    return (
      <div>
        <h3 className="text-danger">Email is not verified</h3>
        <h5 className="text-success">Please verify your email address</h5>
        <button className="btn btn-primary"
          onClick={async () => {
            await sendEmailVerification();
            toast('email sent')
          }}
        >
          Send verification email again
        </button>
        <ToastContainer />
      </div>
    );
  }
  return children;
};

export default RequireAuth;
