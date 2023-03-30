import { HttpStatus, INestApplication, ValidationPipe } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Test, TestingModule } from "@nestjs/testing";
import { hash } from "bcryptjs";
import { AppModule } from "src/app.module";
import { Admin } from "src/modules/admins/admin.entity";
import { RegisterAdminDto } from "src/modules/auth/dto/register.admin.dto";
import { AdminPayload } from "src/modules/auth/interfaces/payload.interface";
import { Credential } from "src/modules/credentials/credential.entity";
import * as request from "supertest";

describe("register an admin", () => {
	let app: INestApplication;
	let registerBody: RegisterAdminDto;
	let jwt: JwtService;
	let token: string;
	let cre: Credential;
	let admin: Admin;
	let payload: AdminPayload;
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
		await Admin.destroy({ where: {} });
		await Credential.destroy({ where: {} });
		const password = await hash("12345678901234567890", 12);
		cre = await Credential.create({
			email: "test@gmail.com",
			user_name: "test",
			password,
		});
		admin = await Admin.create({
			credential_id: cre.credential_id,
			first_name: "test",
			last_name: "test",
		});
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
		payload = {
			user_name: cre.user_name,
			admin_id: admin.admin_id,
		};
		token = jwt.sign(payload, { secret: process.env.JWTKEY });
	});

	it("should be defined", () => {
		expect(app).toBeDefined();
	});
	describe("should be guarded", () => {
		it("should create with guard", () => {
			return request(app.getHttpServer())
				.post("/admin/register")
				.set({ Authorization: `Bearer ${token}` })
				.send(registerBody)
				.expect(201);
		});
		it("should not create without token", () => {
			return request(app.getHttpServer())
				.post("/admin/register")
				.send(registerBody)
				.expect(401);
		});
		it("should not create with non existing or deleted admin", () => {
			payload.admin_id = -1;
			token = jwt.sign(payload, { secret: process.env.JWTKEY });
			return request(app.getHttpServer())
				.post("/admin/register")
				.set({ Authorization: `Bearer ${token}` })
				.send(registerBody)
				.expect(401);
		});
		it("should not create with user", () => {
			delete payload.admin_id;
			token = jwt.sign(payload, { secret: process.env.JWTKEY });
			return request(app.getHttpServer())
				.post("/admin/register")
				.set({ Authorization: `Bearer ${token}` })
				.send(registerBody)
				.expect(401);
		});
	});
	describe("email", () => {
		it("should not allow no email ", () => {
			delete registerBody.email;
			return request(app.getHttpServer())
				.post("/admin/register")
				.set({ Authorization: `Bearer ${token}` })
				.send(registerBody)
				.expect({
					statusCode: 403,
					message: ["email must be an email"],
					error: "Forbidden",
				});
		});
		it("should not allow the same eamil ", () => {
			registerBody.user_name = "tests";
			return request(app.getHttpServer())
				.post("/admin/register")
				.set({ Authorization: `Bearer ${token}` })
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
				.post("/admin/register")
				.set({ Authorization: `Bearer ${token}` })
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
				.post("/admin/register")
				.set({ Authorization: `Bearer ${token}` })
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
				.post("/admin/register")
				.set({ Authorization: `Bearer ${token}` })
				.send(registerBody)
				.expect({
					statusCode: 403,
					message: [
						"user_name must be longer than or equal to 3 characters",
					],
					error: "Forbidden",
				});
		});
		it("should not allow the same user_name", () => {
			registerBody.email = "test2@gmail.com";
			return request(app.getHttpServer())
				.post("/admin/register")
				.set({ Authorization: `Bearer ${token}` })
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
				.post("/admin/register")
				.send(registerBody)
				.set({ Authorization: `Bearer ${token}` })
				.expect({
					statusCode: 403,
					message: ["user_name should not contain a space"],
					error: "Forbidden",
				});
		});
		it("should not allow user_name with less than 3 charachter ", () => {
			registerBody.user_name = "      f    ";
			return request(app.getHttpServer())
				.post("/admin/register")
				.set({ Authorization: `Bearer ${token}` })
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
				.set({ Authorization: `Bearer ${token}` })
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
			.post("/admin/register")
			.set({ Authorization: `Bearer ${token}` })
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
			.set({ Authorization: `Bearer ${token}` })
			.expect({
				statusCode: 403,
				message: [
					"last_name must be longer than or equal to 3 characters",
				],
				error: "Forbidden",
			});
	});
	afterAll(async () => {
		await Admin.destroy({ where: {} });
		await Credential.destroy({ where: {} });
		await app.close();
	});
});
