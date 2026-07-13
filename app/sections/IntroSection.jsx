import Image from 'next/image';
import Link from 'next/link';
import GetActivationCodeButton from '../components/GetActivationCodeButton';
import ChannelsButton from '../components/ChannelsButton';

const IntroSection = () => {
  return (
    <section id="about" className="pt-24 lg:pt-40">
      <div className="grid grid-cols-1 sm:grid-cols-12">
        <div className="col-span-7 place-self-center justify-self-start text-center sm:text-left">
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
            Project A3 builds and showcases a series of{' '}
            <b>FREE AI and automation tools</b> that solves one business problem
            at a time.
          </p>
          <ul className="mb-8 list-inside list-disc space-y-2 text-secondaryText">
            <li>Simple, minimal, and friendly for non-technical users</li>
            <li>Self-managed on your device — data stays local</li>
            <li>Free with no paid subscriptions; BYOK where APIs are needed</li>
            <li>Progressive tool series: ep01, ep02, and beyond</li>
          </ul>
          <div className="flex flex-wrap gap-4">
            <GetActivationCodeButton />
            {/* <Link
              href="#tools"
              className="rounded-full border border-borderline px-6 py-3 text-white hover:border-a3Accent hover:text-a3Accent"
            >
              Explore tools
            </Link> */}
            <Link
              href="https://feedback-project-a3.alvinchiew.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-borderline px-6 py-3 text-white hover:border-a3Accent hover:text-a3Accent"
            >
              Bugs & Feature Requests
            </Link>
            <ChannelsButton />
          </div>
        </div>
        <div className="col-span-5 my-6 place-self-center sm:place-self-start md:place-self-center lg:my-0">
          <div className="relative flex h-[250px] w-[250px] items-center justify-center overflow-hidden rounded-full bg-secondaryBackdrop lg:h-[400px] lg:w-[400px]">
            <Image
              src="/images/hero.png"
              alt="Project A3 hero"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 250px, 400px"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;
