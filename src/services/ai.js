function msgArrayToString(arr) {
  let result = "";
  const lastIndex = arr.length - 1;

  for (let i = 0; i < arr.length; i++) {
    const { text, type } = arr[i];
    result += `- ${type}: ${text}`;

    if (i !== lastIndex) {
      result += "\n";
    }
  }

  return result;
}

export const aiRespond = async (key, word, messages) => {
  const newMessages = msgArrayToString(messages);

  const data = JSON.stringify({
    model: "command",
    prompt: `
You have to respond with a "yes"  or "no" to all questions, The user is like akinator.
You have to keep a conversation.
Motivate the user with emojis or some phrases at the end of your response to keep motivated the user.
The emojis are only motivational, they are not related to the word.

---
word: chair

- user: can be found in a house?
- ai: Yes. You are on the good track! 🤙😀
- user: is it a pet?
- ai: No. Keep trying! ⚡️
- user: it's an object
- ai: Yes. You are geting closer to the word that I am thinking! 😎
- user: is it a furniture?
- ai: Yes, You are very close!
- user: it's a chair!
- ai: Great! You did it!
---
word: banana

- user: is it a fruit?
- ai: Yes! You're doing great! 🍌👍
- user: can it be eaten raw?
- ai: Absolutely! You're on fire! 🔥🌟
- user: is it yellow when ripe?
- ai: Yes, it is! Keep going! 🟡😄
- user: is it commonly found in tropical regions?
- ai: You nailed it! 🏝️🌴
- user: It's a banana!
- ai: Bingo! You got it! 🎉🎊
---
word: elephant

- user: is it a wild animal?
- ai: Yes! You're on the right track! 🦓👏
- user: does it have a long trunk?
- ai: Exactly! You're doing fantastic! 🐘💪
- user: is it known for its exceptional memory?
- ai: Yes, that's right! Keep going! 🧠🌟
- user: is it larger than a car?
- ai: You got it! 🚗🐘
- user: It's an elephant!
- ai: Well done! You nailed it! 🎉👍
---
word: computer

- user: can it perform calculations?
- ai: Yes! You're on the right path! 🧮💻
- user: is it an electronic device?
- ai: Absolutely! You're doing great! 🔌😄
- user: can it browse the internet?
- ai: Yes, it can! Keep going! 🌐🚀
- user: is it used for word processing and spreadsheets?
- ai: That's correct! You're a pro at this! 📝📊
- user: It's a computer!
- ai: Fantastic! You did it! 🎉🥳
---
word: ${word}

${newMessages}
---
`,
    max_tokens: 300,
    temperature: 0.9,
    k: 0,
    stop_sequences: [],
    return_likelihoods: "NONE",
  });
  const response = await fetch("https://api.cohere.ai/v1/generate", {
    method: "POST",
    headers: {
      Authorization: `BEARER ${key}`,
      "Content-Type": "application/json",
    },
    body: data,
  }).then(async (res) => await res.json());

  return await response.generations[0].text;
};
