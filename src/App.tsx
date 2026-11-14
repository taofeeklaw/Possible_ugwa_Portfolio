/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { WorkSection } from './components/WorkSection';
import { WhyMeSection } from './components/WhyMeSection';
import { ContactFooter } from './components/ContactFooter';

export default function App() {
  return (
    <div className="min-h-screen bg-[#09090B] text-[#FAFAFA]">
      <Navbar />
      <main>
        <Hero />
        <AboutSection />
        <WorkSection />
        <WhyMeSection />
      </main>
      <ContactFooter />
    </div>
  );
}
