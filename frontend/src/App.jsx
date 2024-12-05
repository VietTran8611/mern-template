import { Children, useEffect, useState } from 'react'
import { LoginPage } from './routes/auth/LoginPage'
import { RegisterPage } from './routes/auth/RegisterPage'
import { Navigate, Route, Routes } from 'react-router-dom'
import {Toaster} from 'react-hot-toast'
import { useAuthStore } from './store/authStore'
import { HomePage } from './routes/Home/HomePage'
import { ChakraProvider } from "@chakra-ui/react";
import { VerifyEmail } from './routes/Auth/VerifyEmail'



const ProtectedRoute = ({ children }) => {
	const { isAuthenticated, user,isAdmin } = useAuthStore();

	if (!isAuthenticated) {
		return <Navigate to='/login' replace />;
	}

	if (!user.isverified) {
		return <Navigate to='/verify-email' replace />;
	}

		if(user.isAdmin){
		  return <Navigate to="/admin" replace />
		}
	 

	return children;
};

// redirect authenticated users to the home page
const RedirectAuthenticatedUser = ({ children }) => {
	const { isAuthenticated, user } = useAuthStore();

	if (isAuthenticated && user.isverified) {
		return <Navigate to='/' replace />;
	}

	return children;
};


function App() {
  const { isCheckingAuth, checkAuth,user } = useAuthStore();

  useEffect(() => {
		checkAuth();
	}, [checkAuth]);
  return (
    <>
      <Routes>
				<Route
					path='/'
					element={
						<ProtectedRoute>
                <HomePage />
						 </ProtectedRoute>
					}
				/>
				<Route
					path='/signup'
					element={
						<RedirectAuthenticatedUser>
									<ChakraProvider>
                        <RegisterPage />
                  </ChakraProvider>
						</RedirectAuthenticatedUser>
					}
				/>
				<Route
					path='/login'
					element={
						<RedirectAuthenticatedUser>
									<ChakraProvider>
                        <LoginPage />
                  </ChakraProvider>
						</RedirectAuthenticatedUser>
					}
				/>
				<Route path='/verify-email' element={
          <ChakraProvider>
                <VerifyEmail />
          </ChakraProvider>
        } />
        <Route path='*' element={<Navigate to='/' replace />} /> 
				<Route path='*' element={<Navigate to='/' replace />} />
			</Routes>
			<Toaster />
    </>
  )
}

export default App
