import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import api from '../../api'

function JobDetail() {
    const { job_id } = useParams();
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchJob();
    }, [job_id]);

    const fetchJob = async () => {
        try {
            const res = await api.get(`/jobs/job/${job_id}`);
            setJob(res.data);
        } catch {
            setError("Failed to load job details");
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="p-6">Loading...</div>;
    if (error) return <div className="p-6 text-red-500">{error}</div>;

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow border">

                {/* Header */}
                <div className="px-6 py-5 border-b">
                    <h1 className="text-3xl font-semibold text-gray-800">
                        {job.title}
                    </h1>
                    <p className="text-gray-600 mt-1">
                        {job.company.name}
                    </p>
                </div>

                {/* Job Meta */}
                <div className="px-6 py-5 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div>
                        <span className="font-medium text-gray-700">Location:</span>
                        <p className="text-gray-600">{job.location}</p>
                    </div>
                    <div>
                        <span className="font-medium text-gray-700">Job Type:</span>
                        <p className="text-gray-600 capitalize">{job.job_type}</p>
                    </div>
                    <div>
                        <span className="font-medium text-gray-700">Salary:</span>
                        <p className="text-gray-600">
                            ₹{job.min_salary} – ₹{job.max_salary}
                        </p>
                    </div>
                    <div>
                        <span className="font-medium text-gray-700">Deadline:</span>
                        <p className="text-gray-600">{job.deadline}</p>
                    </div>
                </div>

                {/* Description */}
                <div className="px-6 py-5 border-t">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">
                        Job Description
                    </h2>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                        {job.description}
                    </p>
                </div>

                {/* Actions */}
                <div className="px-6 py-5 border-t flex flex-wrap gap-4">
                    <Link
                        to={`/recruiter/editJob/${job_id}`}
                        className="bg-blue-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
                    >
                        Edit Job
                    </Link>

                    <Link
                        to={`/recruiter/applications/${job_id}`}
                        className="bg-green-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-green-700 transition"
                    >
                        View Applications
                    </Link>
                </div>

            </div>
        </div>
    );
}

export default JobDetail
