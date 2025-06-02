import styled from "styled-components";
import LoginForm from "../components/LoginForm";
import CreateAccount from "../components/CreateAccount";
import { useState } from "react";
import ChangePassword from "../components/ChangePassword";
const Main = styled.main`

  width: 70vw;
  margin-left:auto;
  margin-right:auto;


  h1 {
    font-size: 55px;
    @media only screen and (max-width: 600px) {
      font-size: 32px;
    }
  }
`;



function LandingPage() {
  const [haveAccount, setAccount] = useState("Login");
  function toCreateAcc() {
    setAccount("Create");
  }



  return (
    <>
      <Main>
        <h1 style={{color:"#f2771f"}}>
          Welcome to <br />
          <span style={{ fontSize: "66px", fontFamily: "pageFontBold" }}>
            Dream Lore
          </span>
        </h1>


        <div>
          {haveAccount === "Login" ? (
            <div>
              <h2>Log in to continue</h2>
              <LoginForm />
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                  marginTop: "15px",
                }}
              >
                <a
                  style={{ color: "#7A5CA0", cursor: "pointer" }}
                  onClick={toCreateAcc}
                >
                  Create account
                </a>{" "}
                |
                <a
                  onClick={() => setAccount("Forgot")}
                  style={{ color: "#7A5CA0", cursor: "pointer" }}
                >
                  Forgot password?
                </a>
              </div>
            </div>
          ) : haveAccount === "Create" ?(
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "5px",
              }}
            >
              <CreateAccount />
              <a
                style={{ cursor: "pointer", fontFamily: "pageFontBold" }}
                onClick={() => setAccount("Login")}
              >
                Back
              </a>
            </div>

          ) : haveAccount === "Forgot" ?(
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "5px",
              }}
            >
              <ChangePassword />
              <a
                style={{ cursor: "pointer", fontFamily: "pageFontBold" }}
                onClick={() => setAccount("Login")}
              >
                Back
              </a>
            </div>
          )
        : ""}
        </div>



      <footer><p style={{marginTop:"20vh"}}>All Rights Reserved by <br />the DreamLore Company©</p></footer>
      </Main>
    </>
  );
}

export default LandingPage;
