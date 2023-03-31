"use strict";

import { readFile, readFileSync } from "fs";
import { resolve } from "path";
import { QueryInterface } from "sequelize";
import { Sequelize } from "sequelize-typescript";

/** @type {import('sequelize-cli').Migration} */
export = {
	async up(queryInterface: QueryInterface, sequelize: Sequelize) {
		const currency_path = resolve("info", "currency.json");
		const data = await JSON.parse(
			readFileSync(currency_path, { encoding: "utf8" })
		).data;
		// console.log(currencies);
		for (let index = 0; index < data.length; index++) {
			await queryInterface.bulkInsert("Countries", [
				{
					country_id: index + 1,
					name: data[index].name,
					iso: data[index].iso2,
					currency: data[index].currency,
				},
			]);
		}
	},

	async down(queryInterface: QueryInterface, Sequelize: Sequelize) {
		return queryInterface.bulkDelete("Countries", null, {});
	},
};
