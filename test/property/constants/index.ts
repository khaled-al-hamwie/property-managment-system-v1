import { HttpStatus, INestApplication, ValidationPipe } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "src/app.module";
import { Admin } from "src/modules/admins/admin.entity";
import { AuthService } from "src/modules/auth/auth.service";
import {
	AdminPayload,
	UserPayload,
} from "src/modules/auth/interfaces/payload.interface";
import { Credential } from "src/modules/credentials/credential.entity";
import { PropertyService } from "src/modules/property/property.service";
import { User } from "src/modules/users/user.entity";

export const route = "/property";

export async function setUp() {
	let app: INestApplication;
	let authService: AuthService;
	let propertyService: PropertyService;
	let admin_token: string;
	let user_token: string;
	const moduleFixture: TestingModule = await Test.createTestingModule({
		imports: [AppModule],
	}).compile();
	app = moduleFixture.createNestApplication();
	authService = moduleFixture.get<AuthService>(AuthService);
	propertyService = moduleFixture.get<PropertyService>(PropertyService);
	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			stopAtFirstError: true,
			errorHttpStatusCode: HttpStatus.FORBIDDEN,
		})
	);
	await app.init();
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
	admin_token = (
		await authService.registerAdmin({
			email: "testrb@test.com",
			password: "112233441122334411223344",
			user_name: "testrb",
			first_name: "test",
			last_name: "test",
			contact_email: "testr@test.com",
		})
	).access_token;
	return { app, authService, admin_token, user_token, propertyService };
}
