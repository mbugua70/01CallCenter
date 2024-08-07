const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DataCallsSchema = new Schema(
  {

    duration: {
      type: Number,
      required: [true, "Please the field can't be empty"],
    },
    phone: {
      type: Number,
      required: [true, "Please the field can't be empty"],
    },
     office: {
      type: String,
      required: [true, "Please the field can't be empty"],

    },
   name: {
    type: String,
    required: [true, "Please the field can't be empty"],
   },
   call_type: {
    type: String,
    required: [true, "Please the field can't be empty"],
   },
   comments: {
    type: String,
    required: [true, "Please the field can't be empty"],
   }
  },
  { timestamps: true }
);

const UserCallModel = mongoose.model("Usercall", DataCallsSchema);

module.exports = UserCallModel;
