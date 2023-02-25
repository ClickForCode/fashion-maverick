import { useState } from "react";
import LoginPage from "./login";
import RegisterPage from "./register";

const AuthenticationPage = () => {
  const [login, setLogin] = useState(true);
  return login === true ? <LoginPage /> : <RegisterPage />;
};

export default AuthenticationPage;
