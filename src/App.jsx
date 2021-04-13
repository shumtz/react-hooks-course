import { createContext, useContext, useState } from "react"

const globalState = {
  title: "O titulo do contexto",
  body: "O body do contexto",
  counter: 0
}

const GlobalContext = createContext();

const Div = ({ children }) => {
  return (
    <>
    <H1 />
    <P />
    </>
  )
}

const H1 = () => {
  const theContext = useContext(GlobalContext);
  const { title, counter } = theContext.providerState;

  return (
    <h1>{title}, {counter}</h1>
  )
}

const P = () => {
  const theContext = useContext(GlobalContext);
  const { body } = theContext.providerState;
  const { setProviderState } = theContext;

  return (
    <p onClick={() => setProviderState((s) => ({ ...s, counter: s.counter + 1 }))}>{body}</p>
  )
}

const App = () => {
  const [providerState, setProviderState] = useState(globalState);

  return (
    <GlobalContext.Provider value={{ providerState, setProviderState }}>
      <Div />
    </GlobalContext.Provider>
  );
}

export default App;
