const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sample data for Role Swap application
const roles = [
  {
    id: 1,
    title: "Software Engineer",
    description: "Develop and maintain software applications",
    difficulty: "Intermediate",
    estimatedTime: "30-45 minutes",
    skills: ["Programming", "Problem Solving", "Team Collaboration"],
    imageUrl: "/images/software-engineer.jpg"
  },
  {
    id: 2,
    title: "Project Manager",
    description: "Lead and coordinate project teams to deliver successful outcomes",
    difficulty: "Advanced",
    estimatedTime: "45-60 minutes",
    skills: ["Leadership", "Communication", "Planning"],
    imageUrl: "/images/project-manager.jpg"
  },
  {
    id: 3,
    title: "Data Analyst",
    description: "Analyze data to provide insights and support decision-making",
    difficulty: "Intermediate",
    estimatedTime: "30-45 minutes",
    skills: ["Data Analysis", "Statistics", "Visualization"],
    imageUrl: "/images/data-analyst.jpg"
  },
  {
    id: 4,
    title: "UX Designer",
    description: "Design user-centered digital experiences",
    difficulty: "Intermediate",
    estimatedTime: "35-50 minutes",
    skills: ["User Research", "Design Thinking", "Prototyping"],
    imageUrl: "/images/ux-designer.jpg"
  },
  {
    id: 5,
    title: "Marketing Manager",
    description: "Develop and execute marketing strategies",
    difficulty: "Advanced",
    estimatedTime: "40-55 minutes",
    skills: ["Strategy", "Creativity", "Analytics"],
    imageUrl: "/images/marketing-manager.jpg"
  }
];

const scenarios = {
  1: [ // Software Engineer scenarios
    {
      id: 1,
      title: "Bug Fix Challenge",
      description: "You've been assigned to fix a critical bug in production. The bug is causing the application to crash for 10% of users.",
      options: [
        {
          id: "a",
          text: "Immediately deploy a hotfix without thorough testing",
          outcome: "Poor choice - This could introduce more bugs",
          score: -2
        },
        {
          id: "b",
          text: "Create a comprehensive test plan and fix the bug systematically",
          outcome: "Good approach - Systematic problem-solving",
          score: 3
        },
        {
          id: "c",
          text: "Ask the team lead to handle it",
          outcome: "Avoiding responsibility - Not ideal",
          score: -1
        }
      ]
    },
    {
      id: 2,
      title: "Code Review Dilemma",
      description: "A junior developer has submitted code that works but doesn't follow best practices.",
      options: [
        {
          id: "a",
          text: "Approve it since it works",
          outcome: "Poor choice - Code quality matters",
          score: -1
        },
        {
          id: "b",
          text: "Provide constructive feedback and guide them",
          outcome: "Excellent - Mentoring and quality",
          score: 4
        },
        {
          id: "c",
          text: "Reject it harshly",
          outcome: "Poor leadership - Demotivating",
          score: -2
        }
      ]
    }
  ],
  2: [ // Project Manager scenarios
    {
      id: 1,
      title: "Timeline Crisis",
      description: "A key team member is sick and the project deadline is approaching.",
      options: [
        {
          id: "a",
          text: "Push the deadline without consulting stakeholders",
          outcome: "Poor communication - Risky",
          score: -2
        },
        {
          id: "b",
          text: "Reassess timeline and communicate with stakeholders",
          outcome: "Professional approach",
          score: 3
        },
        {
          id: "c",
          text: "Ask team to work overtime",
          outcome: "Short-term solution, long-term problems",
          score: -1
        }
      ]
    }
  ]
};

const assessmentCriteria = {
  "Software Engineer": {
    categories: [
      {
        name: "Technical Skills",
        weight: 0.4,
        criteria: ["Problem Solving", "Code Quality", "Testing", "Documentation"]
      },
      {
        name: "Soft Skills",
        weight: 0.3,
        criteria: ["Communication", "Teamwork", "Learning Ability"]
      },
      {
        name: "Professional Ethics",
        weight: 0.3,
        criteria: ["Responsibility", "Quality Focus", "Continuous Improvement"]
      }
    ]
  },
  "Project Manager": {
    categories: [
      {
        name: "Leadership",
        weight: 0.4,
        criteria: ["Team Management", "Decision Making", "Motivation"]
      },
      {
        name: "Communication",
        weight: 0.3,
        criteria: ["Stakeholder Management", "Clear Communication", "Conflict Resolution"]
      },
      {
        name: "Planning",
        weight: 0.3,
        criteria: ["Risk Management", "Resource Planning", "Timeline Management"]
      }
    ]
  }
};

// GET API Routes

// 1. Get all available roles
app.get('/api/roles', (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: "Roles retrieved successfully",
      data: roles,
      count: roles.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving roles",
      error: error.message
    });
  }
});

// 2. Get a specific role by ID
app.get('/api/roles/:id', (req, res) => {
  try {
    const roleId = parseInt(req.params.id);
    const role = roles.find(r => r.id === roleId);
    
    if (!role) {
      return res.status(404).json({
        success: false,
        message: "Role not found"
      });
    }
    
    res.status(200).json({
      success: true,
      message: "Role retrieved successfully",
      data: role
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving role",
      error: error.message
    });
  }
});

// 3. Get scenarios for a specific role
app.get('/api/roles/:id/scenarios', (req, res) => {
  try {
    const roleId = parseInt(req.params.id);
    const roleScenarios = scenarios[roleId];
    
    if (!roleScenarios) {
      return res.status(404).json({
        success: false,
        message: "Scenarios not found for this role"
      });
    }
    
    res.status(200).json({
      success: true,
      message: "Scenarios retrieved successfully",
      data: roleScenarios,
      count: roleScenarios.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving scenarios",
      error: error.message
    });
  }
});

// 4. Get assessment criteria for a role
app.get('/api/roles/:id/assessment', (req, res) => {
  try {
    const roleId = parseInt(req.params.id);
    const role = roles.find(r => r.id === roleId);
    
    if (!role) {
      return res.status(404).json({
        success: false,
        message: "Role not found"
      });
    }
    
    const criteria = assessmentCriteria[role.title];
    
    if (!criteria) {
      return res.status(404).json({
        success: false,
        message: "Assessment criteria not found for this role"
      });
    }
    
    res.status(200).json({
      success: true,
      message: "Assessment criteria retrieved successfully",
      data: criteria
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving assessment criteria",
      error: error.message
    });
  }
});

// 5. Get all scenarios (for admin purposes)
app.get('/api/scenarios', (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: "All scenarios retrieved successfully",
      data: scenarios
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving scenarios",
      error: error.message
    });
  }
});

// 6. Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: "Role Swap API is running",
    timestamp: new Date().toISOString(),
    version: "1.0.0"
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: "Welcome to Role Swap API",
    version: "1.0.0",
    endpoints: {
      "GET /api/roles": "Get all available roles",
      "GET /api/roles/:id": "Get a specific role",
      "GET /api/roles/:id/scenarios": "Get scenarios for a role",
      "GET /api/roles/:id/assessment": "Get assessment criteria for a role",
      "GET /api/scenarios": "Get all scenarios",
      "GET /api/health": "Health check"
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong!",
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Role Swap API server running on port ${PORT}`);
  console.log(`📖 API Documentation: http://localhost:${PORT}`);
  console.log(`🏥 Health Check: http://localhost:${PORT}/api/health`);
}); 