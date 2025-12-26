import { createContext, useState, useMemo } from "react";
import toast from "react-hot-toast";
import movieData from "../data/movies";

export const AuthContext = createContext();

export const AuthProvier = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("currentUser");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [genre, setGenre] = useState("Genre");
  const [releaseYear, setReleaseYear] = useState("Year");

  //update user in localStorage
  const updateCurrentUser = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));

    const users = JSON.parse(localStorage.getItem("user")) || [];
    const updatedUsers = users.map((u) =>
      u.email === updatedUser.email ? updatedUser : u
    );
    localStorage.setItem("user", JSON.stringify(updatedUsers));
  };

  const addToWatchlist = (movie) => {
    if (!user) return toast.error("You've Need to Login First");
    const exists = user.watchlist?.some((m) => m._id?.$oid === movie._id?.$oid);
    if (exists) {
      toast.error("Already in watchlist");
      return;
    }

    const updatedUser = {
      ...user,
      watchlist: [...(user.watchlist || []), movie],
    };
    updateCurrentUser(updatedUser);
    toast.success("Added to Watchlist");
  };

  const removeFromWatchlist = (movieId) => {
    if (!user) return;
    const updatedUser = {
      ...user,
      watchlist: user.watchlist.filter(
        (m) => m._id?.$oid !== (movieId?.$oid || movieId)
      ),
    };
    updateCurrentUser(updatedUser);
    toast("Removed from Watchlist");
  };

  const login = (email, password, navigate) => {
    const users = JSON.parse(localStorage.getItem("user")) || [];
    const existedUser = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!existedUser) {
      toast.error("Invalid Credentials");
      return;
    }

    localStorage.setItem("currentUser", JSON.stringify(existedUser));
    setUser(existedUser);
    toast.success("Login Successfully");
    navigate("/");
  };

  const signup = (data, navigate) => {
    const users = JSON.parse(localStorage.getItem("user")) || [];

    const userExists = users.some((u) => u.email === data.email);
    if (userExists) {
      toast.error("User already exists");
      return;
    }

    const newUser = {
      ...data,
      watchlist: [],
    };

    users.push(newUser);
    localStorage.setItem("user", JSON.stringify(users));
    localStorage.setItem("currentUser", JSON.stringify(newUser));
    setUser(newUser);
    toast.success("Signup successful");
    navigate("/");
  };

  const logout = (navigate) => {
    localStorage.removeItem("currentUser");
    setUser(null);
    navigate("/login");
  };

  const genres = useMemo(() => {
    const allGenres = movieData.flatMap((movie) => movie.genre || []);
    return ["Genre", ...Array.from(new Set(allGenres))];
  }, []);

  const years = useMemo(() => {
    const allYears = movieData.map((movie) => movie.year);
    return ["Year", ...Array.from(new Set(allYears))].sort((a, b) => b - a);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        watchlist: user?.watchlist || [],
        addToWatchlist,
        removeFromWatchlist,
        login,
        signup,
        logout,
        searchQuery,
        setSearchQuery,
        genre,
        setGenre,
        releaseYear,
        setReleaseYear,
        genres,
        years,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
