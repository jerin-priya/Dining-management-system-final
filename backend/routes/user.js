const express = require("express");
const connection = require("../connection");
const { query } = require("../connection");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

const auth = require("../services/auth");
const role = require("../services/checkRole");

const router = express.Router();

router.post("/signup", (req, res) => {
  let user = req.body;

  // Hash the user's password before storing it in the database
  bcrypt.hash(user.password, 10, (hashErr, hashedPassword) => {
    if (hashErr) {
      return res.status(500).json({ error: "Password hashing failed" });
    }

    let query = "select email, registrationNo, password, role, department, status from user where email=?";
    connection.query(query, [user.email], (err, results) => {
      if (!err) {
        if (results.length <= 0) {
          let insertQuery =
            "insert into user(name, registrationNo, phone, email, department, password, status, role) values(?, ?, ?, ?, ?, ?, 'false', 'user')";

          connection.query(
            insertQuery,
            [user.name, user.registrationNo, user.phone, user.email, user.department, hashedPassword], // Store the hashed password
            (err, results) => {
              if (!err) {
                return res.status(200).json({
                  message: "রেজিস্ট্রেশন সফলভাবে সম্পন্ন হয়েছে",
                });
              } else {
                return res.status(500).json({ err });
              }
            }
          );
        } else {
          return res.status(400).json({ message: "ইমেইলটি দিয়ে পূর্বে রেজিষ্ট্রেশন করা হয়েছিল। দয়া করে অন্য মেইল দিয়ে পুনরায় আবারো চেষ্টা করুন।" });
        }
      } else {
        return res.status(500).json({ err });
      }
    });
  });
});


router.post("/login", (req, res) => {
  const user = req.body;

  let query = "select email, password, role, status from user where email=?";
  connection.query(query, [user.email], (err, results) => {
    if (!err) {
      if (results.length <= 0) {
        return res.status(401).json({ message: "ব্যবহারকারীর কোথাও নাম/পাসওয়ার্ড এ ভুল হয়েছে। দয়া করে পুনরায় আবারো চেষ্টা করুন।" });
      } else if (results[0].status === "false") {
        return res.status(401).json({ message: "অ্যাডমিন অনুমোদনের জন্য অপেক্ষা করুন!" });
      }

      // Compare the hashed password with the provided password
      bcrypt.compare(user.password, results[0].password, (compareErr, isMatch) => {
        if (compareErr) {
          return res.status(500).json({ error: "পাসওয়ার্ড তুলনা ব্যর্থ হয়েছে" });
        }

        if (!isMatch) {
          return res.status(401).json({ message: "ব্যবহারকারীর কোথাও নাম/পাসওয়ার্ড এ ভুল হয়েছে। দয়া করে পুনরায় আবারো চেষ্টা করুন।" });
        } else {
          const response = {
            email: results[0].email,
            role: results[0].role,
          };

          const accessToken = jwt.sign(response, process.env.SECRET, {
            expiresIn: "1h",
          });

          res.status(200).json({
            token: accessToken,
            message: "অভিনন্দন! আপনি সফলভাবে লগইন করতে সক্ষম হয়েছেন",
          });
        }
      });
    } else {
      return res.status(500).json({ err });
    }
  });
});

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

router.post("/forgotPassword", (req, res) => {
  const user = req.body;
  let query = "select email, password from user where email=?";
  connection.query(query, [user.email], (err, results) => {
    if (!err) {
      if (results.length <= 0) {
        return res.status(200).json({
          message: "আপনার রেজিস্টার করা ইমেইলে পাসওয়ার্ড পাঠানো হয়েছে। দয়া করে চেক করুন।",
        });
      } else {
        let mailOptions = {
          from: process.env.EMAIL,
          to: results[0].email,
          subject: "জাহানারা ইমাম হল ডাইনিং ম্যানেজমেন্ট সিস্টেম দ্বারা পাসওয়ার্ড পুনরুদ্ধার",
          html:
            "<p>জাহানারা ইমাম হল ডাইনিং ম্যানেজমেন্ট সিস্টেমের জন্য আপনার লগইন বিশদ <br> Email: " +
            results[0].email +
            "<br> পাসওয়ার্ড: " +
            results[0].password +
            "<br> <a href='http://localhost:4200'>লগ-ইন করতে এখানে ক্লিক করুন</a>" +
            "</p>",
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log(error);
          } else {
            console.log(info.response);
            console.log(" \n Email sent");
            return res.status(200).json({
              message: "আপনার রেজিস্টার করা ইমেইলে পাসওয়ার্ড পাঠানো হয়েছে। দয়া করে চেক করুন।",
            });
          }
        });
      }
    } else {
      return res.status(500).json({ err });
    }
  });
});

router.get("/get", auth.authenticate, role.checkRole, (req, res) => {
  let query = 'select id,name,email,phone,status from user where role="user"';

  connection.query(query, (err, results) => {
    if (!err) {
      return res.status(200).json({ data: results });
    } else {
      return res.status(500).json({ err });
    }
  });
});

router.patch("/update", auth.authenticate, role.checkRole, (req, res) => {
  let user = req.body;
  let query = "update user set status=? where id=?";
  connection.query(query, [user.status, user.id], (err, results) => {
    if (!err) {
      if (results.affectedRows == 0) {
        return res.status(404).json({ message: "ব্যবহারকারী আইডি বিদ্যমান নেই" });
      }
      return res.status(200).json({ message: "ব্যবহারকারী তথ্য সফলভাবে আপডেট করা হয়েছে" });
    } else {
      return res.status(500).json({ err });
    }
  });
});

router.get("/checkToken", auth.authenticate, (req, res) => {
  return res.status(200).json({ message: "true" });
});

router.post("/changePassword", auth.authenticate, (req, res) => {
  const user = req.body;
  const email = res.locals.email;
  let query = "select * from user where email=? and password=?";
  connection.query(query, [email, user.oldPassword], (err, results) => {
    if (!err) {
      if (results.length <= 0) {
        return res.status(400).json({ message: "ভুল পাসওয়ার্ড" });
      } else if (results[0].password === user.oldPassword) {
        let query = "update user set password=? where email=?";
        connection.query(query, [user.newPassword, email], (err, results) => {
          if (!err) {
            return res
              .status(200)
              .json({ message: "পাসওয়ার্ড সফলভাবে আপডেট করা হয়েছে" });
          } else {
            return res.status(500).json({ err });
          }
        });
      } else {
        return res
          .status(400)
          .json({ message: "কিছু একটা ভুল হয়েছে!! অনুগ্রহপূর্বক আবার চেষ্টা করুন" });
      }
    } else {
      return res.status(500).json({ err });
    }
  });
});

module.exports = router;
