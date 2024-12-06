import Contact from "../components/Contact";
import Team from "../components/Team";
import Fleet from "../components/Fleet";
import Commitment from "../components/Commitment";
import CompanyHistory from "../components/CompanyHistory";

const AboutUs = () => {
  return (
    <div className="bg-primary-background text-primary-text">
      <div className="container mx-auto px-5 py-12 lg:py-8">
        {/* Company History */}
        <CompanyHistory />
        {/* Our Team */}
        <Team />
        {/* Our Fleet  & Commitment*/}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Fleet />
          <Commitment />
        </div>
        {/* Contact Information */}
        <Contact />
      </div>
    </div>
  );
};

export default AboutUs;
