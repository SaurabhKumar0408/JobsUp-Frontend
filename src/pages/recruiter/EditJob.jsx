import React from 'react'
import { useState, useEffect } from 'react'
import api from '../../api'
import { useNavigate, useParams } from 'react-router-dom'

function EditJob() {
    const {job_id} = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [company, setCompany] = useState({
        id:"",
        name: "",
    })
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        skills_required: "",
        min_salary: "",
        max_salary: "",
        location: "",
        job_type: "",
        deadline: ""
    })

    useEffect(()=>{
        const fetchJob = async ()=>{
            try {
                const res = await api.get(`/jobs/job/${job_id}`);
                setFormData({
                    title: res.data.title || "",
                    description: res.data.description || "",
                    skills_required: res.data.skills_required || "",
                    min_salary: res.data.min_salary || "",
                    max_salary: res.data.max_salary || "",
                    location: res.data.location || "",
                    job_type: res.data.job_type || "",
                    deadline: res.data.deadline || "",
                });

                setCompany({
                    id: res.data.company?.id || "",
                    name: res.data.company?.name || "",
                });

            } catch(err) {
                setError(err.response?.data?.error || "Failed to Get Job Details.")
            }
        }
        fetchJob();
    },[job_id]);

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        setFormData({
            ...formData,
            [name]: type === "number" ? Number(value) : value,
        });
    };

    const handleSubmit = async(e)=> {
        e.preventDefault();
        setError(null);
        setLoading(true);
        setSuccess(null);
        try{
            await api.post(`/jobs/updateJob/${job_id}/`, formData);
            setSuccess("Job Updated Successfully");
            navigate(`/recruiter/jobs/${job_id}`);
        } catch(err){
            setError(err.response?.data?.error || "failed to edit job");
        } finally{
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4">
            <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md border">
                
                {/* Header */}
                <div className="border-b px-6 py-4">
                    <h2 className="text-2xl font-semibold text-gray-800">
                        Edit Job
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                        Update job details and keep postings accurate
                    </p>
                </div>

                {/* Alerts */}
                <div className="px-6 pt-4 space-y-3">
                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded">
                            {error}
                        </div>
                    )}
                    {success && (
                        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-2 rounded">
                            {success}
                        </div>
                    )}
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="px-6 py-6 space-y-5">
                    
                    {/* Job Title */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Job Title
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>

                    {/* Company (read-only) */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Company
                        </label>
                        <input
                            type="text"
                            value={company.name}
                            disabled
                            className="w-full rounded-lg border bg-gray-100 px-3 py-2 text-gray-600 cursor-not-allowed"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Job Description
                        </label>
                        <textarea
                            name="description"
                            rows={4}
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>

                    {/* Skills */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Skills Required
                        </label>
                        <input
                            type="text"
                            name="skills_required"
                            value={formData.skills_required}
                            onChange={handleChange}
                            placeholder="React, Django, SQL"
                            className="w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>

                    {/* Salary */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Min Salary
                            </label>
                            <input
                                type="number"
                                name="min_salary"
                                value={formData.min_salary}
                                onChange={handleChange}
                                className="w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Max Salary
                            </label>
                            <input
                                type="number"
                                name="max_salary"
                                value={formData.max_salary}
                                onChange={handleChange}
                                className="w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                        </div>
                    </div>

                    {/* Location & Type */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Location
                            </label>
                            <input
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                className="w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Job Type
                            </label>
                            <select
                                name="job_type"
                                value={formData.job_type}
                                onChange={handleChange}
                                className="w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            >
                                <option value="">Select Job Type</option>
                                <option value="full_time">Full Time</option>
                                <option value="part_time">Part Time</option>
                                <option value="internship">Internship</option>
                                <option value="contract">Contract</option>
                            </select>
                        </div>
                    </div>

                    {/* Deadline */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Application Deadline
                        </label>
                        <input
                            type="date"
                            name="deadline"
                            value={formData.deadline}
                            onChange={handleChange}
                            className="w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-60"
                    >
                        {loading ? "Updating Job..." : "Update Job"}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default EditJob
