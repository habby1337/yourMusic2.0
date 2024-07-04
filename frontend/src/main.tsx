import React from "react";
import ReactDOM from "react-dom/client";
import * as Sentry from '@sentry/react'
import App from "./App.tsx";
import { createBrowserRouter, createRoutesFromChildren, matchRoutes, RouterProvider, useLocation, useNavigationType } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { Toaster } from "react-hot-toast";
import "./index.css";
import "react-loading-skeleton/dist/skeleton.css";
import DiscoverGenre from "./ui/DicoverGenre.tsx";
import { AuthorizeMe } from "./ui/AuthorizeMe.tsx";
import { SecretPanel } from "./ui/SecretPanel.tsx";


const queryClient = new QueryClient();

Sentry.init({
	dsn: import.meta.env.VITE_SENTRY_DSN, 
	integrations: [
		Sentry.reactRouterV6BrowserTracingIntegration({
			useEffect: React.useEffect,
			useLocation,
			useNavigationType,
			createRoutesFromChildren,
			matchRoutes
		}),
		Sentry.replayIntegration(),
	],
	tracesSampleRate: 1.0,
	tracePropagationTargets: ["localhost", /^https:\/\/sp.tensi\.dev\/.*/, / * /],
	replaysSessionSampleRate: 0.1,
	replaysOnErrorSampleRate: 1.0
})

const sentryCreateBrowserRouter = Sentry.wrapCreateBrowserRouter(createBrowserRouter)

const router = sentryCreateBrowserRouter([
	{ path: "/", Component: App },
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
