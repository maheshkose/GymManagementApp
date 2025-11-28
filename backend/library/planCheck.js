

import cron from "node-cron";
import Members from "../Models/membersModel.js";

console.log('cron in use');

cron.schedule("0 0 * * *", async () => {
  const now = new Date();

  await Members.updateMany(
    { planEndingDate: { $lt: now }, isActive: true },
    { $set: { isActive: false } }
  );

  console.log("Expired plans updated!");
});
