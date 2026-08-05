import { createBrowserRouter, Navigate } from "react-router";
import App from "../layout/App";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import ActivityDetailPage from "../../features/activities/dashboard/details/ActivityDetailPage";
import RequireAuth from "./RequireAuth";
import ActivityForm from "../../features/activities/dashboard/form/ActivityForm";
import HomePage from "../../features/activities/dashboard/home/HomePage";
import Counter from "../../features/activities/dashboard/counter/Counter";
import NotFound from "../../features/activities/dashboard/errors/NotFound";
import TestErrors from "../../features/activities/dashboard/errors/TestErrors";
import ServerError from "../../features/activities/dashboard/errors/ServerError";
import LoginForm from "../../features/activities/dashboard/account/LoginForm";
import RegisterForm from "../../features/activities/dashboard/account/RegisterForm";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                element: <RequireAuth />, children: [
                    { path: 'activities', element: <ActivityDashboard /> },
                    { path: 'activities/:id', element: <ActivityDetailPage /> },
                    { path: 'createActivity', element: <ActivityForm key='create' /> },
                    { path: 'manage/:id', element: <ActivityForm /> },
                ]
            },
            { path: '', element: <HomePage /> },
            { path: 'counter', element: <Counter /> },
            { path: 'errors', element: <TestErrors /> },
            { path: 'not-found', element: <NotFound /> },
            { path: 'server-error', element: <ServerError /> },
            { path: 'login', element: <LoginForm /> },
            { path: 'register', element: <RegisterForm /> },
            { path: '*', element: <Navigate replace to='/not-found' /> }
        ]
    },
]);