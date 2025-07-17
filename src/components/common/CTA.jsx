// CTA Section Component
const CTASection = () => {
  return (
    <section className="py-16 px-6 bg-gradient-to-r from-orange-500 to-red-500 text-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-6">
          Embrace the joy of cooking with us!
        </h2>
        <p className="text-xl mb-8">
          Join our community of passionate Kenyan chefs and food lovers.
          Your culinary adventure begins now!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-white text-orange-500 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold transition-colors">
            Get Started
          </button>
          <button className="border-2 border-white hover:bg-white hover:text-orange-500 px-8 py-4 rounded-lg font-semibold transition-colors">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
};

export default CTASection