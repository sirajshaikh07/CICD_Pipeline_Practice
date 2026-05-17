# Project Rules — Todo App (CICD)

## Project Overview
This is a **full-stack Todo application** with:
- **Backend**: Spring Boot 4.0 + Java 21 + PostgreSQL + JPA/Hibernate + Lombok
- **Frontend**: React (Vite) + Vanilla CSS + Axios
- **Database**: PostgreSQL (`todo_db`) on `localhost:5432`

## Project Structure
```
CICD/
├── cicd/                          # Spring Boot backend
│   └── src/main/java/com/cicd/cicd/
│       ├── controller/            # REST controllers (@RestController)
│       ├── service/               # Service interfaces
│       │   └── impl/              # Service implementations
│       ├── repository/            # JPA repositories
│       ├── entity/                # JPA entities
│       ├── dto/                   # Request/Response DTOs
│       ├── exception/             # Custom exceptions
│       └── config/                # Configuration classes (CORS, etc.)
└── todo-frontend/                 # React frontend (Vite)
    └── src/
        ├── api/                   # Axios API service layer
        ├── components/            # Reusable React components
        ├── App.jsx                # Main app component
        ├── App.css                # Component styles
        └── index.css              # Global styles & design tokens
```

## Backend Rules

### Architecture Pattern
- Follow **Controller → Service → Repository** layered architecture
- Controllers handle HTTP only — NO business logic in controllers
- Service layer contains ALL business logic
- Use **interfaces** for services with `impl/` package for implementations
- Use `@RequiredArgsConstructor` (Lombok) for dependency injection — never use `@Autowired`

### Naming Conventions
- Controllers: `{Entity}Controller.java` with `@RequestMapping("/api/{entities}")`
- Services: `{Entity}Service.java` (interface) + `{Entity}ServiceImpl.java`
- Repositories: `{Entity}Repository.java` extending `JpaRepository`
- DTOs: `{Entity}Request.java` and `{Entity}Response.java` — always separate from entities
- Entities: singular name (e.g., `Todo.java`, not `Todos.java`)

### DTOs & Entities
- **NEVER expose JPA entities directly** in API responses — always use DTOs
- Use Lombok (`@Getter`, `@Setter`, `@Builder`, `@NoArgsConstructor`, `@AllArgsConstructor`) on all DTOs and entities
- Use `@Builder` pattern for constructing DTOs in service layer

### API Conventions
- Base path: `/api/{resource}` (plural)
- Use proper HTTP methods: `GET`, `POST`, `PUT`, `PATCH`, `DELETE`
- Return proper HTTP status codes: `201 CREATED`, `204 NO_CONTENT`, `200 OK`
- Wrap responses in `ResponseEntity<>`

### Error Handling
- Create custom exceptions (e.g., `TodoNotFoundException`)
- Use `@RestControllerAdvice` for global exception handling

### Database
- PostgreSQL on `localhost:5432`, database: `todo_db`
- Use `spring.jpa.hibernate.ddl-auto=update` for development
- Entities use `@GeneratedValue(strategy = GenerationType.IDENTITY)` for IDs

### CORS
- CORS is configured in `config/WebConfig.java`
- Frontend origin: `http://localhost:5173`
- If adding new API paths, ensure they are under `/api/**`

## Frontend Rules

### Tech Stack
- React with Vite (plain JavaScript, NOT TypeScript)
- Vanilla CSS — **NO Tailwind, NO CSS-in-JS**
- Axios for API calls
- No state management library (useState/useEffect is sufficient for now)

### Design System
- **Dark mode** theme with indigo/violet palette
- All CSS variables defined in `index.css` under `:root`
- Use CSS variables (`var(--accent-primary)`, etc.) — never hardcode colors
- Font: **Inter** from Google Fonts
- BEM-like naming: `.block__element--modifier`

### Component Rules
- One component per file in `src/components/`
- Components are functional (hooks-based) — no class components
- Props should be destructured in function parameters
- All interactive elements must have unique `id` attributes

### API Layer
- All API calls go through `src/api/todoApi.js`
- Use axios instance with `baseURL: http://localhost:8080/api/todos`
- **No trailing slashes** in API paths (Spring Boot 4.x doesn't match them)
- Handle errors in the component, show toast notifications

### Styling
- Component styles go in `App.css`
- Global reset and tokens go in `index.css`
- Use smooth transitions (`var(--transition-base)`)
- Add hover effects and micro-animations for premium feel
- Mobile-responsive with `@media (max-width: 600px)`

## General Rules
- Always add proper comments for non-obvious logic
- Keep commits small and focused
- Backend runs on port **8080**, frontend on port **5173**
- When adding new features, update both backend AND frontend
