"use client"

import  {useRouter}  from "next/navigation";
import BooksUI from "./component/BooksUI";

export default function HomePage() {
  const route= useRouter()
  return (
    <>
    <div className="bg-[url('/bg.jpeg')]">
    <div className="flex justify-center items-center h-20" onClick={()=>route.push('/api/books')}>
  <button className="px-4 py-2 bg-amber-900 text-white rounded hover:bg-amber-700 border border-4 border-rose-950">
    Visit Books API
  </button>
</div>
      <BooksUI/>
      </div>
    </>
  );
}
