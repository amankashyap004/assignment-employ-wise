"use client";

import type React from "react";
import { useState } from "react";

interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

interface EditUserDialogProps {
  user: User;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (user: User) => void;
}

export default function EditUserDialog({
  user,
  isOpen,
  onClose,
  onUpdate,
}: EditUserDialogProps) {
  const [formData, setFormData] = useState({
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`https://reqres.in/api/users/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to update user");
      }

      onUpdate({ ...user, ...formData });
      onClose();
    } catch (error) {
      console.error("Update failed", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full lg:w-96">
        <h2 className="text-xl font-semibold mb-4">Edit User</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label htmlFor="first_name" className="block text-sm font-medium">
              First Name
            </label>
            <input
              id="first_name"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div className="space-y-1">
            <label htmlFor="last_name" className="block text-sm font-medium">
              Last Name
            </label>
            <input
              id="last_name"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div className="space-y-1">
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div className="flex justify-end space-x-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-500 text-white rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              {isLoading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
