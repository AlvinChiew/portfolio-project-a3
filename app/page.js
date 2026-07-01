import Navbar from "./components/Navbar";
import IntroSection from "./sections/IntroSection";
import ToolsSection from "./sections/ToolsSection";
import EmailSection from "./sections/EmailSection";
import Footer from "./components/Footer";
import SignUpModalProvider from "./components/SignUpModalProvider";

export default function Home() {
  return (
    <SignUpModalProvider>
      <main className="bg-backdrop flex min-h-screen flex-col">
        <Navbar />
        <div className="container mx-auto px-12">
          <IntroSection />
          <ToolsSection />
          <EmailSection />
        </div>
        <Footer />
      </main>
    </SignUpModalProvider>
  );
}
