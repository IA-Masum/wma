import AppRoutes from "./AppRoutes";
import { AuthProvider } from "./Contexts/AuthContext";
import { IncomeSectorProvider } from "./Contexts/IncomeSectorContext";
import { ProfileProvider } from "./Contexts/ProfileContext";

function AppProviders() {
  return (
    <>
      <AuthProvider>
        <ProfileProvider>
          <IncomeSectorProvider>
            <AppRoutes />
          </IncomeSectorProvider>
        </ProfileProvider>
      </AuthProvider>
    </>
  );
}

export default AppProviders;
