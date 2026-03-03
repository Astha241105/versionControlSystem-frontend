import ProjectRoutes from "./Routes.jsx";
import { AuthProvider } from "./authContext.jsx";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ProjectRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
