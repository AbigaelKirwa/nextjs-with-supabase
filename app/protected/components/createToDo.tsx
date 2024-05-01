import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogHeader, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToDo } from "../context/todoContext"


export default function createToDo() {

    const {name, priority, setName, setPriority, handleInsert} = useToDo();
    
    return (
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
    )
}
