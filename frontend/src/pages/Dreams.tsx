import styled from "styled-components";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Logout from "../components/Navbar";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js/auto";
Chart.register(ArcElement, Tooltip, Legend);
import { Doughnut } from "react-chartjs-2";

interface JourneyDbProps {
  title: string;
  dream_id: number;

  text: string;
  tag: string;
  created_at: string;
}

const CreatePost = styled.div`
  display: grid;
  background-color: rgb(151, 135, 171, 0.7);
  padding: 10px;
  gap:15px;
  border: black solid 1.5px;
  border-radius: 7px;
  margin-bottom: 20px;
`;

const Radios = styled.div`
  display: grid;
  width: 70%;
  grid-template-rows: repeat(2, 1fr);
  grid-template-columns: repeat(2, 1fr);
  margin-left: auto;
  margin-right: auto;
  padding: 10px;
`;

const Journal = styled.div`
  border: black solid 1.5px;
  border-radius: 7px;
  display: flex;
  flex-direction: column;
  background-color: rgb(151, 135, 171, 0.7);

  #journal-entry-title{

 margin-left:15px;
 width:fit-content;
  }
  #journal-entry-textarea{
 overflow-wrap:break-word;
 height:auto;
  }
`;

const Graph = styled.div`
  background-color: rgb(151, 135, 171, 0.7);
  border: black solid 1.5px;
`;

const Textarea = styled.div`
 height: 120px;
 padding: 15px;
 margin-bottom:15px;

 #dream-post{

                  border: solid black 1.5px;
                  width: 90%;
                  max-width:70%;
                  min-width:200px;

                  resize:vertical;
                  padding: 7px;
                  border-style: none;


 }
`;

function Dreams() {
  enum DreamTags {
    NightmareTag = "nightmare",
    CozyTag = "cozy",
    RomanticTag = "romantic",
    SurrealTag = "surreal",
  }

  const getUser = localStorage.getItem("currentUser");

  const transcribeUserData = JSON.parse(getUser ?? "{}");

  const [journalDb, setJournalDb] = useState([]);
  const [graphActive, setGraphActive] = useState(false);
  const [updatePost, setUpdatePost] = useState(false);
  const [invalidInput, setinvalidInput] = useState(false);
  const [invalidTextInput, setinvalidTextInput] = useState(false);
  const [postCreated, setPostCreated] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const dreamResponse = await fetch("http://localhost:3000/dreams", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ activeUserId: transcribeUserData.id }),
        });

        const responseData = await dreamResponse.json();
        console.log(responseData.dbEntries);
        setJournalDb(responseData.dbEntries);
        console.log("db entries", journalDb);
      } catch (error) {
        console.error("data is not valid", error);
      }
    })();
  }, [updatePost]);

  const [titleField, setTitleField] = useState("");
  const [textArea, setTextArea] = useState("");

  const [radioTag, setRadioTag] = useState("");






function toggleCreated(){
setTimeout(() => {
  setPostCreated(false)

},4000);




}









  function onCreatePost(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const theFormData = new FormData(form);
    const data = Object.fromEntries(theFormData.entries());

    if (titleField.length >= 1) {
setinvalidInput(false)
      if(textArea.length >= 1){


        (async () => {
          try {
            const dreamResponse = await fetch(
              "http://localhost:3000/dreams/create",
              {
                method: "POST",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  formData: data,
                  activeUserId: transcribeUserData.id,
                }),
              }
            );

            const responseData = await dreamResponse.json();
            setUpdatePost((prev) => !prev);
            setTitleField("");
            setTextArea("");
            setRadioTag("");
            setinvalidTextInput(false)
            setPostCreated(true)
            toggleCreated()

            console.log(responseData);
          } catch (error) {
            console.error("data is not valid", error);
          }
        })();
      }else{
        setinvalidTextInput(true)
      }
    } else {
      setinvalidInput(true)
      console.log("text cannot be empty");
    }
  }

  function activeGraphBox() {
    if (graphActive === false) {
      setGraphActive(true);
    } else if (graphActive === true) {
      setGraphActive(false);
    }
  }
  const findTags = journalDb.map((allTags: { tag: string }) => allTags.tag);

  const allNightmare = findTags.filter((nTags) => nTags === "nightmare");

  const allCozy = findTags.filter((cTags) => cTags === "cozy");

  const allRomantic = findTags.filter((rTags) => rTags === "romantic");

  const allSurreal = findTags.filter((sTags) => sTags === "surreal");

  const nightmare = allNightmare.length;
  const cozy = allCozy.length;
  const romantic = allRomantic.length;
  const surreal = allSurreal.length;
  const allUndefined = findTags.filter((uTags) => uTags === "undefined");

  const undefinedTag = allUndefined.length;

  function deletePost(e: number) {
    // alert("deleted post");

    (async () => {
      try {
        console.log(e);
        console.log(transcribeUserData.id);

        const dreamResponse = await fetch(
          "http://localhost:3000/dreams/delete",
          {
            method: "DELETE",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id_Of_Dream: e,
              activeUserId: transcribeUserData.id,
            }),
          }
        );

        const responseData = await dreamResponse.json();

        setUpdatePost((prev) => !prev);
        console.log(responseData);
      } catch (error) {
        console.error("data is not valid", error);
      }
    })();
  }

  useEffect(() => {
    console.log(journalDb);
  }, [journalDb]);

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Link to={`/dashboard/${transcribeUserData.name}`}>
          Back to dashboard
        </Link>
        <Logout />
      </div>
      <main>
        <div>
          <h1>Dream Journal</h1>
        </div>
        <CreatePost>
          <form onSubmit={onCreatePost}>
            {invalidInput ? <p style={{color:"red",margin:"0"}}>missing title</p>:""}
            <input
              style={{
                padding: "7px",
                borderRadius: "2px",
                borderStyle: "none",
                border: "solid black 1.5px",
              }}
              name="dreamTitle"
              onChange={(e) => setTitleField(e.target.value)}
              placeholder="Title.."
              type="text"
              value={titleField}
            />

            <Radios>
              <label style={{ fontSize: "13px" }}>
                Nightmare
                <input
                  onChange={() => setRadioTag(DreamTags.NightmareTag)}
                  checked={radioTag === "nightmare"}
                  name="dreamTags"
                  id="nightmare-tic"
                  type="radio"
                  value="nightmare"
                />
              </label>
              <label style={{ fontSize: "13px" }}>
                Romantic
                <input
                  onChange={() => setRadioTag(DreamTags.RomanticTag)}
                  checked={radioTag === "romantic"}
                  name="dreamTags"
                  id="love-tic"
                  type="radio"
                  value="romantic"
                />
              </label>
              <label style={{ fontSize: "13px" }}>
                Cozy
                <input
                  onChange={() => setRadioTag(DreamTags.CozyTag)}
                  checked={radioTag === "cozy"}
                  name="dreamTags"
                  id="cozy-tic"
                  type="radio"
                  value="cozy"
                />
              </label>
              <label style={{ fontSize: "13px" }}>
                Surreal
                <input
                  onChange={() => setRadioTag(DreamTags.SurrealTag)}
                  checked={radioTag === "surreal"}
                  name="dreamTags"
                  id="surreal-tic"
                  type="radio"
                  value="surreal"
                />
              </label>
            </Radios>

            <Textarea>
              {
                invalidTextInput ? <p style={{margin:"0",color:"red"}}>missing text</p>: ""
              }
              <textarea

                onChange={(e) => setTextArea(e.target.value)}
                name="dreamContent"
                id="dream-post"
                value={textArea}
                placeholder="Write down your dream.."
              ></textarea>
            </Textarea>
            <input
              style={{
                marginTop:"auto",
                backgroundColor: "#FFD447",
                height: "30px",
                width: "30%",
                borderRadius: "5px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
              type="submit"
              value="Create post"
            />
          </form>
          { postCreated ?
          //Vill att texten fadar in och ut
          <p style={{margin:"0",fontSize:"14px",transition:" 2s ease-in-out"}}>posted</p>:""}
        </CreatePost>
        <Journal>
          <p>Journal entries</p>

          {journalDb ? (
            journalDb.reverse().map((allEntries: JourneyDbProps) => (
              <div
                style={{
                  backgroundColor: "#3f2964",

                  height: "auto",
                  marginBottom: "15px",
                }}
                key={allEntries.dream_id}
              >
                <p id="journal-entry-title">{allEntries.title}</p>
                <div>
                  <div
                    style={{
                      backgroundColor: "white",
                      padding: " 20px",
                      textAlign: "left"

                    }}
                  >
                    <p id="journal-entry-textarea">{allEntries.text}</p>
                  </div>
                  <div
                    style={{
                      backgroundColor: "#3f2964",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "5px 15px",
                    }}
                  >
                    <p>Tag: {allEntries.tag}</p>
                    <p>{allEntries.created_at}</p>
                    <p
                      onClick={() => deletePost(allEntries.dream_id)}
                      style={{
                        cursor: "pointer",
                        textDecoration: "underline",
                        fontSize: "10px",
                      }}
                    >
                      delete
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>There are no entries yet..</p>
          )}
        </Journal>
        <Graph>
          {!graphActive ? (
            <div>
              <p
                style={{
                  textDecoration: "underline",
                  padding: "15px",
                  cursor: "pointer",
                  width: "fit-content",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
                onClick={activeGraphBox}
              >
                Show Graph
              </p>
            </div>
          ) : (
            <div>
              <p
                style={{
                  textDecoration: "underline",
                  padding: "15px",
                  cursor: "pointer",
                  width: "fit-content",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
                onClick={activeGraphBox}
              >
                Hide graph
              </p>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "white",
                  marginLeft: "auto",
                  marginRight: "auto",
                  padding: "20px",
                }}
              >
                <Doughnut
                  style={{
                    width: "70%",
                    height: "auto",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                  data={{
                    labels: [
                      "Nightmare",
                      "Cozy",
                      "Romantic",
                      "Surreal",
                      "Unspecified",
                    ],
                    datasets: [
                      {
                        label: "number of posts",
                        data: [
                          nightmare,
                          cozy,
                          romantic,
                          surreal,
                          undefinedTag,
                        ],
                        backgroundColor: [
                          "black",
                          "#FFD447",
                          "#F26B60",
                          "#8C5C3B",
                          "lightgrey",
                        ],
                        borderRadius: 5,
                        borderColor: "lightgrey",
                      },
                    ],
                  }}
                />
              </div>
            </div>
          )}
        </Graph>
      </main>
      <Link to={`/dashboard/${transcribeUserData.name}`}>
        Back to dashboard
      </Link>
    </>
  );
}

export default Dreams;
