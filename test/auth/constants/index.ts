import { HttpStatus, INestApplication, ValidationPipe } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "../../../src/app.module";
import { AuthService } from "../../../src/modules/auth/auth.service";

export const route = "/";

export async function setUp() {
	let app: INestApplication;
	let authService: AuthService;
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
	return { app, authService };
}
