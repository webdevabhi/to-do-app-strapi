'use strict';

/**
 * to-do-list service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::to-do-list.to-do-list');
