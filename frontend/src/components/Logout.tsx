
import { useNavigate } from "react-router-dom";


function Logout(){
const navigate = useNavigate()
const navOut = () => {navigate("/")}


function logOut(){
  localStorage.removeItem("currentUser")
navOut()
}
  return(

    <>
    <h4 onClick={logOut}>Logout</h4>
    </>
  )
}
export default Logout;
