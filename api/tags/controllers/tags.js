'use strict';

const { parseMultipartData, sanitizeEntity } = require('strapi-utils');
module.exports = {
    me: async(ctx) => {

        const user = ctx.state.user

        let tags = await strapi.services.tags.find({
                user: user.id
            })
            //   ctx.send(imagenes)
        return tags
    },
    async create(ctx) {

        let entity;
        const user = ctx.state.user;

        if (ctx.is('multipart')) {
            const { data, files } = parseMultipartData(ctx);
            data.user = user.id
            entity = await strapi.services.tags.create(data, { files })
        } else {
            //Formato json
            const data = ctx.request.body

            data.user = user.id;
            entity = await strapi.services.tags.create(data);
        }

        //parcea la info luego la arma 
        return sanitizeEntity(entity, { model: strapi.models.tags });
    },
};