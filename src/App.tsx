import { HashRouter } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <HashRouter>
      <MainLayout>
        <AppRoutes />
      </MainLayout>
    </HashRouter>
  );
}

export default App;
