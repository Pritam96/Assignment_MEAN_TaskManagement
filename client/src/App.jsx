import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { Container } from "@chakra-ui/react";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";

function App() {
  const user = null;

  return (
    <BrowserRouter>
      <Container maxW="xl">
        <Routes>
          <Route path="/" element={<Navigate replace to="/tasks" />} />
          <Route path="/tasks" element={<Home />} />
          <Route path="/tasks/:id" element={<Home />} />
          <Route
            path="/auth"
            element={!user ? <Auth /> : <Navigate replace to="/tasks" />}
          />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
