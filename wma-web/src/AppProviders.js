import AppRoutes from "./AppRoutes";
import { AuthProvider } from "./Contexts/AuthContext";
import { ProfileProvider } from "./Contexts/ProfileContext";

function AppProviders() {
  return (
    <>
      <AuthProvider>
        <ProfileProvider>
          <AppRoutes />
        </ProfileProvider>
      </AuthProvider>
    </>
  );
}

export default AppProviders;
