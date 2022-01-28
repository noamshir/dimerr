import { Explore } from "./pages/Explore.jsx";
import { Home } from "./pages/Home.jsx";
import { GigDetails } from "./pages/GigDetails";
import { BecomeSeller } from "./pages/BecomeSeller";
import { UserProfile } from "./pages/UserProfile";
import { Checkout } from "./pages/Checkout";
import { DashBoard } from "./pages/Dashboard.jsx";
const routes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/checkout/:gigId",
    component: Checkout,
  },
  {
    path: "/explore/:gigId",
    component: GigDetails,
  },
  {
    path: "/profile/:userId",
    component: UserProfile,
  },
  {
    path: "/explore",
    component: Explore,
  },
  {
    path: "/becomeSeller",
    component: BecomeSeller,
  },
  {
    path: "/dashboard/:id",
    component: DashBoard,
  },
];

export default routes;
