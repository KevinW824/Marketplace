import React, {useState, createContext} from 'react';
import Content from './Content';


export const newContext = createContext();

/**
 * Login component containing everything
 * @return {*}
 */
function Login() {
  const [showLogin, setShowLogin] = useState(true);
  const [showNewName, setShowNewName] = useState(false);
  const [showNewEmail, setShowNewEmail] = useState(false);
  const [showNewPhone, setShowNewPhone] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  return (
    <newContext.Provider
      value={{
        showLogin, setShowLogin,
        showNewName, setShowNewName,
        showNewEmail, setShowNewEmail,
        showNewPhone, setShowNewPhone,
        showNewPassword, setShowNewPassword,
      }}>
      <Content />
    </newContext.Provider>
  );
}

export default Login;
