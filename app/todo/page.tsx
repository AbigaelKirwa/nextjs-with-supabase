'use client'
import { useState, useEffect, ChangeEvent} from "react"
import { Button } from "@/components/ui/button"
import { readAction, deleteAction, createAction, updateAction } from '@/app/todo/actions'
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogHeader, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { toDoItemsType } from "@/types"
import ReadToDo from "./readToDo"

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
        await deleteAction({id});
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
        const updatedName = name === '' && updateTask ? updateTask.name : name
        const updatedItem = {id, name:updatedName, priority, done}
        await updateAction(updatedItem)
        setTriggerRefresh(prev=>!prev)
        setName('')
        setPriority(0)
    }

    if (toDoItems !== null){
        return (
            <div className="mt-10">
                <h1 className="font-bold text-5xl text-center">To Do Application</h1>      
                <ReadToDo toDoItems={toDoItems} tableHeaderNames={tableHeaderNames} name={name} priority={priority} setUpdateTask={setUpdateTask} setName={setName} setPriority={setPriority} setDone={setDone} handleUpdate={handleUpdate} handleDelete={handleDelete} updateTask={updateTask}/>
                {/* create a task */}
                <Dialog>
                    <DialogTrigger asChild>
                    <div className="flex justify-center mt-5">
                        <Button className=" bg-[#201f1f] text-white px-10">Create a new Task</Button>
                    </div>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Create a Task</DialogTitle>
                        </DialogHeader>
                        <div className="mt-5">
                            <form onSubmit={handleInsert} method="post" className="grid gap-5">
                                <Input placeholder="name" type="string" value={name} onChange={(e)=>{setName(e.target.value)}}/>
                                <Input placeholder="priority" type="number" value={priority} onChange={(e)=>{setPriority(parseInt(e.target.value))}}/>
                                <DialogFooter>
                                    <Button className=" bg-[#201f1f] text-white px-8" type="submit">Save changes</Button>
                                </DialogFooter>
                            </form>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>  
        )
    }
}

