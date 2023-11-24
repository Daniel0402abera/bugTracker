import React from 'react';
import Dashboard from "./pages/Dashboard";
// import Example from "./pages/BugPage";
import UserPage from "./pages/UserPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/Login";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider} from "./context/AuthContext";
import PrivateRoutes from "./services/PrivateRoutes";
import Example from "./pages/BugPage";

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
                <Route path="/dashboard/bug" element={<Example />} />
                <Route path="/dashboard/user" element={<UserPage />} />
                </Route>
              </Route>
            </Routes>
          </AuthProvider>
        </QueryClientProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
