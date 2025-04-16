export default function HeroSection() {
  return (
    <section className="bg-gray-800 text-white">
      <div className="relative overflow-hidden">
        {/* Background image with overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat" 
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1590682680695-43b964a3ae17?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')",
            opacity: 0.4
          }}
        ></div>
        <div className="absolute inset-0 bg-black opacity-60"></div>
        
        {/* Content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col items-center text-center py-24 md:py-32">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Revolutionize Your Call Analysis
            </h2>
            <p className="text-lg md:text-xl max-w-3xl mb-10">
              Harness the power of AI to transform your customer interactions with automated call categorization, 
              real-time transcription, and advanced sales performance enhancements that deliver real, actionable results.
            </p>
            <div>
              <a 
                href="#features" 
                className="inline-block bg-primary hover:bg-secondary text-white font-bold py-3 px-8 rounded-full transition duration-300"
              >
                Get Started
              </a>
              <a 
                href="#sales-performance" 
                className="inline-block ml-4 bg-transparent hover:bg-white hover:bg-opacity-10 text-white font-bold py-3 px-8 rounded-full border-2 border-white transition duration-300"
              >
                Increase Your Sales
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 