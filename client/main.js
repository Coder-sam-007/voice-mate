const userText = document.querySelector("#user-text");
const response_text = document.querySelector("#response-text");
const startBTN = document.querySelector("#start");

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.interimResults = false;

const getAnswear = async (question) => {
  const response = await fetch("https://voice-mate.onrender.com", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt: question,
    }),
  });

  if (response.ok) {
    const data = await response.json();
    const parsedData = data.bot.trim();

    return parsedData;
  } else {
    const err = await response.text();
    return `something wrong happened.. \nthe error is ${err}`;
  }
};

startBTN.addEventListener("click", () => {
  recognition.start();
});

recognition.onstart = () => {
  console.log("Voice recognition started. Speak now!");
};

recognition.onresult = async (event) => {
  const speechToText = event.results[0][0].transcript;
  userText.textContent = speechToText;
  let question = userText.textContent;

  const answer = await getAnswear(question);
  response_text.textContent = answer;

  const speech = new SpeechSynthesisUtterance(answer);
  window.speechSynthesis.speak(speech);
};

recognition.addEventListener("error", (event) => {
  console.log(`Recognition error: ${event.error}`);
});

recognition.addEventListener("end", () => {
  console.log("Speech recognition ended");
});
