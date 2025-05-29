"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { AlertCircle, Home, RotateCcw, Bug } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function Error({
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
    <div className="h-screen w-full flex items-center justify-center bg-background">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="max-w-md px-4"
      >
        <Card className="border-destructive/20 shadow-lg">
          <CardHeader className="pb-2 text-center">
            <div className="flex justify-center mb-4">
              <motion.div
                animate={{ 
                  scale: [1, 1.05, 1],
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                }}
                className="rounded-full bg-destructive/10 p-4"
              >
                <AlertCircle className="h-12 w-12 text-destructive" />
              </motion.div>
            </div>
            <CardTitle className="text-2xl font-bold">Something went wrong!</CardTitle>
          </CardHeader>
          <CardContent className="text-center py-4">
            <p className="text-muted-foreground mb-4">
              We apologize for the inconvenience. The system has encountered an error.
            </p>
            <div className="bg-muted/50 p-4 rounded-md mb-2 text-left overflow-auto max-h-32">
              <div className="flex items-start gap-2">
                <Bug className="h-4 w-4 mt-0.5 text-muted-foreground flex-shrink-0" />
                <code className="text-xs font-mono text-muted-foreground overflow-x-auto">
                  {error?.message || "An unknown error occurred"} 
                  {error?.digest && <span className="block mt-1 text-xs opacity-50">ID: {error.digest}</span>}
                </code>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button 
              className="w-full sm:w-auto gap-2" 
              onClick={() => reset()}
            >
              <RotateCcw className="h-4 w-4" />
              Try again
            </Button>
            <Button asChild variant="outline" className="w-full sm:w-auto gap-2">
              <Link href="/">
                <Home className="h-4 w-4" />
                Back to Dashboard
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-8 text-sm text-muted-foreground"
        >
          If this problem persists, please contact support with the error details.
        </motion.div>
      </motion.div>
    </div>
  );
}