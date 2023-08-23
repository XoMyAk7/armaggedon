import { useEffect } from "react";
import { useActions } from "./hooks/useActions";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";

function App() {
  const { setSize } = useActions();

  const handleSubscribe = () => {
    setSize(window.innerWidth);
  };
  const onSubscribe = () => {
    window.addEventListener("resize", handleSubscribe);
  };
  const offSubscribe = () =>
    window.removeEventListener("resize", handleSubscribe);

  

  useEffect(() => {
    onSubscribe();

    return () => offSubscribe();
  }, []);

  return (
    <>
      <Header />
      <Main />
    </>
  );  
}

export default App;
