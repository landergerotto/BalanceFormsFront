import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import NavbarComponent from "./components/NavbarComponent/NavbarComponent";
import { Route, Routes } from "react-router-dom";
import { TimerProvider } from "./context/timercontent";

import TimerForm from "./pages/index/home";
import TimerPage from "./pages/timer/TimePage";
import FinishedPage from "./pages/final/FinishedPage";
import ValuesPage from "./pages/changevalues/ValuesPage";

function App() {
  const [count, setCount] = useState(0);

  return (
    <TimerProvider>
      <Routes>
        <Route path="/" element={<TimerForm />} />
        <Route path="/timer" element={<TimerPage />}/>
        <Route path="/final" element={<FinishedPage />}/>
        <Route path="/change_values" element={<ValuesPage />}/>
      </Routes>
    </TimerProvider>
  );
}

export default App;
