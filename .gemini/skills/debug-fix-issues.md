# Skill: Debug & Fix Issues

Use this skill when something is broken — API errors, build failures, or UI bugs.

## Diagnosis Steps

### Backend Not Responding (4xx/5xx)
1. Check the Spring Boot terminal for error stack traces
2. Common issues:
   - **404 NoResourceFoundException**: Trailing slash mismatch — remove trailing `/` from API calls
   - **500 NullPointerException**: Missing `@Service` or `@Repository` annotation
   - **CORS error in browser**: Check `config/WebConfig.java` — ensure frontend origin `http://localhost:5173` is allowed
   - **Database connection refused**: Ensure PostgreSQL is running on port `5432`, database `todo_db` exists

### Frontend Not Loading
1. Check browser console (F12) for errors
2. Check Vite terminal for compilation errors
3. Common issues:
   - **Import errors**: Verify file paths are correct (case-sensitive on Linux)
   - **Axios network error**: Backend not running, or CORS not configured
   - **Blank page**: Check `main.jsx` imports and `index.html` script tag

### Build Failures
1. **Backend (Maven)**:
   - Run `./mvnw clean compile` from `cicd/` directory
   - Check for missing imports, Lombok issues
   - Ensure Java 21 is being used

2. **Frontend (Vite)**:
   - Run `npm run build` from `todo-frontend/`
   - Check for JSX syntax errors, missing dependencies

## Port Reference
| Service     | Port  |
|-------------|-------|
| Spring Boot | 8080  |
| React (Vite)| 5173  |
| PostgreSQL  | 5432  |

## Quick Fixes
- **Trailing slash 404**: Change `API.get('/')` → `API.get('')` in axios calls
- **Lombok not working**: Ensure annotation processor is configured in `pom.xml`
- **Hot reload not working**: Backend uses `spring-boot-devtools`, frontend uses Vite HMR
