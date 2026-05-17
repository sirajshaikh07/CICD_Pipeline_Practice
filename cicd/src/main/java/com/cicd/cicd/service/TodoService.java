package com.cicd.cicd.service;

import com.cicd.cicd.dto.TodoRequest;
import com.cicd.cicd.dto.TodoResponse;

import java.util.List;

public interface TodoService {

    TodoResponse createTodo(TodoRequest request);

    List<TodoResponse> getAllTodos();

    List<TodoResponse> getTodosByStatus(boolean completed);

    TodoResponse getTodoById(Long id);

    TodoResponse updateTodo(Long id, TodoRequest request);

    TodoResponse toggleComplete(Long id);

    void deleteTodo(Long id);
}
