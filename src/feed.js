

export default function Feed({summary,title,id}){

       

    return(
        <div className="feed">
        <h1>{id}</h1>

        <h1>{title}</h1>
        <p>{summary}</p>
        </div>
        
    )
  
}