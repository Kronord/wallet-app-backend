const mongoose = require("mongoose");
const { Schema } = mongoose;

const categorySchema = new Schema({
  categories: {
    type: Array,
    require: true,
  },
});

const Categories = mongoose.model("Categories", categorySchema);

module.exports = { Categories };
