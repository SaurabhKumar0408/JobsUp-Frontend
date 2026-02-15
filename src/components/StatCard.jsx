function StatCard({ title, value, color = "gray" }) {
    const colors = {
        gray: "bg-gray-50 text-gray-800 border-gray-200",
        blue: "bg-blue-50 text-blue-800 border-blue-200",
        green: "bg-green-50 text-green-800 border-green-200",
        red: "bg-red-50 text-red-800 border-red-200",
    };

    return (
        <div
            className={`relative overflow-hidden rounded-xl border p-6 shadow-sm hover:shadow-md transition ${colors[color]}`}
        >
            {/* Decorative accent */}
            <div
                className={`absolute right-0 top-0 h-full w-1
                    ${color === 'blue' && 'bg-blue-400'}
                    ${color === 'green' && 'bg-green-400'}
                    ${color === 'red' && 'bg-red-400'}
                    ${color === 'gray' && 'bg-gray-300'}
                `}
            />

            <h3 className="text-sm font-medium text-gray-600">
                {title}
            </h3>

            <p className="text-3xl font-bold mt-3">
                {value}
            </p>
        </div>
    )
}

export default StatCard
