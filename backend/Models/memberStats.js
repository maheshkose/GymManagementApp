import mongoose from "mongoose";

const membersStatsSchema = mongoose.Schema({
  
      date: {
        type: Date,
        required: true,
      },
      membersCount:{
        type:Number,
        required:true
      }
   
},{timestamps:true});

const MembersStats = mongoose.model("MembersStats",membersStatsSchema);

export default MembersStats;
