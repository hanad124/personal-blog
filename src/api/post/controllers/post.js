"use strict";

/**
 * post controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::post.post", ({ strapi }) => ({
  async findOne(ctx) {
    const { id } = ctx.params;

    const entity = await strapi.db.query("api::post.post").findOne({
      where: { slug: id },
      populate: ["thumbnail", "author_image"],
    });
    const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

    return this.transformResponse(sanitizedEntity);
  },
}));
