import { Navbar } from './components/Navbar/Navbar';
import { Hero } from './components/Hero/Hero';
import { TechStack } from './components/TechStack/TechStack';
import { AboutSection } from './components/AboutSection/AboutSection';
import { ExperienceSection } from './components/ExperienceSection/ExperienceSection';
import { TechExpertiseSection } from './components/TechExpertiseSection/TechExpertiseSection';
import { ProjectsSection } from './components/ProjectsSection/ProjectsSection';
import { ResearchSection } from './components/ResearchSection/ResearchSection';
import { LeadershipSection } from './components/LeadershipSection/LeadershipSection';
import { BeyondSection } from './components/BeyondSection/BeyondSection';
import { ContactSection } from './components/ContactSection/ContactSection';
import { MeteorShower } from './components/MeteorShower/MeteorShower';
import { Footer } from './components/Footer/Footer';
import { ScrollToTop } from './components/ScrollToTop/ScrollToTop';
import styles from './App.module.css';

function App() {

  return (
    <div className={styles.page}>
      <div className={styles.backgroundGrid} aria-hidden="true" />
      <Navbar />
      <Hero />
      <TechStack />

      {/* Meteor shower zone: covers from About through Contact */}
      <div className={styles.meteorZone}>
        <MeteorShower count={22} />

        <main className={styles.sections}>
          <AboutSection />
          <ExperienceSection />
          <TechExpertiseSection />
          <ProjectsSection />
          <ResearchSection />
          <LeadershipSection />
          <BeyondSection />
          <ContactSection />
        </main>
      </div>

      <Footer />
      <ScrollToTop />
    </div>
  );
}

export default App;
