import { Role } from '../types';

export const roles: Role[] = [
  {
    id: 'chef',
    name: 'Executive Chef',
    description: 'Lead a kitchen team and create culinary masterpieces under pressure',
    icon: 'ChefHat',
    color: 'from-orange-500 to-red-500',
    scenarios: [
      {
        id: 'chef-1',
        situation: 'The dinner rush is at its peak, and you just received news that your sous chef called in sick. How do you handle the situation?',
        options: [
          'Immediately call in a backup chef and adjust the menu to simpler dishes',
          'Rally the existing team and redistribute responsibilities while maintaining full service',
          'Close early to avoid compromising food quality'
        ]
      },
      {
        id: 'chef-2',
        situation: 'A food critic from a major publication just walked in unannounced. Your signature dish ran out 10 minutes ago. What do you do?',
        options: [
          'Quickly prepare a new signature dish with available ingredients',
          'Recommend other exceptional dishes and be transparent about the situation',
          'Rush to make the signature dish even if it means other orders will be delayed'
        ]
      },
      {
        id: 'chef-3',
        situation: 'You discover that a shipment of seafood appears questionable in quality just before service. How do you proceed?',
        options: [
          'Remove all seafood dishes from tonight\'s menu immediately',
          'Inspect each piece carefully and use only the best quality items',
          'Contact the supplier for a replacement while preparing backup protein options'
        ]
      },
      {
        id: 'chef-4',
        situation: 'A new line cook is struggling to keep up with orders and making mistakes. The kitchen is falling behind. Your approach?',
        options: [
          'Move them to prep work and have an experienced cook take their station',
          'Provide quick coaching while helping them catch up on orders',
          'Ask them to observe for the night and return after additional training'
        ]
      },
      {
        id: 'chef-5',
        situation: 'A customer sends back a dish claiming it\'s too salty, but you know the recipe is correct. How do you handle this?',
        options: [
          'Remake the dish with less seasoning to satisfy the customer',
          'Politely stand by the dish but offer an alternative from the menu',
          'Investigate with the line cook to ensure recipe consistency'
        ]
      }
    ]
  },
  {
    id: 'ux-designer',
    name: 'UX Designer',
    description: 'Create intuitive user experiences through research and innovative design solutions',
    icon: 'Palette',
    color: 'from-purple-500 to-pink-500',
    scenarios: [
      {
        id: 'ux-1',
        situation: 'User testing reveals that 70% of users can\'t find the checkout button on your e-commerce design. The launch is in two days. What\'s your next move?',
        options: [
          'Redesign the entire checkout flow with a more prominent button placement',
          'Make quick visual improvements to highlight the existing button',
          'Recommend delaying launch to properly address the usability issue'
        ]
      },
      {
        id: 'ux-2',
        situation: 'The marketing team wants to add more promotional banners to the homepage, but you know it will hurt user experience. How do you respond?',
        options: [
          'Propose a compromise with fewer, more strategically placed promotions',
          'Present user data showing how banner overload affects conversion rates',
          'Design the banners but recommend A/B testing against a cleaner version'
        ]
      },
      {
        id: 'ux-3',
        situation: 'You\'re tasked with designing an app for both teenagers and elderly users. Their needs seem completely opposite. Your approach?',
        options: [
          'Create two separate interface modes with different complexity levels',
          'Design a highly customizable interface that adapts to user preferences',
          'Focus on universal design principles that work for both demographics'
        ]
      },
      {
        id: 'ux-4',
        situation: 'Analytics show users are dropping off at the registration form. It has 12 required fields. What do you recommend?',
        options: [
          'Break the form into multiple steps with progress indicators',
          'Reduce required fields to only essential information',
          'Add social login options to bypass manual form entry'
        ]
      },
      {
        id: 'ux-5',
        situation: 'The development team says your design is too complex to implement within budget. How do you proceed?',
        options: [
          'Simplify the design while maintaining core user experience goals',
          'Present a business case for why the full design is worth the investment',
          'Propose a phased implementation starting with the most critical features'
        ]
      }
    ]
  },
  {
    id: 'cybersecurity',
    name: 'Cybersecurity Analyst',
    description: 'Protect digital assets and respond to security threats in real-time',
    icon: 'Shield',
    color: 'from-blue-500 to-cyan-500',
    scenarios: [
      {
        id: 'cyber-1',
        situation: 'You detect unusual network traffic at 3 AM suggesting a potential breach. The IT director is unavailable. What\'s your immediate action?',
        options: [
          'Immediately isolate affected systems and begin incident response protocol',
          'Monitor the traffic for more evidence before taking disruptive action',
          'Wake up the IT director and other key stakeholders before proceeding'
        ]
      },
      {
        id: 'cyber-2',
        situation: 'An employee reports receiving a suspicious email that looks like it\'s from the CEO asking for sensitive information. Your response?',
        options: [
          'Immediately alert all employees about the phishing attempt',
          'Investigate the email source and check if others received similar messages',
          'Report it to the CEO and IT management while documenting the incident'
        ]
      },
      {
        id: 'cyber-3',
        situation: 'A ransomware attack has encrypted critical business files. The attackers demand $50,000. How do you advise management?',
        options: [
          'Recommend never paying ransom and focus on recovery from backups',
          'Assess backup integrity and recovery time before making payment decision',
          'Suggest negotiating with attackers while preparing alternative recovery plans'
        ]
      },
      {
        id: 'cyber-4',
        situation: 'You discover that a former employee\'s access credentials are still active three weeks after termination. What do you do?',
        options: [
          'Immediately disable all access and audit what systems they could have accessed',
          'Check access logs first to see if the credentials have been used recently',
          'Report to HR and management while documenting this security gap'
        ]
      },
      {
        id: 'cyber-5',
        situation: 'The sales team wants to use a new cloud application, but it doesn\'t meet your security standards. How do you handle this?',
        options: [
          'Deny the request and suggest alternative solutions that meet security requirements',
          'Work with the vendor to implement additional security measures',
          'Allow limited use with enhanced monitoring and risk mitigation controls'
        ]
      }
    ]
  },
  {
    id: 'teacher',
    name: 'High School Teacher',
    description: 'Inspire and educate the next generation through engaging lesson plans',
    icon: 'GraduationCap',
    color: 'from-green-500 to-teal-500',
    scenarios: [
      {
        id: 'teacher-1',
        situation: 'A student in your class is consistently disruptive, affecting other students\' learning. Traditional discipline hasn\'t worked. What\'s your approach?',
        options: [
          'Have a private conversation to understand underlying issues and find solutions',
          'Implement a positive reinforcement system to encourage better behavior',
          'Involve parents and school counselors for a comprehensive support plan'
        ]
      },
      {
        id: 'teacher-2',
        situation: 'You notice a typically engaged student has become withdrawn and their grades are dropping. How do you respond?',
        options: [
          'Speak with the student privately after class to check on their well-being',
          'Reach out to parents to discuss the changes you\'ve observed',
          'Connect with the school counselor while providing extra academic support'
        ]
      },
      {
        id: 'teacher-3',
        situation: 'Half your class failed the latest test despite your best teaching efforts. How do you address this?',
        options: [
          'Review and adjust your teaching methods based on different learning styles',
          'Offer retesting opportunities after additional review sessions',
          'Analyze the test content to ensure it fairly assessed the material taught'
        ]
      },
      {
        id: 'teacher-4',
        situation: 'A parent emails complaining that their child isn\'t being challenged enough in your class. How do you respond?',
        options: [
          'Meet with the parent and student to discuss enrichment opportunities',
          'Provide additional advanced materials and independent projects',
          'Suggest acceleration options or advanced placement courses'
        ]
      },
      {
        id: 'teacher-5',
        situation: 'Technology in your classroom breaks down during an important lesson that relies heavily on digital materials. What do you do?',
        options: [
          'Quickly adapt the lesson to use traditional teaching methods and materials',
          'Turn it into a collaborative problem-solving exercise for students',
          'Use the opportunity to teach improvisation and flexibility skills'
        ]
      }
    ]
  },
  {
    id: 'pilot',
    name: 'Commercial Pilot',
    description: 'Navigate aircraft safely through various weather conditions and scenarios',
    icon: 'Plane',
    color: 'from-indigo-500 to-blue-500',
    scenarios: [
      {
        id: 'pilot-1',
        situation: 'You\'re approaching your destination when air traffic control reports severe weather moving in faster than predicted. You have enough fuel for one approach. What do you do?',
        options: [
          'Request immediate priority landing clearance to beat the weather',
          'Divert to the nearest alternate airport with better weather conditions',
          'Hold at a safe distance and reassess conditions before making final decision'
        ]
      },
      {
        id: 'pilot-2',
        situation: 'During pre-flight inspection, you notice a minor mechanical issue that\'s within legal limits but could potentially worsen. The flight is fully booked. Your decision?',
        options: [
          'Ground the aircraft and arrange for maintenance before departure',
          'Proceed with the flight while monitoring the issue closely',
          'Consult with maintenance team to assess risk level before deciding'
        ]
      },
      {
        id: 'pilot-3',
        situation: 'A passenger becomes seriously ill mid-flight on a long international route. The nearest airport is 2 hours away. How do you respond?',
        options: [
          'Immediately declare a medical emergency and divert to the nearest airport',
          'Contact medical professionals on ground for guidance while assessing passenger',
          'Continue to destination while providing first aid and monitoring patient'
        ]
      },
      {
        id: 'pilot-4',
        situation: 'You experience a bird strike during takeoff causing engine damage, but the aircraft is still flyable. What\'s your immediate action?',
        options: [
          'Declare emergency and return to airport immediately for landing',
          'Continue climb to safe altitude before assessing damage and options',
          'Follow emergency procedures while coordinating with co-pilot and air traffic control'
        ]
      },
      {
        id: 'pilot-5',
        situation: 'Fog suddenly rolls in at your destination airport, reducing visibility below landing minimums. You\'re running low on fuel. Your response?',
        options: [
          'Request vectors to alternate airport with better weather conditions',
          'Hold until conditions improve while carefully monitoring fuel levels',
          'Attempt an instrument approach using all available navigation aids'
        ]
      }
    ]
  },
  {
    id: 'doctor',
    name: 'Emergency Room Doctor',
    description: 'Make critical medical decisions under pressure to save lives',
    icon: 'Stethoscope',
    color: 'from-red-500 to-pink-500',
    scenarios: [
      {
        id: 'doctor-1',
        situation: 'Multiple casualties arrive from a car accident. You have limited staff and must triage quickly. A child with minor injuries is crying loudly while an unconscious adult shows signs of internal bleeding. Who do you treat first?',
        options: [
          'Prioritize the unconscious adult with potential life-threatening injuries',
          'Quickly assess and treat the child to free up resources for complex cases',
          'Split resources to stabilize both patients simultaneously'
        ]
      },
      {
        id: 'doctor-2',
        situation: 'A patient presents with chest pain that could indicate a heart attack, but their symptoms are atypical and tests are inconclusive. How do you proceed?',
        options: [
          'Treat as a heart attack with full cardiac protocol to be safe',
          'Order additional tests while monitoring patient closely',
          'Consult with cardiology while preparing for multiple treatment scenarios'
        ]
      },
      {
        id: 'doctor-3',
        situation: 'A patient refuses a blood transfusion for religious reasons despite life-threatening blood loss. What\'s your approach?',
        options: [
          'Respect patient autonomy and explore alternative treatment options',
          'Consult with hospital ethics committee while providing supportive care',
          'Work with patient and family to find religiously acceptable alternatives'
        ]
      },
      {
        id: 'doctor-4',
        situation: 'You suspect a child\'s injuries may be from abuse, but the parents are present and becoming agitated about questioning. How do you handle this?',
        options: [
          'Follow mandatory reporting protocols while ensuring child safety',
          'Separate the child from parents for private examination and assessment',
          'Involve social services and hospital security while documenting everything'
        ]
      },
      {
        id: 'doctor-5',
        situation: 'An elderly patient with dementia is brought in by family for confusion, but you suspect they may have been over-medicated. The family insists on continuing current medications. Your response?',
        options: [
          'Order comprehensive medication review and toxicology screening',
          'Gradually reduce medications while monitoring for improvement',
          'Educate family about over-medication risks while involving pharmacy'
        ]
      }
    ]
  },
  // NEW ROLES START HERE
  {
    id: 'software-engineer',
    name: 'Software Engineer',
    description: 'Design and develop scalable software solutions using cutting-edge technologies',
    icon: 'Code',
    color: 'from-emerald-500 to-teal-500',
    scenarios: [
      {
        id: 'se-1',
        situation: 'Your production system is experiencing a critical outage affecting thousands of users. The issue appears to be in code you deployed yesterday. What\'s your immediate response?',
        options: [
          'Immediately rollback to the previous stable version',
          'Quickly identify and hotfix the specific issue causing the outage',
          'Coordinate with the team to implement emergency monitoring while investigating'
        ]
      },
      {
        id: 'se-2',
        situation: 'A stakeholder requests a feature that would require significant technical debt and compromise system security. The deadline is tight. How do you respond?',
        options: [
          'Explain the technical risks and propose a secure alternative approach',
          'Implement the feature as requested but document the technical debt',
          'Negotiate a timeline extension to implement the feature properly'
        ]
      },
      {
        id: 'se-3',
        situation: 'During code review, you discover a colleague\'s code has several performance issues and doesn\'t follow team standards. How do you handle this?',
        options: [
          'Provide detailed feedback with suggestions for improvement',
          'Pair program with them to fix the issues together',
          'Approve the code but schedule a team discussion about standards'
        ]
      },
      {
        id: 'se-4',
        situation: 'You\'re tasked with choosing between two technologies for a new project. One is cutting-edge but unproven, the other is stable but may limit future scalability. Your decision?',
        options: [
          'Choose the stable technology and plan for future migration if needed',
          'Select the cutting-edge technology and invest time in learning and testing',
          'Propose a hybrid approach using both technologies where appropriate'
        ]
      },
      {
        id: 'se-5',
        situation: 'A junior developer on your team is struggling with a complex task and the deadline is approaching. What\'s your approach?',
        options: [
          'Take over the task to ensure it\'s completed on time',
          'Provide mentoring and pair programming to help them succeed',
          'Break down the task into smaller, manageable pieces for them'
        ]
      }
    ]
  },
  {
    id: 'data-scientist',
    name: 'Data Scientist',
    description: 'Extract insights from complex datasets to drive business decisions',
    icon: 'BarChart3',
    color: 'from-violet-500 to-purple-500',
    scenarios: [
      {
        id: 'ds-1',
        situation: 'Your machine learning model shows 95% accuracy in testing, but performs poorly in production. What\'s your first step to diagnose the issue?',
        options: [
          'Check for data drift between training and production datasets',
          'Retrain the model with more recent production data',
          'Investigate potential overfitting in the original model'
        ]
      },
      {
        id: 'ds-2',
        situation: 'The marketing team wants to use your customer segmentation model to target ads, but you notice potential bias against certain demographics. How do you proceed?',
        options: [
          'Refuse to deploy the model until bias issues are resolved',
          'Deploy with clear documentation of limitations and monitoring',
          'Work with the team to develop bias mitigation strategies'
        ]
      },
      {
        id: 'ds-3',
        situation: 'You have a dataset with 40% missing values in a crucial feature. The business needs results quickly. What\'s your approach?',
        options: [
          'Use advanced imputation techniques to fill missing values',
          'Build separate models for complete and incomplete data',
          'Recommend collecting more complete data before proceeding'
        ]
      },
      {
        id: 'ds-4',
        situation: 'Your analysis contradicts the CEO\'s hypothesis about customer behavior. The findings could impact a major business decision. How do you present this?',
        options: [
          'Present the data objectively with clear methodology and limitations',
          'Provide multiple interpretations including scenarios that support their hypothesis',
          'Recommend additional analysis to validate the unexpected findings'
        ]
      },
      {
        id: 'ds-5',
        situation: 'You\'re asked to predict customer churn, but the available data is limited and potentially outdated. What\'s your strategy?',
        options: [
          'Build a baseline model with available data and iterate as more data comes in',
          'Focus on feature engineering to maximize value from existing data',
          'Recommend a data collection strategy before building predictive models'
        ]
      }
    ]
  },
  {
    id: 'marketing-manager',
    name: 'Marketing Manager',
    description: 'Develop and execute strategic marketing campaigns to drive brand growth',
    icon: 'Megaphone',
    color: 'from-pink-500 to-rose-500',
    scenarios: [
      {
        id: 'mm-1',
        situation: 'Your major campaign launched yesterday and early metrics show poor performance. The CEO is asking for an explanation. How do you respond?',
        options: [
          'Analyze the data to identify specific issues and present solutions',
          'Acknowledge the results and request time to optimize the campaign',
          'Pivot quickly to alternative messaging and channels'
        ]
      },
      {
        id: 'mm-2',
        situation: 'A competitor just launched a similar product with a massive marketing budget. Your launch is next month. What\'s your strategy?',
        options: [
          'Differentiate by focusing on unique value propositions and benefits',
          'Delay launch to develop a more competitive positioning strategy',
          'Accelerate launch with guerrilla marketing tactics to gain first-mover advantage'
        ]
      },
      {
        id: 'mm-3',
        situation: 'Your influencer partnership just went viral, but for negative reasons due to the influencer\'s controversial statement. How do you handle this?',
        options: [
          'Immediately distance the brand and terminate the partnership',
          'Issue a statement clarifying the brand\'s position while maintaining the partnership',
          'Use the attention to pivot the conversation toward brand values'
        ]
      },
      {
        id: 'mm-4',
        situation: 'Budget cuts require you to reduce marketing spend by 40%. Which areas do you prioritize?',
        options: [
          'Focus on highest ROI channels and cut experimental initiatives',
          'Maintain brand awareness spending and reduce performance marketing',
          'Shift to organic and content marketing strategies'
        ]
      },
      {
        id: 'mm-5',
        situation: 'Customer feedback indicates your messaging isn\'t resonating with your target demographic. The campaign is halfway through its run. Your move?',
        options: [
          'Conduct rapid user research to understand the disconnect',
          'A/B test new messaging variations immediately',
          'Pause the campaign and develop new creative based on feedback'
        ]
      }
    ]
  },
  {
    id: 'financial-analyst',
    name: 'Financial Analyst',
    description: 'Analyze financial data and market trends to guide investment decisions',
    icon: 'TrendingUp',
    color: 'from-green-500 to-emerald-500',
    scenarios: [
      {
        id: 'fa-1',
        situation: 'Your financial model predicts a 20% revenue decline next quarter, but the sales team is forecasting growth. How do you reconcile this?',
        options: [
          'Present both scenarios with detailed assumptions and risk factors',
          'Collaborate with sales to understand their optimistic projections',
          'Recommend conservative planning based on your model while monitoring sales indicators'
        ]
      },
      {
        id: 'fa-2',
        situation: 'The company is considering a major acquisition. Your analysis shows it\'s overpriced, but the CEO is enthusiastic. How do you proceed?',
        options: [
          'Present your analysis objectively with clear valuation methodology',
          'Explore scenarios where the acquisition could create value',
          'Recommend additional due diligence to validate your concerns'
        ]
      },
      {
        id: 'fa-3',
        situation: 'Market volatility has significantly impacted your investment recommendations. Clients are panicking and want to sell everything. Your advice?',
        options: [
          'Recommend staying the course based on long-term fundamentals',
          'Suggest partial rebalancing to reduce risk while maintaining growth potential',
          'Provide multiple scenarios and let clients choose their risk tolerance'
        ]
      },
      {
        id: 'fa-4',
        situation: 'You discover a significant error in last quarter\'s financial report that was already published. What\'s your immediate action?',
        options: [
          'Immediately notify management and prepare corrected statements',
          'Assess the materiality of the error before determining next steps',
          'Document the error and implement controls to prevent future occurrences'
        ]
      },
      {
        id: 'fa-5',
        situation: 'A department head is requesting budget approval for a project with unclear ROI. They claim it\'s strategically important. How do you evaluate this?',
        options: [
          'Work with them to quantify strategic benefits and develop success metrics',
          'Recommend a pilot program to test assumptions before full investment',
          'Request detailed business case with risk assessment and alternatives'
        ]
      }
    ]
  },
  {
    id: 'project-manager',
    name: 'Project Manager',
    description: 'Coordinate teams and resources to deliver complex projects on time and budget',
    icon: 'Users',
    color: 'from-blue-500 to-indigo-500',
    scenarios: [
      {
        id: 'pm-1',
        situation: 'Your project is 3 weeks behind schedule due to unexpected technical challenges. The client is demanding the original deadline. How do you respond?',
        options: [
          'Negotiate a realistic timeline extension with clear deliverable milestones',
          'Increase resources and work overtime to meet the original deadline',
          'Propose delivering a minimum viable version by the deadline with additional features later'
        ]
      },
      {
        id: 'pm-2',
        situation: 'Two key team members are in conflict, affecting team morale and productivity. What\'s your approach?',
        options: [
          'Mediate a discussion between them to resolve the underlying issues',
          'Separate their responsibilities to minimize interaction',
          'Escalate to HR while implementing temporary workflow adjustments'
        ]
      },
      {
        id: 'pm-3',
        situation: 'Stakeholders keep requesting scope changes that threaten the project timeline and budget. How do you manage this?',
        options: [
          'Implement a formal change control process with impact assessments',
          'Schedule regular stakeholder meetings to discuss priorities and trade-offs',
          'Create a change request backlog for future project phases'
        ]
      },
      {
        id: 'pm-4',
        situation: 'A critical team member just resigned in the middle of the project. What\'s your immediate response?',
        options: [
          'Quickly identify and onboard a replacement with knowledge transfer',
          'Redistribute their responsibilities among existing team members',
          'Negotiate with the departing employee for transition support'
        ]
      },
      {
        id: 'pm-5',
        situation: 'Your project budget is 30% over due to unforeseen costs. How do you address this with stakeholders?',
        options: [
          'Present a detailed analysis of cost overruns with mitigation strategies',
          'Propose scope reduction to bring the project back within budget',
          'Request additional funding while implementing cost control measures'
        ]
      }
    ]
  },
  {
    id: 'nurse',
    name: 'Registered Nurse',
    description: 'Provide compassionate patient care while managing multiple medical priorities',
    icon: 'Heart',
    color: 'from-red-400 to-pink-400',
    scenarios: [
      {
        id: 'nurse-1',
        situation: 'You have 6 patients to care for, and two of them are requesting pain medication at the same time. One patient seems to be drug-seeking while the other has legitimate post-surgical pain. How do you prioritize?',
        options: [
          'Assess the post-surgical patient first, then evaluate the other patient\'s needs',
          'Follow protocol for both patients while documenting your observations',
          'Consult with the physician about the suspected drug-seeking behavior'
        ]
      },
      {
        id: 'nurse-2',
        situation: 'A patient\'s family member is being aggressive and demanding, disrupting care for other patients. The patient is unconscious and cannot advocate for themselves. What do you do?',
        options: [
          'Set clear boundaries with the family member while maintaining compassionate care',
          'Involve security and social services to manage the situation',
          'Try to understand their concerns and find ways to address their anxiety'
        ]
      },
      {
        id: 'nurse-3',
        situation: 'You notice a medication error made by another nurse that could potentially harm the patient. The nurse is your friend and mentor. How do you handle this?',
        options: [
          'Immediately report the error through proper channels to ensure patient safety',
          'Speak with the nurse first to understand what happened before reporting',
          'Correct the error and then discuss it with the nurse privately'
        ]
      },
      {
        id: 'nurse-4',
        situation: 'A patient is refusing treatment that is medically necessary. They are competent to make decisions but their choice could be life-threatening. Your approach?',
        options: [
          'Respect their autonomy while ensuring they understand the consequences',
          'Involve the physician and possibly ethics committee for guidance',
          'Spend time understanding their concerns and addressing barriers to treatment'
        ]
      },
      {
        id: 'nurse-5',
        situation: 'During a busy shift, you realize you forgot to administer a time-sensitive medication to a patient 2 hours ago. What\'s your immediate action?',
        options: [
          'Administer the medication immediately and report the delay to the physician',
          'Assess the patient\'s condition before deciding on the next course of action',
          'Document the incident and follow hospital protocol for medication errors'
        ]
      }
    ]
  },
  {
    id: 'lawyer',
    name: 'Corporate Lawyer',
    description: 'Navigate complex legal issues and provide strategic counsel to businesses',
    icon: 'Scale',
    color: 'from-gray-600 to-slate-600',
    scenarios: [
      {
        id: 'lawyer-1',
        situation: 'Your client wants to proceed with a business deal that has significant legal risks. You\'ve advised against it, but they\'re insisting. How do you proceed?',
        options: [
          'Document your advice clearly and let them make an informed decision',
          'Refuse to proceed unless they acknowledge and accept the risks in writing',
          'Seek additional legal opinions to support your recommendation'
        ]
      },
      {
        id: 'lawyer-2',
        situation: 'You discover information during due diligence that could kill a major merger your client desperately needs. The information might not be material. What do you do?',
        options: [
          'Immediately disclose the information to your client and opposing counsel',
          'Investigate further to determine if the information is truly material',
          'Advise your client of the discovery and let them decide on disclosure'
        ]
      },
      {
        id: 'lawyer-3',
        situation: 'A former client is now suing your current client. You have confidential information from the former client that could help your current client\'s case. How do you handle this conflict?',
        options: [
          'Recuse yourself from representing the current client in this matter',
          'Seek consent from both clients to continue representation',
          'Use only publicly available information while maintaining confidentiality'
        ]
      },
      {
        id: 'lawyer-4',
        situation: 'Your client is facing a lawsuit with potential damages of $10 million. You can settle for $2 million, but you believe you can win at trial. The client is risk-averse. Your recommendation?',
        options: [
          'Recommend settlement to minimize risk and costs',
          'Present both options with detailed risk analysis and let client decide',
          'Recommend trial based on strong legal position'
        ]
      },
      {
        id: 'lawyer-5',
        situation: 'You\'re negotiating a contract and the opposing counsel is being unreasonable and hostile. Your client wants to walk away, but the deal is important for their business. What\'s your strategy?',
        options: [
          'Maintain professionalism and focus on finding mutually beneficial solutions',
          'Escalate to senior partners or suggest changing opposing counsel',
          'Take a break from negotiations to let tensions cool down'
        ]
      }
    ]
  },
  {
    id: 'architect',
    name: 'Architect',
    description: 'Design innovative buildings that balance aesthetics, functionality, and sustainability',
    icon: 'Building',
    color: 'from-amber-500 to-orange-500',
    scenarios: [
      {
        id: 'arch-1',
        situation: 'Your innovative design for a public building is being criticized by the community for being too modern and not fitting the neighborhood character. How do you respond?',
        options: [
          'Modify the design to better integrate with existing architectural styles',
          'Organize community meetings to explain the design vision and benefits',
          'Stand by the design while addressing specific community concerns'
        ]
      },
      {
        id: 'arch-2',
        situation: 'The client loves your design, but the structural engineer says it\'s not feasible within the budget. The client doesn\'t want to increase the budget. What do you do?',
        options: [
          'Redesign with simpler structural elements while maintaining the aesthetic vision',
          'Present value engineering options that balance cost and design integrity',
          'Recommend phasing the project to spread costs over time'
        ]
      },
      {
        id: 'arch-3',
        situation: 'During construction, you discover that your design doesn\'t comply with a recently updated building code. Fixing it will delay the project significantly. Your approach?',
        options: [
          'Immediately redesign to comply with current codes',
          'Apply for a variance or exception based on the design\'s merits',
          'Work with authorities to find alternative compliance solutions'
        ]
      },
      {
        id: 'arch-4',
        situation: 'The contractor is cutting corners on materials and finishes to save costs, compromising your design vision. The client seems okay with it. How do you handle this?',
        options: [
          'Insist on original specifications and document any deviations',
          'Negotiate with contractor and client to find acceptable alternatives',
          'Focus on the most critical elements that define the design'
        ]
      },
      {
        id: 'arch-5',
        situation: 'Your sustainable design features will increase construction costs by 15%, but the client is focused on minimizing upfront expenses. How do you make your case?',
        options: [
          'Present long-term cost savings and environmental benefits',
          'Propose a phased approach to implement sustainable features over time',
          'Identify the most cost-effective sustainable elements to include'
        ]
      }
    ]
  },
  {
    id: 'sales-manager',
    name: 'Sales Manager',
    description: 'Lead sales teams to exceed targets while building lasting customer relationships',
    icon: 'Target',
    color: 'from-cyan-500 to-blue-500',
    scenarios: [
      {
        id: 'sm-1',
        situation: 'Your top salesperson is consistently missing targets and their attitude is affecting team morale. They were previously your best performer. How do you address this?',
        options: [
          'Have a private conversation to understand what\'s changed and offer support',
          'Implement a performance improvement plan with clear expectations',
          'Reassign them to accounts better suited to their current capabilities'
        ]
      },
      {
        id: 'sm-2',
        situation: 'A major client is threatening to leave due to service issues from another department. They represent 30% of your team\'s revenue. What\'s your strategy?',
        options: [
          'Coordinate with other departments to resolve the service issues immediately',
          'Take personal responsibility for the relationship while working on solutions',
          'Offer concessions and guarantees to retain the client while fixing problems'
        ]
      },
      {
        id: 'sm-3',
        situation: 'Your team is 20% behind quarterly targets with one month left. The pressure from upper management is intense. How do you motivate your team?',
        options: [
          'Implement short-term incentives and focus on closing existing opportunities',
          'Analyze the pipeline to identify the most promising prospects for acceleration',
          'Be transparent about the situation and rally the team around a recovery plan'
        ]
      },
      {
        id: 'sm-4',
        situation: 'A competitor is aggressively poaching your clients with significantly lower prices. Your company won\'t match their pricing. How do you compete?',
        options: [
          'Focus on value proposition and superior service quality',
          'Develop new service offerings that justify premium pricing',
          'Target new market segments where price sensitivity is lower'
        ]
      },
      {
        id: 'sm-5',
        situation: 'Two of your salespeople are competing for the same large prospect, creating internal conflict. How do you resolve this?',
        options: [
          'Assign the account based on territory rules and existing relationships',
          'Have them collaborate on the opportunity and share the commission',
          'Use this as a learning opportunity about territory management and lead qualification'
        ]
      }
    ]
  },
  {
    id: 'journalist',
    name: 'Investigative Journalist',
    description: 'Uncover important stories and report truth while navigating ethical challenges',
    icon: 'FileText',
    color: 'from-slate-500 to-gray-600',
    scenarios: [
      {
        id: 'jour-1',
        situation: 'You have evidence of corruption involving a local politician, but your source could face retaliation if exposed. The story is important for public interest. How do you proceed?',
        options: [
          'Protect your source\'s identity while finding additional corroborating evidence',
          'Work with your source to find ways to minimize their risk of exposure',
          'Consult with legal counsel about source protection before publishing'
        ]
      },
      {
        id: 'jour-2',
        situation: 'A major advertiser threatens to pull funding if you publish a negative story about their industry. Your editor is concerned about revenue impact. What\'s your response?',
        options: [
          'Insist on editorial independence and the importance of the story',
          'Ensure the story is thoroughly fact-checked and legally sound before publishing',
          'Seek alternative funding sources to reduce dependence on conflicted advertisers'
        ]
      },
      {
        id: 'jour-3',
        situation: 'You\'re reporting on a tragedy and families of victims are asking for privacy, but the public has a right to know details. How do you balance these interests?',
        options: [
          'Report essential facts while respecting families\' privacy and dignity',
          'Focus on systemic issues rather than personal details of victims',
          'Give families time to grieve before seeking interviews or personal information'
        ]
      },
      {
        id: 'jour-4',
        situation: 'You discover information that could prevent harm to the public, but publishing it might compromise an ongoing police investigation. What do you do?',
        options: [
          'Coordinate with law enforcement to find a way to warn the public safely',
          'Publish the information immediately as public safety takes priority',
          'Delay publication until the investigation reaches a safe point'
        ]
      },
      {
        id: 'jour-5',
        situation: 'A whistleblower provides you with documents that seem authentic, but you can\'t independently verify all the claims. The story could be explosive. How do you proceed?',
        options: [
          'Spend more time investigating and verifying before publishing',
          'Publish what you can verify while noting limitations of unverified claims',
          'Seek expert analysis of the documents to assess their authenticity'
        ]
      }
    ]
  }
];