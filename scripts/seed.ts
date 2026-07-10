import fs from "node:fs";
import path from "node:path";
import mongoose from "mongoose";
import Exam from "../models/Exam";
import ExamCenter from "../models/ExamCenter";
import { EXAM_CATALOG } from "../lib/examCatalog";

function loadEnvLocal() {
  const envPath = path.join(process.cwd(), ".env.local");
  if (!fs.existsSync(envPath)) return;

  const lines = fs.readFileSync(envPath, "utf8").split("\n");
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#") || !trimmed.includes("=")) continue;
    const [key, ...valueParts] = trimmed.split("=");
    if (!process.env[key]) {
      process.env[key] = valueParts.join("=").replace(/^["']|["']$/g, "");
    }
  }
}

const examDateByCode: Record<string, Date> = {
  "NEET-UG": new Date("2027-05-02"),
  "JEE-MAIN": new Date("2027-01-24"),
  "JEE-ADV": new Date("2027-05-23"),
  "UPSC-CSE": new Date("2027-05-30"),
  "SSC-CGL": new Date("2027-09-12"),
  "UPPSC-PCS": new Date("2027-10-10"),
  "BPSC-CCE": new Date("2027-11-07"),
};

const centers = [
  {
    name: "Delhi Public School Rohini",
    address: "Sector 24, Rohini, New Delhi",
    city: "New Delhi",
    state: "Delhi",
    lat: 28.729,
    lng: 77.096,
    examCodes: ["NEET-UG", "JEE-MAIN", "SSC-CGL", "UPSC-CSE"],
  },
  {
    name: "Kendriya Vidyalaya IIT Powai",
    address: "IIT Area, Powai, Mumbai",
    city: "Mumbai",
    state: "Maharashtra",
    lat: 19.1334,
    lng: 72.9133,
    examCodes: ["JEE-MAIN", "JEE-ADV", "NEET-UG"],
  },
  {
    name: "St. Xavier's Collegiate School",
    address: "30 Mother Teresa Sarani, Kolkata",
    city: "Kolkata",
    state: "West Bengal",
    lat: 22.5489,
    lng: 88.3537,
    examCodes: ["NEET-UG", "JEE-MAIN", "SSC-CGL"],
  },
  {
    name: "National College Jayanagar",
    address: "36th B Cross Road, Jayanagar, Bengaluru",
    city: "Bengaluru",
    state: "Karnataka",
    lat: 12.925,
    lng: 77.583,
    examCodes: ["JEE-MAIN", "JEE-ADV", "UPSC-CSE"],
  },
  {
    name: "Patna Science College",
    address: "Ashok Rajpath, Patna University Campus",
    city: "Patna",
    state: "Bihar",
    lat: 25.6205,
    lng: 85.1723,
    examCodes: ["BPSC-CCE", "SSC-CGL", "NEET-UG"],
  },
  {
    name: "Lucknow Public College",
    address: "Gomti Nagar Extension, Lucknow",
    city: "Lucknow",
    state: "Uttar Pradesh",
    lat: 26.8467,
    lng: 80.9462,
    examCodes: ["UPPSC-PCS", "UPSC-CSE", "SSC-CGL"],
  },
];

async function main() {
  loadEnvLocal();

  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is required. Add it to .env.local before running npm run seed.");
  }

  await mongoose.connect(process.env.MONGODB_URI, {
    dbName: process.env.MONGODB_DB || "examsafexa",
  });

  const examDocs = await Promise.all(
    EXAM_CATALOG.map((exam) => {
      const examDate = examDateByCode[exam.code];
      const payload = examDate ? { ...exam, examDate } : exam;

      return Exam.findOneAndUpdate(
        { code: exam.code },
        { $set: payload },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
    })
  );

  const examIdByCode = new Map(examDocs.map((exam) => [exam.code, exam._id]));

  await Promise.all(
    centers.map((center) =>
      ExamCenter.findOneAndUpdate(
        { name: center.name },
        {
          name: center.name,
          address: center.address,
          city: center.city,
          state: center.state,
          lat: center.lat,
          lng: center.lng,
          examIds: center.examCodes.map((code) => examIdByCode.get(code)).filter(Boolean),
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      )
    )
  );

  console.log(`Seeded ${examDocs.length} exams and ${centers.length} centers.`);
  await mongoose.disconnect();
}

main().catch(async (error) => {
  console.error(error);
  await mongoose.disconnect();
  process.exit(1);
});
