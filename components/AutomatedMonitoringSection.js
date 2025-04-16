export default function AutomatedMonitoringSection() {
  return (
    <section id="automated-monitoring" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Overwhelmed by Calls? Automate Your Way to Better Insights.
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Stop wasting time listening to every voicemail and manually monitoring calls – let our AI-driven platform 
            handle it all so you can focus on what matters.
          </p>
        </div>
        
        {/* The Challenge of Manual Monitoring */}
        <div className="bg-gray-50 rounded-lg p-8 shadow-md mb-16 max-w-5xl mx-auto">
          <h3 className="text-2xl font-bold mb-6 text-gray-900">The Challenge of Manual Monitoring</h3>
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <p className="text-gray-700 mb-4">
                As a manager or business owner, there simply isn't enough time in your day to listen to every staff call, 
                review all voicemails, or compile detailed reports manually. The sheer volume of communications can be overwhelming.
              </p>
              <p className="text-gray-700">
                This manual approach leads to fragmented insights, delayed responses, and missed opportunities. 
                By the time you've identified a pattern or issue, it might be too late to capitalize on it or 
                address it effectively.
              </p>
            </div>
            <div className="md:w-1/2">
              <div className="bg-white rounded-lg p-6 shadow-inner">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold">Manual Monitoring</h4>
                    <p className="text-sm text-gray-600">Time-consuming and inefficient</p>
                  </div>
                </div>
                <ul className="space-y-3 ml-16">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-red-500 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span>Hours spent listening to recordings</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-red-500 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span>Delayed insights and slow response</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-red-500 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span>Inconsistent tracking and reporting</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        {/* Company-Wide Reporting Analytics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 max-w-6xl mx-auto">
          <div>
            <h3 className="text-2xl font-bold mb-6 text-gray-900">Company-Wide Reporting Analytics</h3>
            <p className="text-gray-700 mb-4">
              IntakeCoach aggregates call data across your entire organization, providing a centralized dashboard 
              that delivers real-time, actionable insights. No more piecing together information from multiple sources 
              or waiting days for reports.
            </p>
            <p className="text-gray-700 mb-6">
              Our unified reporting system transforms how you understand and respond to customer interactions, 
              giving you a complete picture of what's happening across all communication channels.
            </p>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="font-bold text-lg mb-4">Key Benefits:</h4>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="bg-blue-100 rounded-full p-1 mr-3 mt-0.5">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <div>
                    <span className="font-bold">Comprehensive Overview</span>
                    <p className="text-sm text-gray-600">Quickly understand team performance and overall call volume with at-a-glance metrics.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-blue-100 rounded-full p-1 mr-3 mt-0.5">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                    </svg>
                  </div>
                  <div>
                    <span className="font-bold">Trend Identification</span>
                    <p className="text-sm text-gray-600">Recognize patterns in call quality and customer engagement to identify opportunities.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-blue-100 rounded-full p-1 mr-3 mt-0.5">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <span className="font-bold">Data-Driven Decisions</span>
                    <p className="text-sm text-gray-600">Make informed decisions with accurate, up-to-date insights at your fingertips.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Dashboard Mockup */}
          <div className="flex items-center justify-center">
            <div className="bg-gray-900 rounded-lg p-4 shadow-xl w-full max-w-md">
              <div className="bg-gray-800 rounded p-2 mb-4 flex justify-between items-center">
                <div className="text-white font-medium">IntakeCoach Dashboard</div>
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
              </div>
              <div className="bg-white rounded p-4 mb-4">
                <div className="text-sm font-bold mb-2 text-gray-700">Daily Call Overview</div>
                <div className="h-24 bg-gray-100 rounded relative overflow-hidden">
                  <div className="absolute bottom-0 left-0 w-1/5 h-1/2 bg-blue-500"></div>
                  <div className="absolute bottom-0 left-1/5 w-1/5 h-3/4 bg-blue-500"></div>
                  <div className="absolute bottom-0 left-2/5 w-1/5 h-2/3 bg-blue-500"></div>
                  <div className="absolute bottom-0 left-3/5 w-1/5 h-1/3 bg-blue-500"></div>
                  <div className="absolute bottom-0 left-4/5 w-1/5 h-5/6 bg-blue-500"></div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-white rounded p-3">
                  <div className="text-xs font-medium text-gray-500">Potential Leads</div>
                  <div className="text-2xl font-bold text-primary">87</div>
                </div>
                <div className="bg-white rounded p-3">
                  <div className="text-xs font-medium text-gray-500">Avg. Call Score</div>
                  <div className="text-2xl font-bold text-primary">8.4</div>
                </div>
              </div>
              <div className="bg-white rounded p-3">
                <div className="text-xs font-medium text-gray-500 mb-2">Top Performers</div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="text-sm">Sarah J.</div>
                    <div className="text-sm font-bold text-green-600">94%</div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-sm">Michael B.</div>
                    <div className="text-sm font-bold text-green-600">91%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* AI-Driven Staffing Suggestions */}
        <div className="bg-gray-50 rounded-lg p-8 shadow-md mb-16 max-w-5xl mx-auto">
          <h3 className="text-2xl font-bold mb-6 text-gray-900">AI-Driven Staffing Suggestions</h3>
          <p className="text-gray-700 mb-6">
            IntakeCoach doesn't just report numbers—it actively analyzes call metrics to recommend intelligent staffing 
            adjustments. By identifying top performers and areas for improvement, our platform guides you in optimizing 
            your team structure and training efforts.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="text-primary mb-4">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h4 className="font-bold text-lg mb-2">Optimize Team Performance</h4>
              <p className="text-gray-700">
                Automatically flag potential gaps or strengths in your team. Identify which team members excel at 
                specific call types and structure your team accordingly.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="text-primary mb-4">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h4 className="font-bold text-lg mb-2">Tailored Training</h4>
              <p className="text-gray-700">
                Highlight opportunities for targeted coaching to improve call handling. Turn high-performing calls 
                into training materials to elevate your entire team.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="text-primary mb-4">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="font-bold text-lg mb-2">Smart Resource Allocation</h4>
              <p className="text-gray-700">
                Ensure that the right people are addressing the right calls at the right times. Optimize scheduling 
                based on call volume patterns and staff expertise.
              </p>
            </div>
          </div>
        </div>
        
        {/* Call-to-Action */}
        <div className="text-center">
          <h3 className="text-xl font-bold mb-4">Stop spending hours manually reviewing calls.</h3>
          <p className="text-gray-700 mb-8 max-w-2xl mx-auto">
            Let IntakeCoach's AI-driven analytics work for you, delivering insights in real-time and 
            freeing you to focus on growing your business.
          </p>
          <a 
            href="#features" 
            className="inline-block bg-primary hover:bg-secondary text-white font-bold py-3 px-8 rounded-full transition duration-300"
          >
            Experience the Future of Call Monitoring – Get Started Now!
          </a>
        </div>
      </div>
    </section>
  );
} 