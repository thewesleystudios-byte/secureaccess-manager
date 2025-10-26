# SecureAccess Manager – Quick Review

## Pull prebuilt image
# If package is public:
docker pull --platform=linux/amd64 ghcr.io/thewesleystudios-byte/secureaccess-backend:v1.0.2

## (Or) use latest main
docker pull --platform=linux/amd64 ghcr.io/thewesleystudios-byte/secureaccess-backend:main

## Start Postgres (if reviewer doesn't have one)
docker rm -f review-db 2>/dev/null || true
docker run -d --name review-db -p 5432:5432 \
  -e POSTGRES_DB=secureaccess_db \
  -e POSTGRES_USER=secureuser \
  -e POSTGRES_PASSWORD=securepass \
  postgres:15

## Run backend on 8080
docker rm -f review-backend 2>/dev/null || true
docker run -d --name review-backend --platform=linux/amd64 \
  --add-host=host.docker.internal:host-gateway \
  -p 8080:8080 \
  -e SPRING_DATASOURCE_URL=jdbc:postgresql://host.docker.internal:5432/secureaccess_db \
  -e SPRING_DATASOURCE_USERNAME=secureuser \
  -e SPRING_DATASOURCE_PASSWORD=securepass \
  -e SPRING_FLYWAY_ENABLED=false \
  -e JWT_SECRET="sample-demo-secret-change-me" \
  -e JWT_EXPIRATION=86400000 \
  ghcr.io/thewesleystudios-byte/secureaccess-backend:v1.0.2

## Smoke tests
curl -s http://localhost:8080/actuator/health
curl -s http://localhost:8080/v3/api-docs | head -c 300; echo
open http://localhost:8080/swagger-ui || xdg-open http://localhost:8080/swagger-ui

## Create user and login (get JWT)
curl -s -X POST http://localhost:8080/api/auth/register \
  -H 'Content-Type: application/json' \
  -d '{"username":"alice","password":"Password123!"}'

TOKEN=$(curl -s -X POST http://localhost:8080/api/auth/login \
  -H 'Content-Type: application/json' \
  -d '{"username":"alice","password":"Password123!"}' | jq -r .token); echo "$TOKEN"

## Call protected user endpoint
curl -i http://localhost:8080/api/user/profile -H "Authorization: Bearer $TOKEN"

## Admin demo
curl -s -X POST http://localhost:8080/api/auth/register \
  -H 'Content-Type: application/json' \
  -d '{"username":"admin","password":"AdminPassword123!","role":"ADMIN"}'

ADMIN_TOKEN=$(curl -s -X POST http://localhost:8080/api/auth/login \
  -H 'Content-Type: application/json' \
  -d '{"username":"admin","password":"AdminPassword123!"}' | jq -r .token); echo "$ADMIN_TOKEN"

curl -i http://localhost:8080/api/admin/hello -H "Authorization: Bearer $ADMIN_TOKEN"
