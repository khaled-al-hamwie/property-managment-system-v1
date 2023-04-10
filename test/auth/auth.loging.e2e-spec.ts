import { HttpStatus, INestApplication, ValidationPipe } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "src/app.module";
import { Admin } from "src/modules/admins/admin.entity";
import { AuthService } from "src/modules/auth/auth.service";
import { RegisterAdminDto } from "src/modules/auth/dto/register.admin.dto";
import { RegisterUserDto } from "src/modules/auth/dto/register.user.dto";
import { Credential } from "src/modules/credentials/credential.entity";
import { User } from "src/modules/users/user.entity";
import * as request from "supertest";
import { route, setUp } from "./constants";
let path: string = route + "login";
describe("login", () => {
	let app: INestApplication;
	let authService: AuthService;
	let admin_body: RegisterAdminDto = {
		email: "testra@test.com",
		password: "112233441122334411223344",
		user_name: "testra",
		first_name: "test",
		last_name: "test",
		contact_email: "testr@test.com",
	};
	let user_body: RegisterUserDto = {
		email: "testrb@test.com",
		password: "112233441122334411223344",
		user_name: "testrb",
		first_name: "test",
		last_name: "test",
		contact_email: "testr@test.com",
	};
	beforeAll(async () => {
		await setUp().then((data) => {
			app = data.app;
			authService = data.authService;
		});
		await Admin.destroy({ where: {} });
		await User.destroy({ where: {} });
		await Credential.destroy({ where: {} });
		await authService.registerAdmin(admin_body);
		await authService.registerUser(user_body);
	});
	it("should be defined", () => {
		expect(app).toBeDefined();
		expect(authService).toBeDefined();
	});
	it("should login A user successfuly", async () => {
		return request(app.getHttpServer())
			.post(path)
			.send({
				user_name: user_body.user_name,
				password: user_body.password,
			})
			.expect(200);
	});
	it("should login An admin successfuly", async () => {
		return request(app.getHttpServer()).post(path).send({
			user_name: admin_body.user_name,
			password: admin_body.password,
		});
	});
	describe("user_name", () => {
		it("should not login with wrong user_name", () => {
			return request(app.getHttpServer())
				.post(path)
				.send({
					user_name: "fjs;dlfjdsjfsj",
					password: user_body.password,
				})
				.expect({
					statusCode: 403,
					message: "credentials don't match",
					error: "Forbidden",
				});
		});
		it("should not login without user_name", () => {
			return request(app.getHttpServer())
				.post(path)
				.send({ password: "12345678901234567890" })
				.expect({ statusCode: 401, message: "Unauthorized" });
		});
	});

	describe("password", () => {
		it("should not login with wrong password", () => {
			return request(app.getHttpServer())
				.post(path)
				.send({
					user_name: user_body.user_name,
					password: "12345fds678901234567891",
				})
				.expect({
					statusCode: 403,
					message: "credentials don't match",
					error: "Forbidden",
				});
		});

		it("should not login without password", () => {
			return request(app.getHttpServer())
				.post(path)
				.send({ user_name: user_body.user_name })
				.expect({ statusCode: 401, message: "Unauthorized" });
		});
	});

	afterAll(async () => {
		await app.close();
	});
});
