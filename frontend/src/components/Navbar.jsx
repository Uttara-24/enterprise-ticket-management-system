import { Link, useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  const handleLogout = () => {

    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");

    navigate("/");
  };

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between">

      <div className="flex gap-4">

        <Link to="/dashboard">
          Dashboard
        </Link>

        <Link to="/tickets">
          Tickets
        </Link>

      </div>

      <button
        onClick={handleLogout}
        className="bg-red-500 px-4 py-1 rounded"
      >
        Logout
      </button>

    </nav>
  );
}

export default Navbar;