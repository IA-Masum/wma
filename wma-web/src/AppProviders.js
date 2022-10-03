import AppRoutes from "./AppRoutes";
import { AuthProvider } from "./Contexts/AuthContext";
import { IncomeProvider } from "./Contexts/IncomeContext";
import { IncomeSectorProvider } from "./Contexts/IncomeSectorContext";
import { ProfileProvider } from "./Contexts/ProfileContext";

function AppProviders() {
  return (
    <>
      <AuthProvider>
        <ProfileProvider>
          <IncomeSectorProvider>
            <IncomeProvider>
              <AppRoutes />
            </IncomeProvider>
          </IncomeSectorProvider>
        </ProfileProvider>
      </AuthProvider>
    </>
  );
}

export default AppProviders;
