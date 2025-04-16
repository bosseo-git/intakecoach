export default function MarketingFluffSection() {
  return (
    <section id="marketing-fluff" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Don't Be Fooled by Fluff: Discover the Truth Behind Your Call Metrics
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Many marketing companies boast high call volumes, but these numbers often include spam or unqualified contacts. 
            True results come from validated call insights that reveal what's really happening with your leads.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16">
          {/* The Problem with Inflated Call Numbers */}
          <div>
            <h3 className="text-2xl font-bold mb-4 text-gray-900">The Problem with Inflated Call Numbers</h3>
            <p className="text-gray-700 mb-4">
              Marketing companies often exaggerate call generation numbers to make their campaigns look more successful than they really are. 
              High call counts can give a false impression of success when many of those calls are actually spam, solicitors, 
              or completely irrelevant inquiries.
            </p>
            <p className="text-gray-700">
              Without proper analysis, you're left making business decisions based on vanity metrics instead of 
              actionable data that can actually help grow your business and improve your bottom line.
            </p>
          </div>
          
          {/* Illustration */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-center">
              <div className="relative">
                <div className="h-48 w-48 rounded-full bg-red-100 flex items-center justify-center">
                  <div className="h-32 w-32 rounded-full bg-blue-100 flex items-center justify-center">
                    <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
                      <span className="font-bold text-lg text-gray-800">Real Leads</span>
                    </div>
                  </div>
                </div>
                
                <div className="absolute top-0 left-0 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="bg-white rounded-lg px-3 py-1 shadow text-sm font-bold">
                    Reported Calls
                  </div>
                </div>
                
                <div className="absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="bg-white rounded-lg px-3 py-1 shadow text-sm font-bold">
                    Actual Calls
                  </div>
                </div>
                
                <div className="absolute bottom-0 right-0 transform translate-x-1/4 translate-y-1/4">
                  <div className="bg-white rounded-lg px-3 py-1 shadow text-sm font-bold">
                    Quality Leads
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Real-World Example & Quote */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-16 max-w-4xl mx-auto">
          <div className="flex flex-col items-center">
            <svg className="w-16 h-16 text-gray-400 mb-4" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
            <blockquote className="text-xl md:text-2xl font-medium text-center text-gray-800 mb-6">
              "Our marketing company said Google generated 115 phone calls, but after IntakeCoach, we saw 89 were spam or looking for work."
            </blockquote>
            <div className="text-gray-600 font-medium">
              - John Smith, Home Renovation Services
            </div>
          </div>
          <div className="mt-8 text-gray-700">
            <p>Without proper call analysis, businesses might invest in marketing strategies that boost numbers without delivering quality leads. This means wasted budget, missed opportunities, and frustrated sales teams dealing with unqualified contacts.</p>
          </div>
        </div>
        
        {/* How IntakeCoach Separates the Wheat from the Chaff */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h3 className="text-2xl font-bold mb-4 text-gray-900">How IntakeCoach Separates the Wheat from the Chaff</h3>
            <p className="text-gray-700 mb-4">
              IntakeCoach automatically categorizes all incoming calls by quality—clearly identifying genuine potential leads versus 
              spam or non-qualifying calls. Our AI-powered system analyzes call content, intent, and outcomes to give you a true picture 
              of your lead generation effectiveness.
            </p>
            <p className="text-gray-700">
              With IntakeCoach, you can make data-driven decisions that lead to better sales performance and streamlined training 
              for your team. No more guessing games or inflated metrics—just clear, actionable insights based on real customer interactions.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h4 className="font-bold text-lg mb-4 text-primary">Benefits for Your Business:</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <svg className="w-5 h-5 text-green-500 mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span><span className="font-bold">Increased accuracy</span> in assessing campaign effectiveness by filtering out non-leads</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-green-500 mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span><span className="font-bold">Better allocation of resources</span> based on verified data, not marketing fluff</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-green-500 mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span><span className="font-bold">Improved training</span> and performance tracking for your sales staff</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-green-500 mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span><span className="font-bold">Clear ROI tracking</span> for marketing spend and campaign performance</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Call-to-Action */}
        <div className="text-center">
          <h3 className="text-xl font-bold mb-4">Stop wasting time and money on misleading metrics.</h3>
          <p className="text-gray-700 mb-8 max-w-2xl mx-auto">
            Get the clarity you need to make data-driven decisions that actually grow your business.
          </p>
          <a 
            href="#pricing" 
            className="inline-block bg-primary hover:bg-secondary text-white font-bold py-3 px-8 rounded-full transition duration-300"
          >
            Get Real Insights Now
          </a>
        </div>
      </div>
    </section>
  );
} 