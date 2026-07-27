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

export function AppRouter() {

  return (
    <BrowserRouter>
      <Routes>

        {/* MAINLAYOUT */}
        <Route element={<MainLayout />} >
          
          <Route path="/" element={<HomePage />} />

          {/* Rutas privadas */}
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
            element={
              <ProtectedRoute>
                <ConfigPage />
              </ProtectedRoute>
            }
          />

          {/*<Route
            path="/profile/:username"
            element={
              <ProtectedRoute>
                <VisitorProfilePage />
              </ProtectedRoute>
            }
          />*/}

          {/*<Route
            path="/posts/:postId"
            element={
              <ProtectedRoute>
                <PostPage />
              </ProtectedRoute>
            }
          />*/}
        </Route>

        {/* AUTHLAYOUT */}
        <Route element={<AuthLayout />}>

          {/* Rutas públicas */}
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