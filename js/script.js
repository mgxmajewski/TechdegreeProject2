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
   let div = document.createElement('div');
   let ul = document.createElement('ul');
   
   div.className = "pagination";
   document.querySelector(".page").appendChild(div);
   div.appendChild(ul);

      for (let i = 1; i <= pagNum; i++) {
         const li = document.createElement('li');
         const a = document.createElement('a');
         ul.appendChild(li);
         li.appendChild(a);
         a.textContent = i; // here we display correct number of each paginated page - also crucial value for directing to tight page after click
         a.href = '#'; // this line is to get rid of bug of "text select" coursor - after this code it becomes "hand coursor" 
      }
      
      const button = document.querySelector(".pagination");

      button.addEventListener("click", e => { 
         // e.preventDefault(); - I added this function but it doesn't improve how app works so decided to coment it and probably get rid of it in final version
         if (e.target.tagName === "A") {
         pageNumber = e.target.innerHTML;
         showPage(list, pageNumber);
         }
      });
   }
      
/***
 * EXEED EXPECTATION PART
 */

//  const searchBar = input => {
// Add event 
// searchInput.addEventListener('keyup', filterNames)

// function filterNames(){
//    // getting value of inpuit
//    let filterValue = searchInput.value.toLowerCase();
//    console.log(filterValue);
//    // let studentNames = document.getElementsByClassName('student-details');
//    // let names = studentNames.querySelectorAll();
//    console.log(studentList);
//       for (let i = 0; i < studentList.length ;i++){
         
//          console.log(a);
//          if (studentList.toLowerCase().indexOf(filterValue) > -1){
//             studentList[i].style.display = "";
//          } else {
//             studentList[i].style.display = "none";
//          }
//       }

// }



const filter = (input, names) => {
   console.log(input);
   console.log(names);
   let studentSearched = [];  
   for (let i = 0; i < names.length; i++){
      names[i].style.display = '';
      // names[i].HTMLElementObject.id = '';
         if (input.value.length != 0 && names[i].textContent.toLowerCase().includes(input.value.toLowerCase())) {
            names[i].style.display = '';
            studentSearched.push(names[i]);
            console.log(studentSearched);
            // names[i].HTMLElementObject.id = 'searched';
         } else if (input.value.length === 0) {
            names[i].style.display = '';
         } else {
            names[i].style.display = 'none';
         }

       }
       
   };

   // const studentsDisplayed = document.getElementById('searched');
   // console.log(studentsDisplayed);
   searchButton.addEventListener('click', (event) => {
      event.preventDefault();
    
      // Invoke your search function here - Arguments: search, tableCells
     filter (searchInput,studentList);
  
    
    
      // Helpful log statement to test function
      console.log('Submit button is functional!');
    });

    searchInput.addEventListener('keyup', () => {

      // Invoke your search function here - Arguments: search, tableCells
    filter (searchInput,studentList);
   
    
      // Helpful log statement to test function
      console.log('Keyup event on the Search input is functional!');
    });

// };

appendPageLinks(studentList);
showPage(studentList, 1);

// Remember to delete the comments that came with this file, and replace them with your own code comments.