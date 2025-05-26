// import styled from "styled-components";
import { Link } from "react-router-dom";
import News from "../components/News"
import Arrow from "../assets/right-arrow.png"
import Logout from "../components/Navbar";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useState } from "react";

// import LoginForm from "../components/LoginForm"
const H3 = styled.h3`
text-decoration:underline;
color:#FFD447;
margin-left:25px;
`;

const Welcomer = styled.div`
  display: flex;
  gap: 15px;
  flex-direction: column;
  margin-bottom:auto;
`;

function Home() {



  const [arrowRotate, setArrowRotate] = useState(false)
  const [arrowRotate1, setArrowRotate1] = useState(false)
  const [arrowRotate2, setArrowRotate2] = useState(false)

  const handleClick = () => {

  setArrowRotate( (previous:boolean) => !previous);
}
  const handleClickA = () => {

  setArrowRotate1( (previous:boolean) => !previous);
}
const handleClickB = () => {
    setArrowRotate2((previous:boolean) => !previous)

}










  return (
    <>
    <Logout/>
      <motion.main
        style={{
          display: "flex",
          flexDirection: "column",
          marginLeft: "auto",
          marginRight: "auto",
          height: "90vh",
          alignItems: "center",
          justifyContent: "center"
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div style={{marginBottom:"auto"}}>
          <h1>Welcome to Dream Lore</h1>
        </div>
        <Welcomer>

{arrowRotate ?
<div
            style={{
              width: "70vw",
              minHeight: "14vh",
              backgroundColor: " rgb(151, 135, 171,0.7)",
              borderRadius: "3px",
            }}
            title="news"
          >

            <div style={{display:"flex", alignItems:"center", borderBottom: "solid black 2px", justifyContent:"space-around" }}>
              <H3>
                News
              </H3>
              <img onClick={handleClick} style={{transition:"transform .3s",transform:`rotate(${arrowRotate ? 90 : 0}deg)`,width:"auto",height:"18px",marginLeft:"auto", marginRight:"25px"}} src={Arrow} alt="Arrow" />
            </div>

            <div>
              <h4>Update: (0.5)</h4>
            <News/>

            </div>
          </div>
:
<div
            style={{
              width: "70vw",
              height: "auto",
              backgroundColor: " rgb(151, 135, 171,0.7)",
              borderRadius: "3px",
            }}
            title="dreams"
          >

            <div style={{display:"flex", alignItems:"center", borderBottom: "solid black 2px", justifyContent:"space-around" }}>
              <H3>
                News
              </H3>
              <img onClick={handleClick} style={{transition:"transform .3s",transform:`rotate(${arrowRotate1 ? 90 : 0}deg)`,width:"auto",height:"18px",marginLeft:"auto", marginRight:"25px"}} src={Arrow} alt="Arrow" />
            </div>

          </div>}



          {arrowRotate1 ?

            <div
            style={{
              width: "70vw",
              minHeight: "14vh",
              backgroundColor: " rgb(151, 135, 171,0.7)",
              borderRadius: "3px",
            }}
            title="dreams"
          >

            <div style={{display:"flex", alignItems:"center", borderBottom: "solid black 2px", justifyContent:"space-around" }}>
              <H3>
                <Link style={{color:"#FFD447"}} to="/Dreams">Dream Journal</Link>
              </H3>
              <img onClick={handleClickA} style={{transition:"transform .3s",transform:`rotate(${arrowRotate1 ? 90 : 0}deg)`,width:"auto",height:"18px",marginLeft:"auto", marginRight:"25px"}} src={Arrow} alt="Arrow" />
            </div>

            <div>
            <p style={{ padding: "7px",color:"#F4F1ED" }}>
              Here, you can write down your dreams and revisit past entries anytime. Capture your imagination, reflect on your thoughts, and explore your inner world.
            </p>

            </div>
          </div>
          :
          <div
            style={{
              width: "70vw",
              height: "auto",
              backgroundColor: " rgb(151, 135, 171,0.7)",
              borderRadius: "3px",
            }}
            title="dreams"
          >

            <div style={{display:"flex", alignItems:"center", borderBottom: "solid black 2px", justifyContent:"space-around" }}>
              <H3>
                <Link style={{color:"#FFD447"}} to="/Dreams">Dream Journal</Link>
              </H3>
              <img onClick={handleClickA} style={{transition:"transform .3s",transform:`rotate(${arrowRotate1 ? 90 : 0}deg)`,width:"auto",height:"18px",marginLeft:"auto", marginRight:"25px"}} src={Arrow} alt="Arrow" />
            </div>

          </div>}
          {arrowRotate2 ?
            <div
            style={{
              width: "70vw",
              minHeight: "14vh",
              backgroundColor: " rgb(151, 135, 171,0.7)",
              borderRadius: "3px",
            }}
          >

            <div style={{display:"flex", alignItems:"center", borderBottom: "solid black 2px", justifyContent:"space-around" }}>
            <H3>
              <Link style={{color:"#FFD447"}} to="/page2">Diary</Link>
            </H3>
            <img onClick={handleClickB} style={{transition:"transform .3s",transform:`rotate(${arrowRotate2 ? 90 : 0}deg)`,width:"auto",height:"18px",marginLeft:"auto", marginRight:"25px"}} src={Arrow} alt="Arrow" />

            </div>
            <div>
              <p style={{ padding: "7px",color:"#F4F1ED" }}> Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos aspernatur nostrum cum in, ipsum optio excepturi eaque temporibus praesentium ab!</p>
            </div>
          </div>
          :
          <div
            style={{
              width: "70vw",
              height: "auto",
              backgroundColor: " rgb(151, 135, 171,0.7)",
              borderRadius: "3px",
            }}
          >

            <div style={{display:"flex", alignItems:"center", borderBottom: "solid black 2px", justifyContent:"space-around" }}>
            <H3>
              <Link style={{color:"#FFD447"}} to="/page2">Diary</Link>
            </H3>
            <img onClick={handleClickB} style={{transition:"transform .3s",transform:`rotate(${arrowRotate2 ? 90 : 0}deg)`,width:"auto",height:"18px",marginLeft:"auto", marginRight:"25px"}} src={Arrow} alt="Arrow" />

            </div>
          </div>
          }
        </Welcomer>

      </motion.main>
    </>
  );
}

export default Home;
