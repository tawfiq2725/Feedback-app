import CtaSection from "../components/user/CtaSection";
import Features from "../components/user/Features";
import HeroSection from "../components/user/HeroSection";

const Home = () => {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100">
        <HeroSection />
        <Features />
        <CtaSection />
        
      </div>
    </>
  );
};

export default Home;
