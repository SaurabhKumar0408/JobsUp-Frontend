import React from 'react'
import { useState, useEffect } from 'react'
import api from '../../api'
import { Link } from 'react-router-dom'

function ApplicationStatus() {
    const BACKEND_URL = 'http://127.0.0.1:8000'
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const res = await api.get('/applications/viewMyApplication');
                setApplications(res.data.applications);
            } catch (err) {
                setError(err.response?.data?.error || "Failed to load applications")
            } finally {
                setLoading(false);
            }
        }
        fetchApplications();
    }, [])

    if (loading) {
        return (
            <div className="max-w-6xl mx-auto p-6">
                <div className="animate-pulse space-y-4">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="h-20 bg-gray-200 rounded-lg"></div>
                    ))}
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <p className="text-center text-red-600 mt-10">
                {error}
            </p>
        )
    }

    return (
        <div className="max-w-6xl mx-auto px-6 py-10">
            <h1 className="text-2xl font-bold mb-8">
                My Applications
            </h1>

            {applications.length === 0 ? (
                <div className="bg-white border rounded-lg p-8 text-center text-gray-600">
                    You haven’t applied to any jobs yet.
                </div>
            ) : (
                <div className="space-y-4">
                    {applications.map((app) => (
                        <Link
                            to={`/applicant/applications/${app.id}`}
                            key={app.id}
                            className="group block bg-white border rounded-xl p-5 hover:shadow-md transition"
                        >
                            <div className="flex items-center justify-between gap-4">

                                <div className="flex items-center gap-4">
                                    {app?.company_logo && (
                                        <img
                                            src={app.company_logo}
                                            alt="company logo"
                                            className="w-14 h-14 rounded-lg object-contain border"
                                        />
                                    )}

                                    <div>
                                        <h2 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition">
                                            {app.job_title}
                                        </h2>
                                        <p className="text-gray-600 text-sm">
                                            {app.company}
                                        </p>
                                        <p className="text-sm text-gray-500 mt-1">
                                            Applied on {app.applied_on}
                                        </p>
                                    </div>
                                </div>

                                {/* Status Badge */}
                                <span
                                    className={`px-4 py-1.5 rounded-full text-sm font-medium capitalize
                                        ${app.status === "accepted" && "bg-green-100 text-green-700"}
                                        ${app.status === "rejected" && "bg-red-100 text-red-700"}
                                        ${app.status === "pending" && "bg-yellow-100 text-yellow-700"}
                                        ${app.status === "withdrawn" && "bg-gray-200 text-gray-600"}
                                    `}
                                >
                                    {app.status}
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    )
}

export default ApplicationStatus
