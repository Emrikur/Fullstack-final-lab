import { useState, useEffect } from "react";

 interface BroadcastProps {

    feature:string,
    optimization:string,
    upcoming:string
}

interface NewsProps {
  updateNews:boolean
}


function News(updated:NewsProps){


  const [adminBroadcast,setAdminBroadcast] = useState<BroadcastProps | null> (null);
  const [pageUpdate,setPageUpdate] = useState(false)




  useEffect(() => {


    fetch(`http://localhost:3000/accounts/admin`)
    .then((response) => response.json())
    .then((result) => {


      setAdminBroadcast(result[0])


    });

  },[pageUpdate])

  useEffect(() => {
setPageUpdate(prev => !prev)
  },[updated])


  return (

    <>
    { adminBroadcast ?

    <div style={{textAlign:"left", padding:"20px",margin:"0",backgroundColor:"#55496668"}}>
    <h2 style={{color:"#f9cf4a"}}>Latest updates:</h2>
    <h3 style={{color:"#e06f25",marginBottom:"0"}}>Features:</h3>
    <p>{adminBroadcast.feature}</p>
    <h3 style={{color:"#e06f25",marginBottom:"0"}}>Optimization:</h3>
    <p>{adminBroadcast.optimization}</p>
    <h3 style={{color:"#e06f25",marginBottom:"0"}}>Coming next:</h3>
    <p>{adminBroadcast.upcoming}</p>

    <p>// The Dream Lore team</p>
    </div>
    :
    <div>
      Nothing new
    </div>
}
    </>

  )
}

export default News;
