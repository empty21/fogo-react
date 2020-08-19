import HomePage from "./pages/home/HomePage";
import AuthPage from "./pages/auth/AuthPage";
import AdminPage from "./pages/admin/AdminPage";
const routes = [
  {
    exact: false,
    path: "/auth",
    component: AuthPage
  },
  {
    exact: false,
    path: "/admin",
    component: AdminPage
  },
  {
    exact: false,
    path: "/",
    component: HomePage
  },

]
export default routes;