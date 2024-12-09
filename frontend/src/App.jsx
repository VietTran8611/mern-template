import { Children, useEffect, useState } from 'react'
import { LoginPage } from './routes/auth/LoginPage'
import { RegisterPage } from './routes/auth/RegisterPage'
import { Navigate, Route, Routes } from 'react-router-dom'
import {Toaster} from 'react-hot-toast'
import { useAuthStore } from './store/authStore'
import { HomePage } from './routes/Home/HomePage'
import { ChakraProvider } from "@chakra-ui/react";
import { VerifyEmail } from './routes/Auth/VerifyEmail'
import { LoadingSpinner } from './components/LoadingSpinner'


// protect routes that require authentication
const ProtectedRoute = ({ children }) => {
	const { isAuthenticated, user } = useAuthStore();

	if (!isAuthenticated) {
		return <Navigate to='/login' replace />;
	}

	if (!user.isVerified) {
		return <Navigate to='/verify-email' replace />;
	}

	return children;
};

// redirect authenticated users to the home page
const RedirectAuthenticatedUser = ({ children }) => {
	const { isAuthenticated, user } = useAuthStore();

	if (isAuthenticated && user.isVerified) {
		return <Navigate to='/' replace />;
	}

	return children;
};



function App() {
	const { isCheckingAuth, checkAuth } = useAuthStore();

	useEffect(() => {
		checkAuth();
	}, [checkAuth]);

	if (isCheckingAuth) return <LoadingSpinner />;
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
					path='/test'
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
