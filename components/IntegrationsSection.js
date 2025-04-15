export default function IntegrationsSection() {
  const integrations = [
    {
      name: "CRM Platforms",
      description: "Seamlessly sync call data with popular CRM systems like Salesforce and HubSpot for unified customer insights and streamlined workflow.",
      icon: (
        <svg className="w-12 h-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      name: "Custom APIs",
      description: "Connect with any system to automate updates and enhance workflow through real-time data exchange, allowing for tailored integration with your existing tech stack.",
      icon: (
        <svg className="w-12 h-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      )
    },
    {
      name: "Phone Systems",
      description: "Easily integrate with VoIP providers, call centers, and traditional phone systems to capture and analyze calls from any source.",
      icon: (
        <svg className="w-12 h-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      )
    },
    {
      name: "Data Analytics",
      description: "Export analyzed call data to business intelligence tools for deeper insights and integration with your organization's broader analytics strategy.",
      icon: (
        <svg className="w-12 h-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    }
  ];

  return (
    <section id="integrations" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Integrations</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            IntakeCoach seamlessly connects with your existing systems to provide a unified workflow and comprehensive data management.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {integrations.map((integration, index) => (
            <div key={index} className="bg-gray-50 p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="mb-4">
                {integration.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{integration.name}</h3>
              <p className="text-gray-600">{integration.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold mb-4">Benefits of Integration</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="p-6">
              <h4 className="font-bold text-lg mb-2">Workflow Automation</h4>
              <p className="text-gray-600">Reduce manual data entry and streamline processes across your organization.</p>
            </div>
            <div className="p-6">
              <h4 className="font-bold text-lg mb-2">Centralized Reporting</h4>
              <p className="text-gray-600">Access all your call data and insights from a single, unified dashboard.</p>
            </div>
            <div className="p-6">
              <h4 className="font-bold text-lg mb-2">Enhanced Data Accuracy</h4>
              <p className="text-gray-600">Eliminate errors from manual processes with automated data synchronization.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 