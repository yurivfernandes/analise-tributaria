import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Benefits from '../components/Benefits';
import Features from '../components/Features';
import Pricing from '../components/Pricing';
import Footer from '../components/Footer';
import { PageTitle } from '../components/PageTitle';

const HomePage = () => {
  return (
    <div className="min-h-screen">
      <PageTitle title="Início" />
      <Header />
      <Hero />
      <Benefits />
      <Features />
      <Pricing />
      <Footer />
    </div>
  );
};

export default HomePage;