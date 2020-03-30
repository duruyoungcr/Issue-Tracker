document.getElementById("issueInputForm").addEventListener("submit", saveIssue);

function saveIssue(e) {
  var typeOf = document.getElementById("issueTypeInput").value;
  var issueDesc = document.getElementById("issueDescInput").value;
  var issueSeverity = document.getElementById("issueSeverityInput").value;
  var issueAssignedTo = document.getElementById("issueAssignInput").value;
  var issueId = chance.guid();
  var status = "Open";

  var issue = {
    id: issueId,
    type: typeOf,
    severity: issueSeverity,
    description: issueDesc,
    assignedTo: issueAssignedTo,
    status: status
  };

  if (localStorage.getItem("issues") == null) {
    var issues = [];
    issues.unshift(issue);
    localStorage.setItem("issues", JSON.stringify(issues));
  } else {
    var issues = JSON.parse(localStorage.getItem("issues"));
    issues.unshift(issue);
    localStorage.setItem("issues", JSON.stringify(issues));
  }

  document.getElementById("issueInputForm").reset();

  fetchIssues();

  e.preventDefault();
}

function closeCase(id) {
  var issues = JSON.parse(localStorage.getItem("issues"));
  for (let i = 0; i < issues.length; i++) {
    if (issues[i].id == id) {
      issues[i].status = "Closed";
    }
  }
  localStorage.setItem("issues", JSON.stringify(issues));
  fetchIssues();
}

function editCase(id) {
  var issues = JSON.parse(localStorage.getItem("issues"));
  for (let i = 0; i < issues.length; i++) {
    if (issues[i].id == id) {
      document.getElementById("issueTypeInput").value = issues[i].type;
      document.getElementById("issueDescInput").value = issues[i].description;
      document.getElementById("issueSeverityInput").value = issues[i].severity;
      document.getElementById("issueAssignInput").value = issues[i].assignedTo;
      issues.splice(i, 1);
    }
  }
  localStorage.setItem("issues", JSON.stringify(issues));
  fetchIssues();
}

function deleteCase(id) {
  var issues = JSON.parse(localStorage.getItem("issues"));
  for (let i = 0; i < issues.length; i++) {
    if ((issues[i].id == id) & (issues[i].status == "Closed")) {
      issues.splice(i, 1);
    } else {
      alert("Kindly close case first before proceeding to delete");
    }
  }
  localStorage.setItem("issues", JSON.stringify(issues));
  fetchIssues();
}

function fetchIssues() {
  try {
    var issues = JSON.parse(localStorage.getItem("issues"));
    var issuesList = document.getElementById("issuesList");

    issuesList.innerHTML = "";

    for (let index = 0; index < issues.length; index++) {
      var type = issues[index].type;
      var desc = issues[index].description;
      var status = issues[index].status;
      var severity = issues[index].severity;
      var assignedTo = issues[index].assignedTo;
      var id = issues[index].id;
      var parent = document.getElementById("parent");
      var div = document.createElement("div");

      issuesList.innerHTML +=
        '<div class="well">' +
        "<h6>Issue ID: " +
        id +
        "</h6>" +
        '<p><span class="label label-info">' +
        " " +
        status +
        "</span></p>" +
        "<h5>" +
        type +
        "</h5>" +
        "<h3>" +
        desc +
        "</h3>" +
        '<p><span class="glyphicon glyphicon-time"></span>' +
        " " +
        severity +
        "</p>" +
        '<p><span class="glyphicon glyphicon-user"></span>' +
        assignedTo +
        "</p>" +
        '<a href="#" onclick="closeCase(\'' +
        id +
        '\')" class="btn btn-dark">Close</a>' +
        '<a href="#" onclick="editCase(\'' +
        id +
        '\')" class="btn btn-warning">Edit</a>' +
        '<a href="#" onclick="deleteCase(\'' +
        id +
        '\')" class="btn btn-danger">Delete</a>' +
        "</div>";
    }
  } catch (error) {
    console.log(error);
  }
}
