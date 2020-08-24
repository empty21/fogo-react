import MainPage from "./pages/main/MainPage";
import AuthPage from "./pages/auth/AuthPage";
import AdminPage from "./pages/admin/AdminPage";
const routes = [
  {
    exact: false,
    path: "/auth",
    component: AuthPage,
    key: "auth"
  },
  {
    exact: false,
    path: "/admin",
    component: AdminPage,
    key: "admin"
  },
  {
    exact: false,
    path: "/",
    component: MainPage,
    key: "main"
  },

]
export default routes;