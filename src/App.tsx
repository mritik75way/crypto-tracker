import { RouterProvider } from "react-router-dom";
import { ConfigProvider } from "antd";
import { theme } from "./config/theme";
import { router } from "./routes/router";
import { ClerkProvider } from "@clerk/clerk-react";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

function App() {
  return (
    <ConfigProvider theme={theme}>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
        <RouterProvider router={router} />
      </ClerkProvider>
    </ConfigProvider>
  );
}

export default App;
