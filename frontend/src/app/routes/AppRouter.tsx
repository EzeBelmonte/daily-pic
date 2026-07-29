import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import { 
  MainLayout, 
  AuthLayout, 
  HomePage, 
  LoginPage, 
  RegisterPage, 
  ProfilePage,
  ConfigPage,
  //PostPage,
} from "@/features";

import { ProtectedRoute } from "./ProtectedRoute";
import { PublicRoute } from "./PublicRoute";
import RootRedirect from "./RootRedirect";

export function AppRouter() {

  return (
    <BrowserRouter>
      <Routes>

        {/* Redirección inicial */}
        <Route 
          path="/" 
          element={<RootRedirect />} 
        />

        {/* RUTAS PRIVADAS */}
        <Route 
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          } 
        >
          <Route 
            path="/home" 
            element={<HomePage />} 
          />

          
          <Route
            path="/profile"
            element={
              <ProfilePage />
            }
          />

          <Route 
            path="/profile/:username"
            element={<ProfilePage />}
          />

          <Route 
            path="/config"
            element={<ConfigPage />}
          />
        </Route>

        {/* RUTAS PÚBLICAS */}
        <Route 
          element={
            <PublicRoute>
              <AuthLayout />
            </PublicRoute>}
        > 
          <Route 
            path="/login" 
            element={<LoginPage />} 
          />

          <Route 
            path="/register" 
            element={<RegisterPage />} 
          />
        </Route>
        
      </Routes>
    </BrowserRouter>
  )
}