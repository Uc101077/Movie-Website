import { Link } from "react-router-dom";

const ProfileMenu = ({ open, setOpen, user, logout, navigate }) => {
  if (!open) return null;

  return (
    <div className="profile-menu" onClick={(e) => e.stopPropagation()}>
      <p className="profile-data">Name: {user.name}</p>
      <p className="profile-data">Email: {user.email}</p>

      <Link
        to="/updatepassword"
        className="profile-link"
        onClick={() => setOpen(false)}
      >
        Update Password
      </Link>

      <button
        className="logout-btn"
        onClick={() => {
          setOpen(false);
          logout(navigate);
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default ProfileMenu;
