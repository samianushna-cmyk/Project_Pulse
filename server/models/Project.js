import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a project title'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Please provide a project description'],
      trim: true,
    },
    leader: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Project leader reference is required'],
    },
    requiredSkills: {
      type: [String],
      required: [true, 'Please specify at least one required skill'],
      validate: {
        validator: function (skills) {
          return Array.isArray(skills) && skills.length > 0;
        },
        message: 'A project must have at least one required skill',
      },
    },
    category: {
      type: String,
      required: [true, 'Please select or provide a project category'],
      trim: true,
    },
    status: {
      type: String,
      enum: {
        values: ['Open', 'In Progress', 'Completed'],
        message: '{VALUE} is not a valid project status. Allowed: Open, In Progress, Completed',
      },
      default: 'Open',
    },
    maxTeamSize: {
      type: Number,
      required: [true, 'Please specify the maximum team size'],
      min: [1, 'Maximum team size must be at least 1'],
    },
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model('Project', projectSchema);

export default Project;
