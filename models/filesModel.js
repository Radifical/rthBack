import mongoose from "mongoose";
import pdf from 'pdfkit';
import fs from 'fs';

const fileSchema = mongoose.Schema(
  {
    fileName: {
      type: String,
      required: true,
    },
    file: {
      data: Buffer, // Store file data as Buffer
      contentType: String, // Store content type for the file
    },
    fileCreated: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const files = mongoose.model("files", fileSchema)


