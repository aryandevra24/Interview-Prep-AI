import mongoose from 'mongoose';

const blacklistTokenSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: [true, 'token is required'],
      unique: [true, 'token must be unique'],
    },
  },
  { timestamps: true }
);

blacklistTokenSchema.index(
  { createdAt: 1 },
  { expireAfterSeconds: 60 * 60 * 24 * 3 } // 3 days
);

blacklistTokenSchema.statics.isBlacklistedToken = async function (token) {
  const blacklistToken = await this.findOne({ token });

  return !!blacklistToken;
};

const BlacklistToken = mongoose.model('BlacklistToken', blacklistTokenSchema);
export default BlacklistToken;
