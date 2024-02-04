import express from "express";
import { User } from "../models/userModel.js";

const router = express.Router();

// Route for Save a new user
router.post("/", async (request, response) => {
  try {
    if (
      !request.body.studentName ||
      !request.body.phoneNumber ||
      !request.body.classesLeft
    ) {
      return response.status(400).send({
        message: "Send all required fields: name, #, classes left",
      });
    }
    const newUser = {
      studentName: request.body.studentName,
      phoneNumber: request.body.phoneNumber,
      classesLeft: request.body.classesLeft,
    };

    const user = await User.create(newUser);

    return response.status(201).send(newUser);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//get all users
router.get("/", async (request, response) => {
  try {
    const user = await User.find({});

    return response.status(200).json({
      count: user.length,
      data: user,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

router.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const user = await User.findById(id);

    return response.status(200).json(user);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

router.put("/:id", async (request, response) => {
  try {
    const { id } = request.params;

    if (!request.body.classesLeft) {
      return response.status(400).send({
        message: "Send the required field: classesLeft",
      });
    }

    const result = await User.findByIdAndUpdate(id, request.body);

    if (!result) {
      return response.status(404).json({ message: "User not found" });
    }

    return response.status(200).send({ message: "User updated successfully" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});



router.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const result = await User.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).json({ message: "User not found" });
    }

    return response.status(200).send({ message: "User deleted successfully" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;
