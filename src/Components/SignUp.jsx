import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


function SignUp() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate()
  const URL = "http://localhost:3003/v2/SingnUp";

  const onSubmit = async (data) => {
    try {
      console.log("Submitting Data:", data);
      const response = await axios.post(URL, data);
      console.log("Response:", response.data);
      navigate('/Login')
      toast.success(response.data.message)
      
    } catch (error) {
      toast.error("Email already exist")
      console.error("Error:", error);
    }
  };

  return (
    <div className='flex h-[90vh] w-full justify-center items-center text-xl p-5'>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col bg-gray-200 p-6 w-full md:w-[50%] shadow-2xl rounded-2xl '>
        <label className='mb-4'>
          <p className='mb-2'>Name</p>
          <input
            type="text"
            className='w-full px-4 p-2 border-2 outline-0 border-gray-500 rounded-2xl'
            placeholder="Enter Your Name"
            {...register("name", { required: "Name is Required" })}
          />
        </label>
        <label className='mb-4'>
          <p className='mb-2'>Email</p>
          <input
            type="text"
            className='w-full px-4 p-2 border-2 outline-0 border-gray-500 rounded-2xl'

            placeholder="Enter Your Email"
            {...register("email", { required: "Email is Required" })}
          />
        </label>
        <label className='mb-4'>
          <p className='mb-2'>Password</p>
          <input
            type="password" // Changed type for security
            className='w-full px-4 p-2 border-2 outline-0 border-gray-500 rounded-2xl'

            placeholder="Enter Your Password"
            {...register("password", { required: "Password is Required" })}
          />
        </label>
        <label className='mb-4'>
          <p className='mb-2'>DOB</p>
          <input
            type="date" // Changed to 'date' for better user experience
            className='w-full px-4 p-2 border-2 outline-0 border-gray-500 rounded-2xl'

            {...register("DOB", { required: "DOB is Required" })}
          />
        </label>

        <button type="submit" className='bg-black p-2 rounded-xl text-white cursor-pointer' >Submit</button>
      </form>
    </div>
  );
}

export default SignUp;
