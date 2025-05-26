
import Logout from "./Logout";
import styled from "styled-components";



const UserName = styled.p`
  text-decoration: "underline";
  margin-left: auto;
`;
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
  return (
    <>
    <NavbarDiv>

        <UserName>
          {activeUser.name} {activeUser.surname}
        </UserName>
      <Logout/>
    </NavbarDiv>
    </>
  );
}

export default Navbar;
