import React from 'react';
    import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
    import Header from './components/Header';
    import Hero from './components/Hero';
    import Features from './components/Features';
    import Benefits from './components/Benefits';
    import Pricing from './components/Pricing';
    import Footer from './components/Footer';
    import LoginPage from './pages/LoginPage';
    import SignupPage from './pages/SignupPage';
    import WelcomePage from './pages/WelcomePage';
    import CustomerRegistrationPage from './pages/CustomerRegistrationPage';
    import CNAEManagementPage from './pages/CNAEManagementPage';
    import ClientEditPage from './pages/ClientEditPage';

    function HomePage() {
      return (
        <div className="min-h-screen bg-white">
          <Header />
          <main>
            <Hero />
            <Features />
            <Benefits />
            <Pricing />
          </main>
          <Footer />
        </div>
      );
    }

    export default function App() {
      return (
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/welcome" element={<WelcomePage />} />
            <Route path="/customers/new" element={<CustomerRegistrationPage />} />
            <Route path="/cnae" element={<CNAEManagementPage />} />
            <Route path="/client/new" element={<ClientEditPage />} />
            <Route path="/client/:id" element={<ClientEditPage />} />
          </Routes>
        </Router>
      );
    }
