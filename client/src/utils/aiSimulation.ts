import { FeedbackReport } from '../types';

export function generateAIFeedback(
  roleName: string,
  choices: number[],
  totalScenarios: number
): FeedbackReport {
  // Simulate AI analysis based on choices
  const score = Math.floor((choices.reduce((sum, choice) => sum + choice, 0) / (choices.length * 2)) * 100);
  
  const roleSpecificFeedback = getRoleSpecificFeedback(roleName, choices, score);
  
  return {
    fitScore: Math.max(40, Math.min(100, score + Math.floor(Math.random() * 20 - 10))),
    strengths: roleSpecificFeedback.strengths,
    growthAreas: roleSpecificFeedback.growthAreas,
    recommendation: roleSpecificFeedback.recommendation,
  };
}

function getRoleSpecificFeedback(roleName: string, choices: number[], score: number) {
  const feedbackOptions = {
    'Executive Chef': {
      strengths: [
        'Excellent leadership under pressure',
        'Strong food safety awareness',
        'Great team management skills',
        'Creative problem-solving abilities',
        'Quality-focused mindset'
      ],
      growthAreas: [
        'Consider delegation strategies',
        'Work on time management',
        'Improve communication with front-of-house',
        'Develop cost control skills',
        'Enhance menu planning abilities'
      ],
      highScoreRec: 'You show natural leadership and quality focus that are essential for culinary success. Consider pursuing formal culinary training or kitchen management roles.',
      lowScoreRec: 'While you show potential, working on stress management and team coordination would help you excel in fast-paced kitchen environments.'
    },
    'UX Designer': {
      strengths: [
        'User-centered thinking',
        'Strong analytical skills',
        'Creative problem-solving',
        'Data-driven decision making',
        'Collaborative approach'
      ],
      growthAreas: [
        'Improve technical implementation knowledge',
        'Enhance visual design skills',
        'Develop better stakeholder communication',
        'Learn more user research methods',
        'Practice design system thinking'
      ],
      highScoreRec: 'Your user-focused mindset and analytical approach are perfect for UX design. Consider building a portfolio and learning design tools like Figma.',
      lowScoreRec: 'You have good instincts but would benefit from studying user research methods and design principles more deeply.'
    },
    'Cybersecurity Analyst': {
      strengths: [
        'Risk assessment abilities',
        'Quick threat recognition',
        'Systematic thinking',
        'Attention to detail',
        'Proactive security mindset'
      ],
      growthAreas: [
        'Improve incident response speed',
        'Enhance technical forensics skills',
        'Develop better communication with non-tech stakeholders',
        'Learn more about emerging threats',
        'Practice security architecture thinking'
      ],
      highScoreRec: 'Your systematic approach and risk awareness are excellent for cybersecurity. Consider getting security certifications like CompTIA Security+ or CISSP.',
      lowScoreRec: 'You show security awareness but would benefit from more technical training and hands-on experience with security tools.'
    },
    'High School Teacher': {
      strengths: [
        'Student-centered approach',
        'Adaptability in challenging situations',
        'Strong communication skills',
        'Empathy and understanding',
        'Creative lesson planning'
      ],
      growthAreas: [
        'Improve classroom management techniques',
        'Develop better parent communication',
        'Enhance technology integration',
        'Learn differentiated instruction methods',
        'Practice assessment and feedback strategies'
      ],
      highScoreRec: 'Your empathy and adaptability are perfect for education. Consider pursuing a teaching credential and specializing in a subject you\'re passionate about.',
      lowScoreRec: 'You have good instincts with students but would benefit from formal education training and classroom management techniques.'
    },
    'Commercial Pilot': {
      strengths: [
        'Excellent decision-making under pressure',
        'Strong safety consciousness',
        'Good risk assessment',
        'Team coordination skills',
        'Attention to procedures'
      ],
      growthAreas: [
        'Improve weather interpretation skills',
        'Enhance emergency response training',
        'Develop better passenger communication',
        'Learn more advanced navigation techniques',
        'Practice crew resource management'
      ],
      highScoreRec: 'Your safety focus and decision-making skills are excellent for aviation. Consider pursuing pilot training and building flight hours.',
      lowScoreRec: 'You show good judgment but would need extensive training in aviation procedures and emergency management.'
    },
    'Emergency Room Doctor': {
      strengths: [
        'Excellent triage decision-making',
        'Calm under extreme pressure',
        'Strong ethical reasoning',
        'Quick diagnostic thinking',
        'Patient-centered care'
      ],
      growthAreas: [
        'Improve bedside manner under stress',
        'Enhance team coordination skills',
        'Develop better family communication',
        'Learn more emergency procedures',
        'Practice clinical decision-making'
      ],
      highScoreRec: 'Your ability to make critical decisions under pressure is exceptional for emergency medicine. Medical school and emergency medicine residency would be ideal.',
      lowScoreRec: 'You show good instincts but would need extensive medical training and experience managing life-or-death situations.'
    },
    'Software Engineer': {
      strengths: [
        'Logical problem-solving approach',
        'Strong technical thinking',
        'Collaborative development mindset',
        'Quality-focused coding practices',
        'Continuous learning attitude'
      ],
      growthAreas: [
        'Improve system architecture skills',
        'Enhance code review practices',
        'Develop better technical communication',
        'Learn more about scalability patterns',
        'Practice agile development methodologies'
      ],
      highScoreRec: 'Your analytical thinking and problem-solving skills are excellent for software development. Consider specializing in areas like backend systems, frontend frameworks, or DevOps.',
      lowScoreRec: 'You show good technical instincts but would benefit from more hands-on coding experience and formal computer science training.'
    },
    'Data Scientist': {
      strengths: [
        'Strong analytical reasoning',
        'Statistical thinking approach',
        'Ethical data handling',
        'Business impact focus',
        'Scientific methodology'
      ],
      growthAreas: [
        'Improve machine learning model validation',
        'Enhance data visualization skills',
        'Develop better stakeholder communication',
        'Learn more advanced statistical methods',
        'Practice feature engineering techniques'
      ],
      highScoreRec: 'Your analytical mindset and ethical approach to data are perfect for data science. Consider specializing in machine learning, statistical analysis, or business intelligence.',
      lowScoreRec: 'You have good analytical instincts but would benefit from more training in statistics, programming, and machine learning techniques.'
    },
    'Marketing Manager': {
      strengths: [
        'Strategic campaign thinking',
        'Brand awareness focus',
        'Customer-centric approach',
        'Creative problem-solving',
        'Data-driven decision making'
      ],
      growthAreas: [
        'Improve crisis communication skills',
        'Enhance digital marketing expertise',
        'Develop better budget management',
        'Learn more about customer psychology',
        'Practice A/B testing methodologies'
      ],
      highScoreRec: 'Your strategic thinking and customer focus are excellent for marketing leadership. Consider specializing in digital marketing, brand management, or growth marketing.',
      lowScoreRec: 'You show good marketing instincts but would benefit from more experience with campaign analytics and customer behavior analysis.'
    },
    'Financial Analyst': {
      strengths: [
        'Strong quantitative analysis',
        'Risk assessment capabilities',
        'Attention to detail',
        'Objective decision-making',
        'Market awareness'
      ],
      growthAreas: [
        'Improve financial modeling skills',
        'Enhance presentation abilities',
        'Develop better client communication',
        'Learn more about market dynamics',
        'Practice scenario planning techniques'
      ],
      highScoreRec: 'Your analytical skills and attention to detail are perfect for financial analysis. Consider specializing in investment analysis, corporate finance, or risk management.',
      lowScoreRec: 'You have good financial instincts but would benefit from more training in financial modeling and market analysis techniques.'
    },
    'Project Manager': {
      strengths: [
        'Excellent coordination skills',
        'Strong stakeholder management',
        'Problem-solving under pressure',
        'Team leadership abilities',
        'Process improvement focus'
      ],
      growthAreas: [
        'Improve risk management planning',
        'Enhance budget control skills',
        'Develop better conflict resolution',
        'Learn more about agile methodologies',
        'Practice change management techniques'
      ],
      highScoreRec: 'Your leadership and coordination skills are excellent for project management. Consider getting PMP certification and specializing in your industry of interest.',
      lowScoreRec: 'You show good organizational skills but would benefit from formal project management training and experience with project management tools.'
    },
    'Registered Nurse': {
      strengths: [
        'Compassionate patient care',
        'Strong clinical judgment',
        'Ethical decision-making',
        'Team collaboration skills',
        'Attention to patient safety'
      ],
      growthAreas: [
        'Improve time management skills',
        'Enhance family communication',
        'Develop better stress management',
        'Learn more about specialized care',
        'Practice documentation efficiency'
      ],
      highScoreRec: 'Your compassion and clinical thinking are perfect for nursing. Consider specializing in areas like critical care, pediatrics, or nurse practitioner roles.',
      lowScoreRec: 'You have good caring instincts but would benefit from more clinical training and experience managing multiple patient priorities.'
    },
    'Corporate Lawyer': {
      strengths: [
        'Strong analytical reasoning',
        'Ethical decision-making',
        'Risk assessment abilities',
        'Client advocacy skills',
        'Attention to legal details'
      ],
      growthAreas: [
        'Improve negotiation techniques',
        'Enhance client communication',
        'Develop better time management',
        'Learn more about specialized law areas',
        'Practice courtroom presentation skills'
      ],
      highScoreRec: 'Your analytical thinking and ethical reasoning are excellent for legal practice. Consider specializing in corporate law, litigation, or regulatory compliance.',
      lowScoreRec: 'You show good legal instincts but would benefit from law school and more experience with legal research and writing.'
    },
    'Architect': {
      strengths: [
        'Creative design thinking',
        'Spatial visualization skills',
        'Sustainability awareness',
        'Client collaboration abilities',
        'Technical problem-solving'
      ],
      growthAreas: [
        'Improve project management skills',
        'Enhance building code knowledge',
        'Develop better cost estimation',
        'Learn more about construction methods',
        'Practice client presentation techniques'
      ],
      highScoreRec: 'Your design thinking and technical skills are perfect for architecture. Consider pursuing architectural licensure and specializing in sustainable or innovative design.',
      lowScoreRec: 'You have good design instincts but would benefit from formal architectural education and more experience with building systems.'
    },
    'Sales Manager': {
      strengths: [
        'Strong relationship building',
        'Motivational leadership',
        'Results-oriented thinking',
        'Customer focus',
        'Strategic planning abilities'
      ],
      growthAreas: [
        'Improve performance coaching skills',
        'Enhance data analysis capabilities',
        'Develop better territory planning',
        'Learn more about sales technology',
        'Practice conflict resolution techniques'
      ],
      highScoreRec: 'Your leadership and customer focus are excellent for sales management. Consider developing expertise in sales methodology and team development.',
      lowScoreRec: 'You show good people skills but would benefit from more experience with sales processes and performance management techniques.'
    },
    'Investigative Journalist': {
      strengths: [
        'Strong ethical reasoning',
        'Investigative thinking',
        'Source protection awareness',
        'Public interest focus',
        'Fact-checking diligence'
      ],
      growthAreas: [
        'Improve interview techniques',
        'Enhance digital research skills',
        'Develop better story structure',
        'Learn more about media law',
        'Practice deadline management'
      ],
      highScoreRec: 'Your ethical approach and investigative instincts are perfect for journalism. Consider specializing in investigative reporting, data journalism, or multimedia storytelling.',
      lowScoreRec: 'You have good journalistic instincts but would benefit from more training in research methods and journalism ethics.'
    }
  };

  const roleData = feedbackOptions[roleName as keyof typeof feedbackOptions];
  if (!roleData) {
    // Fallback for unknown roles
    return {
      strengths: ['Good problem-solving skills', 'Thoughtful decision-making'],
      growthAreas: ['Continue developing expertise', 'Practice handling pressure'],
      recommendation: 'Consider exploring this career path further through education and hands-on experience.'
    };
  }

  // Select random strengths and growth areas
  const selectedStrengths = roleData.strengths
    .sort(() => 0.5 - Math.random())
    .slice(0, 3);
  
  const selectedGrowthAreas = roleData.growthAreas
    .sort(() => 0.5 - Math.random())
    .slice(0, 2);

  const recommendation = score >= 70 ? roleData.highScoreRec : roleData.lowScoreRec;

  return {
    strengths: selectedStrengths,
    growthAreas: selectedGrowthAreas,
    recommendation
  };
}