export default function TotalCallInsightsSection() {
  const metrics = [
    {
      title: "Daily Calls",
      value: "64",
      icon: (
        <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      )
    },
    {
      title: "Weekly Volume",
      value: "420",
      icon: (
        <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      )
    },
    {
      title: "Average Duration",
      value: "5:32",
      icon: (
        <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: "Follow-ups Created",
      value: "93",
      icon: (
        <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
        </svg>
      )
    }
  ];

  return (
    <section id="call-insights" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Every Call at a Single Glance</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get complete visibility into your call activity with real-time metrics that let you understand your business at a glance.
          </p>
        </div>
        
        {/* Central Total Calls Metric */}
        <div className="flex justify-center mb-16">
          <div className="bg-white rounded-full shadow-xl p-8 text-center w-64 h-64 flex flex-col justify-center items-center">
            <div className="text-5xl md:text-6xl font-bold text-primary mb-2">250</div>
            <div className="text-xl font-semibold text-gray-700">Total Calls</div>
            <div className="text-sm text-gray-500 mt-2">This Month</div>
          </div>
        </div>
        
        {/* Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {metrics.map((metric, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
              <div className="mb-4">
                {metric.icon}
              </div>
              <div className="text-3xl font-bold text-gray-800 mb-1">{metric.value}</div>
              <div className="text-gray-600 font-medium">{metric.title}</div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <a 
            href="#detailed-breakdown" 
            className="inline-block bg-primary hover:bg-secondary text-white font-bold py-3 px-8 rounded-full transition duration-300"
          >
            View Detailed Breakdown
          </a>
        </div>
      </div>
    </section>
  );
} 