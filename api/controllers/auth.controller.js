import { db } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    // Check existing user
    const q = "SELECT * FROM profiles WHERE email = ? OR username = ?";
    db.query(q, [req.body.email, req.body.username], async (err, data) => {
      if (err) throw err;
      if (data.length) return res.status(409).json("User already exists");

      // Hash the password and create the user
      const salt = await bcrypt.genSalt(10);
      const hash = bcrypt.hashSync(req.body.password, salt);

      const q =
        "INSERT INTO profiles (`username`,`email`,`company`,`password`) VALUES (?)";
      const values = [
        req.body.username,
        req.body.email,
        req.body.company,
        hash,
      ];

      db.query(q, [values], (err, data) => {
        if (err) throw err;
        return res.status(200).json("User has been created.");
      });
    });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json("Internal Server Error");
  }
};

export const login = async (req, res) => {
  try {
    // Check if the user exists
    const q = "SELECT * FROM profiles WHERE username = ?";
    db.query(q, [req.body.username], (err, data) => {
      if (err) throw err;
      if (data.length === 0) return res.status(404).json("User not found!");

      // Check password
      const isPasswordCorrect = bcrypt.compareSync(
        req.body.password,
        data[0].password
      );
      if (!isPasswordCorrect)
        return res.status(400).json("Wrong Username or Password!");

      const token = jwt.sign({ id: data[0].id }, process.env.JWT_KEY);
      const { password, ...others } = data[0];

      res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .status(200)
        .json({ message: "Login Successful", others });
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json("Internal Server Error");
  }
};

export const getProfile = async (req, res) => {
  try {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");

    jwt.verify(token, process.env.JWT_KEY, (err, userInfo) => {
      if (err) throw err;
      console.log("user info", userInfo);
      const q = "SELECT username, email, company FROM profiles WHERE id = ?";
      db.query(q, [userInfo.id], (err, data) => {
        if (err) throw err;
        return res.status(200).json(data[0]);
      });
    });
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json("Internal Server Error");
  }
};

export const logout = async (req, res) => {
  try {
    res
      .clearCookie("access_token", {
        samesite: "none",
        secure: true,
      })
      .status(200)
      .json("User has been logged out!");
  } catch (error) {
    console.error("Error during logout:", error);
    res.status(500).json("Internal Server Error");
  }
};
