import {Navigate} from 'react-router-dom'
import { useAuth } from '../context/AuthContext'


export function ProtectedRecruiterRoute({children}){
    const {isAuthenticated, role} = useAuth();

    if(!isAuthenticated || (role !== 'recruiter' && role !== 'Recruiter')) return <Navigate to='/login' />;
    return children;
}

export function ProtectedApplicantRoute({children}){
    const {isAuthenticated, role} = useAuth();

    if(!isAuthenticated || (role !== 'applicant' && role !== 'Applicant')) return <Navigate to='/login' />;
    return children;
}