import { AccountClientGrpc } from "src/infrastructure/grpc/clients/account.client";

import { PROTO_PATHS } from "@mondocinema/contracts";
import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { TypeOrmModule } from "@nestjs/typeorm";

import { UserEntity } from "./entities/user.entity";
import { UsersController } from "./users.controller";
import { UsersRepository } from "./users.repository";
import { UsersService } from "./users.service";

@Module({
	imports: [
		TypeOrmModule.forFeature([UserEntity]),
		ClientsModule.registerAsync([
			{
				name: "ACCOUNTS_PACKAGE",
				useFactory(configService: ConfigService) {
					return {
						transport: Transport.GRPC,
						options: {
							package: "accounts.v1",
							protoPath: PROTO_PATHS.ACCOUNTS,
							url: configService.getOrThrow<string>("AUTH_GRPC_URL"),
						},
					};
				},
				inject: [ConfigService],
			},
		]),
	],
	controllers: [UsersController],
	providers: [UsersService, UsersRepository, AccountClientGrpc],
})
export class UsersModule {}
