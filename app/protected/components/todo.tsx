'use client'
import ReadToDo from "./readToDo"
import CreateToDo from "./createToDo"
import { ToDoProvider} from "../context/todoContext"
import Header from "@/components/Header";

export default function ToDO(){
    return (
        <>
            <Header/>
            <ToDoProvider>
                <div>
                    <ReadToDo/>
                    <CreateToDo/>
                </div>
            </ToDoProvider>
        </>
    )   
}

