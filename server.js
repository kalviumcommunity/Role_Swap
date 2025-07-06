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

// In-memory storage for user sessions and progress
let userSessions = new Map();
let userProgress = new Map();
let userAssessments = new Map();
let userProfiles = new Map();

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

// POST API Routes

// 1. Start a new user session
app.post('/api/sessions', (req, res) => {
  try {
    const { userId, userName, selectedRoleId } = req.body;
    
    if (!userId || !userName || !selectedRoleId) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: userId, userName, selectedRoleId"
      });
    }
    
    const role = roles.find(r => r.id === parseInt(selectedRoleId));
    if (!role) {
      return res.status(404).json({
        success: false,
        message: "Selected role not found"
      });
    }
    
    const sessionId = `session_${Date.now()}_${userId}`;
    const session = {
      sessionId,
      userId,
      userName,
      selectedRole: role,
      startTime: new Date().toISOString(),
      status: 'active',
      currentScenario: 0,
      completedScenarios: [],
      totalScore: 0
    };
    
    userSessions.set(sessionId, session);
    userProgress.set(userId, {
      sessionId,
      roleId: selectedRoleId,
      progress: 0,
      scenariosCompleted: 0
    });
    
    res.status(201).json({
      success: true,
      message: "Session started successfully",
      data: {
        sessionId,
        role: role.title,
        estimatedTime: role.estimatedTime,
        difficulty: role.difficulty
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error starting session",
      error: error.message
    });
  }
});

// 2. Submit scenario response
app.post('/api/sessions/:sessionId/responses', (req, res) => {
  try {
    const { sessionId } = req.params;
    const { scenarioId, selectedOptionId, responseTime } = req.body;
    
    if (!scenarioId || !selectedOptionId) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: scenarioId, selectedOptionId"
      });
    }
    
    const session = userSessions.get(sessionId);
    if (!session) {
      return res.status(404).json({
        success: false,
        message: "Session not found"
      });
    }
    
    const roleScenarios = scenarios[session.selectedRole.id];
    const scenario = roleScenarios.find(s => s.id === parseInt(scenarioId));
    const selectedOption = scenario.options.find(o => o.id === selectedOptionId);
    
    if (!scenario || !selectedOption) {
      return res.status(404).json({
        success: false,
        message: "Scenario or option not found"
      });
    }
    
    const response = {
      scenarioId: parseInt(scenarioId),
      selectedOptionId,
      selectedOptionText: selectedOption.text,
      outcome: selectedOption.outcome,
      score: selectedOption.score,
      responseTime: responseTime || Date.now(),
      timestamp: new Date().toISOString()
    };
    
    session.completedScenarios.push(response);
    session.totalScore += selectedOption.score;
    session.currentScenario++;
    
    // Update user progress
    const userProg = userProgress.get(session.userId);
    if (userProg) {
      userProg.scenariosCompleted++;
      userProg.progress = (userProg.scenariosCompleted / roleScenarios.length) * 100;
    }
    
    res.status(200).json({
      success: true,
      message: "Response submitted successfully",
      data: {
        outcome: selectedOption.outcome,
        score: selectedOption.score,
        totalScore: session.totalScore,
        progress: userProg ? userProg.progress : 0
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error submitting response",
      error: error.message
    });
  }
});

// 3. Complete session and generate assessment
app.post('/api/sessions/:sessionId/complete', (req, res) => {
  try {
    const { sessionId } = req.params;
    const { feedback } = req.body;
    
    const session = userSessions.get(sessionId);
    if (!session) {
      return res.status(404).json({
        success: false,
        message: "Session not found"
      });
    }
    
    const roleScenarios = scenarios[session.selectedRole.id];
    const totalPossibleScore = roleScenarios.reduce((total, scenario) => {
      const maxScore = Math.max(...scenario.options.map(opt => opt.score));
      return total + maxScore;
    }, 0);
    
    const performancePercentage = (session.totalScore / totalPossibleScore) * 100;
    
    let performanceLevel;
    if (performancePercentage >= 80) performanceLevel = "Excellent";
    else if (performancePercentage >= 60) performanceLevel = "Good";
    else if (performancePercentage >= 40) performanceLevel = "Average";
    else performanceLevel = "Needs Improvement";
    
    const assessment = {
      sessionId,
      userId: session.userId,
      userName: session.userName,
      role: session.selectedRole.title,
      totalScore: session.totalScore,
      maxPossibleScore: totalPossibleScore,
      performancePercentage,
      performanceLevel,
      scenariosCompleted: session.completedScenarios.length,
      totalScenarios: roleScenarios.length,
      completionTime: new Date().toISOString(),
      feedback: feedback || "",
      detailedResponses: session.completedScenarios
    };
    
    userAssessments.set(sessionId, assessment);
    session.status = 'completed';
    
    res.status(200).json({
      success: true,
      message: "Session completed successfully",
      data: assessment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error completing session",
      error: error.message
    });
  }
});

// PUT API Routes

// 1. Update user profile
app.put('/api/users/:userId/profile', (req, res) => {
  try {
    const { userId } = req.params;
    const { name, email, preferences, careerGoals, experienceLevel } = req.body;
    
    if (!name && !email && !preferences && !careerGoals && !experienceLevel) {
      return res.status(400).json({
        success: false,
        message: "At least one field must be provided for update"
      });
    }
    
    let userProfile = userProfiles.get(userId) || {
      userId,
      name: "",
      email: "",
      preferences: {},
      careerGoals: [],
      experienceLevel: "Beginner",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    // Update only provided fields
    if (name) userProfile.name = name;
    if (email) userProfile.email = email;
    if (preferences) userProfile.preferences = { ...userProfile.preferences, ...preferences };
    if (careerGoals) userProfile.careerGoals = careerGoals;
    if (experienceLevel) userProfile.experienceLevel = experienceLevel;
    
    userProfile.updatedAt = new Date().toISOString();
    userProfiles.set(userId, userProfile);
    
    res.status(200).json({
      success: true,
      message: "User profile updated successfully",
      data: userProfile
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating user profile",
      error: error.message
    });
  }
});

// 2. Update session progress
app.put('/api/sessions/:sessionId/progress', (req, res) => {
  try {
    const { sessionId } = req.params;
    const { currentScenario, status, notes } = req.body;
    
    const session = userSessions.get(sessionId);
    if (!session) {
      return res.status(404).json({
        success: false,
        message: "Session not found"
      });
    }
    
    // Update session fields
    if (currentScenario !== undefined) session.currentScenario = currentScenario;
    if (status) session.status = status;
    if (notes) session.notes = notes;
    
    session.lastUpdated = new Date().toISOString();
    
    res.status(200).json({
      success: true,
      message: "Session progress updated successfully",
      data: {
        sessionId,
        currentScenario: session.currentScenario,
        status: session.status,
        notes: session.notes,
        lastUpdated: session.lastUpdated
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating session progress",
      error: error.message
    });
  }
});

// 3. Update role details (admin)
app.put('/api/roles/:id', (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, difficulty, estimatedTime, skills, imageUrl } = req.body;
    
    const roleIndex = roles.findIndex(r => r.id === parseInt(id));
    if (roleIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Role not found"
      });
    }
    
    const updatedRole = { ...roles[roleIndex] };
    
    // Update only provided fields
    if (title) updatedRole.title = title;
    if (description) updatedRole.description = description;
    if (difficulty) updatedRole.difficulty = difficulty;
    if (estimatedTime) updatedRole.estimatedTime = estimatedTime;
    if (skills) updatedRole.skills = Array.isArray(skills) ? skills : [skills];
    if (imageUrl) updatedRole.imageUrl = imageUrl;
    
    updatedRole.updatedAt = new Date().toISOString();
    roles[roleIndex] = updatedRole;
    
    res.status(200).json({
      success: true,
      message: "Role updated successfully",
      data: updatedRole
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating role",
      error: error.message
    });
  }
});

// 4. Update scenario details (admin)
app.put('/api/roles/:roleId/scenarios/:scenarioId', (req, res) => {
  try {
    const { roleId, scenarioId } = req.params;
    const { title, description, options } = req.body;
    
    const roleScenarios = scenarios[roleId];
    if (!roleScenarios) {
      return res.status(404).json({
        success: false,
        message: "Role scenarios not found"
      });
    }
    
    const scenarioIndex = roleScenarios.findIndex(s => s.id === parseInt(scenarioId));
    if (scenarioIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Scenario not found"
      });
    }
    
    const updatedScenario = { ...roleScenarios[scenarioIndex] };
    
    // Update only provided fields
    if (title) updatedScenario.title = title;
    if (description) updatedScenario.description = description;
    if (options && Array.isArray(options)) {
      updatedScenario.options = options.map((option, index) => ({
        id: String.fromCharCode(97 + index), // a, b, c, etc.
        text: option.text,
        outcome: option.outcome,
        score: option.score || 0
      }));
    }
    
    updatedScenario.updatedAt = new Date().toISOString();
    roleScenarios[scenarioIndex] = updatedScenario;
    
    res.status(200).json({
      success: true,
      message: "Scenario updated successfully",
      data: updatedScenario
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating scenario",
      error: error.message
    });
  }
});

// 5. Update assessment criteria (admin)
app.put('/api/roles/:id/assessment', (req, res) => {
  try {
    const { id } = req.params;
    const { categories } = req.body;
    
    const role = roles.find(r => r.id === parseInt(id));
    if (!role) {
      return res.status(404).json({
        success: false,
        message: "Role not found"
      });
    }
    
    if (!categories || !Array.isArray(categories)) {
      return res.status(400).json({
        success: false,
        message: "Categories array is required"
      });
    }
    
    assessmentCriteria[role.title] = {
      categories: categories.map(cat => ({
        name: cat.name,
        weight: cat.weight || 0.3,
        criteria: Array.isArray(cat.criteria) ? cat.criteria : [cat.criteria]
      })),
      updatedAt: new Date().toISOString()
    };
    
    res.status(200).json({
      success: true,
      message: "Assessment criteria updated successfully",
      data: assessmentCriteria[role.title]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating assessment criteria",
      error: error.message
    });
  }
});

// 6. Update user assessment
app.put('/api/assessments/:sessionId', (req, res) => {
  try {
    const { sessionId } = req.params;
    const { feedback, performanceLevel, customNotes } = req.body;
    
    const assessment = userAssessments.get(sessionId);
    if (!assessment) {
      return res.status(404).json({
        success: false,
        message: "Assessment not found"
      });
    }
    
    // Update only provided fields
    if (feedback) assessment.feedback = feedback;
    if (performanceLevel) assessment.performanceLevel = performanceLevel;
    if (customNotes) assessment.customNotes = customNotes;
    
    assessment.updatedAt = new Date().toISOString();
    userAssessments.set(sessionId, assessment);
    
    res.status(200).json({
      success: true,
      message: "Assessment updated successfully",
      data: assessment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating assessment",
      error: error.message
    });
  }
});

// 7. Update user preferences
app.put('/api/users/:userId/preferences', (req, res) => {
  try {
    const { userId } = req.params;
    const { preferredRoles, difficultyLevel, timePreference, notificationSettings } = req.body;
    
    let userProfile = userProfiles.get(userId);
    if (!userProfile) {
      return res.status(404).json({
        success: false,
        message: "User profile not found"
      });
    }
    
    // Update preferences
    if (preferredRoles) userProfile.preferences.preferredRoles = preferredRoles;
    if (difficultyLevel) userProfile.preferences.difficultyLevel = difficultyLevel;
    if (timePreference) userProfile.preferences.timePreference = timePreference;
    if (notificationSettings) userProfile.preferences.notificationSettings = notificationSettings;
    
    userProfile.updatedAt = new Date().toISOString();
    userProfiles.set(userId, userProfile);
    
    res.status(200).json({
      success: true,
      message: "User preferences updated successfully",
      data: userProfile.preferences
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating user preferences",
      error: error.message
    });
  }
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
      "GET /api/health": "Health check",
      "POST /api/sessions": "Start a new user session",
      "POST /api/sessions/:sessionId/responses": "Submit scenario response",
      "POST /api/sessions/:sessionId/complete": "Complete session and get assessment",
      "PUT /api/users/:userId/profile": "Update user profile",
      "PUT /api/sessions/:sessionId/progress": "Update session progress",
      "PUT /api/roles/:id": "Update role details",
      "PUT /api/roles/:roleId/scenarios/:scenarioId": "Update scenario details",
      "PUT /api/roles/:id/assessment": "Update assessment criteria",
      "PUT /api/assessments/:sessionId": "Update user assessment",
      "PUT /api/users/:userId/preferences": "Update user preferences"
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