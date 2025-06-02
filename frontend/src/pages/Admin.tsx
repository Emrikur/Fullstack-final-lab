import { Link } from "react-router-dom";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import News from "../components/News";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

interface AdminProps {
  feature: string;
  opti: string;
  upcoming: string;
}

const Heading = styled.h1`
  margin-left: auto;
  margin-right: auto;
  color:#f2771f;
`;

const AdminToolsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 3fr;
`;

const SafetyMessageBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: fit-content;
  padding: 25px;
  margin-left: auto;
  margin-right: auto;
  border: solid #f2771f 2px;
`;

const SafetyButtonBox = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-around;
  padding: 15px;
  width: 100%;
`;
const SafeButton = styled.button`
  margin-top: 10px;
  background-color: #ffd447;
  height: fit-content;
  width: 50%;
  border-radius: 5px;
  cursor: pointer;
`;

function Admin() {
  const getUser = localStorage.getItem("currentUser");
  const activeUser = JSON.parse(getUser ?? "{}");

  // console.log("active User " + activeUser.id);

  const [featureInput, setFeatureInput] = useState("");
  const [optiInput, setOptiInput] = useState("");
  const [upcomingInput, setUpcomingInput] = useState("");
  const [safetyBox, setSafetyBox] = useState(false);
  const [, setDeclarePost] = useState(false);
  const [theFormData, setTheFormData] = useState<AdminProps>({
    feature: "",
    opti: "",
    upcoming: "",
  });
  const [, setUpdatePost] = useState(false);
  const [postRes, setPostRes] = useState("");

  const patchUpdated = () => toast(`${postRes}`);


  function AdminPost(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    //console.log("Data "+  data.feature +" "+ data.opti + " " + data.upcoming);
    setTheFormData({feature:`${data.feature}`, opti:`${data.opti}`, upcoming:`${data.upcoming}`});
    //console.log(theFormData);
    setSafetyBox(true);
    setUpdatePost((prev) => !prev);
  }

  function ContinuePost() {
    (async () => {
      try {
        const tokenResponse = await fetch(
          "http://localhost:3000/accounts/admin",
          {
            method: "PUT",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              user_id: activeUser.id,
              feature: theFormData.feature,
              optimization: theFormData.opti,
              upcoming: theFormData.upcoming,
            }),
          }
        );

        const updatedPost = await tokenResponse.text();
        //console.log(updatedPost);

        if (updatedPost) {
          //console.log("post updated", updatedPost);
          setPostRes(updatedPost);
          setFeatureInput("");
          setOptiInput("");
          setUpcomingInput("");
          //console.log(theFormData.feature);
          setSafetyBox(false);
          setDeclarePost(true);
          setUpdatePost((prev) => !prev);
          patchUpdated();
        } else {
          setSafetyBox(false);
        }
      } catch (error) {
        console.error("data is not valid", error);
      }
    })();
  }

  function Feature(e: { target: { value: string } }) {
    setFeatureInput(e.target.value);
  }
  function Optimization(e: { target: { value: string } }) {
    setOptiInput(e.target.value);
  }
  function Upcoming(e: { target: { value: string } }) {
    setUpcomingInput(e.target.value);
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          margin: "0",
        }}
      >
        <Navbar />
        <Link to={`/dashboard/${activeUser.name}`}>Back to dashboard</Link>
      </div>

      <Heading>Admin Tools</Heading>

      {safetyBox === false ? (
        <form onSubmit={AdminPost}>
          <AdminToolsGrid>
            <div style={{ height: "fit-content" }}>
              <p style={{color:"#f2771f"}}>Feature:</p>
              <textarea
                onChange={Feature}
                placeholder="New feature.."
                style={{ resize: "none", width: "80%", height: "50%" }}
                name="feature"

                value={featureInput}
              ></textarea>
            </div>
            <div style={{ height: "fit-content" }}>
              <p style={{color:"#f2771f"}}>Optimization:</p>
              <textarea
                onChange={Optimization}
                placeholder="Page optimization.."
                style={{ resize: "none", width: "80%", height: "50%" }}
                name="opti"

                value={optiInput}
              ></textarea>
            </div>
            <div
              style={{
                height: "fit-content",
                gridColumnStart: "1",
                gridColumnEnd: "3",
              }}
            >
              <p style={{color:"#f2771f"}}>Upcoming:</p>
              <textarea
                onChange={Upcoming}
                placeholder="Upcoming features/fixes.."
                style={{ resize: "none", width: "80%", height: "50%" }}
                name="upcoming"

                value={upcomingInput}
              ></textarea>
            </div>
            <div style={{ gridColumnStart: 1, gridColumnEnd: 3 }}></div>
            <div style={{ gridColumnStart: "1", gridColumnEnd: "3" }}>
              <input
                style={{
                  marginTop: "10px",
                  backgroundColor: "#FFD447",
                  height: "30px",
                  width: "30%",
                  borderRadius: "5px",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
                type="submit"
              />
            </div>
          </AdminToolsGrid>
        </form>
      ) : (
        <SafetyMessageBox>
          <p>Are you sure you want to update dev info?</p>
          <SafetyButtonBox>
            <SafeButton
              onClick={ContinuePost}
              style={{
                marginTop: "10px",
                backgroundColor: "#FFD447",
                height: "fit-content",
                width: "30%",
                borderRadius: "5px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Yes
            </SafeButton>
            <SafeButton
              onClick={() => setSafetyBox(false)}
              style={{
                marginTop: "10px",
                backgroundColor: "#FFD447",
                height: "fit-content",
                width: "30%",
                borderRadius: "5px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              No
            </SafeButton>
          </SafetyButtonBox>
        </SafetyMessageBox>
      )}
      <ToastContainer theme="dark" />
      <div
        style={{ marginBottom: "20px", marginTop: "55px", border: "solid 2px#f2771f" }}
      >
        <News />
      </div>

      <footer>
        <p style={{ marginBottom: "35px" }}>
          All Rights Reserved by <br />
          the DreamLore Company©
        </p>
      </footer>
    </>
  );
}

export default Admin;
