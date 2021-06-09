import styled from "styled-components";

export const Container = styled.div`
  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
  }
  .container form {
    width: 400px;
  }
  .container form h1 {
    color: cornflowerblue;
    padding: 0 0 5px;
    margin: 0;
    text-align: center;
    font-size: 3em;
  }
  .container form small {
    display: block;
    color: #616161;
    margin-bottom: 50px;
    text-align: center;
    font-size: 1em;
    font-weight: bold;
  }
`;