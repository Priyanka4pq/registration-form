import { useState } from "react";
import SignUp from "./Signup";
import Login from "./login";
export default function Authentication(props) {
  const [isSignupVisible, SetIsSignupVisible] = useState(true);
  const [submitClick, SetSubmitClick] = useState(false);

  //   Handle submit click from either Login or SignUp
  const handleLoginSuccess = () => {
    SetSubmitClick(true);
  };

  return (
    <>
      {submitClick ? (
        <Home handleLogout={SetSubmitClick} />
      ) : (
        <>
          {isSignupVisible ? (
            <SignUp
              showSignupForm={SetIsSignupVisible}
              onSubmit={handleLoginSuccess}
              SetLoggedin={props.SetLoggedin}
              setUserData={props.setUserData}
            />
          ) : (
            <Login
              showSignupForm={SetIsSignupVisible}
              onSubmit={handleLoginSuccess}
              SetLoggedin={props.SetLoggedin}
              setUserData={props.setUserData}
            />
          )}
        </>
      )}
    </>
  );
}
