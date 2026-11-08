const { Session } = require("../models");

// DELETE /api/logout - removes the session, the token stops working immediately
async function logout(request, response) {
  await Session.deleteOne({ token: request.token });

  response.status(200).json({ message: "Logged out successfully" });
};

module.exports = { logout };
