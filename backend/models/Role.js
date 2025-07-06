const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Role title is required'],
    unique: true,
    trim: true,
    maxlength: [100, 'Role title cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Role description is required'],
    maxlength: [1000, 'Role description cannot exceed 1000 characters']
  },
  difficulty: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert'],
    required: [true, 'Difficulty level is required']
  },
  estimatedTime: {
    type: String,
    required: [true, 'Estimated time is required'],
    trim: true
  },
  skills: [{
    type: String,
    trim: true,
    required: true
  }],
  imageUrl: {
    type: String,
    default: null
  },
  category: {
    type: String,
    enum: ['Technology', 'Business', 'Creative', 'Healthcare', 'Education', 'Finance', 'Other'],
    required: [true, 'Role category is required']
  },
  requirements: {
    education: {
      type: String,
      default: 'No specific education required'
    },
    experience: {
      type: String,
      default: 'No prior experience required'
    },
    certifications: [{
      type: String,
      trim: true
    }]
  },
  salary: {
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 0
    },
    currency: {
      type: String,
      default: 'USD'
    }
  },
  marketDemand: {
    type: String,
    enum: ['High', 'Medium', 'Low'],
    default: 'Medium'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  popularity: {
    type: Number,
    default: 0,
    min: 0
  },
  completionRate: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  averageScore: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  totalAttempts: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Index for better query performance
roleSchema.index({ title: 1, category: 1, difficulty: 1 });
roleSchema.index({ isActive: 1 });

// Virtual for full salary range
roleSchema.virtual('salaryRange').get(function() {
  if (this.salary.min === 0 && this.salary.max === 0) {
    return 'Not specified';
  }
  return `${this.salary.currency} ${this.salary.min.toLocaleString()} - ${this.salary.max.toLocaleString()}`;
});

// Method to update popularity
roleSchema.methods.updatePopularity = function() {
  this.popularity += 1;
  return this.save();
};

// Method to update completion statistics
roleSchema.methods.updateCompletionStats = function(score) {
  this.totalAttempts += 1;
  this.averageScore = ((this.averageScore * (this.totalAttempts - 1)) + score) / this.totalAttempts;
  return this.save();
};

module.exports = mongoose.model('Role', roleSchema); 