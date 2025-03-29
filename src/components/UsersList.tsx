import { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiSearch } from "react-icons/ci";

import EditUserDialog from "./EditUserDialog";
import DeleteConfirmationDialog from "./DeleteConfirmationDialog";

interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

interface UsersListProps {
  users: User[];
  onDelete: (id: number) => void;
  onUpdate: (user: User) => void;
}

export default function UsersList({
  users,
  onDelete,
  onUpdate,
}: UsersListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  const filteredUsers = users.filter((user) =>
    [user.first_name, user.last_name, user.email].some((field) =>
      field?.toLowerCase().includes(searchTerm?.toLowerCase())
    )
  );

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setIsEditDialogOpen(true);
  };

  const handleCloseEditDialog = () => {
    setIsEditDialogOpen(false);
    setEditingUser(null);
  };

  const handleDeleteClick = (user: User) => {
    setUserToDelete(user);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (userToDelete) {
      onDelete(userToDelete.id);
      setIsDeleteDialogOpen(false);
      setUserToDelete(null);
    }
  };

  return (
    <div className="lg:p-4 mt-16">
      <div className="flex items-center mb-4">
        <div className="relative flex-1">
          <CiSearch className="absolute left-3 top-3 h-5 w-5 text-gray-400" />

          <input
            type="text"
            placeholder="Search users..."
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Mobile View - Cards */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {filteredUsers.map((user) => (
          <div
            key={user.id}
            className="bg-slate-50  drop-shadow-md rounded-lg flex items-center justify-between overflow-hidden"
          >
            <div className="flex items-center gap-4">
              <img
                src={user.avatar || "/placeholder.svg"}
                alt={`${user.first_name} ${user.last_name}`}
                className="h-16 w-16  object-cover"
              />
              <div>
                <h3 className="font-semibold">
                  {user.first_name} {user.last_name}
                </h3>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
            </div>
            <div className="flex gap-2 p-2">
              <button
                onClick={() => handleEdit(user)}
                className=" text-blue-600 hover:underline text-lg"
              >
                <FaRegEdit />
              </button>
              <button
                onClick={() => handleDeleteClick(user)}
                className=" text-red-600 hover:underline text-lg"
              >
                <RiDeleteBin6Line />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop View - Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border-collapse border border-gray-200 shadow-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border border-gray-200">Avatar</th>
              <th className="p-3 border border-gray-200">First Name</th>
              <th className="p-3 border border-gray-200">Last Name</th>
              <th className="p-3 border border-gray-200">Email</th>
              <th className="p-3 border border-gray-200 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="p-3 border border-gray-200 text-center">
                  <img
                    src={user.avatar || "/placeholder.svg"}
                    alt={`${user.first_name} ${user.last_name}`}
                    className="h-10 w-10 rounded-full object-cover mx-auto"
                  />
                </td>
                <td className="p-3 border border-gray-200">
                  {user.first_name}
                </td>
                <td className="p-3 border border-gray-200">{user.last_name}</td>
                <td className="p-3 border border-gray-200">{user.email}</td>
                <td className="p-3 border border-gray-200 text-right">
                  <button
                    onClick={() => handleEdit(user)}
                    className="text-blue-600 hover:underline text-xl"
                  >
                    <FaRegEdit />
                  </button>
                  <button
                    onClick={() => handleDeleteClick(user)}
                    className="ml-2 text-xl text-red-600 hover:underline"
                  >
                    <RiDeleteBin6Line />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit User Dialog */}
      {editingUser && (
        <EditUserDialog
          user={editingUser}
          isOpen={isEditDialogOpen}
          onClose={handleCloseEditDialog}
          onUpdate={onUpdate}
        />
      )}

      {/* Delete Confirmation Dialog */}
      {userToDelete && (
        <DeleteConfirmationDialog
          isOpen={isDeleteDialogOpen}
          onClose={() => setIsDeleteDialogOpen(false)}
          onConfirm={handleConfirmDelete}
          userName={`${userToDelete.first_name} ${userToDelete.last_name}`}
        />
      )}
    </div>
  );
}
