import styled from "styled-components";
import { useState } from "react";

const StyledInput = styled.input`
height:40px;
width:260px;
font-size:16px;
border-radius:5px;
font-family:pageFont;
padding-left:5px;
`


function CreateAccount() {

const [accCreated, setAccCreated] = useState(false)
const [invalidInput, setInvalidInput] = useState(false)
const [formEmail, setFormEmail] = useState("")
const [formName, setFormName] = useState("")
const [formSurname, setFormSurname] = useState("")
const [formPassword, setFormPassword] = useState("")
const [formSec, setFormSec] = useState("")
const [accountMatch, setAccountMatch] = useState(true)



function emailData(props: { target: { value: string } }) {
  const emailAnswer = props.target.value
  setAccCreated(false)
  setInvalidInput(false)
  setFormEmail(emailAnswer)
}
function nameData(props: { target: { value: string } }) {
  setAccCreated(false)
  setInvalidInput(false)
  setFormName(props.target.value)
}
function surnameData(props: { target: { value: string } }) {
  setAccCreated(false)
  setInvalidInput(false)
  setFormSurname(props.target.value)
}
function passwordData(props: { target: { value: string } }) {
  setAccCreated(false)
  setInvalidInput(false)
  setFormPassword(props.target.value)
}
function securityData(props: { target: { value: string } }) {
  setAccCreated(false)
  setInvalidInput(false)
  setFormSec(props.target.value)
}


async function onCreate(event: { preventDefault: () => void; }){
  event.preventDefault();


  if(formName && formSurname && formEmail.length >= 5  && formPassword.length >= 6 && formSec){

(async () => {
  const rawResponse = await fetch('http://localhost:3000/accounts/create', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email: formEmail.toLowerCase(), password: formPassword, name:formName, surname:formSurname, secAnswer:formSec.toLocaleLowerCase()})
  });
  const content = await rawResponse.json();

  console.log("Mitt svar från skapa konto", content.isValid);

  if(content.isValid === true){
  setAccountMatch(content.isValid)
  setAccCreated(true);
  setFormName("");
  setFormSurname("");
  setFormEmail("");
  setFormPassword("");
  setFormSec("");



  }else if(content.isValid === false){
  setFormName("");
  setFormSurname("");
  setFormEmail("");
  setFormPassword("");
  setFormSec("");
  setAccountMatch(content.isValid)
  }


})();


  }else{
    setInvalidInput(true)
  }

}















  return <>
<h2>Create your new Dream Lore account</h2>
  <form action="">
    <div style={{display:"flex", flexDirection:"column",gap:"15px", justifyContent:"center", alignItems:"center"}}>
    <StyledInput onChange={nameData} placeholder="Name" type="text"  value={formName} />
    <StyledInput onChange={surnameData} placeholder="Surname" type="text" value={formSurname} />
    <StyledInput onChange={emailData} placeholder="Email" type="email" value={formEmail} />
    <StyledInput onChange={passwordData} placeholder="New password.." type="text" value={formPassword} />
    <p style={{margin:"0"}}>
      What is your dream profession?
    </p>
    <StyledInput onChange={securityData} placeholder="Security question.." type="text" value={formSec} />
    <input onClick={onCreate} style={{backgroundColor:"#FFD447",height:"30px",width:"220px",borderRadius:"5px",fontWeight:"bold", cursor:"pointer"}} value={"Create"} type="submit"/>

    </div>
  </form>
  {
accCreated ? <div><p>creation successful</p></div> : ""

  }
  {
    accountMatch ? "" : <div><p>Account already exists</p></div>
  }
{
invalidInput ?
<div>
  <p>Missing a field</p>
</div>
:
""
  }

  </>;
}

export default CreateAccount;
