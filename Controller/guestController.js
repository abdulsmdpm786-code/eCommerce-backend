import jwt from "jsonwebtoken";
import { userModel } from "../Models/userModel.js";
import bcrypt from "bcrypt";

const firstMessage = (req, res) => {
  return res.send(
    "Welcome to the Backend section of eCommerce, You are in the guest section, Here you can explore products (/getAll) to buy it you need to create an account ",
  );
};

const handleSignUp = async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    console.log("This body", req.body);

    if (
      userName.trim().length === 0 ||
      email.trim().length === 0 ||
      password.trim().length === 0
    ) {
      return res.status(400).json({ errMsg: "All fields are required" });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ errMsg: "User already existing..." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await userModel.create({
      name: userName,
      email: email,
      password: hashedPassword,
    });
    return res.status(200).json({ message: "User created" });
  } catch (error) {
    console.log(error);
  }
};

const handleLogin = async (req, res) => {
  try {
    console.log("in login section");

    const { email, password } = req.body;
    console.log("user login", email, password);

    const user = await userModel.findOne({ email });
    console.log("find user", user);

    if (!user) {
      return res.status(404).json({ errMsg: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("is match section", isMatch);

    if (!isMatch) {
      return res.status(401).json({ errMsg: "invalid password" });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1hr" },
    );
    console.log("token", process.env.JWT_SECRET_KEY);

    return res
      .status(200)
      .json({ user: user, token: token, message: "Login success...." });
  } catch (error) {
    console.log(error);
  }
};

const getProfile = async (req, res) => {
  try {
    console.log("In getProfile section");

    console.log("this req.user", req.user);
    
    const user = await userModel.findById(req.user).select('-password')
    console.log("this is user",user);

    if (!user) {
      return res.status(404).json({ errMsg: "Profile not found" });
    }

    return res.status(200).json({ user: user, errMsg: "Profile found" });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find({}).select('-password');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const addUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    
    if (!name || !email || !password) {
      return res.status(400).json({ errMsg: "Name, email, and password are required" });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ errMsg: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userRole = role === "admin" ? "admin" : "user";

    const newUser = await userModel.create({
      name,
      email,
      password: hashedPassword,
      role: userRole,
    });

    res.status(201).json({ message: "User created successfully", user: { id: newUser._id, name: newUser.name, email: newUser.email, role: newUser.role } });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, role, password } = req.body;

    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).json({ errMsg: "User not found" });
    }

    if (name) user.name = name;
    if (email) user.email = email;
    if (role && (role === "user" || role === "admin")) user.role = role;
    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    await user.save();
    res.status(200).json({ message: "User updated successfully", user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ errMsg: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export { firstMessage, handleSignUp, handleLogin, getProfile, getAllUsers, addUser, updateUser, deleteUser };
