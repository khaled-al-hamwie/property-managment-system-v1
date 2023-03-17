import { CREDENTIAL_REPOSITORY } from "src/core/constants";
import { Credential } from "./credential.entity";

export const credentialsProvider = [
	{
		provide: CREDENTIAL_REPOSITORY,
		useValue: Credential,
	},
];
