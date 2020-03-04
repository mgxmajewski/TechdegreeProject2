/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
   
/***
 Decided to use "const" for storing global variables 
https://codeburst.io/difference-between-var-let-and-const-in-javascript-fbce2fba7b4
***/

const studentList = document.getElementsByClassName('student-item cf');
const studentsPerPage = 10;

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

const showPage = (list,page) => {
   let firstStudent = (page * studentsPerPage) - studentsPerPage;
   let lastStudent = page * studentsPerPage;
   for (let i = 0; i < list.length; i++) {
    if (i >= firstStudent && i <= lastStudent) {
     list[i].style.display = ''; //DOM manipulation ".style.display = '', - keep displaying
    } else {
     list[i].style.display = 'none'; //DOM manipulation ".style.display = 'none'" - stop displaing
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
   if (button.length > 0) { // removing all buttons bofore genereting them so they are not adding up after each interaction with site
      button[0].remove();
   }
   const div = document.createElement('div'); //creatin html elemnts and nesting them in right place so they can get already existing css
   div.classList.add("pagination");
   const page = document.getElementsByClassName('page');
   const ul = document.createElement('ul');
   // ul.classList.add("pagination");
   // console.log(button.length);
      for (let i = 0; i < pagNum; i++) { // here displayin right amount of pagination links (if there was sharp <= there would be also link for less than 10 results)
         const li = document.createElement('li');
         const a = document.createElement('a');
         a.textContent = i; // here we display correct number of each paginated page - also crucial value for directing to tight page after click
         a.href = '#'; // this line is to get rid of bug of "text select" coursor - after this code it becomes "hand coursor" 
         ul.appendChild(li).appendChild(a); //appendin li and a
         a.textContent = i + 1; // here changing american numeration from array inot european notation
         if (i===0) {
            a.classList.add("active"); // seting class to style active link - first one one load
         }
      }
      const pagA = ul.querySelectorAll('a'); // seleting all a to manipulate thei display
      // console.log(pagA);  
      for (let i = 0;  i < pagA.length; i++){
         pagA[i].addEventListener('click', (e) => {
            for (let j = 0; j < pagA.length; j++){
               pagA[j].classList.remove("active"); // removing active class from all link so later only one will be active 'clicked one'
            }
         e.target.classList.add("active"); // seting class to style clicked link
         showPage(list, i+1);   // this call by using "i" as parameter allows to display correct page after click fo search result
         });
      }
      page[0].appendChild(div).appendChild(ul); // adding html elements
   };
    
/***
 * EXEED EXPECTATION PART - filtering students name. Key idea hewre is to create array and later so store matching names in it. This array will later
 * let other already existed functions to run with this array as parameter. There is also solution for "no results situation".  
 * It's important to add that functions appendPageLinks and showPage are called inside filter function as the scope od array is local.
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
      document.getElementsByClassName('page')[0].appendChild(noStudent); // adding h2 if conditiopn was met - no results
      // console.log(noStudent);
}
      // console.log(studentSearched);
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

showPage(studentList, 1); // initial function call
appendPageLinks(studentList); // initial function call
