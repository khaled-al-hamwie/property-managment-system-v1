import { INestApplication } from "@nestjs/common";
import { AuthService } from "src/modules/auth/auth.service";
import { PropertyService } from "src/modules/property/property.service";
import { setUp } from "./constants";

describe("update property", () => {
	let app: INestApplication;
	let authService: AuthService;
	let propertyService: PropertyService;
	let user_token: string;
	let admin_token: string;
	beforeAll(() =>
		setUp().then((data) => {
			app = data.app;
			authService = data.authService;
			user_token = data.user_token;
			admin_token = data.admin_token;
			propertyService = data.propertyService;
		})
	);
	it("should be defined", () => {
		expect(app).toBeDefined();
		expect(authService).toBeDefined();
		expect(propertyService).toBeDefined();
	});
	// describe("guard", () => {
	// 	it("should not accept no token", () => {
	// 		return request(app.getHttpServer()).post(route).expect({
	// 			statusCode: 401,
	// 			message: "Unauthorized",
	// 		});
	// 	});
	// 	it("should not accept admin token", () => {
	// 		return request(app.getHttpServer())
	// 			.post(route)
	// 			.set({ Authorization: `Bearer ${admin_token}` })
	// 			.expect({
	// 				statusCode: 401,
	// 				message: "Unauthorized",
	// 			});
	// 	});
	// });
});
