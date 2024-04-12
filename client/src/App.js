import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./config/theme";
import { Layout } from "./components/shared/Layout";
import { Route, Routes } from "react-router-dom";
import NotFound from "./components/shared/NotFound";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <ToastContainer />
        </Layout>
      </ThemeProvider>
    </>
  );
}

export default App;
