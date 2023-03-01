const startBTN = document.querySelector("#start");
const userText = document.querySelector("#userText");
let userTextContent = userText.querySelector("p").textContent;
const response = document.querySelector("#response");
let response_text = response.querySelector("p").textContent;

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

    userTextContent = transcript;

    if (userTextContent.contains("activate")) {
      response = "I am activated";
    }
  });

  if (speech == true) {
    recognition.start();
  }
});
