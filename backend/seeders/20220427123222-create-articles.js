"use strict";

const { User, Article } = require("../models");

module.exports = {
  async up(queryInterface, Sequelize) {
    const users = await User.findAll();

    if (users.length === 0) {
      throw new Error("Tidak ada user. Jalankan seeder Users terlebih dahulu.");
    }

    for (let index = 1; index <= 55; index++) {
      const slug = `lorem-ipsum-${index}`;

      const existingArticle = await Article.findOne({
        where: { slug },
      });

      if (!existingArticle) {
        await Article.create({
          slug,
          title: `Lorem Ipsum ${index}`,
          description: `${index} - Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
          body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nec ante lacinia magna ultricies cursus nec non lacus. Praesent blandit sodales semper.`,
          userId: users[(index - 1) % users.length].id,
        });
      }
    }
  },

  async down(queryInterface, Sequelize) {
    console.log("Seeder Articles tidak melakukan penghapusan otomatis.");
  },
};