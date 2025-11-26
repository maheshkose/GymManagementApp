// export const client = {
//   name: "Mahesh",
//   avatarUrl: "/images/logo.png",
//   age: 28,
//   gender: "Male",
//   height: 175,
//   weight: 68,
//   activityLevel: "Moderate",
//   goal: "Lean Muscle Gain",
//   goalType: "Muscle Gain",
//   target: "72 kg",
//   timeline: "3 months",
//   motivation: "Strong body, sharp mind.",
//   mealPlan: {
//     name: "High Protein Vegetarian",
//     calories: 2200,
//     protein: 150,
//     carbs: 180,
//     fats: 70
//   },
//   progress: {
//     weightTrend: "68 → 70 kg",
//     workouts: 24,
//     beforeAfter: {
//       before: "/before.jpg",
//       after: "/after.jpg"
//     }
//   },
//   appointments: [
//     { date: "Aug 5", doctor: "Dr. Fitwell" },
//     { date: "Aug 12", doctor: "Dr. Nutrition" }
//   ],
//   feed: ["Push harder than yesterday", "Protein is your best friend"]
// };





import mongoose from "mongoose";
// import { progressSchema } from "./progress.js";
const clientSchema = new mongoose.Schema({
  personalInfo: {
    name: { type: String,default:"name" },
    avatarUrl: { type: String, default: "/default-avatar.png" },
    age: { type: Number, default:100 },
    gender: { type: String, enum: ["Male", "Female", "Other"],default:'Male' },
    height: { type: Number, default:100 }, // in cm
    weight: { type: Number, default:100 }, // in kg
    idealWeight:{type: Number, default:100},
    targetWeight:{type: Number, default:100},
    activityLevel: {
      type: String,
      enum: ["Sedentary", "Light", "Moderate", "Active", "Very Active"],
      default:"Moderate"
    },
  },

  fitnessGoals: {
    goal: { type: String, default:"be healthy" }, // e.g. Lean Muscle Gain
    goalType: { type: String, default:"be healthy" }, // e.g. Muscle Gain
    target: { type: String, default:"weight kg" }, // e.g. "72 kg"
    timeline: { type: String, default:"to be set" }, // e.g. "3 months"
    motivation: { type: String, default:"be healthy" },
  },

  mealPlan: {
    name: { type: String,default:"name" },
    calories: { type: Number, default:0 },
    protein: { type: Number,default:0 },
    carbs: { type: Number ,default:0},
    fats: { type: Number ,default:0},
  },

//   progressTracker:{type:progressSchema, default:{}},

  appointments: [
    {
      date: { type: String , default:"be healthy"},
      doctor: { type: String , default:"be healthy"},
    },
  ],

  feed: [{ type: String, default:"be healthy" }], // motivational quotes

}, { timestamps: true });

export default clientSchema;