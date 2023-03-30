import { INestApplication } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "src/app.module";
import { Credential } from "src/modules/credentials/credential.entity";
import { User } from "src/modules/users/user.entity";
import * as request from "supertest";
// import { AppModule } from "./../src/app.module";

describe("Posts controller", () => {
	let app: INestApplication;
	let credentail: Credential;
	let user: User;
	let jwt: JwtService;
	let token: string;
	beforeAll(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
			providers: [JwtService],
		}).compile();
		app = moduleFixture.createNestApplication();
		jwt = moduleFixture.get<JwtService>(JwtService);
		await app.init();
		credentail = await Credential.create({
			credential_id: 1,
			email: "test@test.com",
			password: "12341234",
			user_name: "test1",
		});
		user = await User.create({
			user_id: 1,
			credential_id: 1,
			first_name: "khaled",
			last_name: "khaled",
		});
		const payload = { user_name: "test1", user_id: 1 };
		token = await jwt.sign(payload, { secret: process.env.JWTKEY });
	});
	afterAll(async () => {
		await user.destroy();
		await credentail.destroy();
		await app.close();
	});
	describe("Create A Post", () => {
		it("should create a post", () => {
			return request(app.getHttpServer())
				.post("/posts")
				.send({
					property_id: 1,
					title: "some name",
					description: "this should be larger than 10 charachter",
					price: 10,
				})
				.set({ Authorization: `Bearer ${token}` })
				.expect(201);
		});
		it("should return 200", () => {
			return request(app.getHttpServer()).get("/posts/1").expect(404);
		});
	});
});
