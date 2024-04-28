'use server'
import { createClient } from "@/utils/supabase/server"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table"
import { Button } from "@/components/ui/button"


const tableHeaderNames=[
    "Task Number",
    "Task Name",
    "Task Priority",
    "Task Completion",
    "Actions"
]

export default async function ToDO(){
    const supabase = createClient()
    let { data: toDoItems } = await supabase.from('todo').select('*')
    // const todo_array = JSON.stringify(todo)
    if (toDoItems !== null){
        return (
            <div className="mt-10">
                <h1 className="font-bold text-5xl text-center">To Do Application</h1>      
                <Table className="mt-10">
                    <TableHeader>
                    {tableHeaderNames.map((tableHeaderName)=>(
                        <TableHead className="text-center font-semibold text-base text-slate-700">{tableHeaderName}</TableHead>
                    ))}
                    </TableHeader>
                    <TableBody>
                    {toDoItems.map((todoItem)=>(
                        <TableRow key={todoItem.id}>
                            <TableCell>{todoItem.id}</TableCell>
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
                                <Button variant="secondary" className=" bg-blue-700 text-white">Edit</Button>
                                <Button variant="destructive" className="ml-5 bg-[#C30010] text-white">Delete</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </div>  
        )
    }
}
