import React, { use, useEffect } from "react";

declare global {
  interface Window {
    __INITIAL_DATA__?: any;
  }
}
import AppRoutes from "./routes";

const App: React.FC = () => {
  const initialData =
    typeof window !== "undefined" ? window.__INITIAL_DATA__ : {};

  return <AppRoutes {...initialData} />;
};

export default App;
