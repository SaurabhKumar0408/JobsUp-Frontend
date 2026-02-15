import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300 mt-16">
            <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">

                {/* Brand */}
                <div>
                    <h2 className="text-2xl font-extrabold text-white mb-4 tracking-tight">
                        JobsUp
                    </h2>
                    <p className="text-sm leading-relaxed text-gray-400">
                        Find your dream job or hire the best talent with ease.
                        Build your career or company faster with JobsUp.
                    </p>
                </div>

                {/* For Applicants */}
                <div>
                    <h3 className="text-white font-semibold mb-4 uppercase text-sm tracking-wider">
                        Applicants
                    </h3>
                    <ul className="space-y-3 text-sm">
                        <li>
                            <Link to="/jobs" className="hover:text-white transition">
                                Browse Jobs
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/applicant/applications"
                                className="hover:text-white transition"
                            >
                                My Applications
                            </Link>
                        </li>
                        <li>
                            <Link className="hover:text-white transition">
                                Profile
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* For Recruiters */}
                <div>
                    <h3 className="text-white font-semibold mb-4 uppercase text-sm tracking-wider">
                        Recruiters
                    </h3>
                    <ul className="space-y-3 text-sm">
                        <li>
                            <Link
                                to="/recruiter/dashboard"
                                className="hover:text-white transition"
                            >
                                Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/recruiter/myCompanies"
                                className="hover:text-white transition"
                            >
                                My Companies
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/recruiter/myJobs"
                                className="hover:text-white transition"
                            >
                                My Jobs
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Company */}
                <div>
                    <h3 className="text-white font-semibold mb-4 uppercase text-sm tracking-wider">
                        Company
                    </h3>
                    <ul className="space-y-3 text-sm">
                        <li>
                            <Link className="hover:text-white transition">
                                About Us
                            </Link>
                        </li>
                        <li>
                            <Link className="hover:text-white transition">
                                Contact
                            </Link>
                        </li>
                        <li>
                            <Link className="hover:text-white transition">
                                Privacy Policy
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-800 text-center py-5 text-sm text-gray-500">
                © {new Date().getFullYear()} JobsUp. All rights reserved.
            </div>
        </footer>
    )
}

export default Footer
