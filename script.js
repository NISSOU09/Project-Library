const myLibrary = [];

function Book(title,author,nb_pages,status=false) {
    this.title = title;
    this.author = author;
    this.nb_pages = nb_pages;
    this.status = status;
}

function addBookToLibrary(title,author,nb_pages,status=false) {
    const book = new Book(title,author,nb_pages,status);
    myLibrary.push(book);
    displayBooks(); 
}

addBookToLibrary("1984", "George Orwell", 328, true);
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 310, false);
addBookToLibrary("Clean Code", "Robert C. Martin", 464, true);


console.log(myLibrary);


function displayBooks() {
    const tableBody = document.querySelector("#book-list");
    tableBody.innerHTML = ""; 
    
    for(let i in myLibrary){
        const row = document.createElement("tr");
        
        const titleData = document.createElement("td");
        titleData.textContent = myLibrary[i].title;
        row.appendChild(titleData);
        
        const authorData = document.createElement("td");
        authorData.textContent = myLibrary[i].author;
        row.appendChild(authorData);
        
        const pagesData = document.createElement("td");
        pagesData.textContent = myLibrary[i].nb_pages;
        row.appendChild(pagesData);
        
        const statusData = document.createElement("td");
        statusData.textContent = myLibrary[i].status ? "Yes" : "No";
        row.appendChild(statusData);
        
        const actionsData = document.createElement("td");
        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";
        removeBtn.classList.add("remove-btn");
        removeBtn.dataset.index = i;
        removeBtn.addEventListener("click", removeBook);
        actionsData.appendChild(removeBtn);
        row.appendChild(actionsData);
        
        tableBody.appendChild(row);
    }
}

function removeBook(e) {
    const index = e.target.dataset.index;
    myLibrary.splice(index, 1);
    displayBooks();
}

var displayed = false;
const addBookBtn = document.querySelector("#add-book-btn")
addBookBtn.addEventListener("click",()=>{
    const addBookDiv = document.querySelector(".section")
    if(displayed){
        addBookDiv.style.display = "none"
        displayed=false
    }else{
        addBookDiv.style.display = "block"
        displayed=true
    }
})

const bookForm = document.querySelector("#book-form");
bookForm.addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the form from submitting normally
    
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const nb_pages = parseInt(document.getElementById("pages").value); 
    const status = document.getElementById("read").checked; 
    
    addBookToLibrary(title, author, nb_pages, status);
    
    // Reset the form
    bookForm.reset();
    
    const addBookDiv = document.querySelector(".section");
    addBookDiv.style.display = "none";
    displayed = false;
    
    // Log the updated library
    console.log(myLibrary);
});

// Call displayBooks to show initial books
displayBooks();