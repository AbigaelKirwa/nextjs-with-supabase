'use server'
import { createClient } from "@/utils/supabase/server"
const supabase = createClient()
import { toDoItemsType } from "@/types"

//delete
export async function deleteAction(id:number) {
    console.log("Deleted successfully")
    const { error } = await supabase.from('todo').delete().eq('id', id)
    if(error){throw new Error("Did not fetch component")}
}

// read
export async function readAction() {
    const { data: toDoItems, error } = await supabase.from('todo').select('*').order('id', {ascending:true});
    if(error){throw new Error("Did not fetch data")}
    return toDoItems;
}

//create
export async function  createAction({name, priority, done}:toDoItemsType){
    const { error } = await supabase.from('todo').insert({ name: name, priority:priority, done:done })
    if(error){throw new Error("Did not create row")}
}

//update
export async function updateAction({id, name, priority, done}:toDoItemsType){
    const {error} = await supabase.from('todo').update({name:name, priority:priority, done:done}).eq('id',id)
    if(error){throw new Error("Did not update row")}
}

//update checked box only
export async function updateCheckboxAction(id:number, done:boolean){
    const {error}= await supabase.from('todo').update({done:done}).eq('id',id)
    if(error){throw new Error("Did not update Check")}
}