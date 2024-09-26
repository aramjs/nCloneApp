import { useMemo, useState } from "react";
import { AuthContext, IAuthContext } from "./contexts";
import { RouterProvider } from "@tanstack/react-router";
import { router } from "./router";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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
      <RouterProvider router={router} />
    </AuthContext.Provider>
  );
}

export default App;
