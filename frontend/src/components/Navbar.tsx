
import Logout from "./Logout";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const NavbarDiv = styled.div`
display:flex;
flex-direction:row;
align-items:center;
justify-content:flex-end;
gap:15px;
`;

function Navbar() {
const getUser = localStorage.getItem("currentUser");
  const activeUser = JSON.parse(getUser ?? '{}');


  const [eligable, setEligable] = useState(false)


  useEffect(() => {
//console.log(activeUser.is_admin)
  if( activeUser.is_admin === 1){
    //console.log("It's true")
setEligable(true)
  }else{
    //console.log("It's false")
    setEligable(false)
  }

},[eligable, activeUser])
  return (
    <>
{    eligable ?
  <NavbarDiv>
        <p>
          <Link style={{color:"#f2771f",textDecoration:"underline"}} to="/admin">
          {activeUser.name} {activeUser.surname}*
          </Link>
        </p>
      <Logout/>
    </NavbarDiv>
    :
    <NavbarDiv>
        <p>
          {activeUser.name} {activeUser.surname}
        </p>
      <Logout/>
    </NavbarDiv>
    }
    </>
  );
}

export default Navbar;
