export default function SalesPerformanceSection() {
  const roles = [
    {
      title: "For Owners",
      description: "Make informed business decisions with clear, data-backed performance metrics.",
      icon: (
        <svg className="w-14 h-14 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      benefits: [
        "Real-time visibility into team performance",
        "Clear ROI on sales and marketing efforts",
        "Data-driven decision making tools",
        "Identify top performers and winning strategies"
      ]
    },
    {
      title: "For Managers",
      description: "Automate training and receive real-time insights to coach your team effectively.",
      icon: (
        <svg className="w-14 h-14 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      benefits: [
        "Automated training based on real call data",
        "Identify coaching opportunities with analytics",
        "Track improvement over time with metrics",
        "Easily share winning call examples team-wide"
      ]
    },
    {
      title: "For Sales Staff",
      description: "Gain instant feedback to improve your approach and close more deals.",
      icon: (
        <svg className="w-14 h-14 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
      benefits: [
        "Immediate feedback after every call",
        "Learn from top-performing examples",
        "Personalized improvement suggestions",
        "Track your progress and celebrate wins"
      ]
    }
  ];

  const actionableInsights = [
    {
      title: "Boost Closing Rates",
      description: "Leverage data-driven insights to increase closing percentages and convert more prospects."
    },
    {
      title: "Automated Training",
      description: "Use real call data to identify training needs and improve team performance automatically."
    },
    {
      title: "Instant Feedback",
      description: "Provide immediate, actionable feedback to your sales staff after each call to improve techniques."
    }
  ];

  return (
    <section id="sales-performance" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Increase Closing Percentages – Get the Real Results</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Don't let marketers lie to you about call volume—get the real results. IntakeCoach delivers actionable 
            insights that directly impact your bottom line.
          </p>
        </div>

        {/* Actionable Insights */}
        <div className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {actionableInsights.map((insight, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-bold mb-3 text-primary">{insight.title}</h3>
                <p className="text-gray-700">{insight.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits by Role */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto mb-16">
          {roles.map((role, index) => (
            <div key={index} className="bg-white rounded-lg p-8 shadow-md">
              <div className="flex justify-center mb-6">
                {role.icon}
              </div>
              <h3 className="text-2xl font-bold text-center mb-4">{role.title}</h3>
              <p className="text-gray-600 text-center mb-6">{role.description}</p>
              <ul className="space-y-3">
                {role.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="bg-primary bg-opacity-10 rounded-lg p-8 max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-center mb-6">Key Performance Benefits</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="font-bold text-3xl text-primary mb-2">+42%</div>
              <p>Increased closing rates through data insights</p>
            </div>
            <div className="text-center">
              <div className="font-bold text-3xl text-primary mb-2">85%</div>
              <p>Of users report improved sales conversations</p>
            </div>
            <div className="text-center">
              <div className="font-bold text-3xl text-primary mb-2">3.5x</div>
              <p>ROI from automated training and feedback</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 