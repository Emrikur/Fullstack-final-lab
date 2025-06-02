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

const DisplayDreamLink = styled.div`


 p{
   background-color:#55496668;
   margin:0;
   text-align:left;
   padding: 17px;
   color:#F4F1ED;
 }
`

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
          alignItems: "center",
          marginTop:"10%",
          justifyContent: "space-between"
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div style={{marginBottom:"5rem"}}>
          <h1 style={{color:"#f2771f"}}>Welcome to Dream Lore</h1>
        </div>
        <Welcomer>

{arrowRotate ?
<div
            style={{
              width: "70vw",
              minHeight: "14vh",
              backgroundColor: " rgb(151, 135, 171,0.7)",
              borderRadius: "3px",
              marginTop:"auto"
            }}

          >

            <div style={{display:"flex", alignItems:"center", borderBottom: "solid black 2px", justifyContent:"space-around" }}>
              <H3 style={{cursor:"pointer"}} onClick={handleClick}>
                News
              </H3>
              <img onClick={handleClick} style={{transition:"transform .3s",transform:`rotate(${arrowRotate ? 90 : 0}deg)`,width:"auto",height:"18px",marginLeft:"auto", marginRight:"25px",cursor:"pointer"}} src={Arrow} alt="Arrow" />
            </div>


            <News/>


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
              <H3 style={{cursor:"pointer"}} onClick={handleClick}>
                News
              </H3>
              <img onClick={handleClick} style={{transition:"transform .3s",transform:`rotate(${arrowRotate ? 90 : 0}deg)`,width:"auto",height:"18px",marginLeft:"auto", marginRight:"25px",cursor:"pointer"}} src={Arrow} alt="Arrow" />
            </div>

          </div>}



          {arrowRotate1 ?

            <div
            style={{
              width: "70vw",
              minHeight: "14vh",
              backgroundColor: " rgb(151, 135, 171, 0.7)",
              borderRadius: "3px",
            }}

          >

            <div style={{display:"flex", alignItems:"center", borderBottom: "solid black 2px", justifyContent:"space-around" }}>
              <H3>
                <Link style={{color:"#FFD447"}} to="/Dreams">Dream Journal</Link>
              </H3>
              <img onClick={handleClickA} style={{transition:"transform .3s",transform:`rotate(${arrowRotate1 ? 90 : 0}deg)`,width:"auto",height:"18px",marginLeft:"auto", marginRight:"25px",cursor:"pointer"}} src={Arrow} alt="Arrow" />
            </div>

            <DisplayDreamLink>
            <p>
              Here, you can write down your dreams and revisit past entries anytime. Capture your imagination, reflect on your thoughts, and explore your inner world.
            </p>

            </DisplayDreamLink>
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
                <Link style={{color:"#FFD447"}} to="/Dreams">Dream Journal</Link>
              </H3>
              <img onClick={handleClickA} style={{transition:"transform .3s",transform:`rotate(${arrowRotate1 ? 90 : 0}deg)`,width:"auto",height:"18px",marginLeft:"auto", marginRight:"25px",cursor:"pointer"}} src={Arrow} alt="Arrow" />
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
              <Link style={{color:"#FFD447"}} to="/page2">Horoscope</Link>
            </H3>
            <img onClick={handleClickB} style={{transition:"transform .3s",transform:`rotate(${arrowRotate2 ? 90 : 0}deg)`,width:"auto",height:"18px",marginLeft:"auto", marginRight:"25px",cursor:"pointer"}} src={Arrow} alt="Arrow" />

            </div>
            <div>
              <p style={{textAlign:"left", padding: "17px", margin:"0",color:"#F4F1ED",backgroundColor:"#55496668" }}> Welcome to your personalized horoscope feature, where the stars guide you through life’s twists and turns. <br />Choose between daily, weekly, or monthly insights tailored to your zodiac sign. Whether you want a quick glimpse <br />or a broader forecast, the universe has something just for you.</p>
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
              <Link style={{color:"#FFD447"}} to="/horoscope">Horoscope</Link>
            </H3>
            <img onClick={handleClickB} style={{transition:"transform .3s",transform:`rotate(${arrowRotate2 ? 90 : 0}deg)`,width:"auto",height:"18px",marginLeft:"auto", marginRight:"25px",cursor:"pointer"}} src={Arrow} alt="Arrow" />

            </div>
          </div>
          }
        </Welcomer>


      </motion.main>
      <footer><p style={{marginTop:"20vh"}}>All Rights Reserved by <br />the DreamLore Company©</p></footer>
    </>
  );
}

export default Home;
