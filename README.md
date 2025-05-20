# Boilerplate Vite + Vue 3 + Typescript --- DDD / Clean architecture ---
Vue 3 project structure using a mix of DDD design pattern and clean architecture to let the application be the most modular and flexible possible.

# Technologies

- Vite
- Vue 3
- Typescript
- Pinia
- Cypress
- Docker

# Application structure

This application follow the DDD design pattern and clean architecture, the main reason to this structure is to use the power of DDD design pattern concept to use separate domain and encapsulates logic in each domain. Using this will let the application be more modular and more flexible, and will let future improvements or new features be easily incorporated. It will facilitate the maintenance and evolution of the application.

## Structure

- Domain : Contains all the business logic for the application (entities, repository interface, services).
- Application : useCase for each domain, make call from domain service.
- Infrastructure : Contains http and database connection + repository.
- Interfaces : Contains all the application interfaces like ui, components, views, stores.