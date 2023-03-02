const userText = document.querySelector("#userText p");
const response = document.querySelector("#response p");
const startBTN = document.querySelector("#start");

// Initialize the Web Speech API
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.interimResults = false;

// Scrape top websites for answers
async function getAnswer(question) {
  // const url = `https://www.google.com/search?q=${encodeURIComponent(
  //   question
  // )}&ie=UTF-8`;
  // const response = await fetch(url, {
  //   headers: {
  //     "User-Agent":
  //       "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
  //   },
  // });
  // const html = await response.text();
  // const parser = new DOMParser();
  // const doc = parser.parseFromString(html, "text/html");
  // const answer = doc.querySelector('div[data-attrid="wa:/answer"]').textContent;

  if (question.match(/activate/gi)) {
    return "voice assistance is activated";
  }

  // const query = question;
  // const url = `https://api.duckduckgo.com/?q=${encodeURIComponent(
  //   query
  // )}&format=json`;

  // fetch(url)
  //   .then((response) => response.json())
  //   .then((data) => {
  //     // do something with the data here
  //     console.log("data: ", data);
  //     const answer = data;
  //     return answer;
  //   })
  //   .catch((error) => {
  //     // handle any errors here
  //     console.error(error);
  //   });

  //const answer = "A quick brown fox jumps over the lazy dogs";
}

// Capture speech input

startBTN.addEventListener("click", () => {
  recognition.start();
});

recognition.onstart = () => {
  console.log("Voice recognition started. Speak now!");
};

recognition.onresult = async (event) => {
  const speechToText = event.results[0][0].transcript;
  console.log("Speech to text:", speechToText);
  userText.textContent = speechToText;

  const answer = await getAnswer(speechToText);
  console.log("Answer:", answer);
  response.textContent = answer;

  const speech = new SpeechSynthesisUtterance(answer);
  window.speechSynthesis.speak(speech);
};

recognition.addEventListener("error", (event) => {
  console.log(`Recognition error: ${event.error}`);
});

recognition.addEventListener("end", () => {
  console.log("Speech recognition ended");
});
