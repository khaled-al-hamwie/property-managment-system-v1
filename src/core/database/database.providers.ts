import { DynamicModule } from "@nestjs/common";
import { SequelizeModule, SequelizeModuleOptions } from "@nestjs/sequelize";
import { Admin } from "src/modules/admins/admin.entity";
import { City } from "src/modules/cities/city.entity";
import { Comment } from "src/modules/comments/entities/comment.entity";
import { Country } from "src/modules/countries/country.entity";
import { Credential } from "src/modules/credentials/credential.entity";
import { Location } from "src/modules/locations/location.entity";
import { Post } from "src/modules/posts/post.entity";
import { PropertyType } from "src/modules/property-types/property-type.entity";
import { Property } from "src/modules/property/property.entity";
import { User } from "src/modules/users/user.entity";
import { DEVELOPMENT, PRODUCTION, TEST } from "../constants";
import { databaseConfig } from "./database.config";

let config: SequelizeModuleOptions;
switch (process.env.NODE_ENV) {
	case DEVELOPMENT:
		config = databaseConfig.development;
		break;
	case TEST:
		config = databaseConfig.test;
		break;
	case PRODUCTION:
		config = databaseConfig.production;
		break;
	default:
		config = databaseConfig.development;
}
export const databaseProvider: DynamicModule = SequelizeModule.forRoot({
	...config,
	models: [
		Credential,
		User,
		Admin,
		Country,
		City,
		Location,
		PropertyType,
		Property,
		Post,
		Comment,
	],
	// sync: {
	// 	force: true,
	// },
});
