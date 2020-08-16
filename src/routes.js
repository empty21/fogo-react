import HomePage from "./pages/home/HomePage";
import AuthPage from "./pages/auth/AuthPage";
const routes = [
  {
    exact: false,
    path: "/auth",
    component: AuthPage
  },
  {
    exact: false,
    path: "/",
    component: HomePage
  },
]
export default routes;