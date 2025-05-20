import type {ClientService} from "@/domain/client/services/ClientService";
import type {Coach} from "@/domain/coach/entities/Coach";

export class AssignCoachToClientUseCase {

    constructor(private clientService: ClientService) {
    }

    async execute(coach: Coach, clientId: string) : Promise<void> {
        await this.clientService.assignCoachToClient(coach, clientId);
    }
}