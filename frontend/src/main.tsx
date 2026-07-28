import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

import { AuthProvider } from './app/providers/AuthProvider.tsx'
import { UsersProvider } from './app/providers/UsersProvider.tsx'
import { PostsProvider } from './app/providers/PostsProvider.tsx'
//import { FollowsProvider } from './app/providers/FollowsProvider.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <PostsProvider>
        <UsersProvider>
            <App />
        </UsersProvider>
      </PostsProvider>
    </AuthProvider>
  </StrictMode>,
)
