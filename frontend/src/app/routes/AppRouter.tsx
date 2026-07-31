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
  PostPage,
} from "@/features";

import { ProtectedRoute } from "./ProtectedRoute";
import { PublicRoute } from "./PublicRoute";
import RootRedirect from "./RootRedirect";

export function AppRouter() {

  return (
    <BrowserRouter>
      <Routes>

        {/* REDIRECCIÓN INICIAL */}
        <Route 
          path="/" 
          element={<RootRedirect />} 
        />

        {/* RUTAS PÚBLICAS */}
        <Route 
          element={<MainLayout />}
        > 
          <Route 
            path="/post/:postId" 
            element={<PostPage />} 
          />
        </Route>

        {/* RUTAS DE AUTENTICACIÓN */}
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
      </Routes>
    </BrowserRouter>
  )
}