import React from "react";
import { AuthProvider } from "./Contexts/AuthContext";
import Navigation from "./Components/Navigation";

const App = () => (
  <>
    <AuthProvider>
      <Navigation />
    </AuthProvider>
  </>
);

export default App;
