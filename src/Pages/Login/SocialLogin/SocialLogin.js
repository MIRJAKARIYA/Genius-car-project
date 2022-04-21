import React from "react";
import googleLogo from "../../../images/socialLogos/google.png";
import facebookLogo from "../../../images/socialLogos/facebook.png";
import githubLogo from "../../../images/socialLogos/github.png";
import { useSignInWithGithub, useSignInWithGoogle } from "react-firebase-hooks/auth";
import auth from "../../../firebase.init";
import { useLocation, useNavigate } from "react-router-dom";
import Loading from "../../Shared/Loading/Loading";

const SocialLogin = () => {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  const [signInWithGithub, user1, loading1, error1] = useSignInWithGithub(auth);
  const navigate = useNavigate();
  const location = useLocation();
  let errorElement;
  const from = location.state?.from?.pathname || '/';

  if(loading || loading1){
    return <Loading></Loading>;
  }

  if (error || error1) {
      errorElement = <div>
        <p className="text-danger">Error: {error?.message } {error1?.message}</p>
      </div>
  }

  if (user || user1) {
    navigate(from, { replace: true });
  }

  const handleGoogleSignIn = () => {
    signInWithGoogle();
  };
  const handleFacebookSignIn = () => {};
  const handleGithubSignIn = () => {
    signInWithGithub();
  };
  return (
    <div>
      <div className="d-flex align-items-center">
        <div className="w-50 border border-primary"></div>
        <p className="mt-3 mx-1">or</p>
        <div className="w-50 border border-primary"></div>
      </div>
      {
        errorElement
      }
      <div className="w-50 d-flex justify-content-between mx-auto">
        <button
          onClick={handleGoogleSignIn}
          className="rounded-circle"
          style={{ width: "60px", height: "60px", border: "none" }}
        >
          <img src={googleLogo} style={{ width: "100%" }} alt="" />
        </button>
        <button
          className="rounded-circle"
          onClick={handleFacebookSignIn}
          style={{ width: "60px", height: "60px", border: "none" }}
        >
          <img src={facebookLogo} style={{ width: "100%" }} alt="" />
        </button>
        <button
          onClick={handleGithubSignIn}
          className="rounded-circle"
          style={{ width: "60px", height: "60px", border: "none" }}
        >
          <img src={githubLogo} style={{ width: "100%" }} alt="" />
        </button>
      </div>
    </div>
  );
};

export default SocialLogin;
