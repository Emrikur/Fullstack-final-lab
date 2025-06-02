import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const StyledInput = styled.input`
  height: 40px;
  width: 260px;
  font-size: 16px;
  border-radius: 5px;
  font-family: pageFont;
  padding-left: 5px;
`;

function LoginForm() {
  const navigate = useNavigate();

  const [invalidInput, setinvalidInput] = useState(false);

  const [formEmail, setFormEmail] = useState("");
  const [formPassword, setFormPassword] = useState("");

  function emailData(props: { target: { value: string } }) {
    setinvalidInput(false);
    setFormEmail(props.target.value);
  }

  function passwordData(props: { target: { value: string } }) {
    setinvalidInput(false);
    setFormPassword(props.target.value);
  }

  async function onPost(event: { preventDefault: () => void }) {
    event.preventDefault();

    if (formEmail.length >= 5 && formPassword.length >= 6) {
      (async () => {
        try {
          const rawResponse = await fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: formEmail.toLowerCase(),
              password: formPassword,
            }),
          });

          const responseData = await rawResponse.json();
          console.log("Response data ", responseData);

          if (
            responseData.user.email === formEmail &&
            responseData.user.password === formPassword
          ) {
            setinvalidInput(false);

            localStorage.setItem(
              "currentUser",
              JSON.stringify(responseData.user)
            );
            const logIn = () => {
              navigate(`/dashboard/${responseData.user.name}`);
            };
            logIn();
          } else {
            console.log("invalid mail or password");
            setFormEmail("");
            setFormPassword("");
            setinvalidInput(true);
          }
        } catch (error) {
          console.error("data is not valid", error);
        }
      })();
    } else {
      setinvalidInput(true);
    }
  }

  return (
    <>
      <form name="loginForm" onSubmit={onPost}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <StyledInput
            type="email"
            autoComplete="email"
            onChange={emailData}
            name="email"
            placeholder="email.."
            value={formEmail}
          />

          <StyledInput
            autoComplete="current-password"
            onChange={passwordData}
            name="password"
            placeholder="password.."
            type="password"
            value={formPassword}
          />
          {invalidInput ? (
            <div>
              <p>Invalid email or password</p>
            </div>
          ) : (
            ""
          )}
          <input
            style={{
              backgroundColor: "#FFD447",
              height: "30px",
              width: "220px",
              borderRadius: "5px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
            value={"Login"}
            type="submit"
          />
        </div>
      </form>
    </>
  );
}

export default LoginForm;
