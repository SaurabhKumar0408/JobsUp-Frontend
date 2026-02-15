import { useState, useEffect } from "react";
import api from "../../api";
import { Link, useParams } from "react-router-dom";

function MyJobs() {
  const { company_id } = useParams();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = company_id
          ? await api.get(`/jobs/myCompanyJobs/${company_id}`)
          : await api.get("/jobs/myJobs/");
        setJobs(res.data.jobs || []);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to load jobs");
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, [company_id]);

  if (loading) return <p className="text-center mt-10">Loading jobs...</p>;
  if (error) return <p className="text-red-600 text-center mt-10">{error}</p>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-8">My Jobs</h2>

      {jobs.length === 0 ? (
        <p className="text-gray-500 text-center">
          No jobs posted yet.
        </p>
      ) : (
        <div className="grid sm:grid-cols-2 gap-6">
          {jobs.map((job) => (
            <Link
              key={job.id}
              to={`/recruiter/jobs/${job.id}`}
              className="block bg-white border rounded-xl
                         p-5 shadow-sm
                         hover:shadow-md hover:border-blue-500
                         transition"
            >
              <h3 className="text-xl font-semibold mb-1">
                {job.title}
              </h3>

              <p className="text-gray-600 text-sm">
                {job.company.name}
              </p>

              <div className="mt-3 text-sm text-gray-700 space-y-1">
                <p>{job.location} • {job.job_type}</p>
                <p>
                  Salary: ₹{job.min_salary} – ₹{job.max_salary}
                </p>
                <p className="text-red-500">
                  Deadline: {job.deadline}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyJobs;
