import React from "react";
import ReactDOM from "react-dom/client";
import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from "react-router-dom";
import Home from "./routes/Home";
import Login from "./routes/Login";
import Register from "./routes/Register";

const router = createBrowserRouter(
	createRoutesFromElements([
		<Route key="home" path="/" element={<Home />} />,
		<Route key="login" path="/login" element={<Login />} />,
		<Route key="register" path="/register" element={<Register />} />,
	])
);

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
