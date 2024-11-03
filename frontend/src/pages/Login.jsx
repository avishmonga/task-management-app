import React from 'react';
import Textbox from '../components/Textbox';
import Button from '../components/Button';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api/auth';
import { useAuth } from '../contexts/authContext';
import { handleError } from '../utils/errorHandler';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitHandler = async (data) => {
    try {
      let response = await loginUser(data);

      if (response.status) {
        login(response.token);
      } else {
        throw new Error('Failed to login');
      }
    } catch (error) {
      handleError(error);
    }
  };
  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <div className="w-full min-h-screen flex items-center justify-center flex-col lg:flex-row bg-[#f3f4f6]">
        <div className="w-full md:w-1/3 p-4 md:p-1 flex flex-col justify-center items-center gap-2">
          <div className="">
            <p className="text-blue-600 text-3xl font-bold text-center">
              Login{' '}
            </p>
          </div>
          <div className="flex flex-col gap-y-5 w-full">
            <Textbox
              placeholder="email@example.com"
              type="email"
              name="email"
              label="Email Address"
              className="w-full rounded-full"
              register={register('email', {
                required: 'Email Address is required!',
              })}
              error={errors.email ? errors.email.message : ''}
            />
            <Textbox
              placeholder="your password"
              type="password"
              name="password"
              label="Password"
              className="w-full rounded-full"
              register={register('password', {
                required: 'Password is required!',
              })}
              error={errors.password ? errors.password.message : ''}
            />

            <Button
              type="submit"
              label="Submit"
              className="w-full h-10 bg-blue-700 text-white rounded-full"
            />
          </div>
          <span
            onClick={() => navigate('/signup')}
            className="text-sm text-gray-500 hover:text-blue-600 hover:underline cursor-pointer"
          >
            New user? signup
          </span>
        </div>
      </div>
    </form>
  );
};

export default Login;
