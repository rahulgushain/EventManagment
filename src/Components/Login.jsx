import axios from 'axios'
import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast'
import { NavLink, useNavigate } from 'react-router-dom'
import { DataContext } from './Context'

function Login() {
  const { isLogin, setIsLogin } = useContext(DataContext)
  const URL = "http://localhost:3003/v2/Login"

  const [formdata, setFormData] = useState({
    email: "",
    password: "",
  })

  const navigate = useNavigate()
  
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev, [name]: value,
    }))
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    console.log(formdata)
    
    try {
      const response = await axios.post(`${URL}`, formdata)
      console.log(response)
    
      if (response.data.success) {
        toast.success(response.data.message)
        localStorage.setItem("token", response.data.token)
        setIsLogin(!isLogin)
        setFormData({
          email:"",
          password:""
        })
        navigate('/')
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log("error", error)
    }
  }

  return (
    <div className="flex justify-center items-center h-[90vh] bg-gray-100">
      <form onSubmit={submitHandler} className='flex flex-col w-96 p-6 bg-white shadow-xl rounded-lg'>
        <h2 className='text-2xl font-bold text-center mb-4'>Login</h2>
        <label className='mb-2'>
          <p className='text-gray-700'>Email</p>
          <input 
            type="email" 
            value={formdata.email}
            onChange={handleChange}
            placeholder='Enter Your Email' 
            name='email'
            className='w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
        </label>
        <label className='mb-4'>
          <p className='text-gray-700'>Password</p>
          <input 
            type='password' 
            value={formdata.password}
            onChange={handleChange}
            name='password' 
            placeholder='Enter Password'
            className='w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
        </label>
        <button 
          className='bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-300' 
          type="submit">
          Login
        </button>
        <p className='w-full text-center'>OR</p>
        <NavLink to='/SignUp'></NavLink>
      </form>
      
    </div>
  )
}

export default Login
