// requirment admin and a token for that admin

import { INestApplication } from "@nestjs/common";
import { Admin } from "src/modules/admins/admin.entity";
import { Credential } from "src/modules/credentials/credential.entity";
import { User } from "src/modules/users/user.entity";
import * as request from "supertest";
import { AuthService } from "../../src/modules/auth/auth.service";
import { route, setUp } from "./constants";

// need to test if admin id is returnd
let admin_token: string;
let path: string = route + "admin/profile";
describe("delete admin", () => {
	let app: INestApplication;
	let authService: AuthService;
	beforeAll(async () => {
		await setUp().then((data) => {
			app = data.app;
			authService = data.authService;
		});
		await Admin.destroy({ where: {} });
		await User.destroy({ where: {} });
		await Credential.destroy({ where: {} });
		admin_token = (
			await authService.registerAdmin({
				email: "testra@test.com",
				password: "112233441122334411223344",
				user_name: "testra",
				first_name: "test",
				last_name: "test",
				contact_email: "testr@test.com",
			})
		).access_token;
	});

	it("should be defined", () => {
		expect(app).toBeDefined();
		expect(authService).toBeDefined();
	});

	it("should", () => {
		return request(app.getHttpServer())
			.delete(path)
			.set({ Authorization: `Bearer ${admin_token}` })
			.expect(200);
	});

	afterAll(async () => {
		await app.close();
	});
});
