'use strict';

const { parseMultipartData, sanitizeEntity } = require('strapi-utils');

module.exports = {
    me: async(ctx) => {

        const user = ctx.state.user

        let productos = await strapi.services.imagenes.find({
                user: user.id
            })
            //   ctx.send(imagenes)
        return productos
    },

    async create(ctx) {

        let entity;
        const user = ctx.state.user;

        if (ctx.is('multipart')) {
            const { data, files } = parseMultipartData(ctx);
            data.user = user.id
            entity = await strapi.services.productos.create(data, { files })
        } else {
            //Formato json
            const data = ctx.request.body

            data.user = user.id;
            entity = await strapi.services.productos.create(data);
        }

        //parcea la info luego la arma 
        return sanitizeEntity(entity, { model: strapi.models.productos });
    },
};