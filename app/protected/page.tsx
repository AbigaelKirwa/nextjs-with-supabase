import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import ToDO from "./components/todo";
import ToDoHeader from "./components/todoHeader";
import ToDoFooter from "./components/todoFooter";

export default async function ProtectedPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  return (
    <div className="flex-1 w-full flex flex-col gap-3 items-center" style={{opacity:1}}>
      <ToDoHeader/>
      <ToDO/>
      <ToDoFooter/>
    </div>
  );
}
