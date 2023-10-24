import { useEffect } from 'react';
import LoginForm from '../components/login-page/LoginForm/LoginForm';

function LoginPage() {
  useEffect(() => {
    document.title = `Codefair | Get access to your account `;
  }, []);
  return (
    <>
      <LoginForm />
    </>
  );
}

export default LoginPage;
