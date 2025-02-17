import React, { useContext } from 'react'
import { DataContext } from './Context'
import { NavLink } from 'react-router-dom'
import { IoMenu } from 'react-icons/io5'
import { ImCross } from 'react-icons/im'

function NavBar() {
  const {isLogin,menu,setMenu,setIsLogin} = useContext(DataContext)
  return (
    <div className='flex justify-between text-blue-500 lg:text-xl  h-[60px] px-5 bg-gray-200 '>
      <div className='flex justify-center items-center w-[100px] h-full text-center'>Event</div>
      <div className={menu ?"block":'h-full w-[60%] hidden sm:block '}>
      <ul className={`absolute sm:static top-[60px] w-[40%] sm:w-full  p-5  transition-transform duration-500 ease-in-out 
    ${menu ? "right-0 translate-x-0 flex flex-col bg-gray-200" : "right-[-100%] translate-x-full sm:translate-x-0 sm:flex-row"} 
    flex gap-5  items-center justify-around`}>
    <NavLink to='/Calender'>
        <li>Calender</li>
        </NavLink>
        <NavLink to='/AddEvent'>
        <li className='line-clamp-1'>Add Event</li></NavLink>
        <NavLink to='/Dashboard'>
        <li>Dashboard</li></NavLink>
        {  
          isLogin === false &&  
          <NavLink to='/Login'>
        <li>login</li>
        </NavLink>
        }  {  
          isLogin === true &&  
          
        <li onClick={()=>setIsLogin(!isLogin)}>logOut</li>
    
        }  {
          isLogin === false &&  
          <NavLink to='/SignUp'>
        <li>SignUp</li>
        </NavLink>
        }
      </ul></div>

      <div className='flex justify-end text-3xl items-center w-[50%] h-full sm:hidden'
      >
      {
      menu && <ImCross 
      onClick={()=>setMenu(false)} />
      }
      {!menu &&
      <IoMenu onClick={()=>(
        setMenu(true))
       }/>}
      </div>
     
    
    </div>
  )
}

export default NavBar
