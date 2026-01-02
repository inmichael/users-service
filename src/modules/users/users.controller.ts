import type {
	CreateUserRequest,
	CreateUserResponse,
	GetMeRequest,
	GetMeResponse,
	PatchUserRequest,
	PatchUserResponse,
} from "@mondocinema/contracts/gen/users";
import { Controller } from "@nestjs/common";
import { GrpcMethod } from "@nestjs/microservices";

import { UsersService } from "./users.service";

@Controller()
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@GrpcMethod("UsersService", "CreateUser")
	async create(data: CreateUserRequest): Promise<CreateUserResponse> {
		await this.usersService.create(data);

		return { ok: true };
	}

	@GrpcMethod("UsersService", "GetMe")
	async getMe(data: GetMeRequest): Promise<GetMeResponse> {
		return await this.usersService.getMe(data);
	}

	@GrpcMethod("UsersService", "PatchUser")
	async patch(data: PatchUserRequest): Promise<PatchUserResponse> {
		return await this.usersService.patchUser(data);
	}
}
