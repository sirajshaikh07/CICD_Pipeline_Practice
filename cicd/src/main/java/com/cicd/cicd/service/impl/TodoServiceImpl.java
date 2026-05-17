package com.cicd.cicd.service.impl;

import com.cicd.cicd.dto.TodoRequest;
import com.cicd.cicd.dto.TodoResponse;
import com.cicd.cicd.entity.Todo;
import com.cicd.cicd.exception.TodoNotFoundException;
import com.cicd.cicd.repository.TodoRepository;
import com.cicd.cicd.service.TodoService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class TodoServiceImpl implements TodoService {

    private final TodoRepository todoRepository;

    @Override
    public TodoResponse createTodo(TodoRequest request) {
        Todo todo = Todo.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .completed(request.isCompleted())
                .build();
        return toResponse(todoRepository.save(todo));
    }

    @Override
    @Transactional(readOnly = true)
    public List<TodoResponse> getAllTodos() {
        return todoRepository.findAll()
                .stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<TodoResponse> getTodosByStatus(boolean completed) {
        return todoRepository.findByCompleted(completed)
                .stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public TodoResponse getTodoById(Long id) {
        return toResponse(findOrThrow(id));
    }

    @Override
    public TodoResponse updateTodo(Long id, TodoRequest request) {
        Todo todo = findOrThrow(id);
        todo.setTitle(request.getTitle());
        todo.setDescription(request.getDescription());
        todo.setCompleted(request.isCompleted());
        return toResponse(todoRepository.save(todo));
    }

    @Override
    public TodoResponse toggleComplete(Long id) {
        Todo todo = findOrThrow(id);
        todo.setCompleted(!todo.isCompleted());
        return toResponse(todoRepository.save(todo));
    }

    @Override
    public void deleteTodo(Long id) {
        Todo todo = findOrThrow(id);
        todoRepository.delete(todo);
    }

    // ─── Helpers ─────────────────────────────────────────────────────────────

    private Todo findOrThrow(Long id) {
        return todoRepository.findById(id)
                .orElseThrow(() -> new TodoNotFoundException(id));
    }

    private TodoResponse toResponse(Todo todo) {
        return TodoResponse.builder()
                .id(todo.getId())
                .title(todo.getTitle())
                .description(todo.getDescription())
                .completed(todo.isCompleted())
                .createdAt(todo.getCreatedAt())
                .updatedAt(todo.getUpdatedAt())
                .build();
    }
}
