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
			phone_number: "+9639091234345",
		};
	});

	it("should be defined", () => {
		expect(app).toBeDefined();
	});

	it("should not allow no email ", () => {
		return request(app.getHttpServer())
			.post("/register")
			.send(registerBody)
			.expect({
				statusCode: 403,
				message: "email you can't use this email",
				error: "Forbidden",
			});
	});
	afterAll(async () => {
		await app.close();
	});
});
