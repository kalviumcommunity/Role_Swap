const mongoose = require('mongoose');

const assessmentCriteriaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Criteria name is required'],
    trim: true
  },
  weight: {
    type: Number,
    required: [true, 'Criteria weight is required'],
    min: [0, 'Weight cannot be negative'],
    max: [1, 'Weight cannot exceed 1']
  },
  criteria: [{
    type: String,
    trim: true,
    required: true
  }],
  description: {
    type: String,
    maxlength: [500, 'Description cannot exceed 500 characters']
  }
});

const assessmentSchema = new mongoose.Schema({
  roleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Role',
    required: [true, 'Role ID is required']
  },
  name: {
    type: String,
    required: [true, 'Assessment name is required'],
    trim: true,
    maxlength: [200, 'Assessment name cannot exceed 200 characters']
  },
  description: {
    type: String,
    required: [true, 'Assessment description is required'],
    maxlength: [1000, 'Assessment description cannot exceed 1000 characters']
  },
  categories: [assessmentCriteriaSchema],
  scoring: {
    maxScore: {
      type: Number,
      required: [true, 'Maximum score is required'],
      min: [1, 'Maximum score must be at least 1']
    },
    passingScore: {
      type: Number,
      required: [true, 'Passing score is required'],
      min: [0, 'Passing score cannot be negative']
    },
    gradeRanges: {
      'A+': {
        min: { type: Number, default: 97 },
        max: { type: Number, default: 100 }
      },
      'A': {
        min: { type: Number, default: 93 },
        max: { type: Number, default: 96 }
      },
      'A-': {
        min: { type: Number, default: 90 },
        max: { type: Number, default: 92 }
      },
      'B+': {
        min: { type: Number, default: 87 },
        max: { type: Number, default: 89 }
      },
      'B': {
        min: { type: Number, default: 83 },
        max: { type: Number, default: 86 }
      },
      'B-': {
        min: { type: Number, default: 80 },
        max: { type: Number, default: 82 }
      },
      'C+': {
        min: { type: Number, default: 77 },
        max: { type: Number, default: 79 }
      },
      'C': {
        min: { type: Number, default: 73 },
        max: { type: Number, default: 76 }
      },
      'C-': {
        min: { type: Number, default: 70 },
        max: { type: Number, default: 72 }
      },
      'D+': {
        min: { type: Number, default: 67 },
        max: { type: Number, default: 69 }
      },
      'D': {
        min: { type: Number, default: 63 },
        max: { type: Number, default: 66 }
      },
      'F': {
        min: { type: Number, default: 0 },
        max: { type: Number, default: 62 }
      }
    }
  },
  feedback: {
    strengths: {
      type: String,
      maxlength: [1000, 'Strengths feedback cannot exceed 1000 characters']
    },
    weaknesses: {
      type: String,
      maxlength: [1000, 'Weaknesses feedback cannot exceed 1000 characters']
    },
    recommendations: {
      type: String,
      maxlength: [1000, 'Recommendations cannot exceed 1000 characters']
    },
    resources: [{
      title: {
        type: String,
        required: true,
        trim: true
      },
      url: {
        type: String,
        required: true,
        trim: true
      },
      description: {
        type: String,
        maxlength: [300, 'Resource description cannot exceed 300 characters']
      },
      type: {
        type: String,
        enum: ['Article', 'Video', 'Course', 'Book', 'Tool', 'Other'],
        default: 'Article'
      }
    }]
  },
  isActive: {
    type: Boolean,
    default: true
  },
  version: {
    type: String,
    default: '1.0.0'
  },
  statistics: {
    totalAssessments: {
      type: Number,
      default: 0
    },
    averageScore: {
      type: Number,
      default: 0,
      min: 0,
      max: 100
    },
    passRate: {
      type: Number,
      default: 0,
      min: 0,
      max: 100
    },
    gradeDistribution: {
      'A+': { type: Number, default: 0 },
      'A': { type: Number, default: 0 },
      'A-': { type: Number, default: 0 },
      'B+': { type: Number, default: 0 },
      'B': { type: Number, default: 0 },
      'B-': { type: Number, default: 0 },
      'C+': { type: Number, default: 0 },
      'C': { type: Number, default: 0 },
      'C-': { type: Number, default: 0 },
      'D+': { type: Number, default: 0 },
      'D': { type: Number, default: 0 },
      'F': { type: Number, default: 0 }
    }
  }
}, {
  timestamps: true
});

// Indexes for better query performance
assessmentSchema.index({ roleId: 1, isActive: 1 });
assessmentSchema.index({ version: 1 });

// Method to calculate grade from score
assessmentSchema.methods.calculateGrade = function(score) {
  const gradeRanges = this.scoring.gradeRanges;
  
  for (const [grade, range] of Object.entries(gradeRanges)) {
    if (score >= range.min && score <= range.max) {
      return grade;
    }
  }
  
  return 'F'; // Default fallback
};

// Method to update statistics
assessmentSchema.methods.updateStatistics = function(score, grade) {
  this.statistics.totalAssessments += 1;
  
  // Update average score
  this.statistics.averageScore = ((this.statistics.averageScore * (this.statistics.totalAssessments - 1)) + score) / this.statistics.totalAssessments;
  
  // Update pass rate
  const passingCount = this.statistics.gradeDistribution['A+'] + this.statistics.gradeDistribution['A'] + 
                      this.statistics.gradeDistribution['A-'] + this.statistics.gradeDistribution['B+'] + 
                      this.statistics.gradeDistribution['B'] + this.statistics.gradeDistribution['B-'] + 
                      this.statistics.gradeDistribution['C+'] + this.statistics.gradeDistribution['C'] + 
                      this.statistics.gradeDistribution['C-'];
  this.statistics.passRate = (passingCount / this.statistics.totalAssessments) * 100;
  
  // Update grade distribution
  if (this.statistics.gradeDistribution[grade] !== undefined) {
    this.statistics.gradeDistribution[grade] += 1;
  }
  
  return this.save();
};

// Method to get assessment with populated role
assessmentSchema.methods.getWithRole = function() {
  return this.populate('roleId', 'title description difficulty');
};

// Virtual for total weight validation
assessmentSchema.virtual('totalWeight').get(function() {
  return this.categories.reduce((sum, category) => sum + category.weight, 0);
});

// Pre-save middleware to validate total weight
assessmentSchema.pre('save', function(next) {
  const totalWeight = this.totalWeight;
  if (Math.abs(totalWeight - 1) > 0.01) {
    return next(new Error('Total weight of all categories must equal 1'));
  }
  next();
});

module.exports = mongoose.model('Assessment', assessmentSchema); 