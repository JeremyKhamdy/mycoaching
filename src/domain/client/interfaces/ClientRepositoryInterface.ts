import type {Client} from "@/domain/client/entities/Client";

export interface ClientRepositoryInterface {
    getAll(): Promise<Client[]>;
    findById(id: string): Promise<Client>;
    save(client: Client): Promise<void>;
    update(client: Client): Promise<Client>;
    remove(client: Client): Promise<void>;
}