import { HttpStatus, INestApplication, ValidationPipe } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "src/app.module";
import { AuthService } from "src/modules/auth/auth.service";
import { AdminPayload } from "src/modules/auth/interfaces/payload.interface";

export const route = "/admin/country";
export const loginBody: AdminPayload = {
	admin_id: 1,
	user_name: "testseeder1",
};

export async function setUp() {
	let app: INestApplication;
	let authService: AuthService;
	let token: string;
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
	token = (await authService.login(loginBody)).access_token;
	return { app, authService, token };
}
