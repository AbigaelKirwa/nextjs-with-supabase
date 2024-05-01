import React, {createContext, useContext, useState, useEffect, ReactNode} from 'react'
import { readAction, deleteAction, createAction, updateAction, updateCheckboxAction } from '@/app/protected/actions'
import { toDoItemsType } from "@/types"

interface ToDoContextType{
    toDoItems:toDoItemsType[];
    name:string;
    priority:number;
    done:boolean;
    setName: (name:string)=>void;
    setPriority: (priority:number)=>void;
    setDone: (done:boolean)=>void;
    tableHeaderNames:string[];
    updateTask:toDoItemsType|null;
    setUpdateTask:(updateTask:toDoItemsType)=>void
    loading:boolean;
    setLoading: (loading:boolean)=>void;
    handleInsert: ()=>Promise<void>;
    handleDelete:(id:number)=>Promise<void>;
    handleUpdate:(id:number)=>Promise<void>;
    handleCheckBoxUpdate: (id:number, done:boolean)=>Promise<void>;
}

export const ToDoContext= createContext<ToDoContextType | undefined>(undefined)

export const ToDoProvider= ({children}:{children:ReactNode})=>{
    const [toDoItems, setToDoItems] = useState<toDoItemsType[]>([]);
    const [id, setId]=useState<number>(0)
    const [name, setName]=useState<string>("")
    const [priority, setPriority]=useState<number>(0)
    const [done, setDone]=useState<boolean>(false)
    const [updateTask, setUpdateTask]=useState<toDoItemsType | null>(null)
    const [loading, setLoading] = useState<boolean>(false)

    const tableHeaderNames=[
        "Task Number",
        "Task Name",
        "Task Priority",
        "Task Completion",
        "Actions"
    ]

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
    }, []);

    //delete
    const handleDelete = async (id:number) => {
        await deleteAction(id);
        const remainingItems = toDoItems.filter(item => item.id != id)
        setToDoItems(remainingItems)
    };

    //insert
    const handleInsert = async ()=>{
        const newItem = {id, name, priority, done}
        try{
            const createdItem = await createAction(newItem)
            if(createdItem){
                setToDoItems(currentItems=>[...currentItems, createdItem])
            }
        }
        catch(error){
            throw error
        }
        setName("")
        setPriority(0)
    }

    //update
    const handleUpdate = async (id:number)=>{
        const updatedItem = {id, name, priority, done}
        try{
            const editedItems = await updateAction(updatedItem)
            if(editedItems){
                setToDoItems(newlyUpdatedItems=>[...newlyUpdatedItems, editedItems])
            }
        }
        catch(error){
            throw error
        }
        setName('')
        setPriority(0)
    }

    //update checkbox only
    const handleCheckBoxUpdate = async(id:number, done:boolean )=>{
        try{
            setLoading(true)
            await updateCheckboxAction(id, done)
            const updatedItems = toDoItems.map(item=>item.id === id ? {...item, done:done} : item)
            setToDoItems(updatedItems)
        }
        catch(error){
            throw error;
        }
        finally{
            setLoading(false)
        }
    }

    return(
        <ToDoContext.Provider value={{
            toDoItems, name, priority, done,setName, setPriority, setDone,
            handleInsert, handleUpdate, handleDelete, handleCheckBoxUpdate, 
            tableHeaderNames, updateTask, setUpdateTask, loading, setLoading
        }}>
            {children}
        </ToDoContext.Provider>
    )
}

export const useToDo = () =>{
    const context = useContext(ToDoContext)
    if(!context) throw new Error('useToDo must be used within a todo provider')
    return (context)
}