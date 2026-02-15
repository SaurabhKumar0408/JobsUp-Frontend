import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../api'
import { useAuth } from '../context/AuthContext'

function JobDetail() {
    const BACKEND_URL = "http://127.0.0.1:8000"
    const { job_id } = useParams()
    const [job, setJob] = useState(null)
    const { isAuthenticated, role } = useAuth()
    const navigate = useNavigate()
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const res = await api.get(`/jobs/job/${job_id}`)
                setJob(res.data)
            } catch {
                setError("Failed to load job details")
            } finally {
                setLoading(false)
            }
        }
        fetchJob()
    }, [job_id])

    if (loading) return <p className="text-center mt-10 text-gray-500">Loading job details...</p>
    if (error) return <p className="text-center text-red-600">{error}</p>
    if (!job) return null

    return (
        <div className="max-w-5xl mx-auto px-4 py-10">

            {/* HEADER CARD */}
            <div className="bg-white border rounded-2xl p-6 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-6">

                <div className="flex gap-4 items-center">
                    <img
                        src={job.company?.logo}
                        alt="company_logo"
                        className="w-20 h-20 object-contain rounded-lg border bg-white"
                    />
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            {job.title}
                        </h1>
                        <p className="text-gray-600 font-medium">
                            {job.company.name}
                        </p>

                        <div className="flex flex-wrap gap-3 mt-2 text-sm text-gray-500">
                            <span>📍 {job.location}</span>
                            <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 font-medium">
                                {job.job_type}
                            </span>
                        </div>
                    </div>
                </div>

                {(role === 'applicant' || role === 'Applicant') && (
                    <button
                        onClick={() => {
                            if (!isAuthenticated) {
                                navigate('/login')
                            } else {
                                navigate(`/applicant/applyJob/${job_id}`)
                            }
                        }}
                        className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition whitespace-nowrap hover:cursor-pointer"
                    >
                        Apply Now
                    </button>
                )}
            </div>

            {/* DETAILS SECTION */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">

                {/* LEFT CONTENT */}
                <div className="md:col-span-2 space-y-6">

                    <div className="bg-white border rounded-xl p-6">
                        <h2 className="text-lg font-semibold text-gray-800 mb-2">
                            Job Description
                        </h2>
                        <p className="text-gray-600 leading-relaxed">
                            {job.description}
                        </p>
                    </div>

                    <div className="bg-white border rounded-xl p-6">
                        <h2 className="text-lg font-semibold text-gray-800 mb-3">
                            Skills Required
                        </h2>
                        <div className="flex flex-wrap gap-2">
                            {job.skills_required.split(",").map(skill => (
                                <span
                                    key={skill}
                                    className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium"
                                >
                                    {skill.trim()}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* RIGHT SIDEBAR */}
                <div className="space-y-6">

                    <div className="bg-white border rounded-xl p-6">
                        <h2 className="text-lg font-semibold text-gray-800 mb-2">
                            Salary
                        </h2>
                        <p className="text-xl font-bold text-gray-900">
                            ₹{job.min_salary} – ₹{job.max_salary}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                            Per month
                        </p>
                    </div>

                    <div className="bg-blue-50 border border-blue-100 rounded-xl p-6">
                        <h3 className="font-semibold text-blue-800 mb-2">
                            Why apply?
                        </h3>
                        <p className="text-sm text-blue-700">
                            This role matches your skills and offers competitive compensation with growth opportunities.
                        </p>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default JobDetail
