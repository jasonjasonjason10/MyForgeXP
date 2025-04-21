import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Account = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const adminStatus = localStorage.getItem("isAdmin");
    const userEmail = localStorage.getItem("email");

    if (!token) {
      navigate("/login");
    } else {
      setEmail(userEmail);
      setIsAdmin(adminStatus === "true");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("email");
    navigate("/login");
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4 mt-10">
      <h2 className="text-xl font-bold">Account Page</h2>
      <p>Email: {email}</p>
      {isAdmin && <p className="text-orange-600 font-semibold">You are an admin.</p>}
      <button
        onClick={handleLogout}
        className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded">
        Logout
      </button>
    </div>
  );
};

export default Account;