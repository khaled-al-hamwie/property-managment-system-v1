import { HttpStatus, INestApplication, ValidationPipe } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "src/app.module";
import { AuthService } from "src/modules/auth/auth.service";
import {
	AdminPayload,
	UserPayload,
} from "src/modules/auth/interfaces/payload.interface";

export const route = "/property";
export const admin_credentails: AdminPayload = {
	admin_id: 1,
	user_name: "testseeder1",
};
export const user_credentails: UserPayload = {
	user_id: 1,
	user_name: "testseeder2",
};

export async function setUp() {
	let app: INestApplication;
	let authService: AuthService;
	let admin_token: string;
	let user_token: string;
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
	admin_token = (await authService.login(admin_credentails)).access_token;
	user_token = (await authService.login(user_credentails)).access_token;
	return { app, authService, admin_token, user_token };
}
