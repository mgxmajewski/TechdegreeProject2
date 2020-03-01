/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
   
// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing


/*** 
   Add your global variables that store the DOM elements you will 
   need to reference and/or manipulate. 
   
   But be mindful of which variables should be global and which 
   should be locally scoped to one of the two main functions you're 
   going to create. A good general rule of thumb is if the variable 
   will only be used inside of a function, then it can be locally 
   scoped to that function.



/***
 Decided to use "var" for storing global variables
https://codeburst.io/difference-between-var-let-and-const-in-javascript-fbce2fba7b4



***/

var studentList = document.getElementsByClassName('student-item cf');
var studentsPerPage = 10;

/*** 
   Create the `showPage` function to hide all of the items in the 
   list except for the ten you want to show.

   Pro Tips: 
     - Keep in mind that with a list of 54 students, the last page 
       will only display four.
     - Remember that the first student has an index of 0.
     - Remember that a function `parameter` goes in the parens when 
       you initially define the function, and it acts as a variable 
       or a placeholder to represent the actual function `argument` 
       that will be passed into the parens later when you call or 
       "invoke" the function 
***/

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

/***Loop over items in the list parameter
-- If the index of a list item is >= the index of the first
item that should be shown on the page
-- && the list item index is <= the index of the last item
that should be shown on the page, show it
***/


/*** 
   Create the `appendPageLinks function` to generate, append, and add 
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
      
   /*
 1. Determine how many pages are needed for the list by dividing the
 total number of list items by the max number of items per page

 2. Create a div, give it the “pagination” class, and append it to the .page div
 https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement

 3. Add a ul to the “pagination” div to store the pagination links
 4. for every page, add li and a tags with the page number text
 5. Add an event listener to each a tag. When they are clicked
 call the showPage function to display the appropriate page
6. Loop over pagination links to remove active class from all links
7. Add the active class to the link that was just clicked. You can identify that
clicked link using event.target
*/
      const button = document.querySelector(".pagination");

      button.addEventListener("click", e => { 
         // e.preventDefault(); - I added this function but it doesn't improve how app works 
         if (e.target.tagName === "A") {
         pageNumber = e.target.innerHTML;
         showPage(list, pageNumber);
         }
      });
   }
      
/***
 * EXEED EXPECTATION PART
 */

 const searchBar = () => {
    const header = document.querySelector(".page-header");
   //  console.log(header);
    const searchDiv = document.createElement('div');
    const searchInput = document.createElement('input');
    searchInput.type = "text";
    header.appendChild(searchDiv);
    searchDiv.appendChild(searchInput);
   //  searchInput.type = text;

};

appendPageLinks(studentList);
showPage(studentList, 1);
searchBar();
// Remember to delete the comments that came with this file, and replace them with your own code comments.