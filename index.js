// "questionNumber" is 0-based internally to be "array-friendly"
let questionNumber = 0;
let score = 0;

// Show the quiz results to the user
function renderResults()
{
  // Get the total number of questions
  let numQuestions = STORE.length;
  
  if (score >= 8)
  {
    $('.questionAnswerForm').html(`<div class="results feedback"><h3>Congratulations! You're a guitarist aficionado!</h3><img src="https://upload.wikimedia.org/wikipedia/en/b/b2/Jimi_Hendrix_burning_his_guitar_at_the_Monterey_Pop_Festival%2C_June_18%2C_1967.jpg" alt="Jimi Hendrix burning guitar"><p>You got ${score} / ${numQuestions}</p><p>You're red hot in your knowledge of guitarists!</p><button class="restartButton">Restart Quiz</button></div>`);
  }
  else if (score < 8 && score >= 5)
  {
    $('.questionAnswerForm').html(`<div class="results feedback"><h3>Almost there!</h3><img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Jimmy_Page_early.jpg" alt="Jimmy Page with double-neck guitar"><p>You got ${score} / ${numQuestions}</p><p>Double up on your guitarist knowledge, and soon you'll be an aficionado!</p><button class="restartButton">Restart Quiz</button></div>`);
  }
  else
  {
    $('.questionAnswerForm').html(`<div class="results feedback"><h3>Nerd!</h3><img src="https://upload.wikimedia.org/wikipedia/commons/0/08/Nerd_11.jpg" alt="Boy dressed as nerd"><p>You got ${score} / ${numQuestions}</p><p>You don't get out much, do you?</p><button class="restartButton">Restart Quiz</button></div>`);
  }
}

// Generate the HTML code for the Question
function generateQuestionHTML()
{
  if (questionNumber < STORE.length)
  {
    return `<div class="question-${questionNumber}">
      <h2>${STORE[questionNumber].question}</h2>
      <form role="form">
        <fieldset>
          <legend>Please select one of the answers below:</legend>
          <label class="answerOption">
            <input type="radio" value="${STORE[questionNumber].answers[0]}" name="answer" required>
            <span>${STORE[questionNumber].answers[0]}</span>
          </label>
          <label class="answerOption">
            <input type="radio" value="${STORE[questionNumber].answers[1]}" name="answer" required>
            <span>${STORE[questionNumber].answers[1]}</span>
          </label>
          <label class="answerOption">
            <input type="radio" value="${STORE[questionNumber].answers[2]}" name="answer" required>
            <span>${STORE[questionNumber].answers[2]}</span>
          </label>
          <label class="answerOption">
            <input type="radio" value="${STORE[questionNumber].answers[3]}" name="answer" required>
            <span>${STORE[questionNumber].answers[3]}</span>
          </label>
        </fieldset>
        <button type="submit" class="submitButton">Submit</button>
      </form>
    </div>`;
  }
  else
  {
    renderResults();
  }
}

// Render the Question
function renderQuestion()
{
  $('.questionAnswerForm').html(generateQuestionHTML());
}

// Generate and display feedback when user is correct
function userAnswerFeedbackCorrect()
{
  let correctAnswer = `${STORE[questionNumber].correctAnswer}`;
  
  $('.questionAnswerForm').html(`<div class="feedback"><div class="icon"><img src="${STORE[questionNumber].icon}" alt="${STORE[questionNumber].alt}"/></div><p><b>Correct!</b></p><button type=button class="nextButton">Next</button></div>`);
}

// Increment the user's score and display their new score
function incrementScore()
{
  score++;
  $('.score').text(score);
}

// Generate and display feedback when user is wrong
function userAnswerFeedbackWrong()
{
  let correctAnswer = `${STORE[questionNumber].correctAnswer}`;
  
  $('.questionAnswerForm').html(`<div class="feedback"><div class="icon"><img src="${STORE[questionNumber].icon}" alt="${STORE[questionNumber].alt}"/></div><p><b>Incorrect!</b><br>The correct answer is: <span>"${correctAnswer}"</span></p><button type=button class="nextButton">Next</button></div>`);
}

// Wait for user's selection and give feedback
function listenForSubmitClickAndHandle()
{
  $('form').on('submit', function (event)
  {
    // Prevent form's default behavior of sending data to a server
    event.preventDefault();
    
    // Get the user's selected answer
    let selected = $('input:checked');
    let answer = selected.val();
    
    // Get the correct answer from the data store
    let correctAnswer = `${STORE[questionNumber].correctAnswer}`;
    
    // Give feedback on whether it's correct or wrong
    if (answer === correctAnswer)
    {
      userAnswerFeedbackCorrect();
      
      // Add a point to the user's score
      incrementScore();
    }
    else
    {
      userAnswerFeedbackWrong();
    }
  });
}

// Handle the current question
function handleQuestion()
{
  // Internal question number is zero-based,
  //  so add one for the displayed number
  //  and update it (if the quiz isn't yet complete)
  if (questionNumber < STORE.length)
  {
    let displayQuestionNumber = questionNumber + 1;
    $('.questionNumber').text(displayQuestionNumber);
  }
  
  // Render the current question
  renderQuestion();
  
  // Wait for the user to submit their answer, then
  //  give feedback on whether it's correct or wrong
  listenForSubmitClickAndHandle();
}

// Handle when the user clicks "Start"
function handleStartClick()
{
  // Hide the Start Page
  $('.startPage').hide();
  
  // Show the Question Page
  $('.questionAnswerForm').show();
  
  // Handle the first question
  handleQuestion();
}

// Handle when the user clicks "Next"
function handleNextClick()
{
  // Increment the question number
  questionNumber++;
  
  // Handle the next question
  handleQuestion();
}

// Zero-out the "Score Display"
function zeroOutScoreDisplay()
{
  // Zero-out the question number
  $('.questionNumber').text(0);
  
  // Set the total number of questions
  $('.numQuestions').text(STORE.length);
  
  // Zero-out the user's score
  $('.score').text(0);
}

// Handle when the user clicks "Restart"
function handleRestartClick()
{
  // Reset the internal Question Number and Score values to zero
  questionNumber = 0;
  score = 0;
  
  // Zero-out the "Score Display"
  zeroOutScoreDisplay();
  
  // Hide the Question Page
  $('.questionAnswerForm').hide();
  
  // Show the Start Page
  $('.startPage').show();
}

// Render the Start Page
function renderStartPage()
{
  $('.startPage').html(`<h1>Think you know guitarists? Click the "Start" button below to find out!</h1>
    <button type="button" class="startButton">Start</button>`);
}

// Once the page finishes loading,
//  1) Bind the button event listeners
//  2) Zero-out the Score Display
//  3) Render the Start Page
function handlePageLoad()
{
  // Bind "Start" button event listener
  $('.startPage').on('click', '.startButton', function(event)
  {
    handleStartClick();
  });
  
  // Bind "Next" button event listener
  $('main').on('click', '.nextButton', function(event)
  {
    handleNextClick();
  });
  
  // Bind "Restart" button event listener
  $('main').on('click', '.restartButton', function(event)
  {
    handleRestartClick();
  });
  
  // Zero-out the "Score Display"
  zeroOutScoreDisplay();
  
  // Render the Start Page html
  renderStartPage();
}

$(handlePageLoad);
