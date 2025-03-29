import { Link, useNavigate } from "react-router-dom";

export default function Header({
  isLoggedIn,
  onLogout,
}: {
  isLoggedIn: boolean;
  onLogout: () => void;
}) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate("/login");
  };

  return (
    <header className="fixed top-0 left-0 right-0 flex justify-between items-center p-4 bg-slate-800 text-white z-50">
      <h1 className="text-lg lg:text-2xl font-bold">
        <Link to="/">EmployWise</Link>
      </h1>
      <nav>
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="bg-red-500 px-4 py-2 rounded-lg text-sm lg:text-base"
          >
            Logout
          </button>
        ) : (
          <Link to="/login" className="bg-green-500 px-4 py-2 rounded-lg text-sm lg:text-base">
            Login
          </Link>
        )}
      </nav>
    </header>
  );
}
