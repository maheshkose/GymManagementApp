

import cron from "node-cron";
import Members from "../Models/membersModel.js";
import MembersStats from "../Models/memberStats.js";
import Attendance from "../Models/attendenceModel.js";

console.log('cron in use');

cron.schedule("0 0 * * *", async () => {
  const now = new Date();

  await Members.updateMany(
    { "currentPlan.planEndingDate": { $lt: now }, isActive: true },
    { $set: { isActive: false } }
  );
  const member = await Members.find({isActive:true});
  if (!member) {
    console.log("no live member found");
    
  }
  const membersCount = member.length;
  await MembersStats.update({$push:{statsArray:{date:now,membersCount:membersCount}}})

  console.log("Expired plans updated!");
});
cron.schedule("30 22 * * *", async () => {
  const attendeces = await Attendance.updateMany({status:"present"},{$set:{status:"checked out",checkOutTime:new Date()}});
  console.log("all members checked Out");
  
})
//try to change current plan to null
