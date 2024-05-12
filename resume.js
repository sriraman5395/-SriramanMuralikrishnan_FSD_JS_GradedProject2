let searchResults = [];
let currentPage = 0;
const resultsPerPage = 1;


document.getElementById("clearButton").style.display = 'none';



function handleInput() {

    var input = document.getElementById("searchInput");
    var clearButton = document.getElementById("clearButton");

    if (input.value !== "") {

        clearButton.style.display = "block";
    } else {
        clearButton.style.display = "none";
    }
}

document.getElementById("clearButton").addEventListener("click", function () {
    document.getElementById("searchInput").value = "";
    this.style.display = "none";
});

function handleKeyPress(event) {

    if (event.key === "Enter" && document.getElementById("searchInput").value.trim() !== "") {
        search();
    }
}
function search() {
    fetch('resume.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch JSON');
            }
            return response.json();
        })
        .then(data => {
            const searchTerm = document.getElementById('searchInput').value.toLowerCase();
            searchResults = data.resume.filter(resume => resume.basics.AppliedFor.toLowerCase().includes(searchTerm));
            if (searchResults.length > 0) {
                currentPage = 0;
                showResults();

            } else {

                document.getElementById('name').textContent = 'No results found.';
                document.getElementById('resumeCard').style.display = 'block';
                document.getElementById('resumeContainer').style.display = 'none';
                document.getElementById('nextButton').style.visibility = 'hidden';
                document.getElementById('backButton').style.visibility = 'hidden';

            }
        })
        .catch(error => {
            console.error('Error fetching JSON:', error);

        });
}


function showResults() {
    const start = currentPage * resultsPerPage;
    const end = (currentPage + 1) * resultsPerPage;
    const paginatedResults = searchResults.slice(start, end);

    if (paginatedResults.length > 0) {
        document.getElementById('resumeCard').style.display = 'none';
        document.getElementById('resumeContainer').style.display = 'block';

        document.getElementById('resumeContainer').innerHTML = '';
        paginatedResults.forEach(result => populateResume(result));

        document.getElementById('nextButton').style.visibility = (searchResults.length > end) ? 'visible' : 'hidden';

        document.getElementById('backButton').style.visibility = (currentPage > 0) ? 'visible' : 'hidden';
    } else {

        document.getElementById('name').textContent = 'No results found.';
        document.getElementById('resumeCard').style.display = 'block';
        document.getElementById('resumeContainer').style.display = 'none';


    }
}

function nextPage() {
    currentPage++;
    showResults();
}
function previousPage() {
    currentPage--;
    showResults();
}




function populateResume(data) {

    const resumeCard = document.createElement('div');
    resumeCard.classList.add('resume-card');




    resumeCard.innerHTML = `
         <div class="resume-cardname" id="resumeCard">
        <div class="applicant-info">
          <div id="name" class="applicant-name">${data.basics.name}</div>
          <div id="appliedFor" class="applied-for"><strong>Applied For</strong>:${data.basics.AppliedFor}</div>
        </div>
        <span class="icon1"><span class="icon"><i class="fa-solid fa-user"></i></span>
        </div>

      <div class="divide">
        <div class="left">
      <div class="technical-skills">
        <h3 class="head">Personal Information</h3>
        <ul class="skill-list">
            <li id="phone" class="skill-item">${data.basics.phone}</li>
            <li id="email" class="skill-item">${data.basics.email}</li>
            <li id="profiles" class="skill-item"><div>LinkedIn:<a href="#"> ${data.basics.profiles.url}</a></div></li>
          </ul>
      </div>

      <div class="technical-skills">
        <h3 class="head">Technical Skills</h3>                      
        <ul id="skillKeywords" class="skill-list">
        ${data.skills.keywords.map(skill => `<li>${skill}</li>`).join('')}
    </ul>
        </div>

     <div class="technical-skills">
        <h3 class="head">Hobbies</h3>
          <ul id="skill-list" class="skill-list">
          ${data.interests.hobbies.map(hobby => `<li>${hobby}</li>`).join('')}
      </ul>
      </div>
      </div>

<div class="right">
    <div class="work-experience">
        <h3>Work Experience</h3>
        <div class="work-experience-item">
            <div id="workCompany"><strong>Company Name</strong>:${data.work['Company Name']}</div>
            <div id="workPosition"><strong>Position</strong>:${data.work.Position}</div>
            <div id="workStartDate"><strong>Start Date</strong>:${data.work['Start Date']}</div>
            <div id="workEndDate"><strong>End Date</strong>:${data.work['End Date']}</div>
            <div id="workSummary"><strong>Company Name</strong>:${data.work.Summary}</div>
          
        </div>
      </div>

      <div class="work-experience">
        <h3>Projects</h3>
        <div class="work-experience-item">
            <div id="projects"><strong>${data.projects.name}</strong> ${data.projects.description} </div>
      </div>

      <div class="work-experience">
        <h3>Education</h3>
        
            <ul id="educationList">
                <li id="ug"><strong>UG:</strong>${data.education.UG.institute}</li>
                <li id="pg"><strong>PG:</strong>${data.education['Senior Secondary'].institute}</li>
                <li id="highSchool"><strong>High school:</strong>${data.education['High School'].institute}</li>
              </ul>
         
      </div>

      
      <div class="work-experience">
        <h3>Internship</h3>
        
            <ul id="educationList">
                <li id="companyName"><strong>Company Name:</strong>${data.Internship['Company Name']}</li>
                <li id="position"><strong>Position:</strong>${data.Internship.Position}</li>
                <li id="startDate"><strong>Start Date:</strong>${data.Internship['Start Date']}</li>
                <li id="endDate"><strong>End Date:</strong>${data.Internship['End Date']}</li>
                <li id="Summary"><strong>Summary:</strong>${data.Internship.Summary}</li>
              </ul>
         
      </div>

      <div class="work-experience">
        <h3>Achievements</h3>

            <ul id="educationList">
                <li id="Achievements">${data.achievements.Summary}</li>
            </ul>
         </div>
    </div>
  </div>
  
    `;
   document.getElementById('resumeContainer').appendChild(resumeCard);
}




