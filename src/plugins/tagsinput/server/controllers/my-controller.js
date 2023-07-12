'use strict';

module.exports = ({ strapi }) => ({
  index(ctx) {
    ctx.body = strapi
      .plugin('tagsinput')
      .service('myService')
      .getWelcomeMessage();
  },
});
