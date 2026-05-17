# Skill: Add Spring AI Feature

Use this skill when the user wants to add AI capabilities to the Todo app.

## Prerequisites
- Spring AI dependencies in `pom.xml` (see below)
- AI provider configured (OpenAI API key or Ollama running locally)

## Steps

### 1. Add Dependencies to `pom.xml`
```xml
<!-- Spring AI BOM -->
<dependencyManagement>
  <dependencies>
    <dependency>
      <groupId>org.springframework.ai</groupId>
      <artifactId>spring-ai-bom</artifactId>
      <version>1.0.0</version>
      <type>pom</type>
      <scope>import</scope>
    </dependency>
  </dependencies>
</dependencyManagement>

<!-- Choose ONE provider -->
<!-- OpenAI -->
<dependency>
  <groupId>org.springframework.ai</groupId>
  <artifactId>spring-ai-openai-spring-boot-starter</artifactId>
</dependency>

<!-- OR Ollama (free, local) -->
<dependency>
  <groupId>org.springframework.ai</groupId>
  <artifactId>spring-ai-ollama-spring-boot-starter</artifactId>
</dependency>

<!-- Vector Store (optional, for semantic search) -->
<dependency>
  <groupId>org.springframework.ai</groupId>
  <artifactId>spring-ai-pgvector-store-spring-boot-starter</artifactId>
</dependency>
```

### 2. Configure in `application.properties`
```properties
# For OpenAI
spring.ai.openai.api-key=${OPENAI_API_KEY}
spring.ai.openai.chat.options.model=gpt-4o-mini

# For Ollama
spring.ai.ollama.base-url=http://localhost:11434
spring.ai.ollama.chat.options.model=llama3
```

### 3. Create AI Service
```java
@Service
@RequiredArgsConstructor
public class AIService {
    private final ChatClient.Builder chatClientBuilder;

    public String chat(String userMessage) {
        ChatClient chatClient = chatClientBuilder.build();
        return chatClient.prompt()
            .user(userMessage)
            .call()
            .content();
    }
}
```

### 4. Create AI Controller
```java
@RestController
@RequestMapping("/api/ai")
@RequiredArgsConstructor
public class AIController {
    private final AIService aiService;

    @PostMapping("/chat")
    public ResponseEntity<Map<String, String>> chat(@RequestBody Map<String, String> request) {
        String response = aiService.chat(request.get("message"));
        return ResponseEntity.ok(Map.of("response", response));
    }
}
```

### 5. Update CORS Config
- Ensure `/api/**` pattern covers the new `/api/ai/**` endpoints (already done)

### 6. Add Frontend Chat Component
- Create `src/components/AIChatPanel.jsx`
- Create `src/api/aiApi.js` with axios calls to `/api/ai/chat`
- Add chat panel to `App.jsx` with toggle button

## Feature Templates

### Natural Language Task Parsing
Use **Structured Output** to convert natural language into `TodoRequest`:
```java
public TodoRequest parseTask(String naturalLanguage) {
    return chatClient.prompt()
        .user("Extract a task from: " + naturalLanguage)
        .call()
        .entity(TodoRequest.class);
}
```

### Auto-Categorization
```java
public String categorize(String taskTitle) {
    return chatClient.prompt()
        .system("Categorize this task into: Work, Personal, Shopping, Health, Finance, Other")
        .user(taskTitle)
        .call()
        .content();
}
```

### Tool Calling (Agent)
```java
@Tool(description = "Create a new todo task")
public TodoResponse createTask(String title, String description) {
    return todoService.createTodo(new TodoRequest(title, description, false));
}
```
