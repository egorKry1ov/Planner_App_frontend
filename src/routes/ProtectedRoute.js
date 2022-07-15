import React from 'react'
import { Navigate } from 'react-router-dom';

function ProtectedRoute({userSignedIn, children}) {
    return userSignedIn ? children : <Navigate to ="/login" replace />
    
}

export default ProtectedRoute