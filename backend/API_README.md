# Role Swap API Documentation

## Overview
The Role Swap API provides endpoints for retrieving professional role simulations, scenarios, and assessment criteria, as well as managing user sessions, interactions, and updates. This API supports the interactive career exploration application where users can experience different professional roles through realistic scenarios.

## Base URL
```
http://localhost:5000
```

## GET Endpoints

### 1. Get All Roles
Retrieves all available professional roles for simulation.

**Endpoint:** `GET /api/roles`

**Response:**
```json
{
  "success": true,
  "message": "Roles retrieved successfully",
  "data": [
    {
      "id": 1,
      "title": "Software Engineer",
      "description": "Develop and maintain software applications",
      "difficulty": "Intermediate",
      "estimatedTime": "30-45 minutes",
      "skills": ["Programming", "Problem Solving", "Team Collaboration"],
      "imageUrl": "/images/software-engineer.jpg"
    }
  ],
  "count": 5
}
```

### 2. Get Specific Role
Retrieves details of a specific role by ID.

**Endpoint:** `GET /api/roles/:id`

**Parameters:**
- `id` (number): Role ID

**Response:**
```json
{
  "success": true,
  "message": "Role retrieved successfully",
  "data": {
    "id": 1,
    "title": "Software Engineer",
    "description": "Develop and maintain software applications",
    "difficulty": "Intermediate",
    "estimatedTime": "30-45 minutes",
    "skills": ["Programming", "Problem Solving", "Team Collaboration"],
    "imageUrl": "/images/software-engineer.jpg"
  }
}
```

### 3. Get Scenarios for Role
Retrieves all scenarios available for a specific role.

**Endpoint:** `GET /api/roles/:id/scenarios`

**Parameters:**
- `id` (number): Role ID

**Response:**
```json
{
  "success": true,
  "message": "Scenarios retrieved successfully",
  "data": [
    {
      "id": 1,
      "title": "Bug Fix Challenge",
      "description": "You've been assigned to fix a critical bug in production...",
      "options": [
        {
          "id": "a",
          "text": "Immediately deploy a hotfix without thorough testing",
          "outcome": "Poor choice - This could introduce more bugs",
          "score": -2
        }
      ]
    }
  ],
  "count": 2
}
```

### 4. Get Assessment Criteria
Retrieves assessment criteria and evaluation metrics for a specific role.

**Endpoint:** `GET /api/roles/:id/assessment`

**Parameters:**
- `id` (number): Role ID

**Response:**
```json
{
  "success": true,
  "message": "Assessment criteria retrieved successfully",
  "data": {
    "categories": [
      {
        "name": "Technical Skills",
        "weight": 0.4,
        "criteria": ["Problem Solving", "Code Quality", "Testing", "Documentation"]
      }
    ]
  }
}
```

### 5. Get All Scenarios
Retrieves all scenarios across all roles (admin endpoint).

**Endpoint:** `GET /api/scenarios`

**Response:**
```json
{
  "success": true,
  "message": "All scenarios retrieved successfully",
  "data": {
    "1": [
      {
        "id": 1,
        "title": "Bug Fix Challenge",
        "description": "...",
        "options": [...]
      }
    ]
  }
}
```

### 6. Health Check
Checks if the API is running properly.

**Endpoint:** `GET /api/health`

**Response:**
```json
{
  "success": true,
  "message": "Role Swap API is running",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "version": "1.0.0"
}
```

## POST Endpoints

### 1. Start User Session
Creates a new user session for role simulation.

**Endpoint:** `POST /api/sessions`

**Request Body:**
```json
{
  "userId": "user123",
  "userName": "John Doe",
  "selectedRoleId": 1
}
```

**Response:**
```json
{
  "success": true,
  "message": "Session started successfully",
  "data": {
    "sessionId": "session_1705123456789_user123",
    "role": "Software Engineer",
    "estimatedTime": "30-45 minutes",
    "difficulty": "Intermediate"
  }
}
```

### 2. Submit Scenario Response
Submits user's response to a specific scenario.

**Endpoint:** `POST /api/sessions/:sessionId/responses`

**Parameters:**
- `sessionId` (string): Session ID

**Request Body:**
```json
{
  "scenarioId": 1,
  "selectedOptionId": "b",
  "responseTime": 1705123456789
}
```

**Response:**
```json
{
  "success": true,
  "message": "Response submitted successfully",
  "data": {
    "outcome": "Good approach - Systematic problem-solving",
    "score": 3,
    "totalScore": 3,
    "progress": 50
  }
}
```

### 3. Complete Session
Completes the user session and generates assessment.

**Endpoint:** `POST /api/sessions/:sessionId/complete`

**Parameters:**
- `sessionId` (string): Session ID

**Request Body:**
```json
{
  "feedback": "Great experience learning about software engineering!"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Session completed successfully",
  "data": {
    "sessionId": "session_1705123456789_user123",
    "userId": "user123",
    "userName": "John Doe",
    "role": "Software Engineer",
    "totalScore": 7,
    "maxPossibleScore": 7,
    "performancePercentage": 100,
    "performanceLevel": "Excellent",
    "scenariosCompleted": 2,
    "totalScenarios": 2,
    "completionTime": "2024-01-15T10:30:00.000Z",
    "feedback": "Great experience learning about software engineering!",
    "detailedResponses": [...]
  }
}
```

## PUT Endpoints

### 1. Update User Profile
Updates user profile information.

**Endpoint:** `PUT /api/users/:userId/profile`

**Parameters:**
- `userId` (string): User ID

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "preferences": {
    "preferredRoles": [1, 2],
    "difficultyLevel": "Intermediate"
  },
  "careerGoals": ["Software Engineering", "Team Leadership"],
  "experienceLevel": "Intermediate"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User profile updated successfully",
  "data": {
    "userId": "user123",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "preferences": {
      "preferredRoles": [1, 2],
      "difficultyLevel": "Intermediate"
    },
    "careerGoals": ["Software Engineering", "Team Leadership"],
    "experienceLevel": "Intermediate",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:35:00.000Z"
  }
}
```

### 2. Update Session Progress
Updates session progress and status.

**Endpoint:** `PUT /api/sessions/:sessionId/progress`

**Parameters:**
- `sessionId` (string): Session ID

**Request Body:**
```json
{
  "currentScenario": 2,
  "status": "paused",
  "notes": "User paused session for lunch break"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Session progress updated successfully",
  "data": {
    "sessionId": "session_1705123456789_user123",
    "currentScenario": 2,
    "status": "paused",
    "notes": "User paused session for lunch break",
    "lastUpdated": "2024-01-15T10:35:00.000Z"
  }
}
```

### 3. Update Role Details (Admin)
Updates role information and details.

**Endpoint:** `PUT /api/roles/:id`

**Parameters:**
- `id` (number): Role ID

**Request Body:**
```json
{
  "title": "Senior Software Engineer",
  "description": "Lead development of complex software applications",
  "difficulty": "Advanced",
  "estimatedTime": "45-60 minutes",
  "skills": ["Advanced Programming", "System Design", "Team Leadership"],
  "imageUrl": "/images/senior-software-engineer.jpg"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Role updated successfully",
  "data": {
    "id": 1,
    "title": "Senior Software Engineer",
    "description": "Lead development of complex software applications",
    "difficulty": "Advanced",
    "estimatedTime": "45-60 minutes",
    "skills": ["Advanced Programming", "System Design", "Team Leadership"],
    "imageUrl": "/images/senior-software-engineer.jpg",
    "updatedAt": "2024-01-15T10:35:00.000Z"
  }
}
```

### 4. Update Scenario Details (Admin)
Updates scenario information and options.

**Endpoint:** `PUT /api/roles/:roleId/scenarios/:scenarioId`

**Parameters:**
- `roleId` (number): Role ID
- `scenarioId` (number): Scenario ID

**Request Body:**
```json
{
  "title": "Advanced Bug Fix Challenge",
  "description": "You've been assigned to fix a critical bug in a microservices architecture.",
  "options": [
    {
      "text": "Implement distributed tracing and debug systematically",
      "outcome": "Excellent approach - Systematic debugging",
      "score": 5
    },
    {
      "text": "Check logs and make educated guesses",
      "outcome": "Risky approach - May miss root cause",
      "score": 2
    },
    {
      "text": "Ask the DevOps team to handle it",
      "outcome": "Avoiding responsibility",
      "score": -1
    }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "message": "Scenario updated successfully",
  "data": {
    "id": 1,
    "title": "Advanced Bug Fix Challenge",
    "description": "You've been assigned to fix a critical bug in a microservices architecture.",
    "options": [
      {
        "id": "a",
        "text": "Implement distributed tracing and debug systematically",
        "outcome": "Excellent approach - Systematic debugging",
        "score": 5
      }
    ],
    "updatedAt": "2024-01-15T10:35:00.000Z"
  }
}
```

### 5. Update Assessment Criteria (Admin)
Updates assessment criteria for a specific role.

**Endpoint:** `PUT /api/roles/:id/assessment`

**Parameters:**
- `id` (number): Role ID

**Request Body:**
```json
{
  "categories": [
    {
      "name": "Technical Skills",
      "weight": 0.5,
      "criteria": ["Problem Solving", "Code Quality", "Testing", "Documentation", "System Design"]
    },
    {
      "name": "Leadership Skills",
      "weight": 0.3,
      "criteria": ["Team Management", "Mentoring", "Decision Making"]
    },
    {
      "name": "Communication",
      "weight": 0.2,
      "criteria": ["Technical Communication", "Stakeholder Management"]
    }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "message": "Assessment criteria updated successfully",
  "data": {
    "categories": [
      {
        "name": "Technical Skills",
        "weight": 0.5,
        "criteria": ["Problem Solving", "Code Quality", "Testing", "Documentation", "System Design"]
      }
    ],
    "updatedAt": "2024-01-15T10:35:00.000Z"
  }
}
```

### 6. Update User Assessment
Updates user assessment with additional feedback or notes.

**Endpoint:** `PUT /api/assessments/:sessionId`

**Parameters:**
- `sessionId` (string): Session ID

**Request Body:**
```json
{
  "feedback": "User showed excellent problem-solving skills",
  "performanceLevel": "Excellent",
  "customNotes": "Recommended for advanced roles"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Assessment updated successfully",
  "data": {
    "sessionId": "session_1705123456789_user123",
    "userId": "user123",
    "userName": "John Doe",
    "role": "Software Engineer",
    "totalScore": 7,
    "maxPossibleScore": 7,
    "performancePercentage": 100,
    "performanceLevel": "Excellent",
    "feedback": "User showed excellent problem-solving skills",
    "customNotes": "Recommended for advanced roles",
    "updatedAt": "2024-01-15T10:35:00.000Z"
  }
}
```

### 7. Update User Preferences
Updates user preferences and settings.

**Endpoint:** `PUT /api/users/:userId/preferences`

**Parameters:**
- `userId` (string): User ID

**Request Body:**
```json
{
  "preferredRoles": [1, 3, 4],
  "difficultyLevel": "Advanced",
  "timePreference": "30-45 minutes",
  "notificationSettings": {
    "email": true,
    "push": false,
    "weeklyDigest": true
  }
}
```

**Response:**
```json
{
  "success": true,
  "message": "User preferences updated successfully",
  "data": {
    "preferredRoles": [1, 3, 4],
    "difficultyLevel": "Advanced",
    "timePreference": "30-45 minutes",
    "notificationSettings": {
      "email": true,
      "push": false,
      "weeklyDigest": true
    }
  }
}
```

## Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "message": "Missing required fields: userId, userName, selectedRoleId"
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Session not found"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "message": "Error updating user profile",
  "error": "Error details"
}
```

## Available Roles

1. **Software Engineer** (ID: 1)
   - Focus: Programming, problem-solving, team collaboration
   - Difficulty: Intermediate
   - Time: 30-45 minutes

2. **Project Manager** (ID: 2)
   - Focus: Leadership, communication, planning
   - Difficulty: Advanced
   - Time: 45-60 minutes

3. **Data Analyst** (ID: 3)
   - Focus: Data analysis, statistics, visualization
   - Difficulty: Intermediate
   - Time: 30-45 minutes

4. **UX Designer** (ID: 4)
   - Focus: User research, design thinking, prototyping
   - Difficulty: Intermediate
   - Time: 35-50 minutes

5. **Marketing Manager** (ID: 5)
   - Focus: Strategy, creativity, analytics
   - Difficulty: Advanced
   - Time: 40-55 minutes

## Session Management

The API maintains user sessions in memory with the following features:
- Session tracking with unique session IDs
- Progress monitoring across scenarios
- Score calculation and performance assessment
- Detailed response logging for analysis
- User profile and preference management

## Setup Instructions

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the server:
   ```bash
   npm start
   ```

3. For development with auto-restart:
   ```bash
   npm run dev
   ```

## Testing the API

You can test the endpoints using curl or any API client:

```bash
# Update user profile
curl -X PUT http://localhost:5000/api/users/user123/profile \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com"}'

# Update session progress
curl -X PUT http://localhost:5000/api/sessions/session_123/progress \
  -H "Content-Type: application/json" \
  -d '{"currentScenario":2,"status":"paused"}'

# Update role details
curl -X PUT http://localhost:5000/api/roles/1 \
  -H "Content-Type: application/json" \
  -d '{"title":"Senior Software Engineer","difficulty":"Advanced"}'
``` 