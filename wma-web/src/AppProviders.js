import AppRoutes from "./AppRoutes";
import { AuthProvider } from "./Contexts/AuthContext";

function AppProviders() {
  return ( <>
  <AuthProvider>
    <AppRoutes/>
  </AuthProvider>
  </> );
}

export default AppProviders;