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
   div.classList.add("pagination");
   const page = document.getElementsByClassName('page');
   const ul = document.createElement('ul');
   // ul.classList.add("pagination");
   console.log(button.length);
      for (let i =  0; i < pagNum; i++) {
         const li = document.createElement('li');
         const a = document.createElement('a');
         a.textContent = i; // here we display correct number of each paginated page - also crucial value for directing to tight page after click
         a.href = '#'; // this line is to get rid of bug of "text select" coursor - after this code it becomes "hand coursor" 
         ul.appendChild(li).appendChild(a); //appendin li and a
         a.textContent = i + 1; // here changing american numeration from array inot european notation
         if (i===0) {
            a.classList.add("active"); // setin class to style active link
         }
      }
      
      const pagA = ul.querySelectorAll('a');
      console.log(pagA);
     
      for (let i = 0;  i < pagA.length; i++){
         pagA[i].addEventListener('click', (e) => {
            for (let j = 0; j < pagA.length; j++){
               pagA[j].classList.remove("active");
            }
         e.target.classList.add("active"); // setin class to style clicked link
         showPage(list, i + 1);   
         });
      }
      page[0].appendChild(div).appendChild(ul);
   };
    
/***
 * EXEED EXPECTATION PART
 */

var filter = (input, names) => { // usign two parameters input (from crated search input and names form studentnames list)
const studentSearched = []; // creating empty array to later accumulate filterted students 
const emptySearch = document.getElementsByClassName("emptySearch"); // create class so later will be possible to claer each time iput changes
if (emptySearch.length > 0){ // clearin search each new exec of filter
   emptySearch[0].remove();
} 
if (input.value === "") { // diplayin init student list in case iput is empty string
   appendPageLinks(studentList);
   showPage(studentList, 1);
} else { // HERE STARTS MAIN FILTERING ALGORITHM - in case input is not empty
   for (let i = 0; i < names.length; i++){  //-looping through student list
      const h3Student = document.getElementsByTagName('h3'); // selectin just students name (to not search over emails for example)
      names[i].style.display = 'none';
         if (input.value.length !== 0 && h3Student[i].textContent.toLowerCase().includes(input.value.toLowerCase())) {  // this is the main algorithm to compare iput with name list
            studentSearched.push(names[i]); // here pushing filtered names into array
         } 
       }
if (studentSearched == 0){ // creating h2 to give masseg to user if no results
      const noStudent = document.createElement('h2');
      noStudent.textContent = "No students found";
      noStudent.classList.add('emptySearch')
      document.getElementsByClassName('page')[0].appendChild(noStudent);
      // console.log(noStudent);
}
      console.log(studentSearched);
      appendPageLinks(studentSearched); // running function with filtered names array
      showPage(studentSearched, 1); // running function with filtered names array
}
   };

   searchButton.addEventListener('click', (event) => { // added search button click event listener 
      event.preventDefault();
     filter (searchInput,studentList);
    });

    searchInput.addEventListener('keyup', () => { // added search input keyup event listener 
    filter (searchInput,studentList);
    });


showPage(studentList, 1); // initial funbction exec 
appendPageLinks(studentList); // initial funbction exec 
