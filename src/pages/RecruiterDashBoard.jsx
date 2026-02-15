import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import api from '../api'
import StatCard from '../components/StatCard'
import DashboardButton from '../components/DashboardButton'

function RecruiterDashBoard() {
    const [stats, setStats] = useState({
        companies: 0,
        jobs: 0,
        applications: 0,
    })

    const [recentJobs, setRecentJobs] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const [jobsRes, companiesRes] = await Promise.all([
                    api.get('/jobs/myJobs/'),
                    api.get('/jobs/myCompanies'),
                ])

                setStats({
                    companies: companiesRes.data.count,
                    jobs: jobsRes.data.count,
                    applications: stats.applications, // unchanged
                })

                setRecentJobs(jobsRes.data.jobs.slice(0, 5))
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }
        fetchDashboardData()
    }, [])

    if (loading)
        return (
            <div className="p-10 text-center text-gray-500">
                Loading recruiter dashboard...
            </div>
        )

    return (
        <div className="max-w-7xl mx-auto px-4 py-10 space-y-10">

            {/* HEADER */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900">
                    Recruiter Dashboard
                </h1>
                <p className="text-gray-600 mt-1">
                    Manage your companies, jobs, and hiring pipeline
                </p>
            </div>

            {/* STATS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                <StatCard title="Companies" value={stats.companies} color="blue" />
                <StatCard title="Jobs Posted" value={stats.jobs} color="green" />
                <StatCard title="Applications" value={stats.applications} color="gray" />
            </div>

            {/* QUICK ACTIONS */}
            <div className="bg-white border rounded-2xl p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                    Quick Actions
                </h2>

                <div className="flex flex-wrap gap-4">
                    <DashboardButton
                        to="/recruiter/createCompany"
                        text="Create Company"
                    />
                    <DashboardButton
                        to="/recruiter/createJob"
                        text="Post New Job"
                    />
                    <DashboardButton
                        to="/recruiter/myJobs"
                        text="View My Jobs"
                    />
                    <DashboardButton
                        to="/recruiter/myCompanies"
                        text="My Companies"
                    />
                </div>
            </div>

            {/* RECENT JOBS */}
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-gray-800">
                        Recent Jobs
                    </h2>
                    <Link
                        to="/recruiter/myJobs"
                        className="text-sm text-blue-600 hover:underline"
                    >
                        View all →
                    </Link>
                </div>

                {recentJobs.length === 0 ? (
                    <div className="bg-white border rounded-xl p-6 text-gray-500">
                        No jobs posted yet.
                    </div>
                ) : (
                    <div className="space-y-3">
                        {recentJobs.map(job => (
                            <Link
                                key={job.id}
                                to={`/recruiter/jobs/${job.id}`}
                                className="block bg-white border rounded-xl p-4 hover:shadow transition"
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="font-semibold text-gray-900">
                                            {job.title}
                                        </h3>
                                        <p className="text-sm text-gray-600">
                                            {job.location} • {job.job_type}
                                        </p>
                                    </div>

                                    <span className="text-sm text-gray-400 whitespace-nowrap">
                                        {job.posted_on}
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default RecruiterDashBoard
