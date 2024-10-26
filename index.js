#!/usr/bin/env node
import fs from 'node:fs/promises'
import clc from 'cli-color'
import randomNo from 'randomstring'

const command = process.argv[2]
const getCurrentDate = () => {
    return new Date().toISOString()
}

const getId = randomNo.generate({
    charset: ['l30m'],
    length: 5
})

const Colors = Object.freeze({
    ERROR: clc.redBright,
    SUCCESS: clc.greenBright,
    DELETE: clc.magentaBright
});

let todos;

const filePath = decodeURIComponent(new URL('Docs/tasks.json', import.meta.url).pathname.slice(1))

try {
    todos = JSON.parse(await fs.readFile(filePath, 'utf-8'));

} catch (error) {
    if(error.code === 'ENOENT') {
        await fs.writeFile(filePath, JSON.stringify([]))
        console.log(Colors.SUCCESS(`>>>> Successfully created file 🗃️`))

    } else {
        console.error(Colors.ERROR(`>>>> ERROR: An error occurred somewhere ❌`, error))
    }
}

switch(command) {
    case 'add': {
        const id = getId
        if(todos[id]) {
            throw Error(Colors.ERROR(`>> Todo-CLI: This id ${id} has been taken. Try again for a unique id`))
        }
        await fs.writeFile(filePath, JSON.stringify({
            ...todos,
            [id]: {
                description: process.argv[3],
                status: 'todo',
                createdAt: getCurrentDate(),
                updatedAt: null
            }
        }, null, 2), 'utf-8')
        console.log(Colors.SUCCESS(`>> Todo-CLI: ${process.argv[3]} task has been successfully created with a unique id of '${id}' `))
        break;
    }

    case 'update': {
        const id = process.argv[3]

        if(!todos[id]) {
            console.error(Colors.ERROR(`>> Todo-CLI: Task with this ${id} does not exist`))
            break;
        }

        todos[id].description = process.argv[4]
        todos[id].updatedAt = getCurrentDate()

        await fs.writeFile(filePath, JSON.stringify(todos, null, 2), 'utf-8')
        console.log(Colors.SUCCESS(`>> Todo-CLI: Successfully updated task with id of '${id}' at ${todos[id].updatedAt}`))
        break;
    }

    case 'delete': {
        const id = process.argv[3]

        if(!todos[id]) {
            console.error(Colors.ERROR(`>> Todo-CLI: Todo with this ${id} does not exist`))
            break;
        }

        delete todos[id]

        await fs.writeFile(filePath, JSON.stringify(todos, null, 2), 'utf-8')
        console.log(Colors.DELETE(`Todo-CLI: Successfully Deleted todo of ${id}`))
        break;
    }

    case 'deleteAll': {
        await fs.unlink(filePath)
        console.log(Colors.DELETE(`Todo-CLI: Successfully Deleted All Tasks. Please initialize todo-cli before creating another task`))
        break;
    }

    case 'done':
    case 'in-progress': {
        const id = process.argv[3]

        if(!todos[id]) {
            console.error(Colors.ERROR(`>> Todo-CLI: Todo with this ${id} does not exist`))
            break;
        }
        if (command === 'done') {
            todos[id].status = 'done';
        } else if (command === 'in-progress') {
            todos[id].status = 'in-progress';
        }

        await fs.writeFile(filePath, JSON.stringify(todos, null, 2), 'utf-8')
        console.log(Colors.SUCCESS(`>> Todo-CLI: Task of ID "${id}" status has been changed to "${command}"`))
        break;
    }

    case 'listAll': {
       console.log(Colors.SUCCESS(`Todo-CLI: All Tasks: ⬇️`))
       console.log(todos)
       break;
    }

    case 'filterTasks': {

        const filteredTask = {}

        for(const key in todos) {
            const todo = todos[key]
            if(todo.status === process.argv[3]) {
                filteredTask[key] = todo
            }
        }

        console.log(filteredTask)
        break;
    }

}