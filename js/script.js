/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
   
/***
 Decided to use "var" for storing global variables
https://codeburst.io/difference-between-var-let-and-const-in-javascript-fbce2fba7b4
but not sure is that Semantically correc?
***/

var studentList = document.getElementsByClassName('student-item cf');
var studentsPerPage = 10;


/** 
 * Creating SarchDiv, searchInput  and searchButton
 * 
*/
const header = document.querySelector(".page-header");
const searchDiv = document.createElement('div');
header.appendChild(searchDiv);
searchDiv.className = "student-search";


const searchInput = document.createElement('input');
searchDiv.appendChild(searchInput);
searchInput.type = "text";
searchInput.placeholder = "Search Students...";


const searchButton = document.createElement('button');
searchButton.type = "button";
searchDiv.appendChild(searchButton);
searchButton.textContent = "Search";



/***
 * showPage function displays the right ammount of elements (declared in global variable),
 * and hides the rest of content. The idea is to loop through all elemnts of selected HTML
 * to establish is the "index" of each element in categopry hidden or displayed. To hide
 * HTML elents they are styled by DOM manipulation ".style.display = 'none'", rest of elements
 * are "uneffected" by loop execution.
 */

const showPage = (list, page) => {

   let firstStudent = (page * studentsPerPage) - studentsPerPage;
   let lastStudent = page * studentsPerPage;

   for (let i = 0; i < list.length; i++) {
    if (i >= firstStudent && i < lastStudent) {
     list[i].style.display = '';
    } else {
     list[i].style.display = 'none';
      }
   }
};

/*** 
   Created the appendPageLinks function to generate, append, and add 
   functionality to the pagination buttons.
***/

 const appendPageLinks = (list) => {
   let pagNum = Math.ceil(list.length/studentsPerPage);
  
   const button = document.getElementsByClassName("pagination");
   if (button.length > 0) {
      button[0].remove();
   }

   const div = document.createElement('div');
   div.classList.add('pagination');
   const page = document.getElementsByClassName('page');
   const ul = document.createElement('ul');

console.log(button.length);
      for (let i = 1; i <= pagNum; i++) {
         const li = document.createElement('li');
         const a = document.createElement('a');
         ul.appendChild(li);
         li.appendChild(a);
         a.textContent = i; // here we display correct number of each paginated page - also crucial value for directing to tight page after click
         a.href = '#'; // this line is to get rid of bug of "text select" coursor - after this code it becomes "hand coursor" 
         if (i === 0) {
            a.classList.add('active');
         }
      }
      const pagA = ul.querySelectorAll('a');
     
      for (let i = 0;  i < pagA.length; i++){
         pagA[i].addEventListener('click', (e) => {
            for (let j = 0; j < pagA.length; j++){
               pagA.classList.remove('active');
            }
         e.target.classList.add('active');
         showPage(list, i+1);   
         });
      }
      page[0].appendChild(div).appendChild(ul);
   };
    
/***
 * EXEED EXPECTATION PART
 */


var filter = (input, names) => {
const studentSearched = [];  
const emptySearch = document.getElementsByClassName("emptySearch");
if (emptySearch.length > 0){
   emptySearch[0].remove();
} 
if (input.value === "") {
   appendPageLinks(studentList);
   showPage(studentList, 1);
} else {
   for (let i = 0; i < names.length; i++){
      const h3Student = document.getElementsByTagName('h3');
      names[i].style.display = 'none';
         if (input.value.length !== 0 && h3Student[i].textContent.toLowerCase().includes(input.value.toLowerCase())) { 
            studentSearched.push(names[i]);
         } 
       }
if (studentSearched == 0){
      const noStudent = document.createElement('h2');
      noStudent.textContent = "No students found";
      noStudent.classList.add('emptySearch')
      document.getElementsByClassName('page')[0].appendChild(noStudent);
      console.log(noStudent);
}
      console.log(studentSearched);
      appendPageLinks(studentSearched);
      showPage(studentSearched, 1);
}
   };

   searchButton.addEventListener('click', (event) => {
      event.preventDefault();
     filter (searchInput,studentList);
    });

    searchInput.addEventListener('keyup', () => {
    filter (searchInput,studentList);
    });

showPage(studentList, 1);
appendPageLinks(studentList);
