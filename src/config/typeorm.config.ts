import { UserEntity } from "src/modules/users/entities/user.entity";

import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export function getTypeOrmConfig(
	configService: ConfigService,
): TypeOrmModuleOptions {
	return {
		type: "postgres",
		host: configService.getOrThrow("DATABASE_HOST"),
		port: configService.getOrThrow("DATABASE_PORT"),
		username: configService.getOrThrow("DATABASE_USERNAME"),
		password: configService.getOrThrow("DATABASE_PASSWORD"),
		database: configService.getOrThrow("DATABASE_NAME"),
		synchronize: configService.getOrThrow("DATABASE_SYNC") === "true",
		logging: configService.getOrThrow("DATABASE_LOGGING") === "true",
		entities: [UserEntity],
	};
}
