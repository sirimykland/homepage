function validate() {
  $questions = $(".question");
  $correct = 0, $incorrect = 0, $unanswerd = 0;
  $questions.each(function() {
    var answer = $(this).find("input:checked"),
      key = answer.attr("name"),
      val = answer.attr("value");
    console.log(val + " - answer.length " + answer.length);
    if (answer.length === 0) {
      markIncorrect($(this).find("h5"));
      $unanswerd++;
    } else if (val == "false") {
      markIncorrect($(this).find("h5"));
      $incorrect++;
    } else {
      markCorrect(answer.parent());
      $correct++;
    }
  });
  var trivia_results = document.getElementById("trivia_results")
  var resultElement = document.createElement("div");
  resultElement.className = "from-group"

    var h = document.createElement('h4');
    h.innerHTML = "Correct answers: " + $correct;
    resultElement.appendChild(h);

  if ($incorrect > 0) {
    h = document.createElement('h4');
    h.innerHTML = "Incorrect answers: " + $incorrect;
    resultElement.appendChild(h);
  }
  if ($unanswerd > 0) {
    h = document.createElement('h4');
    h.innerHTML = "Unanswerd answers: " + $unanswerd;
    resultElement.appendChild(h);
  }
  trivia_results.append(resultElement);
  trivia_results.style.display = "block";
}

function markIncorrect(el) {
  var i = document.createElement("i");
  i.style.color = "red";
  i.className = "far fa-times-circle";

  el.append(i);
}

function markCorrect(el) {
  el.append('<i class="far fa-check-circle"></i>');
  var i = document.createElement("i");
  i.style.color = "green";
  i.className = "far fa-check-circle";

  el.append(i);
}
function showConfiguration() {
  document.getElementById("trivia_config").style.display = "block";
  document.getElementById("showConfig_btn").style.display = "none";
  document.getElementById("hideConfig_btn").style.display = "block";
}
function hideConfiguration() {
  document.getElementById("trivia_config").style.display = "none";
  document.getElementById("showConfig_btn").style.display = "block";
  document.getElementById("hideConfig_btn").style.display = "none";
}

function showAnswers() {
  document.getElementById("trivia_questions").style.display = "block";
}
function hideAnswers() {
  document.getElementById("trivia_questions").style.display = "none";
}
