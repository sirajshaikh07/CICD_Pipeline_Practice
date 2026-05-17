package com.cicd.cicd.controller;

import com.cicd.cicd.dto.TodoRequest;
import com.cicd.cicd.dto.TodoResponse;
import com.cicd.cicd.service.TodoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/todos")
@RequiredArgsConstructor
public class TodoController {

    private final TodoService todoService;

    // POST /api/todos
    @PostMapping
    public ResponseEntity<TodoResponse> create(@RequestBody TodoRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(todoService.createTodo(request));
    }

    // GET /api/todos
    @GetMapping
    public ResponseEntity<List<TodoResponse>> getAll(
            @RequestParam(required = false) Boolean completed) {
        if (completed != null) {
            return ResponseEntity.ok(todoService.getTodosByStatus(completed));
        }
        return ResponseEntity.ok(todoService.getAllTodos());
    }

    // GET /api/todos/{id}
    @GetMapping("/{id}")
    public ResponseEntity<TodoResponse> getById(@PathVariable Long id) {
        return ResponseEntity.ok(todoService.getTodoById(id));
    }

    // PUT /api/todos/{id}
    @PutMapping("/{id}")
    public ResponseEntity<TodoResponse> update(
            @PathVariable Long id,
            @RequestBody TodoRequest request) {
        return ResponseEntity.ok(todoService.updateTodo(id, request));
    }

    // PATCH /api/todos/{id}/toggle
    @PatchMapping("/{id}/toggle")
    public ResponseEntity<TodoResponse> toggle(@PathVariable Long id) {
        return ResponseEntity.ok(todoService.toggleComplete(id));
    }

    // DELETE /api/todos/{id}
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        todoService.deleteTodo(id);
        return ResponseEntity.noContent().build();
    }
}
