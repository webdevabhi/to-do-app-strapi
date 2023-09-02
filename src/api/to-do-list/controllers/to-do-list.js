'use strict';

/**
 * to-do-list controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::to-do-list.to-do-list', ({strapi}) => ({
  async find(ctx) {
    try {
      const toDoList = await strapi.db.query("api::to-do-list.to-do-list").findMany({
        where: {
          user: ctx.state.user.id
        },
        orderBy: {createdAt: 'ASC'}
      });
      ctx.send(toDoList);
    } catch (error) {
      console.log('[To Do List Controller] find: error', error)
      return ctx.throw(500, 'Something went wrong');
    }
  },
  async create(ctx) {
    try {
      const body = ctx.request.body
      console.log(body)
      const list = await strapi.db.query('api::to-do-list.to-do-list').create({
        data: {
          ...body,
          user: ctx.state.user.id
        }
      })
      return ctx.send(list, 201);
    } catch (error) {
      console.log('[To Do List Controller] create: error', error)
      return ctx.throw(500, 'Something went wrong');
    }
  },
  async update(ctx) {
    try {
      const body = ctx.request.body;
      const listId = ctx.params.id;

      const list = await strapi.db.query("api::to-do-list.to-do-list").update({
        where: { id: listId },
        data: body,
      })
      
      return ctx.send(list, 200);
    } catch (error) {
      console.log('[To Do List Controller] update: error', error)
      return ctx.throw(500, 'Something went wrong');
    }
  }
}));
