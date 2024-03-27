document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('chat-form');
  const chatInput = document.getElementById('chat-input');
  const chatOutput = document.getElementById('chat-output');

  form.addEventListener('submit', function(event) {
    event.preventDefault();
    const question = chatInput.value;
    axios.post('/ask', { question })
      .then(function(response) {
        const answer = response.data.answer; // Assuming the API responds with an object containing an 'answer' field
        chatOutput.innerHTML += `<div class="chat-message"><strong>You:</strong> ${question}</div>`;
        chatOutput.innerHTML += `<div class="chat-message"><strong>Support:</strong> ${answer}</div>`;
        chatInput.value = ''; // Clear the input after sending
        chatOutput.scrollTop = chatOutput.scrollHeight; // Scroll to the bottom
      })
      .catch(function(error) {
        console.error('Error during chat message submission:', error);
        chatOutput.innerHTML += `<div class="chat-message"><strong>Error:</strong> Could not get an answer at this time.</div>`;
      });
  });
});