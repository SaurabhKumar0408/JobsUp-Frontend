import React from 'react'
import { useState, useEffect } from 'react'
import api from '../../api'
import { useNavigate, useParams, Link } from 'react-router-dom'

function ApplicationDetail() {
    const BACKEND_URL = 'http://127.0.0.1:8000'
    const { application_id } = useParams();
    const [application, setApplication] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchApplication = async () => {
            try {
                const res = await api.get(`/applications/viewMyApplication/${application_id}`);
                setApplication(res.data);
            } catch (err) {
                setError(err.response?.data?.error || "Failed to load application");
            } finally {
                setLoading(false);
            }
        }
        fetchApplication();
    }, [application_id]);

    const handleWithdraw = async () => {
        const confirm = window.confirm(
            "Are you sure you want to withdraw this application?"
        );
        if (!confirm) return;

        try {
            await api.post(`/applications/withdrawApplication/${application_id}/`);
            alert("Application withdrawn successfully");
            navigate("/applicant/applications");
        } catch (err) {
            alert(
                err.response?.data?.error || "Failed to withdraw application"
            );
        }
    }

    if (loading) {
        return (
            <div className="max-w-5xl mx-auto p-6">
                <div className="animate-pulse space-y-4">
                    <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-24 bg-gray-200 rounded"></div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <p className="text-center text-red-600 mt-10">
                {error}
            </p>
        );
    }

    const { job, company } = application;

    return (
        <div className="max-w-5xl mx-auto px-6 py-10 space-y-8">

            {/* Header Card */}
            <div className="flex items-center gap-5 bg-white p-6 rounded-xl shadow-sm border">
                {company.logo && (
                    <img
                        src={company.logo}
                        alt="company logo"
                        className="w-20 h-20 rounded-lg object-contain border"
                    />
                )}

                <div className="flex-1">
                    <Link to={`/jobs/${job.id}`}>
                        <h1 className="text-2xl font-bold text-gray-900 hover:text-blue-600 transition">
                            {job.title}
                        </h1>
                    </Link>
                    <p className="text-gray-600 mt-1">
                        {company.name}
                    </p>
                </div>

                {/* Status Badge */}
                <span
                    className={`px-4 py-1 rounded-full text-sm font-medium capitalize
                        ${application.status === 'accepted' && 'bg-green-100 text-green-700'}
                        ${application.status === 'rejected' && 'bg-red-100 text-red-700'}
                        ${application.status === 'pending' && 'bg-yellow-100 text-yellow-700'}
                        ${application.status === 'withdrawn' && 'bg-gray-200 text-gray-600'}
                    `}
                >
                    {application.status}
                </span>
            </div>

            {/* Application Meta */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-white p-6 rounded-xl border shadow-sm">
                <div>
                    <p className="text-sm text-gray-500">Application Status</p>
                    <p className="font-semibold capitalize">
                        {application.status}
                    </p>
                </div>

                <div>
                    <p className="text-sm text-gray-500">Applied On</p>
                    <p className="font-semibold">
                        {application.applied_on}
                    </p>
                </div>
            </div>

            {/* Job Details */}
            <div className="bg-white p-6 rounded-xl border shadow-sm">
                <h2 className="text-lg font-semibold mb-4">
                    Job Details
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <p>
                        <span className="text-gray-500">Location:</span>{" "}
                        <span className="font-medium">{job.location}</span>
                    </p>
                    <p>
                        <span className="text-gray-500">Job Type:</span>{" "}
                        <span className="font-medium">{job.job_type}</span>
                    </p>
                    <p>
                        <span className="text-gray-500">Salary:</span>{" "}
                        <span className="font-medium">
                            ₹{job.min_salary} – ₹{job.max_salary}
                        </span>
                    </p>
                </div>
            </div>

            {/* Actions */}
            {application.status !== "withdrawn" && (
                <div className="flex justify-end">
                    <button
                        onClick={handleWithdraw}
                        className="px-6 py-2 rounded-lg border border-red-500 text-red-600 hover:bg-red-500 hover:text-white transition"
                    >
                        Withdraw Application
                    </button>
                </div>
            )}
        </div>
    )
}

export default ApplicationDetail
