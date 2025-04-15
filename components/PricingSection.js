export default function PricingSection() {
  const pricingPlans = [
    {
      name: "Basic",
      price: "$29",
      period: "/month",
      description: "Perfect for startups and small teams needing essential features.",
      features: [
        "Up to 100 calls per month",
        "Basic call categorization",
        "AI transcription",
        "Email support",
        "7-day call history"
      ],
      buttonText: "Sign Up",
      highlighted: false
    },
    {
      name: "Pro",
      price: "$59",
      period: "/month",
      description: "Designed for growing businesses that require advanced analytics and insights.",
      features: [
        "Up to 500 calls per month",
        "Advanced call categorization",
        "AI transcription with sentiment analysis",
        "Priority email support",
        "30-day call history",
        "Custom reporting"
      ],
      buttonText: "Sign Up",
      highlighted: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      description: "Tailor-made solutions for large organizations with specific requirements.",
      features: [
        "Unlimited calls",
        "Advanced call categorization with custom rules",
        "AI transcription with advanced analytics",
        "24/7 dedicated support",
        "90-day call history",
        "Custom integrations",
        "Dedicated account manager"
      ],
      buttonText: "Contact Us",
      highlighted: false
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Pricing Plans</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose the perfect plan for your business needs. All plans include our core features to help you transform your call analysis.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <div 
              key={index} 
              className={`rounded-lg overflow-hidden shadow-lg ${
                plan.highlighted 
                  ? 'transform scale-105 z-10 border-2 border-primary' 
                  : 'bg-white'
              }`}
            >
              <div className={`p-8 ${plan.highlighted ? 'bg-primary bg-opacity-5' : 'bg-white'}`}>
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="flex items-end mb-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-gray-600 ml-1">{plan.period}</span>
                </div>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                <button 
                  className={`w-full py-3 rounded-md font-bold ${
                    plan.highlighted 
                      ? 'bg-primary text-white hover:bg-secondary' 
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  } transition duration-300`}
                >
                  {plan.buttonText}
                </button>
              </div>
              <div className="bg-white p-8">
                <h4 className="font-bold text-lg mb-4">Features Include:</h4>
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">Need a custom solution? We're here to help!</p>
          <a 
            href="#contact" 
            className="inline-block bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-8 rounded-full transition duration-300"
          >
            Contact Our Sales Team
          </a>
        </div>
      </div>
    </section>
  );
} 