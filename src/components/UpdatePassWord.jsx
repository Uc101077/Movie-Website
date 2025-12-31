import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Navigate } from "react-router-dom";
import toast from "react-hot-toast";

const UpdatePassWord = () => {
  const { user, updatePassword } = useContext(AuthContext);
  const navigate = useNavigate();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const handleSubmit = (e) => {
  e.preventDefault();

  if (!oldPassword || !newPassword || !confirmPassword) {
    toast.error("All fields required");
    return;
  }

  if (oldPassword !== user.password) {
    toast.error("Old password is incorrect");
    return;
  }

  if (newPassword.length < 6) {
    toast.error("Password must be at least 6 characters");
    return;
  }

  if (newPassword !== confirmPassword) {
    toast.error("Passwords do not match");
    return;
  }

  updatePassword(newPassword);
  toast.success("Password updated. Please login again.");
  navigate("/login");
};


  return (
    <div className="update-password">
      <h2>Update Password</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Old Password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdatePassWord;
