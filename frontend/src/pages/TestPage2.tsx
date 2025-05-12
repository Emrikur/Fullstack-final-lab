


interface TestPage2Props {
  msg:string

}

function TestPage2({msg}:TestPage2Props) {
  return (
    <>
      <h1>TestPage2</h1>
      <p>{msg}</p>
    </>
  );
}

export default TestPage2;
