# Role Swap API Documentation

## Overview
The Role Swap API provides endpoints for retrieving professional role simulations, scenarios, and assessment criteria, as well as managing user sessions and interactions. This API supports the interactive career exploration application where users can experience different professional roles through realistic scenarios.


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

### 4. Create New Role (Admin)
Creates a new professional role for simulation.

**Endpoint:** `POST /api/roles`

**Request Body:**
```json
{
  "title": "Product Manager",
  "description": "Define product strategy and roadmap",
  "difficulty": "Advanced",
  "estimatedTime": "50-65 minutes",
  "skills": ["Product Strategy", "User Research", "Data Analysis"],
  "imageUrl": "/images/product-manager.jpg"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Role created successfully",
  "data": {
    "id": 6,
    "title": "Product Manager",
    "description": "Define product strategy and roadmap",
    "difficulty": "Advanced",
    "estimatedTime": "50-65 minutes",
    "skills": ["Product Strategy", "User Research", "Data Analysis"],
    "imageUrl": "/images/product-manager.jpg"
  }
}
```

### 5. Create New Scenario
Creates a new scenario for a specific role.

**Endpoint:** `POST /api/roles/:roleId/scenarios`

**Parameters:**
- `roleId` (number): Role ID

**Request Body:**
```json
{
  "title": "Feature Prioritization",
  "description": "You need to prioritize features for the next sprint with limited resources.",
  "options": [
    {
      "text": "Choose features with highest user demand",
      "outcome": "Good user-centric approach",
      "score": 3
    },
    {
      "text": "Choose features that are easiest to implement",
      "outcome": "Short-term thinking",
      "score": 1
    },
    {
      "text": "Choose features with highest business impact",
      "outcome": "Strategic thinking",
      "score": 4
    }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "message": "Scenario created successfully",
  "data": {
    "id": 3,
    "title": "Feature Prioritization",
    "description": "You need to prioritize features for the next sprint with limited resources.",
    "options": [
      {
        "id": "a",
        "text": "Choose features with highest user demand",
        "outcome": "Good user-centric approach",
        "score": 3
      }
    ]
  }
}
```

### 6. Submit Feedback
Submits user feedback about the simulation experience.

**Endpoint:** `POST /api/feedback`

**Request Body:**
```json
{
  "userId": "user123",
  "sessionId": "session_1705123456789_user123",
  "rating": 5,
  "comment": "Very realistic scenarios!",
  "category": "user_experience"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Feedback submitted successfully",
  "data": {
    "id": "feedback_1705123456789",
    "userId": "user123",
    "sessionId": "session_1705123456789_user123",
    "rating": 5,
    "comment": "Very realistic scenarios!",
    "category": "user_experience",
    "timestamp": "2024-01-15T10:30:00.000Z"
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
  "message": "Error starting session",
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
# Start a session
curl -X POST http://localhost:5000/api/sessions \
  -H "Content-Type: application/json" \
  -d '{"userId":"user123","userName":"John Doe","selectedRoleId":1}'

# Submit a response
curl -X POST http://localhost:5000/api/sessions/session_123/responses \
  -H "Content-Type: application/json" \
  -d '{"scenarioId":1,"selectedOptionId":"b"}'

# Complete session
curl -X POST http://localhost:5000/api/sessions/session_123/complete \
  -H "Content-Type: application/json" \
  -d '{"feedback":"Great experience!"}'
  
# Get all roles
curl http://localhost:5000/api/roles

# Get specific role
curl http://localhost:5000/api/roles/1

# Get scenarios for role
curl http://localhost:5000/api/roles/1/scenarios

# Health check
curl http://localhost:5000/api/health
``` 