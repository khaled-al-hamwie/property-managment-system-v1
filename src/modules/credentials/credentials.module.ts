import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { UsersModule } from "../users/users.module";
import { UsersService } from "../users/users.service";
import { Credential } from "./credential.entity";
import { CredentialsService } from "./credentials.service";

@Module({
	imports: [SequelizeModule.forFeature([Credential]), UsersModule],
	providers: [CredentialsService],
	exports: [CredentialsService],
})
export class CredentialsModule {}
