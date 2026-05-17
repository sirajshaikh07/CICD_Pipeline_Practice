# Skill: Add New CRUD Entity

Use this skill when the user asks to add a new entity/feature to the backend.

## Steps

1. **Create the Entity** in `cicd/src/main/java/com/cicd/cicd/entity/`
   - Annotate with `@Entity`, `@Table`, `@Getter`, `@Setter`, `@NoArgsConstructor`, `@AllArgsConstructor`, `@Builder`
   - Use `@Id` + `@GeneratedValue(strategy = GenerationType.IDENTITY)`
   - Add `@CreationTimestamp` and `@UpdateTimestamp` for audit fields

2. **Create DTOs** in `cicd/src/main/java/com/cicd/cicd/dto/`
   - `{Entity}Request.java` — fields the client sends
   - `{Entity}Response.java` — fields the client receives (includes id, timestamps)

3. **Create Repository** in `cicd/src/main/java/com/cicd/cicd/repository/`
   - Extend `JpaRepository<Entity, Long>`
   - Add custom query methods as needed

4. **Create Service Interface** in `cicd/src/main/java/com/cicd/cicd/service/`
   - Define CRUD method signatures

5. **Create Service Implementation** in `cicd/src/main/java/com/cicd/cicd/service/impl/`
   - Annotate with `@Service` + `@RequiredArgsConstructor`
   - Map between entities and DTOs using `@Builder`
   - Throw custom exceptions for not-found cases

6. **Create Controller** in `cicd/src/main/java/com/cicd/cicd/controller/`
   - Annotate with `@RestController`, `@RequestMapping("/api/{entities}")`, `@RequiredArgsConstructor`
   - Standard endpoints: `POST /`, `GET /`, `GET /{id}`, `PUT /{id}`, `DELETE /{id}`
   - Return proper `ResponseEntity` with HTTP status codes

7. **Create Custom Exception** in `cicd/src/main/java/com/cicd/cicd/exception/`
   - Extend `RuntimeException`

8. **Update CORS** if the new API uses a different base path (unlikely — keep under `/api/**`)

## Template: Entity
```java
@Entity
@Table(name = "{entities}")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class {Entity} {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // fields here

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;
}
```

## Template: Controller
```java
@RestController
@RequestMapping("/api/{entities}")
@RequiredArgsConstructor
public class {Entity}Controller {
    private final {Entity}Service {entity}Service;

    @PostMapping
    public ResponseEntity<{Entity}Response> create(@RequestBody {Entity}Request request) {
        return ResponseEntity.status(HttpStatus.CREATED).body({entity}Service.create(request));
    }

    @GetMapping
    public ResponseEntity<List<{Entity}Response>> getAll() {
        return ResponseEntity.ok({entity}Service.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<{Entity}Response> getById(@PathVariable Long id) {
        return ResponseEntity.ok({entity}Service.getById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<{Entity}Response> update(@PathVariable Long id, @RequestBody {Entity}Request request) {
        return ResponseEntity.ok({entity}Service.update(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        {entity}Service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
```
