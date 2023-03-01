const userText = document.querySelector("#userText");
const startBTN = document.querySelector("#start");

startBTN.addEventListener("click", function () {
  let speech = true;
  window.SpeechRecognition = window.webkitSpeechRecognition;

  const recognition = new SpeechRecognition();
  recognition.interimResults = true;

  recognition.addEventListener("result", (e) => {
    const transcript = Array.from(e.results)
      .map((result) => result[0])
      .map((result) => result.transcript)
      .join("");

    userText.querySelector("p").textContent = transcript;
  });

  if (speech == true) {
    recognition.start();
  }
});
