import React from 'react'
import { useAuthStore } from '../../store/authStore'
import { useNavigate } from 'react-router-dom';

export const HomePage = () => {
const {logout,isLoading,error,user,isAuthenticated,checkAuth} = useAuthStore()
const handleLogout = async (e) => {
    e.preventDefault();
    await logout()
    
};

  return (
    <div>
        <h1>HomePage</h1>
        <button onClick={handleLogout}>Logout</button>
    </div>
  )
}
