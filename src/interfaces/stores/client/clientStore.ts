import {defineStore} from "pinia";
import type {Client} from "@/domain/client/entities/Client";

export const useClientStore = defineStore('client', {
    state: () => ({
        clients: [] as Client[],
        loading: false,
        error: null as string |null
    }),
    actions: {
        async fetchClients() {
            try {

            } catch(error) {

            } finally {

            }
        }
    }
})