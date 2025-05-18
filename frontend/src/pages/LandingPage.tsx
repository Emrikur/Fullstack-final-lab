import styled from "styled-components";
import { Link } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import CreateAccount from "../components/CreateAccount";
import { useState } from "react";
const Main = styled.main`

  width: 70vw;

  h1 {
    font-size: 55px;
    @media only screen and (max-width: 600px) {
      font-size: 32px;
    }
  }
`;
function LandingPage() {
  const [haveAccount, setAccount] = useState(true);
  function toCreateAcc() {
    setAccount(false);
  }



  return (
    <>
      <Main>
        <h1>
          Welcome to <br />
          <span style={{ fontSize: "66px", fontFamily: "pageFontBold" }}>
            Dream Lore
          </span>
        </h1>

        <Link to="/home">Home</Link>
        <div>
          {haveAccount ? (
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
                  onClick={() => alert("Feature to be added")}
                  style={{ color: "#7A5CA0", cursor: "pointer" }}
                >
                  Forgot password?
                </a>
              </div>
            </div>
          ) : (
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
                onClick={() => setAccount(true)}
              >
                Back
              </a>
            </div>
          )}
        </div>
      </Main>
    </>
  );
}

export default LandingPage;
