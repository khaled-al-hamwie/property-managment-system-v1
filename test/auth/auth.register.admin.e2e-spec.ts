import { HttpStatus, INestApplication, ValidationPipe } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "src/app.module";
import { RegisterAdminDto } from "src/modules/auth/dto/register.admin.dto";
import { Credential } from "src/modules/credentials/credential.entity";
import { User } from "src/modules/users/user.entity";
import * as request from "supertest";

describe("register an admin", () => {
	let app: INestApplication;
	let registerBody: RegisterAdminDto;
	beforeAll(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();
		app = moduleFixture.createNestApplication();
		app.useGlobalPipes(
			new ValidationPipe({
				whitelist: true,
				stopAtFirstError: true,
				errorHttpStatusCode: HttpStatus.FORBIDDEN,
			})
		);
		await app.init();
		await User.destroy({ where: {} });
		await Credential.destroy({ where: {} });
	});

	beforeEach(() => {
		registerBody = {
			email: "testr@test.com",
			password: "112233441122334411223344",
			user_name: "testr",
			first_name: "test",
			last_name: "test",
			contact_email: "testr@test.com",
		};
	});

	it("should be defined", () => {
		expect(app).toBeDefined();
	});

	it("should not allow no email ", () => {
		delete registerBody.email;
		return request(app.getHttpServer())
			.post("/admin/register")
			.send(registerBody)
			.expect({
				statusCode: 403,
				message: ["email must be an email"],
				error: "Forbidden",
			});
	});
	it("should not allow no password ", () => {
		delete registerBody.password;
		return request(app.getHttpServer())
			.post("/admin/register")
			.send(registerBody)
			.expect({
				statusCode: 403,
				message: [
					"password must be longer than or equal to 20 characters",
				],
				error: "Forbidden",
			});
	});
	it("should not allow no password ", () => {
		registerBody.password = "12";
		return request(app.getHttpServer())
			.post("/admin/register")
			.send(registerBody)
			.expect({
				statusCode: 403,
				message: [
					"password must be longer than or equal to 20 characters",
				],
				error: "Forbidden",
			});
	});

	it("should not allow user_name with space", () => {
		registerBody.user_name = "fea f";
		return request(app.getHttpServer())
			.post("/admin/register")
			.send(registerBody)
			.expect({
				statusCode: 403,
				message: ["user_name should not contain a space"],
				error: "Forbidden",
			});
	});
	it("should not allow no user_name", () => {
		delete registerBody.user_name;
		return request(app.getHttpServer())
			.post("/admin/register")
			.send(registerBody)
			.expect({
				statusCode: 403,
				message: [
					"user_name must be longer than or equal to 3 characters",
				],
				error: "Forbidden",
			});
	});
	it("should not allow user_name with less than 3 charachter ", () => {
		registerBody.user_name = "      f    ";
		return request(app.getHttpServer())
			.post("/admin/register")
			.send(registerBody)
			.expect({
				statusCode: 403,
				message: [
					"user_name must be longer than or equal to 3 characters",
				],
				error: "Forbidden",
			});
	});
	it("should not allow user_name with more than 45 charachter", () => {
		registerBody.user_name = "f    ".repeat(45);
		return request(app.getHttpServer())
			.post("/admin/register")
			.send(registerBody)
			.expect({
				statusCode: 403,
				message: [
					"user_name must be shorter than or equal to 45 characters",
				],
				error: "Forbidden",
			});
	});
	it("should not allow empty fist_name", () => {
		registerBody.first_name = "";
		return request(app.getHttpServer())
			.post("/admin/register")
			.send(registerBody)
			.expect({
				statusCode: 403,
				message: [
					"first_name must be longer than or equal to 3 characters",
				],
				error: "Forbidden",
			});
	});
	it("should not allow empty last_name", () => {
		registerBody.last_name = "";
		return request(app.getHttpServer())
			.post("/admin/register")
			.send(registerBody)
			.expect({
				statusCode: 403,
				message: [
					"last_name must be longer than or equal to 3 characters",
				],
				error: "Forbidden",
			});
	});

	afterAll(async () => {
		await app.close();
	});
});
