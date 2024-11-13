import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { TabProvider} from "./components/AdminPage/contexts/TabProvider/TabProvider";
import styles from "./App.scss";
import HomePage from "./components/HomePage";
import AdminPage from "./components/AdminPage";
import Header from "./components/Header";
import ProtectedRoute from "./components/ProtectRoute";
import "antd/dist/antd.min.css";
import { Notifications } from "react-push-notification";
import UserPage from "./components/UserPage";
import { UsersProvider } from "./contexts/UsersProvider";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <HomePage />
      ),
    },
    {
      path: "/admin",
      element: (
        <ProtectedRoute>
          <TabProvider>
            <AdminPage />
          </TabProvider>
        </ProtectedRoute>
      ),
    },
    {
      path: "/user",
      element: (
        <ProtectedRoute>
          <UserPage />
        </ProtectedRoute>
      ),
    },
  ]);

  return (
    <div className={styles.App}>
      <Notifications />
      <UsersProvider>
        <Header />
        <main>
          <RouterProvider router={router} />
        </main>
      </UsersProvider>
    </div>
  );
}

export default App;
