"use strict";

const { User } = require("../models");
const { bcryptHash } = require("../helper/bcrypt");

module.exports = {
  async up(queryInterface, Sequelize) {
    for (let index = 1; index <= 5; index++) {
      const email = `example${index}@mail.com`;

      const existingUser = await User.findOne({
        where: { email },
      });

      if (!existingUser) {
        await User.create({
          username: `exampleUser${index}`,
          email,
          password: await bcryptHash(`examplePwd${index}`),
        });
      }
    }
  },

  async down(queryInterface, Sequelize) {
    console.log("Seeder Users tidak melakukan penghapusan otomatis.");
  },
};