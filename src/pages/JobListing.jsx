import { useState, useEffect } from 'react'
import api from '../api'
import { Link } from 'react-router-dom'

function JobListing() {
    const [jobs, setJobs] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const [filters, setFilters] = useState({
        search: '',
        location: '',
        job_type: '',
        min_salary: '',
        max_salary: '',
    })

    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)

    const fetchJobs = async () => {
        setLoading(true)
        setError(null)
        try {
            const params = { page, page_size: 10 }
            Object.entries(filters).forEach(([key, value]) => {
                if (value) params[key] = value
            })

            const res = await api.get('/jobs/job/', { params })
            setJobs(res.data.jobs)
            setTotalPages(res.data.total_pages)
        } catch {
            setError("Failed to load jobs")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchJobs()
    }, [page])

    const handleChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value })
    }

    const applyFilters = () => {
        setPage(1)
        fetchJobs()
    }

    const removeFilters = () => {
        setPage(1)
        setFilters({
            search: '',
            location: '',
            job_type: '',
            min_salary: '',
            max_salary: '',
        })
        fetchJobs()
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-4 gap-6">

            {/* FILTER SIDEBAR */}
            <div className="md:sticky md:top-24 h-fit bg-white border rounded-xl shadow-sm p-5 space-y-4">
                <h2 className="text-xl font-semibold text-gray-800">Filter Jobs</h2>

                <input
                    type="text"
                    name="search"
                    placeholder="🔍 Job title or keyword"
                    value={filters.search}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                />

                <input
                    type="text"
                    name="location"
                    placeholder="📍 Location"
                    value={filters.location}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                />

                <select
                    name="job_type"
                    value={filters.job_type}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                >
                    <option value="">Job Type</option>
                    <option value="full-time">Full Time</option>
                    <option value="part-time">Part Time</option>
                    <option value="internship">Internship</option>
                </select>

                <div className="grid grid-cols-2 gap-3">
                    <input
                        type="number"
                        name="min_salary"
                        placeholder="Min ₹"
                        value={filters.min_salary}
                        onChange={handleChange}
                        className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                    <input
                        type="number"
                        name="max_salary"
                        placeholder="Max ₹"
                        value={filters.max_salary}
                        onChange={handleChange}
                        className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                </div>

                <button
                    onClick={applyFilters}
                    className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition"
                >
                    Apply Filters
                </button>

                <button
                    onClick={removeFilters}
                    className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition"
                >
                    Clear Filters
                </button>
            </div>

            {/* JOB LIST */}
            <div className="md:col-span-3 space-y-5">

                {loading && (
                    <p className="text-center text-gray-500">Loading jobs...</p>
                )}

                {error && (
                    <p className="text-center text-red-600">{error}</p>
                )}

                {!loading && jobs.length === 0 && (
                    <p className="text-center text-gray-500">
                        No jobs match your filters.
                    </p>
                )}

                {jobs.map(job => (
                    <Link
                        key={job.id}
                        to={`/jobs/${job.id}`}
                        className="block bg-white border rounded-xl p-5 hover:shadow-md transition"
                    >
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                            <div>
                                <h2 className="text-lg font-semibold text-gray-900">
                                    {job.title}
                                </h2>
                                <p className="text-gray-600">
                                    {job.company.name}
                                </p>

                                <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-gray-500">
                                    <span>📍 {job.location}</span>
                                    <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 text-xs font-medium">
                                        {job.job_type}
                                    </span>
                                </div>
                            </div>

                            <div className="text-right">
                                <p className="font-semibold text-gray-900">
                                    ₹{job.min_salary} – ₹{job.max_salary}
                                </p>
                                <span className="text-sm text-blue-600 font-medium">
                                    View Details →
                                </span>
                            </div>

                        </div>
                    </Link>
                ))}

                {/* PAGINATION */}
                {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-4 pt-6">
                        <button
                            disabled={page === 1}
                            onClick={() => setPage(page - 1)}
                            className="px-4 py-2 border rounded-lg disabled:opacity-50 hover:bg-gray-100 transition"
                        >
                            ← Prev
                        </button>

                        <span className="text-gray-600">
                            Page <span className="font-medium">{page}</span> of {totalPages}
                        </span>

                        <button
                            disabled={page === totalPages}
                            onClick={() => setPage(page + 1)}
                            className="px-4 py-2 border rounded-lg disabled:opacity-50 hover:bg-gray-100 transition"
                        >
                            Next →
                        </button>
                    </div>
                )}

            </div>
        </div>
    )
}

export default JobListing
