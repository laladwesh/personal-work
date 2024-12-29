import React from "react";

const AboutPage = () => {
  return (
    <div className="px-4 md:px-16 lg:px-28 bg-gray-100 font-montserrat">
      <div className="bg-white shadow-xl rounded-3xl items-center px-6 md:px-12 lg:px-16 py-6 md:py-8 hover:bg-secondary">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-heading font-montserrat mb-2 text-center lg:text-left">
          About Us
        </h2>
        <hr className="border-t-2 border-primary my-4" />
        <div className="space-y-8  ">
          <p>
            Shivalik Enterprises has been providing design and printing
            solutions since 2007, handled by our talented staff. We have
            developed as a prominent option in the market by listening to and
            understanding your needs, raising the standards of graphics and
            printing with revolutionary concepts.
          </p>
          <p>
            Our team is dedicated to delivering innovative excellence at
            competitive costs. With extensive experience in print and digital
            multimedia design, our multi-talented and disciplined professionals
            have built an impressive track record of delivering marketing
            communication solutions for local and international businesses
            across various industries.
          </p>
          <p>
            From traditional print marketing products like eye-catching business
            cards, brochures, catalogs, logos, packaging, and corporate identity
            kits, to a full range of luxurious, optimally functional multimedia
            websites, we handle it all with flair and precision. Our commitment
            to working closely with clients ensures satisfaction at every step
            until they are 100% delighted with the final result.
          </p>
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-8 my-8">
        <div className="w-full bg-white shadow-xl rounded-3xl items-center px-6 md:px-12 lg:px-16 py-6 md:py-8 hover:bg-secondary">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-heading font-montserrat mb-2 text-center lg:text-left">
            Why Choose Us?
          </h2>
          <hr className="border-t-2 border-primary my-4" />
          <div className="space-y-8">
          <p>
          We bring extensive experience and talent in Graphic Design, Typography, Color Scanning, Offset Printing, Finishing, Mailing, and Dispatch. From large business enterprises to small startups, we enhance your printing and marketing efforts.
          </p>
          <p>
          We work closely with clients to define the purpose of each project and find the most effective and efficient way to achieve success. We take pride in offering high-quality services with customized pricing to meet your specific needs. Whatever your goals and objectives, we are here to help you achieve them.
          </p>
          </div>
        </div>
        <div className="w-full bg-white shadow-xl rounded-3xl items-center px-6 md:px-12 lg:px-16 py-6 md:py-8 hover:bg-secondary">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-heading font-montserrat mb-2 text-center lg:text-left">
            Our Misson & Vision
          </h2>
          <hr className="border-t-2 border-primary my-4" />
          <div className="space-y-8">
            <p>
            Our mission is to be a customer-oriented organization that leads through value-added services, leveraging our people, effective communication channels, and technology management. We are dedicated to achieving customer satisfaction and empowering our employees, driving innovation and excellence.
            </p>
            <p>
            Our vision is to collaborate with our customers to help them achieve their goals, ensuring mutual success. Guided by principles of honesty, integrity, dedication, and commitment, we prioritize dignity and respect in every interaction with customers and suppliers. Our success is intrinsically linked to the success of our clients, and together, we strive for excellence and innovation in everything we do.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
