import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { ThemeProvider } from "./components/theme/ThemeProvider";

// Layout
import Layout from "./components/layout/Layout";

// Pages
import Home from "./pages/Home";
import LoadingPage from "./pages/LoadingPage";

// Lazy-loaded pages for better performance
const About = lazy(() => import("./pages/About"));
const Projects = lazy(() => import("./pages/Projects"));
const ProjectDetail = lazy(() => import("./pages/ProjectDetail"));
const Contact = lazy(() => import("./pages/Contact"));
const Admin = lazy(() => import("./pages/Admin"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider defaultTheme="light">
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="sobre" element={
                <Suspense fallback={<LoadingPage />}>
                  <About />
                </Suspense>
              } />
              <Route path="projetos" element={
                <Suspense fallback={<LoadingPage />}>
                  <Projects />
                </Suspense>
              } />
              <Route path="projetos/:id" element={
                <Suspense fallback={<LoadingPage />}>
                  <ProjectDetail />
                </Suspense>
              } />
              <Route path="contato" element={
                <Suspense fallback={<LoadingPage />}>
                  <Contact />
                </Suspense>
              } />
              <Route path="admin" element={
                <Suspense fallback={<LoadingPage />}>
                  <Admin />
                </Suspense>
              } />
              <Route path="*" element={
                <Suspense fallback={<LoadingPage />}>
                  <NotFound />
                </Suspense>
              } />
            </Route>
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;