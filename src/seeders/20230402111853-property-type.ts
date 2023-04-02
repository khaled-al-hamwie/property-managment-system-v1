import { hash } from "bcryptjs";
import { QueryInterface, Sequelize } from "sequelize";
import { PropertyTypeAttributes } from "src/modules/property-types/interfaces/property-type.interface";
export = {
	async up(queryInterface: QueryInterface, sequelize: Sequelize) {
		const HOUSE: PropertyTypeAttributes = {
			property_type_id: 1,
			name: "house",
		};
		const APPARTMENT: PropertyTypeAttributes = {
			property_type_id: 2,
			name: "appartment",
		};
		const RESIDENTAIL: PropertyTypeAttributes = {
			property_type_id: 3,
			name: "resedentail",
		};
		const FLAT: PropertyTypeAttributes = {
			property_type_id: 4,
			name: "flat",
		};
		const HOTEL_ROOM: PropertyTypeAttributes = {
			property_type_id: 5,
			name: "hotel room",
		};
		const MANSSION: PropertyTypeAttributes = {
			property_type_id: 6,
			name: "manssion",
		};
		await queryInterface.bulkInsert("PropertyTypes", [
			HOUSE,
			APPARTMENT,
			RESIDENTAIL,
			FLAT,
			HOTEL_ROOM,
			MANSSION,
		]);
	},
	async down(queryInterface: QueryInterface, Sequelize: Sequelize) {
		await queryInterface.bulkDelete("PropertyTypes", null, {});
	},
};
