"use client";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UsersList from "../components/UsersList";

interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

interface ApiResponse {
  data: User[];
  total_pages: number;
}

export default function UsersPage() {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }

    fetchUsers(currentPage);
  }, [currentPage]);

  const fetchUsers = async (page: number) => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`https://reqres.in/api/users?page=${page}`);
      const data: ApiResponse = await response.json();

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      setUsers(data.data);
      setTotalPages(data.total_pages);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (id: number) => {
    try {
      const response = await fetch(`https://reqres.in/api/users/${id}`, {
        method: "DELETE",
      });

      if (!response.ok && response.status !== 204) {
        throw new Error("Failed to delete user");
      }

      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An error occurred while deleting"
      );
    }
  };

  const handleUpdateUser = (updatedUser: User) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
  };

  return (
    <div className="relative container mx-auto p-4">
      {error && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-64 text-lg font-medium text-gray-600">
          Loading users...
        </div>
      ) : (
        <>
          <UsersList
            users={users}
            onDelete={handleDeleteUser}
            onUpdate={handleUpdateUser}
          />

          {/* Pagination */}
          <div className="mt-6 flex justify-center items-center gap-4">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-lg ${
                currentPage === 1
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600 text-white"
              }`}
            >
              Previous
            </button>

            <span className="font-semibold">
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-lg ${
                currentPage === totalPages
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600 text-white"
              }`}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
