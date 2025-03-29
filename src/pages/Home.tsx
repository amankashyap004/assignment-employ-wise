import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-4 gap-1 lg:gap-4">
      <h2 className="text-2xl lg:text-3xl font-bold">Welcome to EmployWise</h2>
      <p className="text-gray-600">Manage your employees efficiently!</p>

      <button
        onClick={() => navigate(isLoggedIn ? "/users" : "/login")}
        className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        {isLoggedIn ? "Go to Users Page" : "Login"}
      </button>
    </div>
  );
}
