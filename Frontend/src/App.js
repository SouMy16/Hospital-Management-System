import React from 'react'
import HomePage from './pages/HomePage'
import Login from './pages/Login'
import Register from './pages/Register'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from 'react-redux/es/hooks/useSelector';
import Spinner from './components/Spinner';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import ApplyDoctor from './pages/ApplyDoctor';
import NotificationPage from './pages/NotificationPage';
import Users from './pages/admin/Users';
import Doctors from './pages/admin/Doctors';
import Profile from './pages/doctor/profile';
import BookingPage from './pages/BookingPage';


function App() {
  const {loading}=useSelector(state=>state.alerts)
  return (
    <React.Fragment>
      <BrowserRouter>
      {loading?(
          <Spinner/>
      ) : (
       <Routes>
            <Route
             path="/"
             element={
             <ProtectedRoute>
                <HomePage/>
             </ProtectedRoute>
            }
            />
            <Route
             path="/appointments"
             element={
             <ProtectedRoute>
                <HomePage/>
             </ProtectedRoute>
            }
            />
            <Route
             path="/apply-doctor"
             element={
             <ProtectedRoute>
                <ApplyDoctor/>
             </ProtectedRoute>
            }
            />
            <Route
             path="/admin/users"
             element={
             <ProtectedRoute>
                <Users/>
             </ProtectedRoute>
            }
            />
            <Route
             path="/admin/doctors"
             element={
             <ProtectedRoute>
                <Doctors/>
             </ProtectedRoute>
            }
            />
            <Route
             path="/doctor/profile/:id"
             element={
             <ProtectedRoute>
                <Profile/>
             </ProtectedRoute>
            }
            />
            <Route
             path="/doctor/book-appointment/:doctorId"
             element={
             <ProtectedRoute>
                <BookingPage/>
             </ProtectedRoute>
            }
            />
            <Route
             path="/notification"
             element={
             <ProtectedRoute>
                <NotificationPage/>
             </ProtectedRoute>
            }
            />
            <Route
            path="/login"
            element={
            <PublicRoute><Login/></PublicRoute>
            }
            />
            <Route
            path="/Register"
            element={
            <PublicRoute><Register/></PublicRoute>}/>
       </Routes>
      )}
      </BrowserRouter>
    </React.Fragment>
  )
}

export default App
