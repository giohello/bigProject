import { User } from '../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
  const { username, email, password, img_url } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      img_url
    });
    res.status(201).json({
      message: 'User registered!',
      user: {
        username: newUser.username,
        email: newUser.email,
        img_url: newUser.img_url,
        money: newUser.money
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'Registration failed.', error: err.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, 'secretKey', { expiresIn: '1d' });
    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        username: user.username,
        email: user.email,
        img_url: user.img_url,
        money: user.money
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
};

export const updateMoney = async (req, res) => {
  const { email, money } = req.body;
  try {
    const user = await User.findOneAndUpdate(
      { email },
      { $set: { money } },
      { new: true }
    );
    res.status(200).json({ ok: true, user });
  } catch (err) {
    res.status(500).json({ ok: false, message: err.message });
  }
};
