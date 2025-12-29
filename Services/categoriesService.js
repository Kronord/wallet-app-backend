const { Categories } = require("../Models/CategoryModel");

const getCategoriesService = async () => await Categories.find({});

module.exports = getCategoriesService;
