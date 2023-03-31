import { HttpStatus, INestApplication, ValidationPipe } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "src/app.module";
import { Admin } from "src/modules/admins/admin.entity";
import { AuthService } from "src/modules/auth/auth.service";
import { RegisterAdminDto } from "src/modules/auth/dto/register.admin.dto";
import { CityDto } from "src/modules/cities/dto/city.dto";
import { Credential } from "src/modules/credentials/credential.entity";
import { User } from "src/modules/users/user.entity";
import * as request from "supertest";
describe("create a city", () => {
	let app: INestApplication;
	let authService: AuthService;
	let token: string;
	let body: CityDto;
	beforeAll(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();
		app = moduleFixture.createNestApplication();
		authService = moduleFixture.get<AuthService>(AuthService);
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
		const registerBody: RegisterAdminDto = {
			email: "testr@test.com",
			password: "112233441122334411223344",
			user_name: "testr",
			first_name: "test",
			last_name: "test",
			contact_email: "testr@test.com",
		};
		token = (await authService.registerAdmin(registerBody)).access_token;
	});
	beforeEach(() => {
		body = {
			name: "gorgia",
			state: "some where",
		};
	});
	it("should be defined", () => {
		expect(app).toBeDefined();
		expect(authService).toBeDefined();
	});
	it("should create", () => {
		console.log(body);
		return request(app.getHttpServer())
			.post("/admin/city")
			.set({ Authorization: `Bearer ${token}` })
			.send(body)
			.expect({});
	});
	afterAll(async () => {
		await User.destroy({ where: {} });
		await Admin.destroy({ where: {} });
		await Credential.destroy({ where: {} });
		await app.close();
	});
});
