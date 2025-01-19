import { useState } from "react";
import Home from "./component/home";
import Authentication from "./component/Authentication";

export default function App() {
  const [loggedin, SetLoggedin] = useState(false);
  const [userData, setUserData] = useState({
    email: null,
    name: null,
    number: null,
  });
  return (
    <>
      {loggedin ? (
        <Home
          setUserData={setUserData}
          userData={userData}
          SetLoggedin={SetLoggedin}
        />
      ) : (
        <Authentication setUserData={setUserData} SetLoggedin={SetLoggedin} />
      )}
    </>
  );
}
