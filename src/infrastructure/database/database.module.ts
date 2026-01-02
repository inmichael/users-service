import { getTypeOrmConfig } from "src/config/typeorm.config";

import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
	imports: [
		TypeOrmModule.forRootAsync({
			useFactory: getTypeOrmConfig,
			inject: [ConfigService],
		}),
	],
})
export class DatabaseModule {}
