// middleware/checkBody.ts
import { Request, Response, NextFunction } from 'express';

const checkBody = (req: Request, res: Response, next: NextFunction): void => {
  const { username, password, confirmPassword } = req.body;

  if (!username || !password || !confirmPassword) {
    res.status(400).json({ message: 'Please provide username, password, and confirmPassword' });
    return;
  }

  if (password !== confirmPassword) {
    res.status(400).json({ message: 'Passwords do not match' });
    return;
  }

  next();
};

export default checkBody;
