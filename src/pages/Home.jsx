import React from 'react';
import "../styles/Home.css";
import FeatureGrid from '../components/FeatureGrid';
import NavBar from '../components/NavBar';

function Home() {
  return (
    <div className="homepage">
      <NavBar />

      <div className="feature-grid">
        <FeatureGrid title="TO-DO list" description="You attract what you are" buttonText="Tasks " icon="/icons/advice.png" link="/taskList" />
        <FeatureGrid title="Manifestation" description="Day 1 of 28" buttonText="Continue" icon="/icons/manifest.png" link="/MagicHome" />
        <FeatureGrid title="Readdd" description="Start Designing" buttonText="Start" icon="/icons/therapy.png" link="/books" />
        <FeatureGrid title="Journey" description="Write today’s positive" buttonText="Journal" icon="/icons/journey.png" link="/journey" />
      </div>

      <footer className="footer"  style={{ fontFamily: '"Press Start 2P", cursive' }}>
        <p>
        <img src="/decor/bunny2.jpg" className="inline-pixel small" alt="" />
          Made with 💛 by nini
        </p>
      </footer>
    </div>
  );
}

export default Home;
