import { useState } from 'react';
import { FiCheck, FiArrowRight, FiUserCheck, FiSettings, FiCreditCard, FiFileText } from 'react-icons/fi';

export default function OnboardingChecklist() {
  const [completedItems, setCompletedItems] = useState({
    profile: false,
    settings: false,
    billing: false,
    firstIntake: false
  });
  
  const markComplete = (item) => {
    setCompletedItems({
      ...completedItems,
      [item]: true
    });
  };
  
  const allCompleted = Object.values(completedItems).every(Boolean);
  
  const tasks = [
    {
      id: 'profile',
      title: 'Complete your profile',
      description: 'Add your name, profile picture, and contact details.',
      icon: <FiUserCheck className="text-blue-500 text-xl" />,
      buttonText: 'Update Profile',
      action: () => {
        markComplete('profile');
        // In a real app, you would link to the profile page
      }
    },
    {
      id: 'settings',
      title: 'Configure your settings',
      description: 'Set up your preferences and notification settings.',
      icon: <FiSettings className="text-green-500 text-xl" />,
      buttonText: 'Go to Settings',
      action: () => {
        markComplete('settings');
        // In a real app, you would link to the settings page
      }
    },
    {
      id: 'billing',
      title: 'Verify billing information',
      description: 'Confirm your subscription details and billing information.',
      icon: <FiCreditCard className="text-purple-500 text-xl" />,
      buttonText: 'View Subscription',
      action: () => {
        markComplete('billing');
        // In a real app, you would link to the subscription page
      }
    },
    {
      id: 'firstIntake',
      title: 'Create your first intake form',
      description: 'Set up your first client intake form to start collecting information.',
      icon: <FiFileText className="text-orange-500 text-xl" />,
      buttonText: 'Create Form',
      action: () => {
        markComplete('firstIntake');
        // In a real app, you would link to the form creation page
      }
    }
  ];
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-800">Welcome to IntakeCoach!</h2>
        <p className="text-gray-600 mt-1">Complete these steps to get the most out of your account.</p>
        
        {allCompleted && (
          <div className="mt-4 bg-green-50 text-green-700 p-3 rounded-md">
            <p className="font-medium flex items-center">
              <FiCheck className="mr-2" /> You've completed all the onboarding steps!
            </p>
          </div>
        )}
      </div>
      
      <div className="divide-y divide-gray-200">
        {tasks.map(task => (
          <div 
            key={task.id}
            className={`p-6 flex items-start ${
              completedItems[task.id] ? 'bg-gray-50' : 'bg-white'
            }`}
          >
            <div className="mr-4 mt-1">
              {task.icon}
            </div>
            
            <div className="flex-1">
              <h3 className="font-medium text-gray-900 flex items-center">
                {task.title}
                {completedItems[task.id] && (
                  <span className="ml-2 text-green-500">
                    <FiCheck />
                  </span>
                )}
              </h3>
              <p className="text-gray-600 mt-1">{task.description}</p>
            </div>
            
            <button
              onClick={task.action}
              disabled={completedItems[task.id]}
              className={`flex items-center px-3 py-1.5 rounded text-sm font-medium ${
                completedItems[task.id]
                  ? 'bg-gray-100 text-gray-500 cursor-default'
                  : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
              }`}
            >
              {completedItems[task.id] ? 'Completed' : task.buttonText}
              {!completedItems[task.id] && <FiArrowRight className="ml-1" />}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
} 