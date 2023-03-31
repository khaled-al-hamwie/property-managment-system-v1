import { hash } from "bcryptjs";
import { QueryInterface, Sequelize } from "sequelize";
export = {
	async up(queryInterface: QueryInterface, sequelize: Sequelize) {
		await queryInterface.bulkInsert("Credentials", [
			{
				credential_id: 1,
				email: "testseeder1@test.com",
				user_name: "testseeder1",
				password: await hash("12312121212121212345", 12),
				is_admin: 1,
			},
			{
				credential_id: 2,
				email: "testseeder2@test.com",
				user_name: "testseeder2",
				password: await hash("12312121212121212345", 12),
				is_admin: 0,
			},
		]);

		await queryInterface.bulkInsert("Admins", [
			{
				admin_id: 1,
				credential_id: 1,
				first_name: "first name",
				last_name: "last name",
			},
		]);

		await queryInterface.bulkInsert("Users", [
			{
				user_id: 1,
				credential_id: 2,
				first_name: "first name",
				last_name: "last name",
			},
		]);
	},
	async down(queryInterface: QueryInterface, Sequelize: Sequelize) {
		await queryInterface.bulkDelete("Users", null, {});
		await queryInterface.bulkDelete("Admins", null, {});
		await queryInterface.bulkDelete("Credentials", null, {});
	},
};
