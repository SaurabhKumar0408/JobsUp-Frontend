import React from 'react'
import { useAuth } from '../../context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'

function Navbar() {
    const navigate = useNavigate();
    const { logout, isAuthenticated, role } = useAuth()

    const handleLogout = () => {
        logout()
        navigate('/login')
    }

    return (
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

                {/* Logo */}
                <Link
                    to="/"
                    className="text-2xl font-extrabold text-blue-600 tracking-tight hover:text-blue-700 transition"
                >
                    JobsUp
                </Link>

                {/* Links */}
                <div className="flex items-center space-x-6 text-sm font-medium">

                    <Link
                        to="/jobs"
                        className="text-gray-700 hover:text-blue-600 transition"
                    >
                        Jobs
                    </Link>

                    {!isAuthenticated && (
                        <>
                            <Link
                                to="/login"
                                className="text-gray-700 hover:text-blue-600 transition"
                            >
                                Login
                            </Link>

                            <Link
                                to="/register"
                                className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition shadow-sm"
                            >
                                Register
                            </Link>
                        </>
                    )}

                    {isAuthenticated && (role === 'applicant' || role === 'Applicant') && (
                        <>
                            <Link
                                to="/applicant/dashboard"
                                className="text-gray-700 hover:text-blue-600 transition"
                            >
                                Dashboard
                            </Link>

                            <Link
                                to="/applicant/applications"
                                className="text-gray-700 hover:text-blue-600 transition"
                            >
                                My Applications
                            </Link>
                        </>
                    )}

                    {isAuthenticated && (role === 'recruiter' || role === 'Recruiter') && (
                        <>
                            <Link
                                to="/recruiter/dashboard"
                                className="text-gray-700 hover:text-blue-600 transition"
                            >
                                Dashboard
                            </Link>

                            <Link
                                to="/recruiter/myCompanies"
                                className="text-gray-700 hover:text-blue-600 transition"
                            >
                                My Companies
                            </Link>

                            <Link
                                to="/recruiter/myJobs"
                                className="text-gray-700 hover:text-blue-600 transition"
                            >
                                My Jobs
                            </Link>
                        </>
                    )}

                    {isAuthenticated && (
                        <button
                            onClick={handleLogout}
                            className="px-4 py-2 rounded-lg border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition"
                        >
                            Logout
                        </button>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default Navbar
