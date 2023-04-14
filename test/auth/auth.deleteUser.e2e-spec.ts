import { INestApplication } from "@nestjs/common";
import { Admin } from "src/modules/admins/admin.entity";
import { Credential } from "src/modules/credentials/credential.entity";
import { User } from "src/modules/users/user.entity";
import * as request from "supertest";
import { AuthService } from "../../src/modules/auth/auth.service";
import { route, setUp } from "./constants";

let user_token: string;
let path: string = route + "profile";
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
		user_token = (
			await authService.registerUser({
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

	it("should be 200", async () => {
		const resp = await request(app.getHttpServer())
			.delete(path)
			.set({ Authorization: `Bearer ${user_token}` });
		const credentail = await Credential.findOne({
			where: { user_name: "testra" },
		});
		expect(resp.status).toBe(200);
		expect(credentail).toBeNull();
	});

	afterAll(async () => {
		await app.close();
	});
});
