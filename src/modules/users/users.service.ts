import { lastValueFrom } from "rxjs";
import { AccountClientGrpc } from "src/infrastructure/grpc/clients/account.client";

import { RpcStatus } from "@mondocinema/common";
import type {
	CreateUserRequest,
	GetMeRequest,
	PatchUserRequest,
} from "@mondocinema/contracts/gen/users";
import { Injectable } from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";

import { UsersRepository } from "./users.repository";

@Injectable()
export class UsersService {
	constructor(
		private readonly usersRepository: UsersRepository,
		private readonly accountClient: AccountClientGrpc,
	) {}

	async getMe({ id }: GetMeRequest) {
		const profile = await this.usersRepository.findById(id);

		if (!profile) {
			throw new RpcException({
				code: RpcStatus.NOT_FOUND,
				details: "User not found",
			});
		}

		const account = await lastValueFrom(this.accountClient.getAccount({ id }));

		return {
			user: {
				id: profile.id,
				name: profile.name ?? undefined,
				avatar: profile.avatar ?? undefined,
				phone: account.phone,
				email: account.email,
			},
		};
	}

	async create({ id }: CreateUserRequest) {
		return await this.usersRepository.create({ id });
	}

	async patchUser({ userId, name }: PatchUserRequest) {
		const user = await this.usersRepository.findById(userId);

		if (!user) {
			throw new RpcException({
				code: RpcStatus.NOT_FOUND,
				details: "User not found",
			});
		}

		await this.usersRepository.update(user.id, {
			...(name !== undefined && { name }),
		});

		return { ok: true };
	}
}
