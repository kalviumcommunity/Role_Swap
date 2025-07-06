# Role Swap Database Schema Documentation

## Overview
This document describes the database schema for the Role Swap application, which uses MongoDB with Mongoose ODM.

## Database Models

### 1. User Model (`models/User.js`)

**Purpose**: Stores user authentication and profile information.

**Schema Fields**:
- `username` (String, required, unique): User's unique username
- `email` (String, required, unique): User's email address
- `password` (String, required): Hashed password
- `firstName` (String, required): User's first name
- `lastName` (String, required): User's last name
- `profile` (Object):
  - `bio` (String): User's biography
  - `avatar` (String): Profile picture URL
  - `interests` (Array): User's interests
  - `experience` (String): Experience level (Beginner/Intermediate/Advanced/Expert)
- `preferences` (Object):
  - `notifications` (Object): Email and push notification settings
  - `privacy` (Object): Profile visibility settings
- `isActive` (Boolean): Account status
- `lastLogin` (Date): Last login timestamp

**Indexes**:
- `username` (unique)
- `email` (unique)

**Methods**:
- `comparePassword(candidatePassword)`: Compare password with hash
- `getPublicProfile()`: Return user data without sensitive information

### 2. Role Model (`models/Role.js`)

**Purpose**: Stores different professional roles available for simulation.

**Schema Fields**:
- `title` (String, required, unique): Role title
- `description` (String, required): Role description
- `difficulty` (String, required): Difficulty level (Beginner/Intermediate/Advanced/Expert)
- `estimatedTime` (String, required): Estimated completion time
- `skills` (Array): Required skills for the role
- `imageUrl` (String): Role image URL
- `category` (String, required): Role category (Technology/Business/Creative/etc.)
- `requirements` (Object):
  - `education` (String): Education requirements
  - `experience` (String): Experience requirements
  - `certifications` (Array): Required certifications
- `salary` (Object):
  - `min` (Number): Minimum salary
  - `max` (Number): Maximum salary
  - `currency` (String): Salary currency
- `marketDemand` (String): Market demand level (High/Medium/Low)
- `isActive` (Boolean): Role availability
- `popularity` (Number): Role popularity count
- `completionRate` (Number): Completion rate percentage
- `averageScore` (Number): Average user score
- `totalAttempts` (Number): Total simulation attempts

**Indexes**:
- `title` + `category` + `difficulty`
- `isActive`

**Methods**:
- `updatePopularity()`: Increment popularity count
- `updateCompletionStats(score)`: Update completion statistics

### 3. Scenario Model (`models/Scenario.js`)

**Purpose**: Stores role-specific scenarios and decision points.

**Schema Fields**:
- `roleId` (ObjectId, required): Reference to Role model
- `title` (String, required): Scenario title
- `description` (String, required): Scenario description
- `content` (String, required): Detailed scenario content
- `options` (Array): Decision options with:
  - `id` (String): Option identifier
  - `text` (String): Option text
  - `outcome` (String): Option outcome description
  - `score` (Number): Option score (-10 to 10)
  - `feedback` (String): Detailed feedback
  - `skills` (Array): Related skills
  - `consequences` (Array): Option consequences
- `difficulty` (String, required): Scenario difficulty (Easy/Medium/Hard)
- `estimatedTime` (Number, required): Estimated completion time in minutes
- `category` (String, required): Scenario category (Technical/Leadership/etc.)
- `skills` (Array): Skills tested in this scenario
- `prerequisites` (Array): Prerequisite scenarios
- `order` (Number, required): Scenario sequence order
- `isActive` (Boolean): Scenario availability
- `tags` (Array): Scenario tags
- `hints` (Array): Available hints
- `learningObjectives` (Array): Learning objectives
- `statistics` (Object): Usage statistics

**Indexes**:
- `roleId` + `order`
- `roleId` + `isActive`
- `category` + `difficulty`

**Methods**:
- `updateStatistics(score, timeSpent)`: Update scenario statistics
- `getWithRole()`: Populate role information

### 4. UserSession Model (`models/UserSession.js`)

**Purpose**: Tracks user progress through role simulations.

**Schema Fields**:
- `userId` (ObjectId, required): Reference to User model
- `roleId` (ObjectId, required): Reference to Role model
- `status` (String): Session status (In Progress/Completed/Abandoned/Paused)
- `startTime` (Date): Session start time
- `endTime` (Date): Session end time
- `totalTime` (Number): Total time spent in minutes
- `currentScenario` (Number): Current scenario number
- `progress` (Object):
  - `completedScenarios` (Array): Completed scenarios with details
  - `totalScore` (Number): Total score achieved
  - `maxPossibleScore` (Number): Maximum possible score
  - `completionPercentage` (Number): Completion percentage
- `assessment` (Object):
  - `overallScore` (Number): Overall assessment score
  - `grade` (String): Letter grade (A+ to F)
  - `strengths` (Array): Identified strengths
  - `weaknesses` (Array): Areas for improvement
  - `recommendations` (Array): Improvement recommendations
  - `skillBreakdown` (Object): Skill-specific scores
- `preferences` (Object): User preferences for the session
- `metadata` (Object): Session metadata (device, browser, etc.)

**Indexes**:
- `userId` + `roleId`
- `userId` + `status`
- `startTime` (descending)

**Methods**:
- `updateProgress(scenarioId, selectedOption, score, timeSpent)`: Update session progress
- `calculateAssessment()`: Calculate final assessment
- `completeSession()`: Mark session as completed

### 5. Assessment Model (`models/Assessment.js`)

**Purpose**: Stores assessment criteria and evaluation metrics for roles.

**Schema Fields**:
- `roleId` (ObjectId, required): Reference to Role model
- `name` (String, required): Assessment name
- `description` (String, required): Assessment description
- `categories` (Array): Assessment categories with:
  - `name` (String): Category name
  - `weight` (Number): Category weight (0-1)
  - `criteria` (Array): Assessment criteria
  - `description` (String): Category description
- `scoring` (Object):
  - `maxScore` (Number): Maximum possible score
  - `passingScore` (Number): Minimum passing score
  - `gradeRanges` (Object): Score ranges for letter grades
- `feedback` (Object):
  - `strengths` (String): General strengths feedback
  - `weaknesses` (String): General weaknesses feedback
  - `recommendations` (String): Improvement recommendations
  - `resources` (Array): Learning resources
- `isActive` (Boolean): Assessment availability
- `version` (String): Assessment version
- `statistics` (Object): Assessment usage statistics

**Indexes**:
- `roleId` + `isActive`
- `version`

**Methods**:
- `calculateGrade(score)`: Calculate letter grade from score
- `updateStatistics(score, grade)`: Update assessment statistics
- `getWithRole()`: Populate role information

## Database Configuration

### Connection Setup (`config/database.js`)
- MongoDB connection with error handling
- Graceful shutdown handling
- Environment variable support for connection string

### Environment Variables
```env
MONGODB_URI=mongodb://localhost:27017/role-swap
```

## Data Relationships

1. **User ↔ UserSession**: One-to-many relationship
2. **Role ↔ Scenario**: One-to-many relationship
3. **Role ↔ Assessment**: One-to-one relationship
4. **UserSession ↔ Scenario**: Many-to-many through completedScenarios array

## Indexing Strategy

- **Primary Keys**: All models use MongoDB's default `_id` field
- **Unique Indexes**: Username, email, role titles
- **Compound Indexes**: User sessions, scenario ordering
- **Performance Indexes**: Active status, timestamps

## Data Validation

- **Required Fields**: All critical fields are marked as required
- **String Lengths**: Maximum lengths enforced for all text fields
- **Enumerated Values**: Dropdown fields use enum validation
- **Number Ranges**: Scores and percentages have min/max validation
- **Email Format**: Email validation using regex pattern

## Security Features

- **Password Hashing**: Bcrypt with salt rounds
- **Input Sanitization**: Trim and validation on all inputs
- **Data Privacy**: Public profile methods exclude sensitive data
- **Session Management**: Secure session tracking

## Performance Considerations

- **Indexing**: Strategic indexes for common queries
- **Pagination**: Support for large dataset queries
- **Aggregation**: Built-in methods for statistics calculation
- **Caching**: Virtual fields for computed values

## Migration Strategy

- **Version Control**: Assessment models include version tracking
- **Backward Compatibility**: Schema evolution support
- **Data Migration**: Tools for schema updates
- **Rollback Support**: Version-based rollback capability 