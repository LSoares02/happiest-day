import React from "react";
import ReactDOM from "react-dom";
import Countdown from "react-countdown";

// Random component
const Completionist = () => <h1>O dia feliz chegooooou!</h1>;

export function Timer() {
  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      return <Completionist />;
    } else {
      // Render a countdown
      return (
        <>
          <h3>Faltam só</h3>
          <h2 style={{ fontWeight: "bold" }}>
            {days} {days != 1 ? "dias" : "dia"}, {hours}{" "}
            {hours != 1 ? "horas" : "hora"}, {minutes}{" "}
            {minutes != 1 ? "minutos" : "minuto"} e {seconds}{" "}
            {seconds != 1 ? "segundos" : "segundo"}
          </h2>
          <h3>para o grande dia!</h3>
        </>
      );
    }
  };

  return (
    <Countdown date={new Date("2023-05-13 16:30:00")} renderer={renderer}>
      <Completionist />
    </Countdown>
  );
}
