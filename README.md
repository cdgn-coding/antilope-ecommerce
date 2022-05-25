# Antilope Ecommerce

This repository contains an ecommerce system developed
as a project for the university course of informatics seminar.
Some requirements of this project are

- Have an API for product stock and sales administration
- Accept payments via credit and debit card
- Allow user registration
- Capability of buying a sole product or a cart of them
- Explore products by name and category

A more extensive documentation of the context and design of this project
can be found [here](https://docs.google.com/document/d/1hI4huRD1ojuUk7dDCXsh_FNm9_rkRrWt/edit?usp=sharing&ouid=104504820085978477639&rtpof=true&sd=true) (spanish language only).

## Development

Antilope Ecommerce is developed with the following tech stack

- Kubernetes
- Golang
  - gorilla/mux
  - gorm
- Typescript
  - Next.js
  - Storybook
  - React
- AWS
  - Dynamodb
  - RDS (PostgreSQL)
- GitHub Actions

### Project structure

```
📦docs
 // Entity-relation, usecases, and state diagrams.
 ┣ 📂diagrams
 // Screenshots of the functioning app
 ┣ 📂screns
📦.github
📦backend
 ┣ 📂cmd
 ┃ ┣ 📂migrations
 ┃ ┃ ┗ 📜main.go
 ┃ ┗ 📂server
 ┃ ┃ ┗ 📜main.go
 ┣ 📂src
 ┃ ┣ 📂carts
 ┃ ┣ 📂mercadopago
 ┃ ┣ 📂products
 ┃ ┣ 📂purchases
📦frontend
 ┣ 📂pages
 ┣ 📂src
 ┃ ┣ 📂components
 ┃ ┣ 📂constants
 ┃ ┣ 📂hooks
 ┃ ┣ 📂models
 ┃ ┣ 📂services
// Creates necessary resources in AWS
📦infraestructure
 ┣ 📂k8
 ┣ 📂frontend
 ┣ 📂backend
// Build, push and deploy cluster services
📦workload
 ┣ 📂frontend
 ┣ 📂backend
```

### How to run

#### Locally

The project is shipped with docker-compose for the cloud services
using localstack and postgresql, and also includes a Makefile with common procedures to run and deploy.

You should create an account in MercadoPago developers and Auth0 in order to run locally. Remember to configure local .env files.

- Run `docker-compose up`
- Run `make deploy-infra` and select the `dev` environment
- Run `make dev-backend` and `make migration`
- Run `make dev-frontend`

#### In the cloud

Make sure to login with Pulumi and AWS before trying to deploy to the cloud.

- Select `prod` as the environment

```
pulumi stack select prod
```

- Set database password secret inside `infrastructure` package.

`pulumi config set --secret dbPassword mySecretPasswordH3H3`

- Set Auth0 secrets inside `workload`. Remember to select `prod`

```
pulimi config set --secret auth0ClientId myClientIdProvidedByAuth0
pulimi config set --secret auth0ClientSecret myClientSecretProvidedByAuth0
pulimi config set --secret auth0Secret mySecretGeneratedRandomlyHehe
pulumi config set --secret mercadopagoAccessToken myAccessTokenGivenByMercadoPagoAPI
pulumi config set --secret mercadopagoPublicKey myPublicKeyGivenByMercadoPagoPortal
```

- Deploy the services just like before.

```
cd infraestructure && pulumi up -y
```

- The final step is to deploy the workload to the kubernetes cluster

```
cd workload && pulumi up -y
```

That command will output the URLs of the load balancers (backend and frontend).
The frontend is automatically connected to the backend with an environment variable,
and the URL can be mapped to a domain using an A record within a Hosted Zone.

## License

   Copyright 2021 Carlos David Gonzalez Nexans

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
