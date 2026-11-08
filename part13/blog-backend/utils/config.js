require("dotenv").config();

const required = (name) => {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing ${name} in .env`);
  };

  return value;
};

// Values are read lazily so a missing variable produces a clear error
// at the moment it is needed (connecting / signing tokens).
module.exports = {
  PORT: Number(process.env.PORT) || 3000,
  get MONGODB_URI() {
    return required("MONGODB_URI");
  },
  get MONGODB_NAME() {
    return required("MONGODB_NAME");
  },
  get TOKEN() {
    return required("TOKEN");
  },
};
