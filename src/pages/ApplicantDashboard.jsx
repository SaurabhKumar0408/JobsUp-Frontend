import { useState, useEffect } from 'react'
import api from '../api'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import StatCard from '../components/StatCard'
import StatusBadge from '../components/StatusBadge'

function ApplicantDashboard() {
    const { user } = useAuth();
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const res = await api.get('/applications/viewMyApplication');
                setApplications(res.data.applications);
            } catch (err) {
                setError('Failed to load applications');
            } finally {
                setLoading(false);
            }
        };

        fetchApplications();
    }, []);

    const total = applications.length;
    const applied = applications.filter(a => a.status === 'applied').length;
    const shortlisted = applications.filter(a => a.status === 'shortlisted').length;
    const rejected = applications.filter(a => a.status === 'rejected').length;

    if (loading) {
        return (
            <div className="p-8">
                <div className="animate-pulse space-y-4">
                    <div className="h-8 bg-gray-200 rounded w-1/3"></div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="h-24 bg-gray-200 rounded-lg"></div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="p-8 text-red-600">
                {error}
            </div>
        )
    }

    return (
        <div className="max-w-7xl mx-auto px-6 py-10 space-y-10">

            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900">
                    Applicant Dashboard
                </h1>
                <p className="text-gray-600 mt-1">
                    Welcome back{user ? `, ${user.username}` : ""}
                </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Applications" value={total} />
                <StatCard title="Applied" value={applied} color="blue" />
                <StatCard title="Shortlisted" value={shortlisted} color="green" />
                <StatCard title="Rejected" value={rejected} color="red" />
            </div>

            {/* Recent Applications */}
            <div className="bg-white border rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold">
                        Recent Applications
                    </h2>

                    <Link
                        to="/applicant/applications"
                        className="text-sm text-blue-600 hover:underline"
                    >
                        View all
                    </Link>
                </div>

                {applications.length === 0 ? (
                    <p className="text-gray-600">
                        No applications yet.
                    </p>
                ) : (
                    <div className="divide-y">
                        {applications.slice(0, 5).map(app => (
                            <Link
                                key={app.id}
                                to={`/applicant/applications/${app.id}`}
                                className="block py-4 hover:bg-gray-50 transition"
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="font-medium text-gray-900">
                                            {app.job_title}
                                        </h3>
                                        <p className="text-gray-600 text-sm">
                                            {app.company}
                                        </p>
                                    </div>
                                    <StatusBadge status={app.status} />
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-4">
                <Link
                    to="/jobs"
                    className="px-5 py-2.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
                >
                    Browse Jobs
                </Link>

                <Link
                    to="/applicant/applications"
                    className="px-5 py-2.5 rounded-lg border font-medium hover:bg-gray-100 transition"
                >
                    View All Applications
                </Link>
            </div>
        </div>
    )
}

export default ApplicantDashboard
