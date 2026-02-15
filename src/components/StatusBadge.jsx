import React from 'react'

function StatusBadge({ status }) {
    const styles = {
        applied: "bg-blue-50 text-blue-700 border border-blue-200",
        shortlisted: "bg-green-50 text-green-700 border border-green-200",
        rejected: "bg-red-50 text-red-700 border border-red-200",
        withdrawn: "bg-gray-100 text-gray-700 border border-gray-300",
    };

    return (
        <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold capitalize ${styles[status]}`}
        >
            {status}
        </span>
    )
}

export default StatusBadge
