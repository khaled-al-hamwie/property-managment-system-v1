import { getModelToken, SequelizeModule } from "@nestjs/sequelize";
import { Test } from "@nestjs/testing";
import { databaseConfig } from "../../../src/core/database/database.config";
import { Location } from "./location.entity";
import { LocationsModule } from "./locations.module";
import { LocationsService } from "./locations.service";

describe("location service int", () => {
	let service: LocationsService;

	beforeEach(async () => {
		const moduleRef = await Test.createTestingModule({
			imports: [
				// SequelizeModule.forRoot(databaseConfig.test),
				// LocationsModule,
			],
			providers: [
				LocationsService,
				// // getModelToken(Location),
				{
					provide: getModelToken(Location),
					useValue: {},
				},
			],
		}).compile();
		service = moduleRef.get<LocationsService>(LocationsService);
	});

	describe("defined", () => {
		it("service is defined", () => {
			console.log(service);
			expect(service).toBeDefined;
		});
	});
});
