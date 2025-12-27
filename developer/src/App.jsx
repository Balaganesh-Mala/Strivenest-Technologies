import { DeveloperAuthProvider } from "./context/DeveloperAuthContext";
import DeveloperRoutes from "./routes/DeveloperRoutes";

export default function App() {
  return (
    <DeveloperAuthProvider>
      <DeveloperRoutes />
    </DeveloperAuthProvider>
  );
}
