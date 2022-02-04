format:
	cd frontend && yarn run format:staged

refresh-infra:
	cd infraestructure && pulumi refresh

deploy-infra:
	cd infraestructure && pulumi up

dev-frontend:
	cd frontend && yarn run dev

dev-backend:
	cd backend && go run ./cmd/server/main.go

migrations:
	go run backend/cmd/migrations/main.go

data-factory:
	cd tests && yarn run factory

storybook:
	cd frontend && yarn run storybook

test:
	cd frontend && yarn run test