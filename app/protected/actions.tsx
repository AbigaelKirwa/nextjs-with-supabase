'use server'
import { createClient } from "@/utils/supabase/server"
import { toDoItemsType } from "@/types"

const supabase = createClient()

//delete
export async function deleteAction(id:number) {
    console.log("Deleted successfully")
    const { error } = await supabase.from('todo').delete().eq('id', id)
    if(error){throw new Error("Did not fetch component")}
}

// read
export async function readAction() {
    //get authenticated user
    const {data:{user}} = await supabase.auth.getUser();
    const { data: toDoItems, error } = await supabase.from('todo').select('*').order('id', {ascending:true}).eq('user_id', user?.id);
    if(error){throw new Error("Did not fetch data")}
    return toDoItems;
}

//create
export async function  createAction({name, priority, done}:toDoItemsType){
    //get authenticated user
    const {data:{user}} = await supabase.auth.getUser();
    const { data:toDoItems, error } = await supabase.from('todo').insert({ name: name, priority:priority, done:done, user_id:user?.id })
    if(error){throw new Error("Did not create row")}
    return toDoItems ? toDoItems[0]:null;
}

//update
export async function updateAction({id, name, priority, done}:toDoItemsType){
    const {data:toDoItems, error} = await supabase.from('todo').update({name:name, priority:priority, done:done}).eq('id',id)
    if(error){throw new Error("Did not update row")}
    return toDoItems ? toDoItems[0]:null
}

//update checked box only
export async function updateCheckboxAction(id:number, done:boolean){
    const {error}= await supabase.from('todo').update({done:done}).eq('id',id)
    if(error){throw new Error("Did not update Check")}
}