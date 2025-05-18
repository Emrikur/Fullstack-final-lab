import styled from "styled-components";
import { Link } from "react-router-dom";
import { useState } from "react";

const CreatePost = styled.div`
  display: grid;
  background-color: rgb(151, 135, 171,0.7);
  padding:10px;
`;
const Journal = styled.div`
  display: flex;
  flex-direction: column;
  background-color: rgb(151, 135, 171,0.7);
`;

function Dreams() {
  const getUser = localStorage.getItem("currentUser");
  const transcribeUserData = JSON.parse(getUser);
  console.log(transcribeUserData);


  const [textField, setTextField] = useState("");
function saveTextField(props){

setTextField(props.target.value)

}





  return (
    <>
      <main
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gridTemplateRows: "1fr 1fr 1fr",
          rowGap: "15px",
        }}
      >
        <div>
          <h1>Dreams</h1>
        </div>
        <CreatePost>
          <form action="">
            <div>

            <input type="text" />
            </div>
            <div>
              <label style={{ fontSize: "13px" }} htmlFor="nightmare-tic">
                Nightmare
              </label>
              <input id="nightmare-tic" type="checkbox" />
            </div>
            <div>
              <label htmlFor="love-tic">romantic</label>
              <input id="love-tic" type="checkbox" />
            </div>
            <div>
              <textarea onChange={saveTextField} name="dreamPost" id="dream-post" value={textField} placeholder="Write down your dream.."></textarea>
            </div>
            <input type="button" value="Create post" />
          </form>
        </CreatePost>
        <Journal>
          <p>Här ligger postade drömmar</p>
        </Journal>
        <Link to={`/dashboard/${transcribeUserData.name}`}>
          Back to dashboard
        </Link>
      </main>
    </>
  );
}

export default Dreams;
