function getTrivia() {
  var resultElement = document.getElementById("trivia_container");
  resultElement.innerHTML = "";

  axios
    .get(defineURL())
    .then(function(response) {
      console.log(response);
      resultElement.innerHTML = generateSuccessHTMLOutput(response);
    })
    .catch(function(error) {
      console.error(error);
      resultElement.innerHTML = generateErrorHTMLOutput(error);
    });
}

function defineURL() {
  let url = new URL("https://opentdb.com/api.php?");
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
    questions.push("<form>");
    data.results.forEach(element => {
      //console.log(element);
      questions.push(questionFormat(element, ++id));
    });
    questions.push("</form>");
  }

  return questions.join("");
}
function questionFormat(result, id) {
  let q = [];

  q.push("<div class='card form-group question'>");
  q.push("<div class='card-header'>Question  #" + id + "</div>");
  q.push("<div class='card-body'>");
  q.push("Category:  <em>"+result.category+"</em> ");
  q.push("<h5>");
  q.push(result.question);
  q.push("</h5>");
  q.push("<h6>Answers:</h6>");

  q.push(
    answerFormat(result, id, result.correct_answer, result.incorrect_answers)
  );
  q.push("</div>");//card body
  q.push("</div>");// card main
  return q.join("");
}

function answerFormat(result, id, correct, incorrect) {
  let q = [];
  let a = [];
  let g=[];

  a.push("<div class='form-check'>");
  a.push("<input class='form-check-input' type='radio' name='q_" + id + "' value='true'>");
  a.push("<label class='form-check-label' for='q_" + id + "'>" + correct + "</label>");
  a.push("</div>");
  q.push(a.join('\n'));

  incorrect.forEach(ans => {
    a = [];
    a.push("<div class='form-check'>");
    a.push("<input class='form-check-input' type='radio' name='q_" + id + "' value='false'>");
    a.push("<label class='form-check-label' for='q_" + id + "'>" + ans + "</label>");
    a.push("</div>");
    q.push(a.join('\n'));
  });



  // shuffels the order of answers
  q = shuffleArray(q);
  


  g.push("<div class='input-group'>");
  g.push(q.join(''));
  g.push("</div>");
  return g.join("");
}

function generateSuccessHTMLOutput1(response) {
  return (
    "<h4>Result</h4>" +
    "<h5>Status:</h5> " +
    "<pre>" +
    response.status +
    " " +
    response.statusText +
    "</pre>" +
    "<h5>Headers:</h5>" +
    "<pre>" +
    JSON.stringify(response.headers, null, "\t") +
    "</pre>" +
    "<h5>Data:</h5>" +
    "<pre>" +
    JSON.stringify(response.data, null, "\t") +
    "</pre>"
  );
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
