'use strict'

const http = require("./config")

class store {
    getUsers () {
        return http.get("/users")
    }

    getUser(login) {
        let params = {login: login}
        return http.get('/user', {params})
    }

    postUser(data) {
        return http.post('/user', data)
    }

    getTodoList(id) {
        let params = {id: id}
        return http.get('/todoList', {params})
    }

    postTodoList(data){
        return http.post('/todoList', data)
    }

    putTodoList(data){
        return http.put('/todoList', data)
    }

    deleteTodoList(id) {
        let params = {id: id}
        return http.delete('/todoList', {params})
    }
}

module.exports = store