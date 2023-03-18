import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Credential } from "./credential.entity";
import { CredentialsService } from "./credentials.service";

@Module({
	imports: [SequelizeModule.forFeature([Credential])],
	providers: [CredentialsService],
	exports: [CredentialsService],
})
export class CredentialsModule {}
