import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function SingleUserAdmin({ user, isAdmin }) {
  const navigate = useNavigate();

  console.log("user id", user.username);

  const address = "http://localhost:3000/";
  async function deleteHandle() {
    try {
      const response = await fetch(`${address}user/delete/${user.id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const result = await response.json();
      console.log("result => ", result);
      if (response.ok) {
        navigate("/account");
      } else {
        console.log("error", response);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      {isAdmin &&
        user.username !== "Deleted User" &&
        user.username !== "admin" && (
          <div className="flex justify-center mt-8 mb-6">
            <button
              onClick={deleteHandle}
              className="flex items-center gap-2 border border-red-500 text-red-400 px-4 py-2 rounded hover:bg-red-600 hover:text-white transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7h6m2 0a2 2 0 012 2v0a2 2 0 01-2 2H7a2 2 0 01-2-2v0a2 2 0 012-2h10z"
                />
              </svg>
              Delete User
            </button>
          </div>
        )}
    </>
  );
}

export default SingleUserAdmin;
