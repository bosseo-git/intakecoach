export default function DetailedCallBreakdownSection() {
  const callCategories = [
    {
      title: "Potential Clients",
      count: "87",
      description: "New leads with high conversion potential",
      icon: (
        <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    },
    {
      title: "Spam Calls",
      count: "23",
      description: "Filtered and categorized as non-relevant",
      icon: (
        <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
        </svg>
      )
    },
    {
      title: "Vendors",
      count: "46",
      description: "Communications with suppliers and partners",
      icon: (
        <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      )
    },
    {
      title: "Missed Calls",
      count: "34",
      description: "Opportunities requiring follow-up",
      icon: (
        <svg className="w-10 h-10 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: "Voicemail",
      count: "19",
      description: "Messages received for callback",
      icon: (
        <svg className="w-10 h-10 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
        </svg>
      )
    },
    {
      title: "Existing Clients",
      count: "41",
      description: "Ongoing relationships and support",
      icon: (
        <svg className="w-10 h-10 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )
    }
  ];

  const topSuggestions = [
    {
      title: "Follow up with Sarah Johnson",
      description: "Potential client interested in home renovation services",
      priority: "High"
    },
    {
      title: "Return call to Michael Brown",
      description: "Existing client with questions about their project timeline",
      priority: "Medium"
    },
    {
      title: "Schedule training for new sales rep",
      description: "Based on call performance metrics from this week",
      priority: "Medium"
    },
    {
      title: "Review transcripts from top-performing calls",
      description: "Identify successful patterns to share with the team",
      priority: "High"
    },
    {
      title: "Optimize script for incoming vendor calls",
      description: "Current calls are running 2 minutes longer than necessary",
      priority: "Low"
    }
  ];

  return (
    <section id="detailed-breakdown" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Real-Time Data, Real-Time Action</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get a clear breakdown of your calls by category and receive actionable suggestions to improve your performance.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Call Categories */}
          <div>
            <h3 className="text-2xl font-bold mb-6">Detailed Call Breakdown</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {callCategories.map((category, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4 flex items-center">
                  <div className="bg-white rounded-full p-3 mr-4">
                    {category.icon}
                  </div>
                  <div>
                    <div className="flex items-baseline">
                      <span className="text-2xl font-bold mr-2">{category.count}</span>
                      <span className="font-medium">{category.title}</span>
                    </div>
                    <p className="text-sm text-gray-600">{category.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Top Suggestions */}
          <div>
            <h3 className="text-2xl font-bold mb-6">Top Suggestions</h3>
            <div className="bg-gray-50 rounded-lg p-6">
              <ul className="space-y-6">
                {topSuggestions.map((suggestion, index) => (
                  <li key={index} className="pb-4 border-b border-gray-200 last:border-0 last:pb-0">
                    <div className="flex items-start">
                      <div className={`flex-shrink-0 w-3 h-3 mt-1.5 mr-3 rounded-full ${
                        suggestion.priority === 'High' ? 'bg-red-500' : 
                        suggestion.priority === 'Medium' ? 'bg-yellow-500' : 'bg-green-500'
                      }`}></div>
                      <div>
                        <h4 className="font-bold text-gray-800">{suggestion.title}</h4>
                        <p className="text-sm text-gray-600">{suggestion.description}</p>
                        <div className="mt-1.5 text-xs font-medium text-gray-500">Priority: {suggestion.priority}</div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <a 
            href="#sales-performance" 
            className="inline-block bg-primary hover:bg-secondary text-white font-bold py-3 px-8 rounded-full transition duration-300"
          >
            See How This Drives Sales
          </a>
        </div>
      </div>
    </section>
  );
} 