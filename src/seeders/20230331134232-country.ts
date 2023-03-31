"use strict";

import { readFileSync } from "fs";
import { resolve } from "path";
import { QueryInterface } from "sequelize";
import { Sequelize } from "sequelize-typescript";
const currency_path = resolve("info", "currency.json");
const country_path = resolve("info", "country-and-city.json");

type currency = { iso2: string; currency: string };
type country = {
	iso2: string;
	currency: string;
	cities: string[];
	country: string;
};
/** @type {import('sequelize-cli').Migration} */
export = {
	async up(queryInterface: QueryInterface, sequelize: Sequelize) {
		let count: number = 1;
		const currencies: currency[] = await JSON.parse(
			readFileSync(currency_path, { encoding: "utf8" })
		).data.map((element: any) => {
			return { iso2: element.iso2, currency: element.currency };
		});
		const countries: country[] = await JSON.parse(
			readFileSync(country_path, { encoding: "utf8" })
		)
			.data.map((element: any) => {
				return {
					iso2: element.iso2,
					country: element.country,
					cities: element.cities,
					currency: currencies.find((y) => y.iso2 == element.iso2)
						.currency,
				};
			})
			.sort((a: country, b: country) => a.iso2.localeCompare(b.iso2));

		for (let index = 0; index < 50; index++) {
			console.log(`country : ${countries[index].country} id ${index}`);
			await queryInterface.bulkInsert("Countries", [
				{
					country_id: index + 1,
					name: countries[index].country,
					iso: countries[index].iso2,
					currency: countries[index].currency,
				},
			]);
			for (
				let i = 0;
				i < 4 &&
				countries[index].cities.length > 4 &&
				countries[index].cities[i].length < 45;
				i++
			) {
				console.log(
					`city : ${countries[index].cities[i]} id : ${count}`
				);
				await queryInterface.bulkInsert("Cities", [
					{
						city_id: count,
						country_id: index + 1,
						name: countries[index].cities[i],
					},
				]);
				count++;
			}
		}
	},

	async down(queryInterface: QueryInterface, Sequelize: Sequelize) {
		await queryInterface.bulkDelete("Cities", null, {});
		await queryInterface.bulkDelete("Countries", null, {});
	},
};
