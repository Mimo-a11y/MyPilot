
#!/bin/bash

# Stop if any command fails
set -e

# Navigate to the backend directory
cd "$(dirname "$0")"

# Load environment variables from .env
set -a
source .env
set +a

# Make sure required credentials are present
: "${GITHUB_CLIENT_ID:?Missing GITHUB_CLIENT_ID in .env}"
: "${GITHUB_CLIENT_SECRET:?Missing GITHUB_CLIENT_SECRET in .env}"
: "${DB_PASSWORD:?Missing DB_PASSWORD in .env}"
: "${TOKEN_ENCRYPTOR_PASSWORD:?Missing DB_PASSWORD in .env}"
: "${TOKEN_ENCRYPTOR_SALT:?Missing DB_PASSWORD in .env}"
: "${CLOUDFLARE_ACCOUNT_ID:?Missing DB_PASSWORD in .env}"
: "${CLOUDFLARE_API_TOKEN:?Missing DB_PASSWORD in .env}"

# Start Spring Boot
exec ./mvnw spring-boot:run
