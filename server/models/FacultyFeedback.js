import mongoose from 'mongoose';

const facultyFeedbackSchema = new mongoose.Schema(
  {
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
      required: [true, 'Project reference is required'],
    },
    faculty: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Faculty reference is required'],
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    rating: {
      type: Number,
      required: [true, 'Rating is required'],
      min: [1, 'Rating must be at least 1'],
      max: [5, 'Rating cannot exceed 5'],
    },
    comments: {
      type: String,
      required: [true, 'Feedback comments are required'],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const FacultyFeedback = mongoose.model('FacultyFeedback', facultyFeedbackSchema);

export default FacultyFeedback;
