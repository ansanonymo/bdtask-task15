const express = require("express");
const userValidationSchema = require("../validations/userValidationSchema");
const { validationResult } = require("express-validator");
const UserModel = require("../database/models/UserModel");

const registerRoute = express.Router();
registerRoute.use(express.json());

registerRoute.post("/register", userValidationSchema, async (req, res) => {
  try {
    const errorResult = validationResult(req);
    const errors = errorResult.array();

    if (!errorResult.isEmpty()) {
      console.log(errors);
      res.status(400);
      res.send({
        statusCode: 400,
        status: "Bad Request",
        message: "Invalid data type.",
        errorMessage: errors[0].msg,
      });
      return;
    }

    const userObj = {
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
    };

    const isUserExist = await UserModel.findOne({ email: userObj.email });

    if (isUserExist) {
      res.status(409);
      res.json({
        statusCode: 409,
        status: "Failed",
        msg: "Try another email.",
      });
      return;
    }

    const useModelObj = new UserModel(userObj);
    await useModelObj.save();

    res.status(201);
    res.json({
      statusCode: 201,
      status: "Success",
      msg: "User is created successfully",
    });
  } catch (err) {
    console.log(err.message);
    res.send("Server side problem");
  }
});

module.exports = registerRoute;
