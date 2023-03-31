import { HttpStatus, INestApplication, ValidationPipe } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Test, TestingModule } from "@nestjs/testing";
import { hash } from "bcryptjs";
import * as dotenv from "dotenv";
import { AppModule } from "src/app.module";
import { Admin } from "src/modules/admins/admin.entity";
import { Credential } from "src/modules/credentials/credential.entity";
import { User } from "src/modules/users/user.entity";
import * as request from "supertest";
dotenv.config();
describe("login", () => {
	let app: INestApplication;
	let jwt: JwtService;
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
		await Admin.destroy({ where: {} });
		await Credential.destroy({ where: {} });
		const password = await hash("12345678901234567890", 12);
		const cre1 = await Credential.create({
			email: "test@gmail.com",
			user_name: "testl",
			password,
		});
		const cre2 = await Credential.create({
			email: "test22@gmail.com",
			user_name: "test22",
			password,
			is_admin: true,
		});
		await User.create({
			credential_id: cre1.credential_id,
			first_name: "test",
			last_name: "test",
		});
		await Admin.create({
			credential_id: cre2.credential_id,
			first_name: "test",
			last_name: "test",
		});
	});

	it("should login A user successfuly", async () => {
		const req = await request(app.getHttpServer()).post("/login").send({
			user_name: "testl",
			password: "12345678901234567890",
		});
		const decoded = jwt.verify(req.body.access_token, {
			secret: process.env.JWTKEY,
		});
		expect("user_id" in decoded).toBe(true);
		expect("user_name" in decoded).toBe(true);
	});
	it("should login An admin successfuly", async () => {
		const req = await request(app.getHttpServer()).post("/login").send({
			user_name: "test22",
			password: "12345678901234567890",
		});
		console.log(req.body);
		const decoded = jwt.verify(req.body.access_token, {
			secret: process.env.JWTKEY,
		});
		console.log(decoded);
		expect("admin_id" in decoded).toBe(true);
		expect("user_name" in decoded).toBe(true);
	});
	describe("user_name", () => {
		it("should not login with wrong user_name", () => {
			return request(app.getHttpServer())
				.post("/login")
				.send({ user_name: "test1", password: "12345678901234567890" })
				.expect({
					statusCode: 403,
					message: "credentials don't match",
					error: "Forbidden",
				});
		});
		it("should not login without user_name", () => {
			return request(app.getHttpServer())
				.post("/login")
				.send({ password: "12345678901234567890" })
				.expect({ statusCode: 401, message: "Unauthorized" });
		});
	});

	describe("password", () => {
		it("should not login with wrong password", () => {
			return request(app.getHttpServer())
				.post("/login")
				.send({ user_name: "test", password: "12345678901234567891" })
				.expect({
					statusCode: 403,
					message: "credentials don't match",
					error: "Forbidden",
				});
		});

		it("should not login without password", () => {
			return request(app.getHttpServer())
				.post("/login")
				.send({ user_name: "test" })
				.expect({ statusCode: 401, message: "Unauthorized" });
		});
	});

	afterAll(async () => {
		await User.destroy({ where: {} });
		await Admin.destroy({ where: {} });
		await Credential.destroy({ where: {} });
		await app.close();
	});
});
