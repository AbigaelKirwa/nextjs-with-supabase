import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { toDoItemsType } from "@/types"
import { useToDo } from "../context/todoContext"
import UpdateToDo from "./updateToDo"


export default function ReadToDo() {

    const {toDoItems, tableHeaderNames, handleDelete, handleCheckBoxUpdate, loading} = useToDo();

    return (
        <Table className="mt-10">
            <TableHeader>
                <TableRow>
                {tableHeaderNames.map((tableHeaderName:string)=>(
                    <TableHead key={tableHeaderName} className="text-center font-semibold text-base text-slate-700">{tableHeaderName}</TableHead>
                ))}
                </TableRow>
            </TableHeader>
            <TableBody>
            {toDoItems && toDoItems.length > 0 ? toDoItems.map((todoItem:toDoItemsType, index:number)=>(
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
                        <input type="checkbox" checked={todoItem.done} className="border-gray-600" disabled={loading} onChange={(e)=>{
                            e.preventDefault()
                            handleCheckBoxUpdate(todoItem.id, e.target.checked)
                        }}/> 
                    </TableCell>
                    <TableCell>
                            <div className="flex flex-row items-center justify-center">
                                <div>
                                    <UpdateToDo todoItem={todoItem}/>
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
  )
}
