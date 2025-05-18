import { Link } from "react-router-dom";


interface Page2Props {
  msg: string;
}

function Page2({ msg }: Page2Props) {
  const getUser = localStorage.getItem("currentUser");
  console.log(typeof getUser)
  const transcribeUserData = JSON.parse(getUser);
  console.log("From localStorage ", transcribeUserData.name);
  return (
    <>
      <main>
        <h1>TestPage2</h1>
        <p>{msg}</p>
        <Link to={`/dashboard/${transcribeUserData.name}`}>
          Back to main page
        </Link>
      </main>
    </>
  );
}

export default Page2;
