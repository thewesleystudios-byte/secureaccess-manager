`docker compose up -d`
Swagger: http://localhost:8080/swagger-ui
Health:  `curl -s http://localhost:8080/actuator/health`
docker run -d --name secureaccess-backend-standalone \
  --platform=linux/amd64 \
  --network secureaccess-manager_default \
  -p 8081:8080 \
  -e SPRING_DATASOURCE_URL=jdbc:postgresql://secureaccess-db:5432/secureaccess_db \
  -e SPRING_DATASOURCE_USERNAME=secureuser \
  -e SPRING_DATASOURCE_PASSWORD=securepass \
  -e SPRING_FLYWAY_ENABLED=false \
  -e JWT_SECRET="change-me-super-long-random-string" \
  -e JWT_EXPIRATION=86400000 \
  ghcr.io/thewesleystudios-byte/secureaccess-backend:main
