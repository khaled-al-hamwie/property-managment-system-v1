import { INestApplication } from "@nestjs/common";

export interface metaData {
	app: INestApplication;
	route: string;
	body: any;
	token: string;
}
