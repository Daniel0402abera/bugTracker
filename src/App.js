import React from "react";
import Dashboard from "./pages/Dashboard";
import UserPage from "./pages/UserPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/Login";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoutes from "./services/PrivateRoutes";
import BugPage from "./pages/BugPage";
import AssignUser from "./pages/AssignUser";
import { ToastContainer} from 'react-toastify';

const queryClient = new QueryClient();

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route element={<PrivateRoutes />}>
                <Route path="/dashboard" element={<Dashboard />}>
                  <Route path="/dashboard/bug" element={<BugPage />} />
                  <Route
                    path="/dashboard/assign_bug"
                    element={<AssignUser />}
                  />
                  <Route path="/dashboard/user" element={<UserPage />} />
                </Route>
              </Route>
            </Routes>
            
             <ToastContainer />
          </AuthProvider>
        </QueryClientProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
