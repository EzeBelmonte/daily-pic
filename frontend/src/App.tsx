import "./styles/App.css"
import { AppRouter } from "@/app/routes/AppRouter";

import { AlertToaster } from "./components";

function App() {
  return (
    <>
      {/* Mensaje similar a alert */}
      <AlertToaster />
      <AppRouter />
    </>
  )
}

export default App
