import { useEffect } from 'react';
import SignupForm from '../components/signup-page/SignupForm/SignupForm';

function SignupPage() {
  useEffect(() => {
    document.title = `Codefair | Become part of an amazing community `;
  }, []);
  return (
    <>
      <SignupForm />
    </>
  );
}

export default SignupPage;
