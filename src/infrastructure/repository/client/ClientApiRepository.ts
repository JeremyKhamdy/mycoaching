import type { ClientRepositoryInterface } from '@/domain/client/interfaces/ClientRepositoryInterface'
import { Client } from '@/domain/client/entities/Client'

export class ClientApiRepository implements ClientRepositoryInterface {
  constructor() {}

  findById(id: string): Promise<Client> {
    const client = new Client(id, 'test')
    return Promise.resolve(client)
  }

  getAll(): Promise<Client[]> {
    return Promise.resolve([])
  }

  remove(client: Client): Promise<void> {
    return Promise.resolve(undefined)
  }

  save(client: Client): Promise<void> {
    return Promise.resolve(undefined)
  }

  update(client: Client): Promise<Client> {
    return Promise.resolve(client)
  }
}
