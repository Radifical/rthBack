import express from 'express';
import pdf from 'pdfkit';
import fs from 'fs';
import { files } from '../models/filesModel.js';

const router = express.Router();

// Route for uploading a file
router.post("/", async (request, response) => {
  try {
    if (!request.body.fileName || !request.body.file) {
      return response.status(400).send({
        message: "Please provide a file name and upload a file.",
      });
    }

    const newFile = {
      fileName: request.body.fileName,
      file: {
        data: Buffer.from(request.body.file.data), // Convert file data to Buffer
        contentType: request.body.file.contentType, // Set content type
      },
      fileCreated: new Date().toISOString(), // Example of setting file creation timestamp
    };

    const savedFile = await files.create(newFile);

    return response.status(201).send(savedFile);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for fetching all files
router.get("/", async (request, response) => {
  try {
    const allFiles = await files.find({});

    return response.status(200).json({
      count: allFiles.length,
      data: allFiles,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for fetching a specific file by ID
router.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const file = await files.findById(id);

    if (!file) {
      return response.status(404).json({ message: "File not found" });
    }

    return response.status(200).json(file);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for updating a specific file by ID
router.put("/:id", async (request, response) => {
  try {
    const { id } = request.params;

    if (!request.body.fileName || !request.body.file) {
      return response.status(400).send({
        message: "Please provide a file name and update the file.",
      });
    }

    const updatedFile = {
      fileName: request.body.fileName,
      file: {
        data: Buffer.from(request.body.file.data), // Convert file data to Buffer
        contentType: request.body.file.contentType, // Set content type
      },
      fileCreated: new Date().toISOString(), // Example of setting file creation timestamp
    };

    const result = await files.findByIdAndUpdate(id, updatedFile, { new: true });

    if (!result) {
      return response.status(404).json({ message: "File not found" });
    }

    return response.status(200).json(result);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for deleting a specific file by ID
router.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const result = await files.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).json({ message: "File not found" });
    }

    return response.status(200).send({ message: "File deleted successfully" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for generating attendance PDFs
router.post("/generateAttendancePDF", async (request, response) => {
  const { date, attendance } = request.body;

  try {
    const pdfFileName = generateAttendancePDF(date, attendance);
    return response.status(200).json({ filename: pdfFileName });
  } catch (error) {
    console.error('Error generating PDF:', error);
    response.status(500).send({ message: error.message });
  }
});

// Function to fetch student name by ID from database
function getStudentNameById(studentId) {
  // Implement logic to fetch student name from the database
  return 'Student Name';
}

export default router;