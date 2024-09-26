import { useMemo, useState } from "react";
import { AuthContext, IAuthContext } from "./contexts";
import { Router } from "./router";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const contextValue = useMemo<IAuthContext>(
    () => ({
      isAuthenticated,
      signIn: () => setIsAuthenticated(true),
      signOut: () => setIsAuthenticated(false),
    }),
    [isAuthenticated]
  );

  return (
    <AuthContext.Provider value={contextValue}>
      <Router />
    </AuthContext.Provider>
  );
}

export default App;
