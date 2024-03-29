import { HttpStatus, INestApplication, ValidationPipe } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "src/app.module";
import { RegisterUserDto } from "src/modules/auth/dto/register.user.dto";
import { Credential } from "src/modules/credentials/credential.entity";
import { User } from "src/modules/users/user.entity";
import * as request from "supertest";

describe("register a user", () => {
	let app: INestApplication;
	let registerBody: RegisterUserDto;
	let jwt: JwtService;
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
			providers: [JwtService],
		}).compile();
		app = moduleFixture.createNestApplication();
		jwt = moduleFixture.get<JwtService>(JwtService);
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

	it("should create", async () => {
		const req = await request(app.getHttpServer())
			.post("/register")
			.send(registerBody)
			.expect(201);
		const decoded = jwt.verify(req.body.access_token, {
			secret: process.env.JWTKEY,
		});
		expect("user_id" in decoded).toBe(true);
		expect("user_name" in decoded).toBe(true);
	});
	describe("email", () => {
		it("should not allow no email ", () => {
			delete registerBody.email;
			return request(app.getHttpServer())
				.post("/register")
				.send(registerBody)
				.expect({
					statusCode: 403,
					message: ["email must be an email"],
					error: "Forbidden",
				});
		});
		it("should not allow similar email ", () => {
			registerBody.user_name = "fja;l";
			return request(app.getHttpServer())
				.post("/register")
				.send(registerBody)
				.expect({
					statusCode: 403,
					message: ["email you can't use this email"],
					error: "Forbidden",
				});
		});
	});
	describe("password", () => {
		it("should not allow no password ", () => {
			delete registerBody.password;
			return request(app.getHttpServer())
				.post("/register")
				.send(registerBody)
				.expect({
					statusCode: 403,
					message: [
						"password must be longer than or equal to 20 characters",
					],
					error: "Forbidden",
				});
		});
		it("should small password ", () => {
			registerBody.password = "12";
			return request(app.getHttpServer())
				.post("/register")
				.send(registerBody)
				.expect({
					statusCode: 403,
					message: [
						"password must be longer than or equal to 20 characters",
					],
					error: "Forbidden",
				});
		});
	});
	describe("user_name", () => {
		it("should not allow no user_name", () => {
			delete registerBody.user_name;
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
		it("should not allow similar user_name ", () => {
			registerBody.email = "test1@test.com";
			return request(app.getHttpServer())
				.post("/register")
				.send(registerBody)
				.expect({
					statusCode: 403,
					message: ["user_name you can't use this user_name"],
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

	afterAll(async () => {
		await User.destroy({ where: {} });
		await Credential.destroy({ where: {} });
		await app.close();
	});
});
