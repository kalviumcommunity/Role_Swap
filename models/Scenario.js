const mongoose = require('mongoose');

const optionSchema = new mongoose.Schema({
  id: {
    type: String,
    required: [true, 'Option ID is required'],
    trim: true
  },
  text: {
    type: String,
    required: [true, 'Option text is required'],
    maxlength: [500, 'Option text cannot exceed 500 characters']
  },
  outcome: {
    type: String,
    required: [true, 'Option outcome is required'],
    maxlength: [1000, 'Option outcome cannot exceed 1000 characters']
  },
  score: {
    type: Number,
    required: [true, 'Option score is required'],
    min: [-10, 'Score cannot be less than -10'],
    max: [10, 'Score cannot be more than 10']
  },
  feedback: {
    type: String,
    maxlength: [1000, 'Feedback cannot exceed 1000 characters']
  },
  skills: [{
    type: String,
    trim: true
  }],
  consequences: [{
    type: String,
    trim: true
  }]
});

const scenarioSchema = new mongoose.Schema({
  roleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Role',
    required: [true, 'Role ID is required']
  },
  title: {
    type: String,
    required: [true, 'Scenario title is required'],
    trim: true,
    maxlength: [200, 'Scenario title cannot exceed 200 characters']
  },
  description: {
    type: String,
    required: [true, 'Scenario description is required'],
    maxlength: [2000, 'Scenario description cannot exceed 2000 characters']
  },
  content: {
    type: String,
    required: [true, 'Scenario content is required'],
    maxlength: [5000, 'Scenario content cannot exceed 5000 characters']
  },
  options: [optionSchema],
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    required: [true, 'Scenario difficulty is required']
  },
  estimatedTime: {
    type: Number, // in minutes
    required: [true, 'Estimated time is required'],
    min: [1, 'Estimated time must be at least 1 minute'],
    max: [60, 'Estimated time cannot exceed 60 minutes']
  },
  category: {
    type: String,
    enum: ['Technical', 'Leadership', 'Communication', 'Problem Solving', 'Ethics', 'Teamwork', 'Other'],
    required: [true, 'Scenario category is required']
  },
  skills: [{
    type: String,
    trim: true
  }],
  prerequisites: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Scenario'
  }],
  order: {
    type: Number,
    required: [true, 'Scenario order is required'],
    min: [1, 'Order must be at least 1']
  },
  isActive: {
    type: Boolean,
    default: true
  },
  tags: [{
    type: String,
    trim: true
  }],
  hints: [{
    type: String,
    trim: true,
    maxlength: [500, 'Hint cannot exceed 500 characters']
  }],
  learningObjectives: [{
    type: String,
    trim: true,
    maxlength: [200, 'Learning objective cannot exceed 200 characters']
  }],
  statistics: {
    totalAttempts: {
      type: Number,
      default: 0
    },
    averageScore: {
      type: Number,
      default: 0,
      min: 0,
      max: 100
    },
    completionRate: {
      type: Number,
      default: 0,
      min: 0,
      max: 100
    },
    averageTime: {
      type: Number,
      default: 0 // in minutes
    }
  }
}, {
  timestamps: true
});

// Indexes for better query performance
scenarioSchema.index({ roleId: 1, order: 1 });
scenarioSchema.index({ roleId: 1, isActive: 1 });
scenarioSchema.index({ category: 1, difficulty: 1 });

// Method to update statistics
scenarioSchema.methods.updateStatistics = function(score, timeSpent) {
  this.statistics.totalAttempts += 1;
  
  // Update average score
  this.statistics.averageScore = ((this.statistics.averageScore * (this.statistics.totalAttempts - 1)) + score) / this.statistics.totalAttempts;
  
  // Update average time
  this.statistics.averageTime = ((this.statistics.averageTime * (this.statistics.totalAttempts - 1)) + timeSpent) / this.statistics.totalAttempts;
  
  return this.save();
};

// Method to get scenario with populated role
scenarioSchema.methods.getWithRole = function() {
  return this.populate('roleId', 'title description difficulty');
};

// Virtual for total possible score
scenarioSchema.virtual('maxScore').get(function() {
  return this.options.reduce((max, option) => Math.max(max, option.score), 0);
});

// Virtual for minimum possible score
scenarioSchema.virtual('minScore').get(function() {
  return this.options.reduce((min, option) => Math.min(min, option.score), 0);
});

module.exports = mongoose.model('Scenario', scenarioSchema); 