import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { Box } from "@chakra-ui/react";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import { useAuth } from "./context/AuthProvider";
import { Toaster } from "./components/ui/toaster";

function App() {
  const { user } = useAuth();

  return (
    <Box width="100vw" height="100vh" overflow="hidden">
      <Toaster />
      <Routes>
        <Route
          path="/"
          element={user ? <Home /> : <Navigate replace to="/auth" />}
        />
        <Route
          path="/auth"
          element={!user ? <Auth /> : <Navigate replace to="/" />}
        />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </Box>
  );
}

export default App;
