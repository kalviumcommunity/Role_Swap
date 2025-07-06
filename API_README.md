# Role Swap API Documentation

## Overview
The Role Swap API provides endpoints for retrieving professional role simulations, scenarios, and assessment criteria. This API supports the interactive career exploration application where users can experience different professional roles through realistic scenarios.

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

## Error Responses

### 404 Not Found
```json
{
  "success": false,
  "message": "Role not found"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "message": "Error retrieving roles",
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
# Get all roles
curl http://localhost:5000/api/roles

# Get specific role
curl http://localhost:5000/api/roles/1

# Get scenarios for role
curl http://localhost:5000/api/roles/1/scenarios

# Health check
curl http://localhost:5000/api/health
``` 