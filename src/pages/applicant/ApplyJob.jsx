import React from 'react'
import { useState } from 'react'
import api from '../../api'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext';

function ApplyJob() {
    const { job_id } = useParams();
    const navigate = useNavigate();
    const { isAuthenticated, role } = useAuth();

    const [coverLetter, setCoverLetter] = useState("");
    const [resume, setResume] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    if (!isAuthenticated) {
        navigate("/login");
        return null;
    }

    if (role !== 'applicant' && role !== 'Applicant') {
        return (
            <p className="text-center text-red-600 mt-10">
                Only applicants can apply for jobs.
            </p>
        )
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const formData = new FormData();
        formData.append('job', job_id);
        formData.append("cover_letter", coverLetter);
        if (resume) formData.append("resume", resume);

        try {
            await api.post(`/applications/apply/${job_id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            navigate("/applicant/dashboard");
        } catch (err) {
            setError(err.response?.data?.error || "Failed to submit application");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="max-w-3xl mx-auto px-6 py-12">
            <div className="bg-white border rounded-xl shadow-sm p-8">

                <h1 className="text-2xl font-bold mb-2">
                    Apply for Job
                </h1>
                <p className="text-gray-600 mb-6 text-sm">
                    Please fill in the details below to submit your application.
                </p>

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 mb-6 rounded-lg text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* Cover Letter */}
                    <div>
                        <label className="block font-medium mb-2 text-sm">
                            Cover Letter
                        </label>
                        <textarea
                            value={coverLetter}
                            onChange={(e) => setCoverLetter(e.target.value)}
                            rows="6"
                            className="w-full border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Briefly explain why you are a good fit for this role..."
                            required
                        />
                    </div>

                    {/* Resume Upload */}
                    <div>
                        <label className="block font-medium mb-2 text-sm">
                            Resume (PDF only)
                        </label>
                        <input
                            type="file"
                            accept=".pdf"
                            onChange={(e) => setResume(e.target.files[0])}
                            className="block w-full text-sm text-gray-600
                                       file:mr-4 file:py-2 file:px-4
                                       file:rounded-lg file:border-0
                                       file:text-sm file:font-medium
                                       file:bg-blue-50 file:text-blue-700
                                       hover:file:bg-blue-100"
                            required
                        />
                    </div>

                    {/* Submit */}
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-6 py-2 rounded-lg bg-blue-600 text-white font-medium
                                       hover:bg-blue-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {loading ? "Submitting..." : "Submit Application"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ApplyJob
