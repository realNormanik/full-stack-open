import AsyncStorage from "@react-native-async-storage/async-storage";

class AuthStorage {
  constructor(namespace = "auth") {
    this.namespace = namespace;
  };

  async getAccessToken() {
    try {
      const token = await AsyncStorage.getItem(`${this.namespace}:token`);
      return token;
    } catch (e) {
      console.error("Token error:", e);
      return null;
    };
  };

  async setAccessToken(accessToken) {
    try {
      await AsyncStorage.setItem(`${this.namespace}:token`, accessToken);
    } catch (e) {
      console.error("Token error:", e);
    };
  };

  async removeAccessToken() {
    try {
      await AsyncStorage.removeItem(`${this.namespace}:token`);
    } catch (e) {
      console.error("Token error:", e);
    };
  };
};

export default AuthStorage;