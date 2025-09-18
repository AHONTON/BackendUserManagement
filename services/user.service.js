const userRepository = require("../repositories/user.repository");

class UserService {
  async addUser(data) {
    try {
      return await userRepository.create(data);
    } catch (err) {
      // Gestion des erreurs de validation Mongoose
      if (err.name === "ValidationError") {
        const messages = Object.values(err.errors).map((e) => e.message);
        throw new Error(messages.join(", "));
      }
      throw err;
    }
  }

  async getUsers() {
    return await userRepository.findAll();
  }

  async getUser(id) {
    const user = await userRepository.findById(id);
    if (!user) throw new Error("Utilisateur non trouvé");
    return user;
  }

  async updateUser(id, data) {
    try {
      const updatedUser = await userRepository.update(id, data);
      if (!updatedUser) throw new Error("Utilisateur non trouvé");
      return updatedUser;
    } catch (err) {
      if (err.name === "ValidationError") {
        const messages = Object.values(err.errors).map((e) => e.message);
        throw new Error(messages.join(", "));
      }
      throw err;
    }
  }

  async deleteUser(id) {
    const deletedUser = await userRepository.delete(id);
    if (!deletedUser) throw new Error("Utilisateur non trouvé");
    return deletedUser;
  }
}

module.exports = new UserService();
