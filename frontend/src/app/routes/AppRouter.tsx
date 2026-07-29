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
  //ProfilePage,
  //VisitorProfilePage,
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

        {/* Rutas privadas */}
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

          
          {/*<Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />*/}

          <Route 
            path="/config"
            element={<ConfigPage />}
          />
        </Route>

        {/* Rutas públicas */}
        <Route 
          element={<AuthLayout />}
        > 
          <Route 
            path="/login" 
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            } 
          />

          <Route 
            path="/register" 
            element={
              <PublicRoute>
                <RegisterPage />
              </PublicRoute>
            } 
          />
        </Route>
        
      </Routes>
    </BrowserRouter>
  )
}