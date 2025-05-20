import type {ClientRepositoryInterface} from "@/domain/client/interfaces/ClientRepositoryInterface";
import type {Coach} from "@/domain/coach/entities/Coach";

export class ClientService {
    constructor(private clientRepository: ClientRepositoryInterface) {
    }

    async assignCoachToClient(coach: Coach, clientId: string) {

        const client = this.clientRepository.findById(clientId);

        if (!client) {
            throw new Error('Client not found');
        }

        // Put assign coach to client logic below
    }
}