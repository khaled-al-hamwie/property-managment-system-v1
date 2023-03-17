import { Module } from "@nestjs/common";
import { CredentialsModule } from "../credentials/credentials.module";
import { UsersModule } from "../users/users.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Module({
	imports: [CredentialsModule, UsersModule],
	controllers: [AuthController],
	providers: [AuthService],
})
export class AuthModule {}
