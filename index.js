'use strict'

const Client = require('./Client')


main()

async function main(){
    //Регистрация или вход (если email === null)
    var user = new Client("login", "Login123")
    await user.checkUser()

    //Создание задачи
    let date = new Date()
    //await user.postTodoList("Task1", "text Task1", date, "false")

    //Изменение задачи
    date = new Date()
    //await user.putTodoList(3, "Task1", "text Task1", date, "true")

    //Вывод задач
    await user.printTodoList()

    //Удаление задачи
    //await user.deleteTodoList(1) 

}