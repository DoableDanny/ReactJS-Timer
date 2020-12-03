import "./App.css";
import { useState, useEffect, useRef } from "react";

function App() {
  const [secondsLeft, setSecondsLeft] = useState(900);
  const [timerOn, setTimerOn] = useState(false);

  // Assignments would be lost after each render. To preserve the value over time, store it in a useRef to store the mutable value in the .current property.
  let interval = useRef();

  useEffect(() => {
    if (timerOn) startTimer();

    return () => clearInterval(interval.current);
  }, [timerOn]);

  const startTimer = () => {
    interval.current = setInterval(() => {
      setSecondsLeft((secs) => {
        if (secs > 0) return secs - 1;
        else {
          clearInterval(interval.current);
          setTimerOn(false);
          return 0;
        }
      });
    }, 1000);
  };

  const clockify = () => {
    let hours = Math.floor(secondsLeft / 60 / 60);
    let mins = Math.floor((secondsLeft / 60) % 60);
    let secs = Math.floor(secondsLeft % 60);

    let clockifiedHours = hours < 10 ? "0" + hours : hours;
    let clockifiedMins = mins < 10 ? "0" + mins : mins;
    let clockifiedSecs = secs < 10 ? "0" + secs : secs;

    return {
      clockifiedHours,
      clockifiedMins,
      clockifiedSecs,
    };
  };

  // Time Selector functions
  const incrementHours = () => setSecondsLeft((secs) => secs + 3600);

  const decrementHours = () => {
    if (secondsLeft > 3600) setSecondsLeft((secs) => secs - 3600);
  };

  const incrementMins = () => setSecondsLeft((secs) => secs + 300);

  const decrementMins = () => {
    if (secondsLeft > 300) setSecondsLeft((secs) => secs - 300);
  };

  // Reset to initial state
  const reset = () => {
    setTimerOn(false);
    setSecondsLeft(900);
  };

  return (
    <div className="App">
      <section id="time-selectors">
        <div className="time-selector">
          <button onClick={incrementHours}>+1</button>
          <span>Hours</span>
          <button onClick={decrementHours}>-1</button>
        </div>
        <div className="time-selector">
          <button onClick={incrementMins}>+5</button>
          <span>Mins</span>
          <button onClick={decrementMins}>-5</button>
        </div>
      </section>

      <section id="time-left">
        <span>{clockify().clockifiedHours} Hour </span>
        <span>{clockify().clockifiedMins} Mins </span>
        <span>{clockify().clockifiedSecs} Secs</span>
      </section>

      <section id="play-pause-reset-btns-wrapper">
        <button onClick={() => setTimerOn((timerOn) => !timerOn)}>
          Play/Pause
        </button>
        <button onClick={reset}>Reset</button>
      </section>
    </div>
  );
}

export default App;
