import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";


const LogoutButton = styled.h4`
position:right;
  text-decoration: underline;
  cursor: pointer;

`;

const LogoutText = styled.p`
position:right;

`

function Logout() {
let cooldown = 2;
const [timerActive, setTimerActive] = useState(false)
  const navigate = useNavigate();


  function handleLogOut() {



    const timer = setInterval(() => {
      if(cooldown > 1){
        cooldown--
        setTimerActive(true)
      } else {

        clearInterval(timer)
        cooldown=2
        localStorage.removeItem("currentUser");
        navigate("/");

      }

    }, 1000);



  }
  return (
    <>
      <div style={{display:"flex", flexDirection:"row", alignItems:" center", gap:"15px"}}>
        {timerActive ?
        <LogoutText>Logging out...</LogoutText>
        :

        <LogoutButton onClick={handleLogOut}>Logout</LogoutButton>
        }
      </div>
    </>
  );
}
export default Logout;
