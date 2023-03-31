import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { AdminsModule } from "../admins/admins.module";
import { CredentialsModule } from "../credentials/credentials.module";
import { UsersModule } from "../users/users.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { AdminStrategy } from "./strategy/admin.strategy";
import { LocalStrategy } from "./strategy/local.strategy";
import { UserStrategy } from "./strategy/user.strategy";

@Module({
	imports: [
		CredentialsModule,
		UsersModule,
		AdminsModule,
		PassportModule,
		JwtModule,
	],
	controllers: [AuthController],
	providers: [AuthService, LocalStrategy, UserStrategy, AdminStrategy],
	exports: [AuthService],
})
export class AuthModule {}
