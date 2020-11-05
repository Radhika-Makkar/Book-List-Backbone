var BookModel = Backbone.Model.extend({
defaults: {
TITLE:"",
AUTHOR:"",
ISBN:"",
IMAGE:""
}
});

var BooksCollection = Backbone.Collection.extend({
model: BookModel,


});




var BookRecordsView = Backbone.View.extend({
//The body element in which all elements are displayed
el: 'body',

//Events for the elements on the page.
events:{
'click button#btnadd': 'addData',
'click button#btnclear': 'clearInput',
'click button.delete' : 'deleteBook',
'click button#edit' :'updateBook',
'click button#save' : 'saveBook',
'click button#view' :'viewBook'
},
deleteBook:function(e)

 {  e.target.parentElement.parentElement.remove();
 	
 },
updateBook:function(e)
{

 var title=e.target.parentElement.parentElement.querySelector("#TITLE");

  var author=e.target.parentElement.parentElement.querySelector("#AUTHOR");
   var isbn=e.target.parentElement.parentElement.querySelector("#ISBN");
     var image=e.target.parentElement.parentElement.querySelector("#IMAGE");

 var title_data=title.innerHTML;
 var author_data=author.innerHTML;
 var isbn_data=isbn.innerHTML;
	 var image_data=image.innerHTML;
	 title.innerHTML="<input type='text' id='title_text' value='"+title_data+"'>";
 author.innerHTML="<input type='text' id='author_text' value='"+author_data+"'>";
 isbn.innerHTML="<input type='text' id='isbn_text' value='"+isbn_data+"'>";
  image.innerHTML="<input type='text' id='image_text' value='"+image_data+"'>";
},
saveBook:function(e)
{




 var title_val=document.getElementById("title_text").value;

var author_val=document.getElementById("author_text").value;
var isbn_val=document.getElementById("isbn_text").value;
var image_val=document.getElementById("image_text").value;

// console.log(e.target.parentElement.parentElement.querySelector(('#TITLE')))
// console.log(title_val)
e.target.parentElement.parentElement.querySelector(('#TITLE')).innerHTML=title_val;
 // console.log(title_val);
 // console.log(author_val);
 // console.log(isbn_val);
 e.target.parentElement.parentElement.querySelector(('#AUTHOR')).innerHTML=author_val;
 
  e.target.parentElement.parentElement.querySelector(('#ISBN')).innerHTML=isbn_val;
    e.target.parentElement.parentElement.querySelector(('#IMAGE')).innerHTML=image_val;

  // document.getElementById("AUTHOR").innerHTML=author_val;
  //  document.getElementById("ISBN").innerHTML=isbn_val;


},
  render: function () {
  
    //conole.log("hello");
var dvcontainer = $(this.el).find('#dvcontainer');
var viewHtml = '<table border="1" class="table table-striped table-light mt-5">';
viewHtml += "<tr><td>TITLE</td><td>AUTHOR</td><td>ISBN</td><td>IMAGE ADD</td><td>DELETE</td><td>EDIT</td><td>SAVE</td><td>VIEW</td></tr>";
//Iterate through the collection
_.each(this.collection.models, function (m, i, l) {
	
    var bookRecHtml = '<tr><td id="TITLE">' + m.get('TITLE') + '</td><td id="AUTHOR">' + m.get('AUTHOR') + '</td><td id="ISBN">' + m.get('ISBN')+'</td><td id="img"><img height="100" width="100"src="'+m.get('IMAGE')+'"> </td><td>'+ '<button class="btn btn-info btn-xl delete">X</button>'+
    '</td><td>'+ '<button class="btn btn-info btn-xl" id="edit">EDIT</button>'+'</td><td>'+ '<button class="btn btn-info btn-xl" id="save">SAVE</button>'+'</td><td>'+ '<button class="btn btn-info btn-xl" id="view" >VIEW</button>'+'</td></tr>';
    viewHtml += bookRecHtml;

});
viewHtml += '</table>';
dvcontainer.html(viewHtml);

},   
 
addData: function (e) {
  e.preventDefault();
var newBook = new BookModel();
newBook.set('TITLE', $("#TITLE").val());
newBook.set('AUTHOR', $("#AUTHOR").val());
newBook.set('ISBN', $("#ISBN").val());
newBook.set('IMAGE', $("#IMAGE").val());
   $("#TITLE").val("");
    $("#AUTHOR").val("");
    $("#ISBN").val("");
     $("#IMAGE").val("");
BookCollection.add(newBook);
  localStorage.setItem("BooksCollection", JSON.stringify(BooksCollection));
},  


//Function to clear all textboxes.
clearInput: function (e) {
  e.preventDefault();
//Clear all Textboxes
$("#book-form input").val('');
},

viewBook:function(e)
{

       x=document.querySelector('#top');
  y=document.querySelector('#bottom');
   z=document.querySelector('.row');

// console.log(x);

x.addEventListener('click', (e)=>{
if(e.target.innerHTML === "VIEW")
{
  e2=e.target.parentElement.parentElement;
  // console.log(e2);
  // console.log(e.target.parentElement);

    x.style.display = "none";
    y.style.display="block";
    
   

    b=document.createElement('button');
    b.setAttribute('id','btn');
    b.setAttribute('class','btn btn-success');
    b.setAttribute("style", "display:block;margin:0 auto");
    b.textContent="GO BACK";

      // const h2 = document.createElement('p')
      // h2.setAttribute('id','two');
      // h2.textContent =`Capital:  ${country.capital}`;
 const  h1 = document.createElement("h1");
   h1.setAttribute("class", "display-4");
   h1.setAttribute("style", "text-align:center");
   h1.innerHTML = e.target.parentElement.parentElement.querySelector("#TITLE").innerHTML;

 const  h2 = document.createElement("h1");
   h2.setAttribute("class", "display-4");
   h2.setAttribute("style", "text-align:center");
   h2.innerHTML = e.target.parentElement.parentElement.querySelector("#AUTHOR").innerHTML;

 const h3 = document.createElement("h1");
   h3.setAttribute("class", "display-4");
   h3.setAttribute("style", "text-align:center");
   h3.innerHTML = e.target.parentElement.parentElement.querySelector("#ISBN").innerHTML;

 const img = e2.querySelector("img").src;
 // console.log(img);
   const image = document.createElement("IMG");
   image.setAttribute("id", "img2");

   image.src = img;
 
 

  
y.appendChild(image);
  y.appendChild(h1);
  y.appendChild(h2);
  y.appendChild(h3);
   y.appendChild(b);

  document.querySelector('#btn').addEventListener('click', (e) => 
{
  



    
    if (x.style.display === 'none') {
      x.style.display = 'block'
  
    } 
    y.innerHTML="";
   
});
}});
}});
//The Collection Object
var BookCollection = new BooksCollection();
//The View Object and Pass Collection to it
var BooksView = new BookRecordsView({
collection:BookCollection
});
//Subscribe to the 'add' event of the collection
//When Collection changed
//Render the Updated Table View
BookCollection.on('add', function () {
 

BooksView.render();
});
