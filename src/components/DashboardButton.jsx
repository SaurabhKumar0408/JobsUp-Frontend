import { Link } from "react-router-dom";

function DashboardButton({ to, text }) {
  return (
    <Link
      to={to}
      className="inline-flex items-center justify-center
                 bg-blue-600 text-white
                 px-6 py-3
                 rounded-xl
                 font-medium
                 shadow-md
                 hover:bg-blue-700 hover:shadow-lg
                 active:scale-95
                 transition-all duration-200"
    >
      {text}
    </Link>
  );
}

export default DashboardButton;
