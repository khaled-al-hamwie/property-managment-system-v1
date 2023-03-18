import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { CredentialsModule } from "../credentials/credentials.module";
import { UsersModule } from "../users/users.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { LocalStrategy } from "./strategy/local.strategy";

@Module({
	imports: [CredentialsModule, UsersModule, PassportModule],
	controllers: [AuthController],
	providers: [AuthService, LocalStrategy],
})
export class AuthModule {}
