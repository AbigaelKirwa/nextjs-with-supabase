import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogHeader, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToDo } from "../context/todoContext"
import { Label } from "@/components/ui/label"
import { toDoItemsType } from "@/types"

interface updateToDoItemsType{
    todoItem:toDoItemsType;
}

export default function updateToDo({todoItem}:updateToDoItemsType) {
    const {name, priority, setName, setDone, setUpdateTask, setPriority, handleUpdate} = useToDo()
    return (
            <Dialog>
                <DialogTrigger asChild>
                    <div>
                        <Button variant="secondary" className=" bg-blue-700 text-white" onClick={()=>{
                            setUpdateTask(todoItem)
                            setName(todoItem.name)
                            setDone(todoItem.done)
                            setPriority(todoItem.priority)
                            }}>
                            Edit
                        </Button>
                    </div>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Update a Task</DialogTitle>
                    </DialogHeader>
                    <div className="mt-5">
                        <form onSubmit={()=>{handleUpdate(todoItem.id)}} method="post" className="grid gap-5">
                            <Input placeholder={todoItem.name} type="string" value={name} onChange={(e)=>{setName(e.target.value)}}/>
                            <Input placeholder={(todoItem.priority).toString()} type="number" value={priority} onChange={(e)=>{console.log(todoItem.priority);setPriority(parseInt(e.target.value))}}/>
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
        )
}
