'use client'
import { useState, useEffect} from "react"
import { readAction, deleteAction, createAction, updateAction, updateCheckboxAction } from '@/app/todo/actions'
import { toDoItemsType } from "@/types"
import ReadToDo from "./readToDo"
import CreateToDo from "./createToDo"

const tableHeaderNames=[
    "Task Number",
    "Task Name",
    "Task Priority",
    "Task Completion",
    "Actions"
]

export default function ToDO(){
    //fetching data 
    const [toDoItems, setToDoItems] = useState<toDoItemsType[]>([]);
    const [triggerRefresh, setTriggerRefresh]= useState<boolean>(false)
    const [id, setId]=useState<number>(0)
    const [name, setName]=useState<string>("")
    const [priority, setPriority]=useState<number>(0)
    const [done, setDone]=useState<boolean>(false)
    const [updateTask, setUpdateTask]=useState<toDoItemsType | null>(null)

    useEffect(() => {
        async function fetchData() {
            try {
                const loadedToDoItems = await readAction();
                setToDoItems(loadedToDoItems);
            } catch (error) {
                console.error('Failed to load todo items:', error);
            }
        }
        fetchData();
    }, [triggerRefresh]);

    //delete
    const handleDelete = async (id:number) => {
        await deleteAction(id);
        setTriggerRefresh(prev => !prev)
    };

    //insert
    const handleInsert = async ()=>{
        const newItem = {id, name, priority, done}
        await createAction(newItem)
        setTriggerRefresh(prev=>!prev)
        setName("")
        setPriority(0)
    }

    //update
    const handleUpdate = async (id:number)=>{
        const updatedItem = {id, name, priority, done}
        await updateAction(updatedItem)
        setTriggerRefresh(prev=>!prev)
        setName('')
        setPriority(0)
    }

    //update checkbox only
    const handleCheckboxUpdate = async(id:number, done:boolean )=>{
        await updateCheckboxAction(id, done)
        setTriggerRefresh(prev=>!prev)
    }

    if (toDoItems !== null){
        return (
            <div className="mt-10">
                <h1 className="font-bold text-5xl text-center">To Do Application</h1>      
                {/* read a task */}
                <ReadToDo toDoItems={toDoItems} tableHeaderNames={tableHeaderNames} name={name} priority={priority} setUpdateTask={setUpdateTask} setName={setName} setPriority={setPriority} setDone={setDone}  handleUpdate={handleUpdate} handleDelete={handleDelete} handleCheckboxUpdate={handleCheckboxUpdate}/>

                {/* create a task */} 
                <CreateToDo name={name} priority={priority} setName={setName} setPriority={setPriority} handleInsert={handleInsert}/>
            </div>  
        )
    }
}

