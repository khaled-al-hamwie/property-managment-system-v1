import { Module } from "@nestjs/common";
import { credentialsProvider } from "./credentials.provider";
import { CredentialsService } from "./credentials.service";

@Module({
	providers: [...credentialsProvider, CredentialsService],
	exports: [CredentialsService],
})
export class CredentialsModule {}
