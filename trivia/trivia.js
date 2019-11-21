window.onload = function() {
  collapsible();
  this.showElement("trivia_config");
  this.toggleElement("trivia_config");
  this.hideElement("trivia_questions");
  this.hideElement("trivia_results");
};

function getTrivia() {
  var resultElement = document.getElementById("questions_placeholder");
  resultElement.innerHTML = "";

  axios
    .get(defineURL())
    .then(function(response) {
      console.log(response);
      resultElement.innerHTML = generateSuccessHTMLOutput(response);
      this.showElement("trivia_questions");
      this.toggleElement("trivia_questions");
      this.toggleElement("trivia_config");
    })
    .catch(function(error) {
      console.error(error);
      resultElement.innerHTML = generateErrorHTMLOutput(error);
    });
}

function defineURL() {
  const url = new URL("https://opentdb.com/api.php?");
  let params = new URLSearchParams();

  var amount = document.getElementById("trivia_amount").value;
  var category = document.getElementById("trivia_category").value;
  var difficulty = document.getElementById("trivia_difficulty").value;
  var type = document.getElementById("trivia_type").value;
  //Add parameters
  if (amount > 0 && amount <= 50) params.append("amount", amount);
  if (category != "any") params.append("category", category);
  if (difficulty != "any") params.append("difficulty", difficulty);
  if (type != "any") params.append("type", type);

  return url + params.toString();
}

function generateSuccessHTMLOutput(response) {
  let data = response.data;
  let questions = [];

  if (data.results) {
    let id = 0;
    questions.push("<div>");
    data.results.forEach(element => {
      questions.push(questionFormat(element, ++id));
    });
    questions.push("</div>");
  }

  return questions.join("");
}
function questionFormat(result, id) {
  let q = [];

  q.push("<div class='card form-group question'>");
  q.push("<div class='card-header'>Question  #" + id + "</div>");
  q.push("<div class='card-body'>");
  q.push("Category:  <em>" + result.category + "</em> ");
  q.push("<h5>");
  q.push(result.question);
  q.push("<span class='stat stat-C'></span></h5>");
  q.push("<h6>Answers:</h6>");

  q.push(
    answerFormat(result, id, result.correct_answer, result.incorrect_answers)
  );
  q.push("</div>"); //card body
  q.push("</div>"); // card main
  return q.join("");
}

function answerFormat(result, id, correct, incorrect) {
  let q = [];
  let a = [];
  let g = [];

  a.push("<div class='form-check'>");
  a.push("<label class='form-check-label'>");
  a.push(
    "<input class='form-check-input' type='radio' name='q_" +
      id +
      "' value='true'>"
  );
  a.push(correct + "<span class='stat stat-IC'></span></label>");
  a.push("</div>");
  q.push(a.join("\n"));

  incorrect.forEach(ans => {
    a = [];
    a.push("<div class='form-check'>");
    a.push("<label class='form-check-label'>");
    a.push(
      "<input class='form-check-input' type='radio' name='q_" +
        id +
        "' value='false'>"
    );
    a.push(ans + "<span class='stat stat-IC'></span></label>");
    a.push("</div>");
    q.push(a.join("\n"));
  });

  // shuffels the order of answers
  q = shuffleArray(q);

  g.push("<div class='input-group'>");
  g.push(q.join(""));
  g.push("</div>");
  return g.join("");
}

function generateErrorHTMLOutput(error) {
  return (
    "<h4>Result</h4>" +
    "<h5>Message:</h5> " +
    "<pre>" +
    error.message +
    "</pre>" +
    "<h5>Status:</h5> " +
    "<pre>" +
    error.response.status +
    " " +
    error.response.statusText +
    "</pre>" +
    "<h5>Headers:</h5>" +
    "<pre>" +
    JSON.stringify(error.response.headers, null, "\t") +
    "</pre>" +
    "<h5>Data:</h5>" +
    "<pre>" +
    JSON.stringify(error.response.data, null, "\t") +
    "</pre>"
  );
}
/**
 * 
 * provides the collapsible bars with an event listener 
 */
function collapsible() {
  var coll = document.getElementsByClassName("collapsible");
  var i;

  for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function() {
      this.classList.toggle("active");
      var content = this.nextElementSibling;
      if (content.style.maxHeight) {
        content.style.maxHeight = null;
      } else {
        content.style.maxHeight = content.scrollHeight + "px";
      }
    });
  }
};

/**
 * Randomize array element order in-place.
 * Using Durstenfeld shuffle algorithm.
 */
function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}
/**
 * Validating questions
 */
function validate() {
  $questions = $(".question");
  ($correct = 0), ($incorrect = 0), ($unanswerd = 0);
  clearIcons();
  $questions.each(function() {
    var answer = $(this).find("input:checked"),
      key = answer.attr("name"),
      val = answer.attr("value");

    if (answer.length === 0) {
      markIncorrect($(".stat-C",this));
      $unanswerd++;
    } else if (val == "false") {
      markIncorrect($("stat-C",this));
      $incorrect++;
    } else {
      markCorrect(answer.parent());
      $correct++;
    }
  });
  var resultContent = document.getElementById("result");
  resultContent.innerHTML = "";
  var result = document.createElement("div");
  result.className = "from-group";

  var h = document.createElement("h4");
  h.innerHTML = "Correct answers: " + $correct;
  result.appendChild(h);

  if ($incorrect > 0) {
    h = document.createElement("h4");
    h.innerHTML = "Incorrect answers: " + $incorrect;
    result.appendChild(h);
  }
  if ($unanswerd > 0) {
    h = document.createElement("h4");
    h.innerHTML = "Unanswerd answers: " + $unanswerd;
    result.appendChild(h);
  }
  resultContent.append(result);
  showElement("trivia_results");
  toggleElement("trivia_questions");
}

function markIncorrect(el) {
  var i = document.createElement("i");
  i.style.color = "red";
  i.className = "far fa-times-circle";
  el.append(i);
}

function markCorrect(el) {
  var i = document.createElement("i");
  i.style.color = "green";
  i.className = "far fa-check-circle";
  el.append(i);
}

/**
 * Helper methods
 */

function showHideElements(show, hide) {
  document.getElementById(show).style.display = "block";
  document.getElementById(hide).style.display = "none";
}


function showElement(show) {
  document.getElementById(show).style.display = "block";
  //this.toggleElement(show);
}
function hideElement(hide) {
  document.getElementById(hide).style.display = "none";
  //this.toggleElement(hide);
}

function toggleElement(elementId) {
  $(".collapsible", '#'+elementId).click();
}

function clearIcons(){
  document.getElementsByClassName("stat").innerHTML = " ";
}