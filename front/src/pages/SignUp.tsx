import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Input from '../components/Input';
import config from '../config/config';

const SignUpPage = () => {
  const [userName, setUserName] = useState('');
  const [pass, setPass] = useState('');
  const [email, setUserEmail] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [signUpError, setSignUpError] = useState('');
  const navigate = useNavigate();

  const onSubmit = async () => {
    if (pass !== confirmPass) {
      setSignUpError('Passwords do not match.');
      return;
    }
    const response = await fetch(`${config.API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: userName,
        email: email,
        password: pass,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      setSignUpError(data.message);
      return;
    } else {
      navigate('/signin');
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="px-12 py-12 shadow bg-white rounded-md flex flex-col gap-6">
        <h1 className="text-2xl font-bold text-gray-600 text-center mb-4">
          Create your account
        </h1>
        <Input
          placeholder="Username"
          onChange={(e) => {
            setUserName(e.target.value);
          }}
          id="input_username"
        />
        <Input
          placeholder="Email"
          onChange={(e) => {
            setUserEmail(e.target.value);
          }}
          id="input_email"
          type="email"
        />
        <Input
          placeholder="Password"
          type="password"
          onChange={(e) => {
            setPass(e.target.value);
          }}
          id="input_password"
        />
        <Input
          placeholder="Confirm password"
          type="password"
          onChange={(e) => {
            setConfirmPass(e.target.value);
          }}
          id="input_confirm_password"
        />
        <p
          className={`text-red-600 text-center text-sm -mt-2 ${
            signUpError ? 'animate-shake' : 'invisible'
          }`}
        >
          {signUpError || 'invisible'}
        </p>
        <Button type="button" className="-mt-2" onClick={onSubmit}>
          Sign Up
        </Button>
        <p className="mt-1 text-sm text-center text-gray-400">
          Already have an account?{' '}
          <a
            href="/signin"
            className="text-violet-500 underline cursor-pointer"
          >
            Sign in here
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
