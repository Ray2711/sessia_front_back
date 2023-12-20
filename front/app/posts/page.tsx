import Link from "next/link";
const getNotes = async() => {
    const res = await fetch(`http://localhost:8080/api/v1/blogs`,{next:{revalidate:10}}) //using pb as a backend
    const data = await res.json();
    return data as any[];
}
export default async function NotesPage(){
    const notes = (await getNotes()).reverse();

    return(
        <div className="x-full flex flex-row justify-between items-start h-screen">
        <div className="flex flex-col justify-center overflow-auto">
            {notes?.map((note)=>{
                return <Note key={note.id} note={note} />
            })}
        </div>
        </div>
    )
}

function Note({note}:any){
    const {id, title, text, created} = note || {};

    return(
        <Link href={`/posts/${id}`}>
            <div className="mb-10">
                <h1 className="text-teal-800 dark:text-teal-200 text-2xl font-semibold">{title}</h1>
                <h5 className="font-normal text-gray-800 dark:text-gray-300">{text}</h5>
                <p className="font-light text-gray-400">{new Date(created).toLocaleDateString()}</p>
            </div>
        </Link>
    )
}
