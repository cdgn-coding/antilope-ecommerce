format:
	cd frontend && yarn run format:staged

refresh:
	cd infra && pulumi refresh

deploy:
	cd infra && pulumi up

dev--frontend:
	cd frontend && yarn run dev

dev--backend:
	cd backend && go run ./cmd/server/main.go

migrations:
	go run backend/cmd/migrations/main.go

data-factory:
	cd tests && yarn run factory