const form = document.getElementById('topic-form');
const questionsContainer = document.getElementById('questions-container');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const topicInput = document.getElementById('topic-input');
  const topic = topicInput.value.trim();

  if (topic !== '') {
    // Clear previous questions
    questionsContainer.innerHTML = '';

    try {
      const data = await fetchQuestions(topic);

      const questions = data.result.problems.slice(0, 5);

      questions.forEach((question) => {
        const questionDiv = document.createElement('div');
        questionDiv.classList.add('question');

        const questionTitle = document.createElement('h3');
        questionTitle.textContent = question.name;

        const questionUrl = document.createElement('a');
        questionUrl.href = `https://codeforces.com/problemset/problem/${question.contestId}/${question.index}`;
        questionUrl.textContent = 'Go to Codeforces';

        const qrCodeContainer = document.createElement('div');
        qrCodeContainer.classList.add('qr-code');

        const qrCode = new QRCode(qrCodeContainer, {
          text: `https://codeforces.com/problemset/problem/${question.contestId}/${question.index}`,
          width: 128,
          height: 128,
        });

        questionDiv.appendChild(questionTitle);
        questionDiv.appendChild(questionUrl);
        questionDiv.appendChild(qrCodeContainer);

        questionsContainer.appendChild(questionDiv);
      });
    } catch (error) {
      console.log('Error fetching questions:', error);
    }
  }
});

async function fetchQuestions(topic) {
  const response = await fetch(`https://codeforces.com/api/problemset.problems?tags=${topic}`);
  const data = await response.json();
  return data;
}