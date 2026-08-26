import "dotenv/config";

export default {
  expo: {
    name: "Rate repository app",
    extra: {
      apolloUri: process.env.APOLLO_URI
    }
  }
};