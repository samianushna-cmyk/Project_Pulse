import jwt from 'jsonwebtoken';

const generateToken = (id, role) => {
  const secret = process.env.JWT_SECRET || 'projectpulse_jwt_secure_secret_key_2026';

  return jwt.sign(
    { id, role },
    secret,
    {
      expiresIn: '7d',
    }
  );
};

export default generateToken;
