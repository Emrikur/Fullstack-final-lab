import styled from "styled-components";
import { useState, useEffect } from "react";

const RecoverPassword = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  border: #f2771f solid 2px;
  padding: 15px;

  h4 {
    margin: 0;
  }
  p {
    font-size: 14px;
  }
  #answer-button {
    background-color: #ffd447;
    align-self: center;
    margin-top: 10px;
    height: 30px;
    width: 220px;
    border-radius: 5px;
    font-weight: bold;
    cursor: pointer;
  }

  #email-input {
    height: 40px;
    width: 260px;
    font-size: 16px;
    border-radius: 5px;
    font-family: pageFont;
    padding-left: 5px;
    margin: 5px;
    align-self: center;
  }

  #answer-input {
    height: 40px;
    width: 260px;
    font-size: 16px;
    border-radius: 5px;
    font-family: pageFont;
    padding-left: 5px;
    align-self: center;
  }

  form {
    display: flex;
    flex-direction: column;
  }
`;

const GiveToken = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  border: #f2771f solid 2px;
  padding: 15px;

  #apply-token {
    padding: 7px;
    width: 220px;
    border-radius: 2px;
    border-style: none;
    border: solid black 1.5px;
  }
  #submit-token {
    background-color: #ffd447;
    align-self: center;
    margin-top: 10px;
    height: 30px;
    width: 220px;
    border-radius: 5px;
    font-weight: bold;
    cursor: pointer;
  }
`;
const UpdatePassword = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  border: #f2771f solid 2px;
  padding: 15px;

  #update-password {
    height: 40px;
    width: 260px;
    font-size: 16px;
    border-radius: 5px;
    font-family: pageFont;
    padding-left: 5px;
    margin: 5px;
    align-self: center;

    &:hover {
      border: solid 2.5px;
    }
  }
  #re-enter-password {
    height: 40px;
    width: 260px;
    font-size: 16px;
    border-radius: 5px;

    font-family: pageFont;
    padding-left: 5px;
    margin: 5px;
    align-self: center;
    &:hover {
      border: white solid 2.5px;
    }
  }
  #submit-password {
    background-color: #ffd447;
    align-self: center;
    margin-top: 10px;
    height: 30px;
    width: 220px;
    border-radius: 5px;
    font-weight: bold;
    cursor: pointer;
  }
`;

function ChangePassword() {
  const [toggleForm, setToggleForm] = useState("verifyUser");
  const [emailSent, setEmailSent] = useState("");
  const [answerSent, setAnswerSent] = useState("");
  const [, setUpdatePost] = useState(false);
  const [userToken, setUserToken] = useState("");
  const [theUserName, settheUserName] = useState("");
  const [matchingPassword, setMatchingPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [reNewPassword, setReNewPassword] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const theFormData = new FormData(form);
    const data = Object.fromEntries(theFormData.entries());

    (async () => {
      try {
        const dreamResponse = await fetch(
          "http://localhost:3000/accounts/validation",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              formEmail: data.secEmail,
              securityAnswer: data.secAnswer,
            }),
          }
        );

        const token = await dreamResponse.json();
        setUpdatePost((prev) => !prev);

        setEmailSent("");
        setAnswerSent("");
        setUserToken(token.response);
        // alert("Your user token is: "+ token.response + " Copy and paste in the next field")

        //console.log(token.response);
        console.log(userToken);
        if (userToken) {

          setToggleForm("Token");
        } else {
          console.log("Trouble");
        }
      } catch (error) {
        console.error("data is not valid", error);
      }
    })();
  }

  function inputToken(token: React.FormEvent<HTMLFormElement>) {
    token.preventDefault();

    const form = token.currentTarget;
    const theFormData = new FormData(form);
    const data = Object.fromEntries(theFormData.entries());


    (async () => {
      try {
        const tokenResponse = await fetch(
          "http://localhost:3000/accounts/validation/token",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userToken: data.theUserToken,
            }),
          }
        );

        const userName = await tokenResponse.json();
        setUpdatePost((prev) => !prev);
        settheUserName(userName.response);
        console.log(userToken);
        if (theUserName) {
          console.log(theUserName);
          setToggleForm("UpdatePassword");
        } else {
          console.log("Trouble");
        }
      } catch (error) {
        console.error("data is not valid", error);
      }
    })();

    //setToggleForm("UpdatePassword")
  }

  function UpdateThePassword() {
    if (newPassword === reNewPassword) {
      (async () => {
        try {
          const tokenResponse = await fetch(
            "http://localhost:3000/accounts/update",
            {
              method: "PATCH",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                password: newPassword,
                theUserToken: userToken,
              }),
            }
          );

          const updatedPassword = await tokenResponse.json();

          console.log("password updated", updatedPassword.response);
          setUpdatePost((prev) => !prev);
          if (updatedPassword.response) {
            //console.log(theUserName)
            setToggleForm("");
          } else {
            console.log("Trouble");
          }
        } catch (error) {
          console.error("data is not valid", error);
        }
      })();
    } else {
      alert("Passwords need to match");
    }
  }

  useEffect(() => {
    if (
      newPassword === reNewPassword &&
      newPassword.length === reNewPassword.length &&
      newPassword.length >= 1 &&
      reNewPassword.length >= 1
    ) {
      setMatchingPassword(true);
    } else {
      setMatchingPassword(false);
    }
  }, [newPassword, reNewPassword]);
  return (
    <>
      {toggleForm === "verifyUser" ? (
        <RecoverPassword style={{ display: "flex", flexDirection: "column" }}>
          <h4>Change password</h4>
          <p>
            Security question <br />
            What is your dream profession?
          </p>
          <form onSubmit={handleSubmit}>
            <input
              onChange={(email) => setEmailSent(email.target.value)}
              name="secEmail"
              id="email-input"
              type="email"
              placeholder="email"
              value={emailSent}
            />
            <input
              onChange={(answer) => setAnswerSent(answer.target.value)}
              name="secAnswer"
              id="answer-input"
              type="text"
              placeholder="answer"
              value={answerSent}
            />
            <input
              onClick={() => setUpdatePost((prev) => !prev)}
              id="answer-button"
              type="submit"
              value="send"
            />
          </form>
        </RecoverPassword>
      ) : toggleForm === "Token" ? (
        <GiveToken>
          <h4>Change password</h4>
          <form onSubmit={inputToken}>
            <p style={{ margin: "0", marginBottom: "5px" }}>
              Apply user token:
            </p>
            <input id="apply-token" name="theUserToken" value={userToken} />
            <input id="submit-token" type="submit" placeholder="send token" />
          </form>
        </GiveToken>
      ) : toggleForm === "UpdatePassword" ? (
        <UpdatePassword style={{ display: "flex", flexDirection: "column" }}>
          <p>Update password</p>
          <h5>
            Hello {theUserName}
            <br />
            please type a new password
          </h5>
          <input
            style={{ borderColor: matchingPassword ? "green" : "red" }}
            onChange={(password1) => setNewPassword(password1.target.value)}
            id="update-password"
            value={newPassword}
            type="text"
            placeholder="Enter new password"
          />
          <input
            style={{ borderColor: matchingPassword ? "green" : "red" }}
            onChange={(password2) => setReNewPassword(password2.target.value)}
            id="re-enter-password"
            value={reNewPassword}
            type="text"
            placeholder="Re-enter new password"
          />
          <input
            onClick={UpdateThePassword}
            id="submit-password"
            type="button"
            value="submit"
          />
        </UpdatePassword>
      ) : (
        <div>
          <p>A new password has been set</p>
        </div>
      )}
    </>
  );
}

export default ChangePassword;
