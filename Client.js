'use strict'

const Store = require('./store')
const store = new Store()

class Client {

     constructor(login, password, email){
        let user = {
            login: login,
            password: password,
            email: email,
            id: 0
            }
        this.user = user
        this.todoList = []
    }

     async checkUser() {
        if (this.user.email === undefined) await this.getUser(this.user.login, this.user.password)
        else await this.postUser(this.user.login, this.user.password, this.user.email)
    }

    async getUser(login, password) {
        await store.getUser(login).then(res => {
            if (res.data.success) {
                //console.log(res.data)
                if (res.data.user.password === password) {
                    this.user.id =  res.data.user.id
                    this.user.email = res.data.user.email
                    this.getTodoList()
                } else throw new Error('Пароль введен не верно!')
            } else {throw new Error('Пользователя с таким логином не существует!')}
        }).catch(e => {
            console.log(e)
        })
    }

    async postUser(login, password, email) {
        let elem = {
            "login": login, 
            "password": password, 
            "email": email
        }
        let data = JSON.stringify(elem)
        await store.postUser(data).then(res =>{
            //console.log(res.data)
            if (res.data.seccess){
                this.user = res.data.user
            } else throw new Error('Пользователь не создан!')
        }).catch(e => {
            console.log(e)
        })
    }

    async postTodoList(heading, textTask, date, completed) {
         if (this.user){
            let elem = {
                heading: heading,
                textTask: textTask,
                date: date,
                completed: completed,
                idUser: this.user.id
             }
            let data = JSON.stringify(elem)
            await store.postTodoList(data).then(res => {
                //console.log(res.data)
                this.todoList.push(res.data.todoList)
            }).catch(e => {
                console.log(e)
            })
         }
    }

    async putTodoList(id, heading, textTask, date, completed) {
         if (this.user){
            let elem = {
                id: id,
                heading: heading,
                textTask: textTask,
                date: date,
                completed: completed,
                idUser: this.user.id
            }
            let data = JSON.stringify(elem)
            await store.putTodoList(data).then(res => {
                //console.log(res.data)
                this.getTodoList()
            }).catch(e => {
                console.log(e)
            })
         }
    }

    async deleteTodoList(id) {
        await store.deleteTodoList(id).then(res => {
            console.log(res.data)
            this.getTodoList()
        }).catch(e => {
            console.log(e)
        })
    }

    async getTodoList(){
        if (this.user.id){
            await store.getTodoList(this.user.id).then(res => {
                if (res.data.success) {
                    this.todoList = res.data.todoList
                } else this.todoList = []
                //console.log(this.todoList)
            }).catch(e => {
                console.log(e)
            })
        }
    }

    async getUserTodoList (){
        return this.todoList
    }

    async printTodoList (){
        await this.getTodoList()
        await new Promise(() => {
            console.log("Todo list for a user with a login " + '"' + this.user.login + '"')
            for (let task of this.todoList){
                console.log('-----------------------')
                console.log(task.heading + '\n' + "text: " + task.textTask + '\n' + "date: " + task.date + '\n' + (task.completed === "true" ? 'Done!' : 'No done!'))
                console.log('-----------------------')
            }
        })
    }
}

module.exports = Client