
export function Card({
    title , 
    children 
} : {
    title : string , 
    children? :React.ReactNode
}){
    return(
        <div
            className="border p-4 p-10"
        >
            <h1 className="text-xl font-medium border-b pb-2">
                {title}
            </h1>
            <div className="py-4">
                {children}
            </div>
        </div>
    )
}