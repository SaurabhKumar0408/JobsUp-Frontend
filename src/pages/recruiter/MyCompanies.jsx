import { useState, useEffect } from "react";
import api from "../../api";
import { Link } from "react-router-dom";

function MyCompanies() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const res = await api.get("/jobs/myCompanies/");
      setCompanies(res.data.companies || []);
    } catch {
      setError("Failed to load companies");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-red-600 text-center mt-10">{error}</p>;

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold">My Companies</h1>
        <Link
          to="/recruiter/createCompany"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition"
        >
          + Create Company
        </Link>
      </div>

      {companies.length === 0 ? (
        <p className="text-center text-gray-500">
          No companies created yet.
        </p>
      ) : (
        <div className="grid lg:grid-cols-2 gap-8">
          {companies.map((company) => (
            <div
              key={company.id}
              className="bg-white rounded-2xl border p-6 shadow-sm hover:shadow-lg transition"
            >
              <Link to={`/recruiter/company/${company.id}`}>
                <div className="flex items-center gap-6">
                  {company.logo && (
                    <img
                      src={company.logo}
                      alt={company.name}
                      className="w-20 h-20 rounded-xl object-contain border bg-gray-50"
                    />
                  )}
                  <div>
                    <h2 className="text-2xl font-semibold">
                      {company.name}
                    </h2>
                    <p className="text-gray-500 mt-1">
                      {company.location}
                    </p>
                  </div>
                </div>
              </Link>

              <div className="mt-6 flex gap-4">
                <Link
                  to={`/recruiter/myJobs/${company.id}`}
                  className="px-4 py-2 text-sm font-medium rounded-lg
                             bg-blue-50 text-blue-600 hover:bg-blue-100 transition"
                >
                  View Jobs
                </Link>
                <Link
                  to={`/recruiter/createJob/${company.id}`}
                  className="px-4 py-2 text-sm font-medium rounded-lg
                             bg-green-50 text-green-600 hover:bg-green-100 transition"
                >
                  Create Job
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyCompanies;
