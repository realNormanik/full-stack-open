const { Blog, User } = require("../models");

// GET /api/authors - number of articles and total likes per author,
// aggregated in MongoDB and sorted by likes (descending).
// When `author` is a username of a registered user, the user's name is shown.
async function getAll(request, response) {
  const authors = await Blog.aggregate([
    {
      $lookup: {
        from: User.collection.name,
        localField: "author",
        foreignField: "username",
        as: "account",
      },
    },
    { $addFields: { displayName: { $ifNull: [{ $arrayElemAt: ["$account.name", 0] }, "$author"] } } },
    {
      $group: {
        _id: "$displayName",
        articles: { $sum: 1 },
        likes: { $sum: "$likes" },
      },
    },
    { $sort: { likes: -1, _id: 1 } },
    { $project: { _id: 0, author: "$_id", articles: 1, likes: 1 } },
  ]);

  response.json(authors);
};

module.exports = { getAll };
