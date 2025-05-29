"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FileQuestion, ArrowLeft, Search } from 'lucide-react';

const NotFound = () => {
  const router = useRouter();

  // Subtle background animations
  const backgroundVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { duration: 0.8 }
    }
  };

  const contentVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6, 
        delay: 0.3,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const iconVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 100,
        delay: 0.5 
      }
    }
  };

  return (
    <motion.div 
      className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-background to-background/50 relative overflow-hidden"
      variants={backgroundVariants}
      initial="initial"
      animate="animate"
    >
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-primary/80" />
      
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-16 right-16 w-[400px] h-[400px] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-32 -left-20 w-[300px] h-[300px] rounded-full bg-blue-500/5 blur-3xl" />
        <svg className="absolute top-0 right-0 text-primary/10" width="404" height="404" fill="none" viewBox="0 0 404 404" aria-hidden="true">
          <defs>
            <pattern id="85737c0e-0916-41d7-917f-596dc7edfa27" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <rect x="0" y="0" width="4" height="4" className="text-primary/5" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="404" height="404" fill="url(#85737c0e-0916-41d7-917f-596dc7edfa27)" />
        </svg>
        <svg className="absolute bottom-0 left-0 text-primary/10" width="404" height="404" fill="none" viewBox="0 0 404 404" aria-hidden="true">
          <defs>
            <pattern id="85737c0e-0916-41d7-917f-596dc7edfa28" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <rect x="0" y="0" width="4" height="4" className="text-primary/5" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="404" height="404" fill="url(#85737c0e-0916-41d7-917f-596dc7edfa28)" />
        </svg>
      </div>

      <div className="container px-4 mx-auto relative z-10 flex flex-col items-center">
        <Link href="/" className="mb-16">
          <div className="flex items-center gap-2">
            {/* Replace with your actual logo */}
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-primary/80 flex items-center justify-center shadow-lg">
              <span className="text-primary-foreground font-bold text-xl">C</span>
            </div>
            <h3 className="text-2xl font-bold tracking-tight">Map My Tour</h3>
          </div>
        </Link>

        <Card className="w-full max-w-3xl border border-border/50 bg-card/95 backdrop-blur-sm shadow-xl overflow-hidden">
          <CardContent className="p-0">
            <div className="flex flex-col md:flex-row">
              <div className="bg-muted/50 p-8 md:p-10 md:w-[40%] flex flex-col justify-center items-center">
                <motion.div
                  variants={iconVariants}
                  initial="initial"
                  animate="animate"
                  className="relative"
                >
                  <div className="w-32 h-32 rounded-full bg-blue-500/10 flex items-center justify-center">
                    <FileQuestion className="h-16 w-16 text-blue-500" />
                  </div>
                  <motion.div 
                    className="absolute -top-2 -right-1 w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center shadow-lg"
                    animate={{ 
                      y: [0, -5, 0],
                      rotate: [0, -10, 0, 10, 0] 
                    }}
                    transition={{ 
                      duration: 5,
                      repeat: Infinity,
                      repeatType: "mirror"
                    }}
                  >
                    <Search className="h-6 w-6 text-white" />
                  </motion.div>
                </motion.div>
              </div>

              <motion.div 
                className="p-8 md:p-10 md:w-[60%]"
                variants={contentVariants}
                initial="initial"
                animate="animate"
              >
                <h1 className="text-3xl font-bold tracking-tighter mb-2">
                  Page Not Found
                </h1>
                <div className="w-20 h-1.5 bg-gradient-to-r from-blue-500 to-blue-500/50 rounded-full mb-6" />
                
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  The page you're looking for doesn't exist or has been moved. 
                  Please check the URL or navigate back to the home.
                </p>

                <div className="space-y-4">
                  <div className="flex flex-col gap-3 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      <span>Check for typos in the URL</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      <span>The page might have been moved or deleted</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      <span>Navigate to the home to find what you need</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                  <Button 
                    onClick={() => router.push('/')} 
                    variant="default" 
                    className="group"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                    Back to Home
                  </Button>
                  <Button 
                    onClick={() => router.back()} 
                    variant="outline"
                  >
                    Previous Page
                  </Button>
                </div>
              </motion.div>
            </div>
          </CardContent>
        </Card>

        <motion.p 
          className="mt-12 text-sm text-muted-foreground text-center"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: 1,
            transition: { delay: 1 }
          }}
        >
          Looking for something specific? <Link href="/support" className="text-primary hover:underline">Contact our support team</Link>
        </motion.p>
      </div>

      <div className="absolute bottom-4 w-full text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Climosphere. All rights reserved.
      </div>
    </motion.div>
  );
};

export default NotFound;