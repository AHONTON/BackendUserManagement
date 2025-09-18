const User = require("../models/user.model");

class UserRepository {
  async create(data) { return await new User(data).save(); }
  async findAll() { return await User.find(); }
  async findById(id) { return await User.findById(id); }
  async update(id, data) { return await User.findByIdAndUpdate(id, data, { new: true, runValidators: true }); }
  async delete(id) { return await User.findByIdAndDelete(id); }
  async findByEmail(email) { return await User.findOne({ email }); }
}

module.exports = new UserRepository();
