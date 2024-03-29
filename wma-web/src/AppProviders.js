import AppRoutes from "./AppRoutes";
import { AuthProvider } from "./Contexts/AuthContext";
import { ExpenceProvider } from "./Contexts/ExpenceContext";
import { ExpenceSectorProvider } from "./Contexts/ExpenceSectorContext";
import { IncomeProvider } from "./Contexts/IncomeContext";
import { IncomeSectorProvider } from "./Contexts/IncomeSectorContext";
import { LoanProvider } from "./Contexts/LoanContext";
import { LoanSectorProvider } from "./Contexts/LoanSectorContext";
import { ProfileProvider } from "./Contexts/ProfileContext";

function AppProviders() {
  return (
    <>
      <AuthProvider>
        <ProfileProvider>
          <IncomeSectorProvider>
            <IncomeProvider>
              <ExpenceSectorProvider>
                <ExpenceProvider>
                  <LoanSectorProvider>
                    <LoanProvider>
                      <AppRoutes />
                    </LoanProvider>
                  </LoanSectorProvider>
                </ExpenceProvider>
              </ExpenceSectorProvider>
            </IncomeProvider>
          </IncomeSectorProvider>
        </ProfileProvider>
      </AuthProvider>
    </>
  );
}

export default AppProviders;
