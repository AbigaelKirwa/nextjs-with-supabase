import Link from "next/link";

export default function Header() {
  return (
    <div className="items-center">
      <Link href="/todo"><p className="text-black">View To Do List</p></Link>
    </div>
  );
}