"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertOctagon, RefreshCw, Home } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <div className="h-screen w-full flex items-center justify-center bg-gray-50 dark:bg-gray-900">
          <div className="w-full max-w-md px-4 py-8 text-center">
            <div className="flex justify-center mb-8">
              <div className="rounded-full bg-red-100 dark:bg-red-900/30 p-6">
                <AlertOctagon className="h-16 w-16 text-red-600 dark:text-red-400" />
              </div>
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 mb-3">
              Fatal Application Error
            </h1>

            <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg">
              We're sorry, but something went catastrophically wrong.
            </p>

            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md mb-8 text-left mx-auto max-w-sm">
              <p className="text-sm font-mono text-gray-700 dark:text-gray-300 break-all">
                {error?.message || "An unknown error occurred"}
                {error?.digest && <span className="block mt-2 text-xs opacity-60">Error ID: {error.digest}</span>}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => reset()}
                className="inline-flex items-center justify-center gap-2 rounded-md bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-700 dark:hover:bg-blue-600"
              >
                <RefreshCw className="h-4 w-4" />
                Restart Application
              </button>
              
              <Link 
                href="/"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
              >
                <Home className="h-4 w-4" />
                Go to Home
              </Link>
            </div>

            <p className="mt-8 text-xs text-gray-500 dark:text-gray-500">
              Please try refreshing the page. If the problem persists, contact your administrator.
            </p>
          </div>
        </div>
      </body>
    </html>
  );
}