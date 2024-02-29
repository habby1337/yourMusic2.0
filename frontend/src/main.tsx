import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { Toaster } from "react-hot-toast";
import "./index.css";
import "react-loading-skeleton/dist/skeleton.css";
import DiscoverGenre from "./ui/DicoverGenre.tsx";
import { AuthorizeMe } from "./ui/AuthorizeMe.tsx";
import { SecretPanel } from "./ui/SecretPanel.tsx";
import ErrorBoundary from "./ui/ErrorBoundary.tsx";

const queryClient = new QueryClient();
const router = createBrowserRouter([
	{ path: "/", Component: App, errorElement: <ErrorBoundary message="You moms a hoe" /> },
	{ path: "/discover/:genre?/:title?", Component: DiscoverGenre },
	{ path: "/authorizeMe", Component: AuthorizeMe },
	{ path: "/youAndMe:)", Component: SecretPanel },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router} />
			<Toaster
				toastOptions={{
					className: "dark:bg-background dark:text-white",
				}}
			/>
		</QueryClientProvider>
	</React.StrictMode>,
);
