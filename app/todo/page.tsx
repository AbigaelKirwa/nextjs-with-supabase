'use client'
import { useState, useEffect, ChangeEvent} from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { readAction, deleteAction, createAction, updateAction } from '@/app/todo/actions'
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogHeader, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toDoItemsType } from "@/types"

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
        if(updateTask && updateTask.name !==name || updateTask?.priority !==priority || updateTask.done !==done){
            const updatedItem = {id, name, priority, done}
            await updateAction(updatedItem)
            setTriggerRefresh(prev=>!prev)
            setName('')
            setPriority(0)
        }
    }

    if (toDoItems !== null){
        return (
            <div className="mt-10">
                <h1 className="font-bold text-5xl text-center">To Do Application</h1>      
                <Table className="mt-10">
                    <TableHeader>
                    <TableRow>
                    {tableHeaderNames.map((tableHeaderName)=>(
                        <TableHead key={tableHeaderName} className="text-center font-semibold text-base text-slate-700">{tableHeaderName}</TableHead>
                    ))}
                    </TableRow>
                    </TableHeader>
                    <TableBody>
                    {toDoItems && toDoItems.length > 0 ? toDoItems.map((todoItem, index)=>(
                        <TableRow key={todoItem.id}>
                            <TableCell>{index+1}</TableCell>
                            <TableCell className="text-center">{todoItem.name}</TableCell>
                            <TableCell>
                                {
                                todoItem.priority === 0 ? <Badge className="bg-[#FF6A06] text-white w-24 h-8 flex items-center justify-center">Urgent</Badge>:
                                todoItem.priority === 1 ? <Badge className="bg-[#007A00] text-white w-24 h-8 flex items-center justify-center">Medium</Badge>:
                                <Badge className="bg-[#808080] text-white w-24 h-8 flex items-center justify-center">Minor</Badge>
                                }
                            </TableCell>
                            <TableCell className="flex justify-center align-middle mt-2">
                                {todoItem.done === true ? <Checkbox checked={todoItem.done} className="border-gray-600"/> : <Checkbox className="border-gray-600"/>}
                            </TableCell>
                            <TableCell>
                                 {/* update a task */}
                                 <div className="flex flex-row items-center justify-center">
                                    <div>
                                        <Dialog>
                                            <DialogTrigger asChild>
                                            <div>
                                                <Button variant="secondary" className=" bg-blue-700 text-white" onClick={()=>{setUpdateTask(todoItem)}}>Edit</Button>
                                            </div>
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle>Update a Task</DialogTitle>
                                                </DialogHeader>
                                                <div className="mt-5">
                                                    <form onSubmit={()=>handleUpdate(todoItem.id)} method="post" className="grid gap-5">
                                                        <Input placeholder={todoItem.name} type="string" value={name} onChange={(e)=>{setName(e.target.value)}}/>
                                                        <Input placeholder="priority" type="number" value={priority} onChange={(e)=>{setPriority(parseInt(e.target.value))}}/>
                                                        <div className="flex gap-5 pl-1 text-gray-700">
                                                            <Label>Done</Label>
                                                            {todoItem.done===true ? <input type="checkbox" defaultChecked onChange={()=>setDone(false)}/> : <input type="checkbox" onChange={()=>setDone(true)}/>}
                                                        </div>
                                                        <DialogFooter>
                                                            <Button className=" bg-[#201f1f] text-white px-8" type="submit">Save changes</Button>
                                                        </DialogFooter>
                                                    </form>
                                                </div>
                                            </DialogContent>
                                        </Dialog>
                                    </div>
                                    <div>
                                    <Button variant="destructive" className="ml-5 bg-[#C30010] text-white" onClick={()=>handleDelete(todoItem.id)}>Delete</Button>
                                    </div>
                                 </div>
                            </TableCell>
                        </TableRow>
                    )) : (
                        <TableRow>
                            <TableCell colSpan={5}>No tasks available</TableCell>
                        </TableRow>
                    )}
                    </TableBody>
                </Table>
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

