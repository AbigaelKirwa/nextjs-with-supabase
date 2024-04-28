'use server'
import { createClient } from "@/utils/supabase/server"
const supabase = createClient()

//delete
export async function deleteAction({id}:{id:any}) {
    console.log("Deleted successfully")
    const { error } = await supabase.from('todo').delete().eq('id', id)
    if(error){throw new Error("Did not fetch component")}
}

// read
export async function todoLoader() {
    const { data: toDoItems, error } = await supabase.from('todo').select('*');
    if(error){throw new Error("Did not fetch component")}
    return toDoItems;
}

