import Carousel from '../components/home-page/Carousel/Carousel';
import FeaturedIn from '../components/home-page/FeaturedIn/FeaturedIn';
import HeroSection from '../components/home-page/HeroSection/HeroSection';
import HowItWorks from '../components/home-page/HowItWorks/HowItWorks';
import Footer from '../components/ui/Footer';

function HomePage() {
  return (
    <div>
      <HeroSection />
      <FeaturedIn />
      <HowItWorks />
      <Carousel />
      <Footer />
    </div>
  );
}

export default HomePage;
