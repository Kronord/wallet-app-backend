const getCategoriesService = require("../Services/categoriesService");

const getAllCategories = async (req, res, next) => {
  try {
    const categories = await getCategoriesService();
    res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
};

module.exports = getAllCategories;
