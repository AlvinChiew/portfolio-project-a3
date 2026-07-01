import Link from 'next/link';
import GetActivationCodeButton from '../components/GetActivationCodeButton';

const IntroSection = () => {
  return (
    <section id="about" className="pt-24 lg:pt-28">
      <div className="py-16 md:py-20">
        <div>
          <h1 className="mb-2 text-4xl font-bold text-white md:text-5xl">
            Project A3
          </h1>
          <p className="mb-4 text-xl text-a3Accent">Alvin • AI • Automation</p>
          <p className="mb-2 text-lg font-semibold text-white">
            Made Simple, For Business.
          </p>
          <p className="mb-6 text-secondaryText">
            🚀 Showcase FRI · 🔨 Build TUES
          </p>
          <p className="mb-6 text-justify text-secondaryText">
            Project A3 builds a series of small, simple AI and automation
            utility tools that solve one business problem at a time.
          </p>
          <ul className="mb-8 list-inside list-disc space-y-2 text-secondaryText">
            <li>Simple, minimal, and friendly for non-technical users</li>
            <li>Self-managed on your device — data stays local</li>
            <li>Free with no paid subscriptions; BYOK where APIs are needed</li>
            <li>Progressive tool series: ep01, ep02, and beyond</li>
          </ul>
          <div className="flex flex-wrap gap-4">
            <GetActivationCodeButton />
            <Link
              href="#tools"
              className="rounded-full border border-borderline px-6 py-3 text-white hover:border-a3Accent hover:text-a3Accent"
            >
              Explore tools
            </Link>
            <Link
              href="https://project-a3-board.userjot.com"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-borderline px-6 py-3 text-white hover:border-a3Accent hover:text-a3Accent"
            >
              Bugs & feature requests
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;
