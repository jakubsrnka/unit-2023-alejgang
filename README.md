# UnIT alejgang 😎

# Setup git hooks

- `git config core.hooksPath .githooks`

## Start the application

- `docker compose up -d`

## Run all tests

- `.githooks/pre-commit`

# Generate PocketBase types

- `docker compose exec app yarn run typegen`
