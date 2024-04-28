'use client'
import { useState, useEffect} from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { todoLoader, deleteAction } from '@/app/todo/actions'
import { useRouter } from "next/navigation";

const tableHeaderNames=[
    "Task Number",
    "Task Name",
    "Task Priority",
    "Task Completion",
    "Actions"
]

export default function ToDO(){
    //fetching data 
    const [toDoItems, setToDoItems] = useState<any>([]);
    const router = useRouter()
    useEffect(() => {
        async function fetchData() {
            try {
                const loadedToDoItems = await todoLoader();
                setToDoItems(loadedToDoItems);
            } catch (error) {
                console.error('Failed to load todo items:', error);
            }
        }
        fetchData();
    }, [toDoItems]);

    //delete
    const handleDelete = async (id:any) => {
        try {
            await deleteAction({id});
            router.refresh()
        } catch (error) {
            console.error('Error deleting todo item:', error);
        }
    };

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
                    {toDoItems && toDoItems.length > 0 ? toDoItems.map((todoItem:any)=>(
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
                                <Button variant="destructive" className="ml-5 bg-[#C30010] text-white" onClick={()=>handleDelete(todoItem.id)}>Delete</Button>
                            </TableCell>
                        </TableRow>
                    )) : (
                        <TableRow>
                            <TableCell colSpan={5}>No tasks available</TableCell>
                        </TableRow>
                    )}
                    </TableBody>
                </Table>
            </div>  
        )
    }
}

