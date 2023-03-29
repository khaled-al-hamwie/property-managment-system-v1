import { HttpStatus, INestApplication, ValidationPipe } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "src/app.module";
import { registerDto } from "src/modules/auth/dto/register.dto";
import { Credential } from "src/modules/credentials/credential.entity";
import { User } from "src/modules/users/user.entity";
import * as request from "supertest";

describe("register a user", () => {
	let app: INestApplication;
	let registerBody: registerDto;
	beforeEach(() => {
		registerBody = {
			email: "testr@test.com",
			password: "112233441122334411223344",
			user_name: "testr",
			first_name: "test",
			last_name: "test",
			bio: "this is a test bio ",
			contact_email: "testr@test.com",
			image: "https://google.com",
		};
	});
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

	afterAll(async () => {
		await app.close();
	});

	it("should create", () => {
		return request(app.getHttpServer())
			.post("/register")
			.send(registerBody)
			.expect(201);
	});
	it("should not allow similar email ", () => {
		return request(app.getHttpServer())
			.post("/register")
			.send(registerBody)
			.expect({
				statusCode: 403,
				message: "email you can't use this email",
				error: "Forbidden",
			});
	});
	it("should not allow similar user_name ", () => {
		registerBody.email = "test1@test.com";
		return request(app.getHttpServer())
			.post("/register")
			.send(registerBody)
			.expect({
				statusCode: 403,
				message: "user_name you can't use this user_name",
				error: "Forbidden",
			});
	});
	it("should not allow user_name with space", () => {
		registerBody.user_name = "fea f";
		return request(app.getHttpServer())
			.post("/register")
			.send(registerBody)
			.expect({
				statusCode: 403,
				message: ["user_name should not contain a space"],
				error: "Forbidden",
			});
	});
	it("should not allow user_name with less than 3 charachter ", () => {
		registerBody.user_name = "      f    ";
		return request(app.getHttpServer())
			.post("/register")
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
			.post("/register")
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
			.post("/register")
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
			.post("/register")
			.send(registerBody)
			.expect({
				statusCode: 403,
				message: [
					"last_name must be longer than or equal to 3 characters",
				],
				error: "Forbidden",
			});
	});
	it("should create without the optional field", async () => {
		await User.destroy({ where: {} });
		await Credential.destroy({ where: {} });
		delete registerBody.contact_email;
		delete registerBody.image;
		delete registerBody.bio;
		return request(app.getHttpServer())
			.post("/register")
			.send(registerBody)
			.expect(201);
	});
});
