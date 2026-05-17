# Skill: Run & Deploy the Application

Use this skill when the user wants to run, build, or deploy the application.

## Local Development

### Start Backend (Spring Boot)
```bash
# From cicd/ directory
./mvnw spring-boot:run
```
- Runs on `http://localhost:8080`
- Uses `spring-boot-devtools` for auto-restart on code changes
- Requires PostgreSQL running on port 5432

### Start Frontend (React + Vite)
```bash
# From todo-frontend/ directory
npm run dev
```
- Runs on `http://localhost:5173`
- Hot Module Replacement (HMR) enabled — changes reflect instantly

### Start Both Together
1. Open terminal 1: Start backend from `cicd/`
2. Open terminal 2: Start frontend from `todo-frontend/`

## Production Build

### Backend
```bash
# From cicd/ directory
./mvnw clean package -DskipTests
# JAR will be in cicd/target/cicd-0.0.1-SNAPSHOT.jar
java -jar target/cicd-0.0.1-SNAPSHOT.jar
```

### Frontend
```bash
# From todo-frontend/ directory
npm run build
# Output will be in todo-frontend/dist/
```

## Database Setup
```sql
-- In PostgreSQL (psql)
CREATE DATABASE todo_db;
```
- Hibernate auto-creates tables via `ddl-auto=update`
- Connection: `jdbc:postgresql://localhost:5432/todo_db`
- User: `postgres`, Password: configured in `application.properties`

## Docker (Future)
When containerizing:
- Backend: Java 21 base image, expose port 8080
- Frontend: Nginx base image serving `dist/`, expose port 80
- Database: PostgreSQL 18+ image, expose port 5432
- Use `docker-compose.yaml` (already exists in `cicd/compose.yaml`)

## CI/CD (Future)
- Build backend with Maven
- Build frontend with `npm run build`
- Run tests: `./mvnw test` + `npm test`
- Deploy JAR + static files to target environment
