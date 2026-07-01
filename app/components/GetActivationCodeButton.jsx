'use client';
import { useSignUpModal } from './SignUpModalProvider';

const GetActivationCodeButton = () => {
  const { openSignUpModal } = useSignUpModal();

  return (
    <a
      href="#signup"
      onClick={(e) => {
        e.preventDefault();
        openSignUpModal();
      }}
      className="inline-block whitespace-nowrap rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 px-6 py-3 text-white hover:from-a3Accent hover:to-secondary-400"
    >
      <b>Free Activation Code</b>
    </a>
  );
};

export default GetActivationCodeButton;
