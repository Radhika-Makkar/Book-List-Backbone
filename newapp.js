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
window.onload = function(){document.getElementById("top2").style.display = "none"; };
//window.onload = function(){document.getElementById("SAVE").style.display = "none"; };
   x=document.querySelector('#top1');
        z=document.querySelector('#top2');
  y=document.querySelector('#bottom');

x.addEventListener('click', (e)=>{
if(e.target.innerHTML == "ADD BOOK")
{
	e.preventDefault();
  e2=e.target.parentElement.parentElement;
   console.log(e2);
     x.style.display = "none";
   document.getElementById("top2").style.display = "block";
 document.getElementById("bottom").style.display = "none";
}});

z.addEventListener('click', (e)=>{
	e.preventDefault();
	console.log(e.target.innerHTML);
if(e.target.innerHTML == "Add Book")
{
  e2=e.target.parentElement.parentElement;

    x.style.display = "block";
   document.getElementById("top2").style.display = "none";
      document.getElementById("bottom").style.display = "block";

}});
var BookRecordsView = Backbone.View.extend({
//The body element in which all elements are displayed
el: 'body',

//Events for the elements on the page.
events:{
'click button#btnadd': 'addData',
'click button#btnclear': 'clearInput',
'click button.delete' : 'deleteBook',
'click button#EDIT' :'updateBook',
'click button#SAVE' : 'saveBook',
'click button#view' :'viewBook'
},
deleteBook:function(e)

 {  e.target.parentElement.parentElement.remove();
 	
 },
updateBook:function(e)
{
//console.log("hello");
var button1=document.getElementById("EDIT").style.display="none";
var button2=document.getElementById("SAVE").style.display="block";
 var title=e.target.parentElement.querySelector("#one");

  var author=e.target.parentElement.querySelector("#two");

 var isbn=e.target.parentElement.querySelector("#three");
 var image=e.target.parentElement.querySelector("#four");
 var title_data=title.innerHTML;
 var author_data=author.innerHTML;
 var isbn_data=isbn.innerHTML;
	  // var image_data=image.innerHTML;
	 title.innerHTML="<input type='text' id='title_text' value='"+title_data+"'>";
 author.innerHTML="<input type='text' id='author_text' value='"+author_data+"'>";
 isbn.innerHTML="<input type='text' id='isbn_text' value='"+isbn_data+"'>";
   // image.innerHTML="<input type='text' id='image_text' value='"+image_data+"'>";
},
saveBook:function(e)
{




 var title_val=document.getElementById("title_text").value;

var author_val=document.getElementById("author_text").value;
var isbn_val=document.getElementById("isbn_text").value;
// var image_val=document.getElementById("image_text").value;

e.target.parentElement.parentElement.querySelector(('#TITLE')).innerHTML=title_val;
 e.target.parentElement.parentElement.querySelector(('#AUTHOR')).innerHTML=author_val;
 
  e.target.parentElement.parentElement.querySelector(('#ISBN')).innerHTML=isbn_val;
 
  document.getElementById("EDIT").style.display="block";
 document.getElementById("SAVE").style.display="none";


},
  render: function (e) {
  
    //conole.log("hello");
var bottom = $(this.el).find('#bottom');
console.log(bottom);
var card = document.createElement('div');
  card.setAttribute('class', 'card col-sm-12 col-md-4 col-lg-3');
card.setAttribute('style','padding:20px')
//Iterate through the collection
card.setAttribute('style','margin:20px')
_.each(this.collection.models, function (m, i, l) {
	
const app = document.getElementById('bottom');
const container = document.createElement('div');
container.setAttribute('class', 'row');

app.appendChild(container);
  const img = document.createElement('img'); 
  img.setAttribute('id','four');
  img.setAttribute('width','100');
   img.setAttribute('height','100');
      img.src = m.get('IMAGE');
      
      const h1 = document.createElement('p')
      h1.setAttribute('id','one');
      h1.textContent = `TITLE: `+m.get('TITLE');
      // console.log(h1.textContent);
  const h2 = document.createElement('p')
      h2.setAttribute('id','two');
      h2.textContent = `AUTHOR: `+m.get('AUTHOR');
        const h3 = document.createElement('p')
      h3.setAttribute('id','three');
      h3.textContent = `ISBN: `+m.get('ISBN');
 b=document.createElement('button');
    b.setAttribute('id','EDIT');

    b.setAttribute('class','btn btn-primary');
    b.textContent="EDIT";
  
     b1=document.createElement('button');
    b1.setAttribute('id','SAVE');

    b1.setAttribute('class','btn btn-primary');
    b1.textContent="SAVE";
// console.log(b1.textContent);
 container.appendChild(card)
 card.appendChild(img);
   card.appendChild(h1);
      card.appendChild(h2);
      card.appendChild(h3);
      card.appendChild(b);
  card.appendChild(b1);

});
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
BookCollection.reset();

},  


// //Function to clear all textboxes.
// clearInput: function (e) {
//   e.preventDefault();
// //Clear all Textboxes
// $("#book-form input").val('');
// },

viewBook:function(e)
{

       x=document.querySelector('#top1');
        z=document.querySelector('#top2');
  y=document.querySelector('#bottom');


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
