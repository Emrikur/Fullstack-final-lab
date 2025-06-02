import { Link } from "react-router-dom";
import { useState } from "react";
import Aries from "../assets/zodiacs/Aries.png";
import Taurus from "../assets/zodiacs/Taurus.png";
import Leo from "../assets/zodiacs/Leo.png";
import Aquarius from "../assets/zodiacs/Aquarius.png";
import Cancer from "../assets/zodiacs/Cancer.png";
import Capricorn from "../assets/zodiacs/Capricorn.png";
import Gemini from "../assets/zodiacs/Gemini.png";
import Libra from "../assets/zodiacs/Libra.png";
import Pisces from "../assets/zodiacs/Pisces.png";
import Sagittarius from "../assets/zodiacs/Sagittarius.png";
import Scorpio from "../assets/zodiacs/Scorpio.png";
import Virgo from "../assets/zodiacs/Virgo.png";
import styled from "styled-components";
import Navbar from "../components/Navbar";

interface HoroscopeDayProps {
  date:string,
  horoscope_data:string
}
interface HoroscopeWeekProps {
  week:string,
  horoscope_data:string
}
interface HoroscopeMonthProps {
  month:string,
  horoscope_data:string
}


const ZodiacContainer = styled.div`

height:auto;
margin:15px auto;

  img {
width:300px;
    border:#f9cf4a solid 5px;
    box-shadow: 0px 0px 25px 2px #f9cf4a;
    border-radius:100%;
    padding:5px;
  }
`;

const ChooseTimespan = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  #choose-timespan-big-brother {
    display: flex;
    flex-direction: row;
    background-color: #ffd447;
    width: fit-content;
    align-items: center;
    justify-content: center;
    border: solid black 1px;

    div {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 40px;
      width: 50px;
      padding: 10px;
      color: black;

      &:hover {
        background-color: #e06f25;
      }
    }
  }

  #choose-timespan-day {
    border-right: solid black 1.5px;
  }
  #choose-timespan-week {
  }
  #choose-timespan-month {
    border-left: solid black 1.5px;
  }
`;

const ZodiacInfo = styled.div`
  padding: 15px;
  margin: 25px auto;
  width:90%;

`;
function Horoscope() {
  const getUser = localStorage.getItem("currentUser");
  //console.log(typeof getUser);
  const transcribeUserData = JSON.parse(getUser ?? "{}");
  //console.log("From localStorage ", transcribeUserData);
  const [zodiacSign] = useState(transcribeUserData.zodiac);
  const [displayTimespan, setDisplayTimespan] = useState("");
  const [, setPageUpdate] = useState(false);
  const [horoscopeDay, setHoroscopeDay] = useState<HoroscopeDayProps>({
    date:"",
    horoscope_data:"",
  });
  const [horoscopeWeek, setHoroscopeWeek] = useState<HoroscopeWeekProps>({
    week:"",
    horoscope_data:""
  });
  const [horoscopeMonth, setHoroscopeMonth] = useState<HoroscopeMonthProps>({
    month:"",
    horoscope_data:""
  });

  function handleTimespan(e: { name: string }) {
    console.log(e.name);

    if (e.name === "day") {

      (async () => {
        try {
          const dreamResponse = await fetch(
            "http://localhost:3000/horoscope/day",
            {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                horoscope: `https://horoscope-app-api.vercel.app/api/v1/get-horoscope/daily?sign=${zodiacSign}&day=TODAY`,
              }),
            }
          );

          const responseData = await dreamResponse.json();
          console.log(responseData.response);
          setHoroscopeDay(responseData.response);

          setPageUpdate((prev) => !prev);
          setDisplayTimespan("Day");
        } catch (error) {
          console.error("data is not valid", error);
        }
      })();
    } else if (e.name === "week") {
      (async () => {
        try {
          const dreamResponse = await fetch(
            "http://localhost:3000/horoscope/week",
            {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                horoscope: `https://horoscope-app-api.vercel.app/api/v1/get-horoscope/weekly?sign=${zodiacSign}`,
              }),
            }
          );

          const responseData = await dreamResponse.json();
          console.log(responseData.response);
          setHoroscopeWeek(responseData.response);

          setPageUpdate((prev) => !prev);
          setDisplayTimespan("Week");
        } catch (error) {
          console.error("data is not valid", error);
        }
      })();
    } else if (e.name === "month") {
      (async () => {
        try {
          const dreamResponse = await fetch(
            "http://localhost:3000/horoscope/month",
            {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                horoscope: `https://horoscope-app-api.vercel.app/api/v1/get-horoscope/monthly?sign=${zodiacSign}`,
              }),
            }
          );

          const responseData = await dreamResponse.json();
          console.log(responseData.response);
          setHoroscopeMonth(responseData.response);

          setPageUpdate((prev) => !prev);
          setDisplayTimespan("Month");
        } catch (error) {
          console.error("data is not valid", error);
        }
      })();
    }
  }

  return (
    <>
    <div style={{display:"flex", flexDirection:"column", alignItems:"flex-end"}}>
<Navbar/>
<Link to={`/dashboard/${transcribeUserData.name}`}>
          Back to main page
        </Link>
        </div>
      <main>
        <h1 style={{color:"#e06f25"}}>Horoscope</h1>

        <ZodiacContainer>
          {zodiacSign === "Aries" ? (
            <div>
              <img src={Aries} alt="An image of the Aries zodiac sign" />
              <h2>Aries</h2>
            </div>
          ) : zodiacSign === "Taurus" ? (
            <div>
              <img src={Taurus} alt="An image of the Taurus zodiac sign" />
              <h2>Taurus</h2>
            </div>
          ) : zodiacSign === "Gemini" ? (
            <div>
              <img src={Gemini} alt="An image of the Gemini zodiac sign" />
              <h2>Gemini</h2>
            </div>
          ) : zodiacSign === "Cancer" ? (
            <div>
              <img src={Cancer} alt="An image of the Cancer zodiac sign" />
              <h2>Cancer</h2>
            </div>
          ) : zodiacSign === "Leo" ? (
            <div>
              <img src={Leo} alt="An image of the Leo zodiac sign" />
              <h2>Leo</h2>
            </div>
          ) : zodiacSign === "Virgo" ? (
            <div>
              <img src={Virgo} alt="An image of the Virgo zodiac sign" />
              <h2>Virgo</h2>
            </div>
          ) : zodiacSign === "Libra" ? (
            <div>
              <img src={Libra} alt="An image of the Libra zodiac sign" />
              <h2>Libra</h2>
            </div>
          ) : zodiacSign === "Scorpio" ? (
            <div>
              <img src={Scorpio} alt="An image of the Scorpio zodiac sign" />
              <h2>Scorpio</h2>
            </div>
          ) : zodiacSign === "Sagittarius" ? (
            <div>
              <img src={Sagittarius} alt="An image of the Sagittarius zodiac sign" />
              <h2>Sagittarius</h2>
            </div>
          ) : zodiacSign === "Capricorn" ? (
            <div>
              <img src={Capricorn} alt="An image of the Capricorn zodiac sign" />
              <h2>Capricorn</h2>
            </div>
          ) : zodiacSign === "Aquarius" ? (
            <div>
              <img src={Aquarius} alt="An image of the Aquarius zodiac sign" />
              <h2>Aquarius</h2>
            </div>
          ) : zodiacSign === "Pisces" ? (
            <div>
              <img src={Pisces} alt="An image of the Pisces zodiac sign" />
              <h2>Pisces</h2>
            </div>
          ) : (
            <div>Nothing chosen</div>
          )}
        </ZodiacContainer>
        <ChooseTimespan>
          <div id="choose-timespan-big-brother">
            <div style={{cursor:"pointer"}}
              onClick={() => handleTimespan({ name: "day" })}
              id="choose-timespan-day"
            >
              day
            </div>
            <div
             style={{cursor:"pointer"}}
              onClick={() => handleTimespan({ name: "week" })}
              id="choose-timespan-week"
            >
              week
            </div>
            <div
             style={{cursor:"pointer"}}
              onClick={() => handleTimespan({ name: "month" })}
              id="choose-timespan-month"
            >
              month
            </div>
          </div>
        </ChooseTimespan>
        <ZodiacInfo>
          {displayTimespan === "Day" ? (
            <div>
              <h3 style={{ color: "#ffd447" }}>{horoscopeDay.date}</h3>
              <p style={{fontFamily:"sans-serif", textAlign: "left" }}>{horoscopeDay.horoscope_data}</p>
            </div>
          ) : displayTimespan === "Week" ? (
            <div key={0}>
              <h3 style={{ color: "#ffd447" }}>{horoscopeWeek.week}</h3>
              <p style={{fontFamily:"sans-serif", textAlign: "left" }}>
                {horoscopeWeek.horoscope_data}
              </p>
            </div>
          ) : displayTimespan === "Month" ? (
            <div key={0}>
              <h3 style={{ color: "#ffd447" }}>{horoscopeMonth.month}</h3>
              <p style={{ fontFamily:"sans-serif", textAlign: "left" }}>
                {horoscopeMonth.horoscope_data}
              </p>
            </div>
          ) : (
            <h2>Choose day, week or month to see your horoscope</h2>
          )}
        </ZodiacInfo>

        <Link to={`/dashboard/${transcribeUserData.name}`}>
          Back to main page
        </Link>
      </main>
    </>
  );
}

export default Horoscope;
