const mongoose = require('mongoose');

const userSessionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required']
  },
  roleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Role',
    required: [true, 'Role ID is required']
  },
  status: {
    type: String,
    enum: ['In Progress', 'Completed', 'Abandoned', 'Paused'],
    default: 'In Progress'
  },
  startTime: {
    type: Date,
    default: Date.now
  },
  endTime: {
    type: Date,
    default: null
  },
  totalTime: {
    type: Number, // in minutes
    default: 0
  },
  currentScenario: {
    type: Number,
    default: 1
  },
  progress: {
    completedScenarios: [{
      scenarioId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Scenario'
      },
      selectedOption: {
        type: String,
        required: true
      },
      score: {
        type: Number,
        required: true
      },
      timeSpent: {
        type: Number, // in minutes
        default: 0
      },
      completedAt: {
        type: Date,
        default: Date.now
      },
      feedback: {
        type: String,
        maxlength: [1000, 'Feedback cannot exceed 1000 characters']
      }
    }],
    totalScore: {
      type: Number,
      default: 0
    },
    maxPossibleScore: {
      type: Number,
      default: 0
    },
    completionPercentage: {
      type: Number,
      default: 0,
      min: 0,
      max: 100
    }
  },
  assessment: {
    overallScore: {
      type: Number,
      default: 0,
      min: 0,
      max: 100
    },
    grade: {
      type: String,
      enum: ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'F'],
      default: 'F'
    },
    strengths: [{
      type: String,
      trim: true
    }],
    weaknesses: [{
      type: String,
      trim: true
    }],
    recommendations: [{
      type: String,
      trim: true
    }],
    skillBreakdown: {
      technical: {
        type: Number,
        default: 0,
        min: 0,
        max: 100
      },
      leadership: {
        type: Number,
        default: 0,
        min: 0,
        max: 100
      },
      communication: {
        type: Number,
        default: 0,
        min: 0,
        max: 100
      },
      problemSolving: {
        type: Number,
        default: 0,
        min: 0,
        max: 100
      },
      teamwork: {
        type: Number,
        default: 0,
        min: 0,
        max: 100
      }
    }
  },
  preferences: {
    showHints: {
      type: Boolean,
      default: false
    },
    timeLimit: {
      type: Number, // in minutes, 0 means no limit
      default: 0
    },
    difficulty: {
      type: String,
      enum: ['Easy', 'Medium', 'Hard', 'Adaptive'],
      default: 'Medium'
    }
  },
  metadata: {
    userAgent: {
      type: String,
      default: null
    },
    ipAddress: {
      type: String,
      default: null
    },
    deviceType: {
      type: String,
      enum: ['Desktop', 'Tablet', 'Mobile'],
      default: 'Desktop'
    },
    browser: {
      type: String,
      default: null
    }
  }
}, {
  timestamps: true
});

// Indexes for better query performance
userSessionSchema.index({ userId: 1, roleId: 1 });
userSessionSchema.index({ userId: 1, status: 1 });
userSessionSchema.index({ startTime: -1 });

// Method to update progress
userSessionSchema.methods.updateProgress = function(scenarioId, selectedOption, score, timeSpent) {
  this.progress.completedScenarios.push({
    scenarioId,
    selectedOption,
    score,
    timeSpent,
    completedAt: new Date()
  });
  
  this.progress.totalScore += score;
  this.currentScenario += 1;
  
  return this.save();
};

// Method to calculate assessment
userSessionSchema.methods.calculateAssessment = function() {
  if (this.progress.completedScenarios.length === 0) {
    return this;
  }
  
  // Calculate overall score
  const totalScenarios = this.progress.completedScenarios.length;
  const averageScore = this.progress.totalScore / totalScenarios;
  this.assessment.overallScore = Math.round((averageScore / 10) * 100); // Assuming max score per scenario is 10
  
  // Calculate grade
  if (this.assessment.overallScore >= 97) this.assessment.grade = 'A+';
  else if (this.assessment.overallScore >= 93) this.assessment.grade = 'A';
  else if (this.assessment.overallScore >= 90) this.assessment.grade = 'A-';
  else if (this.assessment.overallScore >= 87) this.assessment.grade = 'B+';
  else if (this.assessment.overallScore >= 83) this.assessment.grade = 'B';
  else if (this.assessment.overallScore >= 80) this.assessment.grade = 'B-';
  else if (this.assessment.overallScore >= 77) this.assessment.grade = 'C+';
  else if (this.assessment.overallScore >= 73) this.assessment.grade = 'C';
  else if (this.assessment.overallScore >= 70) this.assessment.grade = 'C-';
  else if (this.assessment.overallScore >= 67) this.assessment.grade = 'D+';
  else if (this.assessment.overallScore >= 63) this.assessment.grade = 'D';
  else this.assessment.grade = 'F';
  
  return this.save();
};

// Method to complete session
userSessionSchema.methods.completeSession = function() {
  this.status = 'Completed';
  this.endTime = new Date();
  this.totalTime = Math.round((this.endTime - this.startTime) / (1000 * 60)); // Convert to minutes
  this.progress.completionPercentage = 100;
  
  return this.save();
};

// Virtual for session duration
userSessionSchema.virtual('duration').get(function() {
  if (!this.endTime) {
    return Math.round((new Date() - this.startTime) / (1000 * 60));
  }
  return Math.round((this.endTime - this.startTime) / (1000 * 60));
});

module.exports = mongoose.model('UserSession', userSessionSchema); 