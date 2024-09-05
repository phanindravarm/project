import React from "react"
// export default function hey({title,updated}){
// return <h1>{title}  {updated}</h1>
// }

export default function Hey(
    {title,updated}
  ) {
    return (
      <>
        <div className="card">
          
          <h3>Name :{title}</h3>
          <h4>{updated}</h4>

        </div>
      </>
    );
  }
  