import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("profile")) || null
  );
  const navigate = useNavigate();

  const loginAction = async (formData) => {
    try {
      const { data } = await axios.post("/api/users/login", formData);
      setUser(data);
      localStorage.setItem("profile", JSON.stringify(data));
      navigate("/");
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Failed to log in. Please try again.";
      throw new Error(errorMessage);
    }
  };

  const registerAction = async (formData) => {
    try {
      const { data } = await axios.post("/api/users/register", formData);
      setUser(data);
      localStorage.setItem("profile", JSON.stringify(data));
      navigate("/");
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Failed to register. Please try again.";
      throw new Error(errorMessage);
    }
  };

  const logoutAction = async () => {
    try {
      await axios.post("/api/users/logout");
      setUser(null);
      localStorage.removeItem("profile");
      navigate("/auth");
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Failed to log out. Please try again.";
      throw new Error(errorMessage);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, loginAction, registerAction, logoutAction }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
