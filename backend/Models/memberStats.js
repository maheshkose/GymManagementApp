import mongoose from "mongoose";

const membersStatsSchema = mongoose.Schema({
  statsArray: [
    {
      date: {
        type: Date,
        required: true,
      },
      membersCount:{
        type:Number,
        required:true
      }
    },
  ],
});

const MembersStats = mongoose.model("MembersStats",membersStatsSchema);

export default MembersStats;
