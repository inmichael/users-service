import type {
	AccountsServiceClient,
	GetAccountRequest,
} from "@mondocinema/contracts/gen/accounts";
import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import type { ClientGrpc } from "@nestjs/microservices";

@Injectable()
export class AccountClientGrpc implements OnModuleInit {
	private accountService: AccountsServiceClient;

	constructor(
		@Inject("ACCOUNTS_PACKAGE") private readonly client: ClientGrpc,
	) {}

	onModuleInit() {
		this.accountService = this.client.getService("AccountsService");
	}

	getAccount(req: GetAccountRequest) {
		return this.accountService.getAccount(req);
	}
}
