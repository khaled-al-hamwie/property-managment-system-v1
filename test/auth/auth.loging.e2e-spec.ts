import { HttpStatus, INestApplication, ValidationPipe } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { hash } from "bcryptjs";
import { AppModule } from "src/app.module";
import { JwtAttributes } from "src/modules/auth/interfaces/jwt.interface";
import { Credential } from "src/modules/credentials/credential.entity";
import { User } from "src/modules/users/user.entity";
import * as request from "supertest";

describe("login", () => {
	let app: INestApplication;
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
		await Credential.create({
			credential_id: 1,
			email: "test@gmail.com",
			user_name: "test",
			password: await hash("12345678901234567890", 12),
		});
		await User.create({
			user_id: 1,
			credential_id: 1,
			first_name: "test",
			last_name: "test",
		});
	});
	afterAll(async () => {
		await app.close();
	});

	it("should login successfuly", () => {
		const req = request(app.getHttpServer())
			.post("/login")
			.send({ user_name: "test", password: "12345678901234567890" });

		return req.expect(201);
	});
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