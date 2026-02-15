import { useState, useEffect } from 'react'
import api from '../../api'
import { useParams, Link } from 'react-router-dom';

function CompanyDetail() {
    const { id } = useParams();
    const [company, setCompany] = useState({
        company_id: "",
        name: "",
        location: "",
        website: '',
        logo: '',
        jobs: [],
        description: "",
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchCompany();
    }, [id]);

    const fetchCompany = async () => {
        setLoading(true);
        try {
            const res = await api.get(`/jobs/company/${id}/`);
            setCompany(res.data.company);
        } catch (err) {
            setError("Failed to load company details");
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="p-6">Loading...</div>;
    if (error) return <div className="p-6 text-red-600">{error}</div>;

    return (
        <div className="max-w-6xl mx-auto p-6 space-y-8">

            {/* Company Header */}
            <div className="bg-white rounded-xl shadow-sm p-6 flex items-center gap-6">
                {company.logo && (
                    <img
                        src={company.logo}
                        alt={company.name}
                        className="w-24 h-24 object-contain rounded"
                    />
                )}

                <div className="space-y-1">
                    <h1 className="text-3xl font-bold">{company.name}</h1>
                    <p className="text-gray-600">{company.location}</p>

                    {company.website && (
                        <a
                            href={company.website}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-block text-sm text-blue-600 font-medium hover:underline"
                        >
                            Visit website →
                        </a>
                    )}
                </div>
            </div>

            {/* About Company */}
            <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-3">
                    About Company
                </h2>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {company.description}
                </p>
            </div>

            {/* Open Positions */}
            <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-4">
                    Open Positions ({company?.jobs?.length || 0})
                </h2>

                {!company?.jobs || company.jobs.length === 0 ? (
                    <p className="text-gray-500">No active job openings.</p>
                ) : (
                    <div className="space-y-4">
                        {company.jobs.map(job => (
                            <div
                                key={job.id}
                                className="border rounded-lg p-4 flex justify-between items-center hover:shadow transition"
                            >
                                <div>
                                    <h3 className="text-lg font-semibold">
                                        {job.title}
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                        {job.location} • {job.job_type}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        ₹{job.min_salary} – ₹{job.max_salary}
                                    </p>
                                </div>

                                <Link
                                    to={`/recruiter/myJobs/${company.company_id}`}
                                    className="text-blue-600 font-medium text-sm hover:underline"
                                >
                                    View Job →
                                </Link>
                            </div>
                        ))}
                    </div>
                )}
            </div>

        </div>
    );
}

export default CompanyDetail;
