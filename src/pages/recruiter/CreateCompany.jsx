import React, { useState } from 'react'
import api from '../../api'
import { useNavigate } from 'react-router-dom'

function CreateCompany() {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        location: "",
        website: "",
    });

    const navigate = useNavigate();
    const [logo, setLogo] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const data = new FormData();
            data.append('name', formData.name);
            data.append('description', formData.description);
            data.append('location', formData.location);
            data.append('website', formData.website);
            if (logo) data.append('logo', logo);

            await api.post('/jobs/createCompany/', data, {
                headers: { 'Content-Type': "multipart/form-data" },
            });

            navigate('/recruiter/myCompanies/');
        } catch (err) {
            setError(err.response?.data?.error || "Failed to create company");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className="max-w-xl mx-auto mt-10 bg-white p-8 rounded-xl shadow-sm">
            <h2 className="text-3xl font-bold mb-6">
                Create Company
            </h2>

            {error && (
                <div className="bg-red-100 text-red-700 px-4 py-2 mb-4 rounded">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">

                {/* Company Name */}
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Company Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                        placeholder="e.g. Acme Corp"
                        required
                    />
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Company Description
                    </label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows="4"
                        className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                        placeholder="Briefly describe your company..."
                    />
                </div>

                {/* Location */}
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Location
                    </label>
                    <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                        placeholder="e.g. Bangalore, India"
                        required
                    />
                </div>

                {/* Website */}
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Website (optional)
                    </label>
                    <input
                        type="url"
                        name="website"
                        value={formData.website}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                        placeholder="https://company.com"
                    />
                </div>

                {/* Logo Upload */}
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Company Logo
                    </label>
                    <input
                        type="file"
                        onChange={(e) => setLogo(e.target.files[0])}
                        className="w-full text-sm"
                    />
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50"
                >
                    {loading ? "Creating..." : "Create Company"}
                </button>
            </form>
        </div>
    );
}

export default CreateCompany;
