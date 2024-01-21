import Header from "../components/Header"
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import React from "react";

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps>= ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Hero />
      <main className="container mx-auto py-10 flex-1">
        { children }
      </main>
      <Footer />
    </div>
  )
}

export default Layout;