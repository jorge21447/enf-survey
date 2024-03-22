import { createBrowserRouter } from "react-router-dom";
import Layout from "./layouts/Layout";
import AdminLayout from "./layouts/AdminLayout";
import Login from "./views/Login";
import Register from "./views/Register";
import AuthLayout from "./layouts/AuthLayout";
import Index from "./views/Index";
import Users from "./views/Users";
import Surveys from "./views/Surveys";
import SurveyCreator from "./views/SurveyCreator";
import Reports from "./views/Reports";
import Pettycash from "./views/Pettycash";
import Settings from "./views/Settings";

import IndexAdmin from "./views/IndexAdmin";
import UsersEdit from "./views/UsersEdit";

const router = createBrowserRouter([
  {
    path: "/test",
    element: <SurveyCreator />,
  },

  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Index />,
      },
      {
        path: "/users",
        element: <Users />,
      },
      {
        path: "/surveys",
        element: <Surveys />,
      },
      {
        path: "/reports",
        element: <Reports />,
      },
      {
        path: "/pettycash",
        element: <Pettycash />,
      },
      {
        path: "/settings",
        element: <Settings />,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "/auth/login",
        element: <Login />,
      },
      {
        path: "/auth/register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <IndexAdmin />,
      },
      {
        path: "/admin/users",
        element: <Users />,
      },
      {
        path: "/admin/users/edit/:id",
        element: <UsersEdit />,
      },
      {
        path: "/admin/surveys",
        element: <Surveys />,
      },
      {
        path: "/admin/surveys/create",
        element: <SurveyCreator />,
      },
      {
        path: "/admin/reports",
        element: <Reports />,
      },
      {
        path: "/admin/pettycash",
        element: <Pettycash />,
      },
      {
        path: "/admin/settings",
        element: <Settings />,
      },
    ],
  },
]);

export default router;
