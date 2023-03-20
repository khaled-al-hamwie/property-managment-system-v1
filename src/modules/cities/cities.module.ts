import { Module } from "@nestjs/common";
import { CitiesService } from "./cities.service";

@Module({
	providers: [CitiesService],
})
export class CitiesModule {}
