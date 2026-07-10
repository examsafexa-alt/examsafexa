import { Schema, models, model } from "mongoose";

const ExamSchema = new Schema({
  name: { type: String, required: true }, // e.g. "NEET UG"
  code: { type: String, required: true, unique: true }, // e.g. "NEET"
  examDate: { type: Date },
  category: {
    type: String,
    enum: [
      "central-government",
      "judiciary-legal",
      "state-government",
      "psu-recruitment",
      "university-entrance",
      "professional-bodies",
      "school-boards",
      "international",
      "medical",
      "engineering",
      "civil-services",
      "state-psc",
      "ssc",
      "other",
    ],
    required: true,
  },
  group: { type: String },
  conductingBody: { type: String },
  purpose: { type: String },
  sourceSheet: { type: String },
});

export default models.Exam || model("Exam", ExamSchema);
