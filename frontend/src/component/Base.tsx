import { Navbar } from '@/navigation/NavbarTwoColumns';

import { Meta } from '../layout/Meta';
import { AppConfig } from '../utils/AppConfig';
import { Banner } from './Banner';
import { Footer } from './Footer';
import { Hero } from './Hero';
import { HorizontalFeatures } from './HorizontalFeatures';
import { HorizontalProfileCards } from './HorizontalProfileCards';

const Base = () => (
  <div className="overflow-x-hidden bg-[#FDF5EA]">
    <Meta title={AppConfig.title} description={AppConfig.description} />
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <Hero />
    </div>
    <div>
      <HorizontalFeatures />
      <HorizontalProfileCards />
      <Banner />
      <Footer />
    </div>
  </div>
);

export { Base };
