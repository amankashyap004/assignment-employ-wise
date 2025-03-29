"use client";

interface DeleteConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  userName: string;
}

export default function DeleteConfirmationDialog({
  isOpen,
  onClose,
  onConfirm,
  userName,
}: DeleteConfirmationDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full lg:w-96">
        <h2 className="text-xl font-semibold mb-4">Confirm Deletion</h2>
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete <strong>{userName}</strong>? This
          action cannot be undone.
        </p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
