# Task-CLI

#### This is a lightweight application that enables the user to perform CRUD Operations using the terminal.

## Installation

1. First run `npm install` to install the missing dependencies
2. Link the program using `npm link`

## Usage

1. Add a task by using: 
   ```
     todo-cli add "Bread"
   ```
2. Delete a task by using: 
    ```
      todo-cli delete {id}
    ```
3. Delete all tasks:
     ```
      todo-cli deleteAll
    ```
   - But after you do this, always initialize `todo-cli` before adding a new task.


4. Update a task:
     ```
      todo-cli update {id}
    ```

5. Mark a task as `done` or `in-progress`:
     ```
      todo-cli {done/in-progress} {id}
    ```
6. List all tasks:
     ```
      todo-cli delete {id}
    ```
   
7.  Filter tasks by statuses `done`, `todo` and `in-progress`
     ```
      todo-cli filterTasks {status}
    ```
    
