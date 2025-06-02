import { useState, useEffect } from "react";

 interface BroadcastProps {

    feature:string,
    optimization:string,
    upcoming:string
}


function News(){


  const [adminBroadcast,setAdminBroadcast] = useState<BroadcastProps | null> (null);
  const [,setPageUpdate] = useState(false)



   useEffect(() => {


    fetch(`http://localhost:3000/accounts/admin`)
    .then((response) => response.json())
    .then((result) => {
      //console.log(result[0]);
      setAdminBroadcast(result[0])
      setPageUpdate(prev => !prev)
      //console.log(adminBroadcast)
    });

  },[])




  return (

    <>
    { adminBroadcast ?

    <div style={{textAlign:"left", padding:"20px",margin:"0"}}>
    <h2>Latest updates:</h2>
    <h3 style={{marginBottom:"0"}}>Features:</h3>
    <p>{adminBroadcast.feature}</p>
    <h3 style={{marginBottom:"0"}}>Optimization:</h3>
    <p>{adminBroadcast.optimization}</p>
    <h3 style={{marginBottom:"0"}}>Coming next:</h3>
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
