import Hero from '../components/home/Hero';
import Metrics from '../components/home/Metrics';
import Features from '../components/home/Features';
import HowItWorks from '../components/home/HowItWorks';
import TechStack from '../components/home/TechStack';
import AboutProject from '../components/home/AboutProject';
import CTA from '../components/home/CTA';

export default function HomePage() {
  return (
    <div className="dark:bg-gray-900 dark:text-white overflow-x-hidden">
      <Hero />
      <Metrics />
      <Features />
      <HowItWorks />
      
      <AboutProject />
      <CTA />
    </div>
  );
}