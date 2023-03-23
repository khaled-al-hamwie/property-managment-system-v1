import { getModelToken } from "@nestjs/sequelize";
import { Test } from "@nestjs/testing";
import { CitiesService } from "../cities/cities.service";
import { City } from "../cities/city.entity";
import { CountriesService } from "../countries/countries.service";
import { Country } from "../countries/country.entity";
import { Location } from "./location.entity";
import { LocationsService } from "./locations.service";

describe("location service int", () => {
	let service: LocationsService;

	beforeEach(async () => {
		const moduleRef = await Test.createTestingModule({
			providers: [
				LocationsService,
				CountriesService,
				CitiesService,
				{
					provide: getModelToken(Location),
					useValue: { create: jest.fn((x) => x) },
				},
				{
					provide: getModelToken(Country),
					useValue: {
						findByPk: jest.fn((x) => {
							return x == 1 ? true : false;
						}),
					},
				},
				{
					provide: getModelToken(City),
					useValue: {
						findByPk: jest.fn((x) => {
							return x == 1 ? true : false;
						}),
					},
				},
			],
		}).compile();
		service = moduleRef.get<LocationsService>(LocationsService);
	});

	describe("defined", () => {
		it("service is defined", () => {
			expect(service).toBeDefined;
		});
	});
	describe("Create", () => {
		it("should return a location", async () => {
			let location = await service.create({
				city_id: 1,
				country_id: 1,
				place: "some where in syria",
			});
			expect(location).not.toBeNull();
		});
		it("should throw city invalid", async () => {
			try {
				let location = await service.create({
					city_id: 2,
					country_id: 1,
					place: "some where in syria",
				});
			} catch (error) {
				expect(error.message).toEqual("city_id unvalid city");
			}
		});

		it("should throw country invalid", async () => {
			try {
				let location = await service.create({
					city_id: 1,
					country_id: 2,
					place: "some where in syria",
				});
			} catch (error) {
				expect(error.message).toEqual("country_id unvalid country");
			}
		});
	});
});
