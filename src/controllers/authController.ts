// AuthController.ts
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { User } from "../models";
import { signToken } from "../utils/auth";

class AuthController {
  static async signup(req: Request, res: Response): Promise<void> {
    const { username, password, confirmPassword } = req.body;

    if (!username || !password || !confirmPassword) {
      res.status(400).json({
        message: "Please provide username, password, and confirmPassword",
      });
      return;
    }

    if (password !== confirmPassword) {
      res.status(400).json({ message: "Passwords do not match" });
      return;
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user_id = uuidv4();

      // Create user in the database
      const [newUser, created]: [User, boolean] = await User.findOrCreate({
        where: { username },
        defaults: {
          user_id,
          username,
          password: hashedPassword,
        },
      });

      // For both newly created and existing users, query for the user
      const user = await User.findOne({ where: { username } });

      if (!user) {
        console.error("Failed to find user");
        res.status(500).json({ message: "Error fetching user" });
        return;
      }

      res.status(201).json({
        message: "User created",
        user: {
          userId: user.user_id,
          username: user.username,
          // Add other user data fields as needed
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error creating user" });
    }
  }

  static async login(req: Request, res: Response): Promise<void> {
    const { username, user_id, password } = req.body;

    if (!(username || user_id) || !password) {
      res
        .status(400)
        .json({ message: "Please provide username, user_id, and password" });
      return;
    }

    try {
      let user;

      if (username) {
        user = await User.findOne({ where: { username } });
      } else if (user_id) {
        user = await User.findOne({ where: { user_id } });
      }

      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      const token = signToken({ id: user.user_id.toString() });

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        res.status(401).json({ message: "Invalid password" });
        return;
      }

      res.status(200).json({ message: "Sign in successful", token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error during login" });
    }
  }

  static async logout(req: Request, res: Response): Promise<void> {
    // You may handle token destruction here
    res.status(200).json({ message: "Logout successful" });
  }
}

export default AuthController;
