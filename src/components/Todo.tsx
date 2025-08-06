"use client"
import {trpc} from "@/app/_trpc/client"
import React from "react"

const Todo = () => {
  const todos = trpc.getToDos.useQuery()
  console.log("bruh", todos)
  return <div>{todos.data ? JSON.stringify(todos.data) : "Loading..."}</div>
}

export default Todo
