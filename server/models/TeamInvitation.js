import mongoose from 'mongoose';

const teamInvitationSchema = new mongoose.Schema(
  {
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
      required: [true, 'Project reference is required'],
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Sender reference is required'],
    },
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Recipient reference is required'],
    },
    status: {
      type: String,
      enum: {
        values: ['Pending', 'Accepted', 'Rejected'],
        message: '{VALUE} is not a valid status. Allowed: Pending, Accepted, Rejected',
      },
      default: 'Pending',
    },
    message: {
      type: String,
      trim: true,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

// Prevent duplicate pending invitations for same project and recipient
teamInvitationSchema.index({ project: 1, recipient: 1, status: 1 });

const TeamInvitation = mongoose.model('TeamInvitation', teamInvitationSchema);

export default TeamInvitation;
