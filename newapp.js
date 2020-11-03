var BookModel = Backbone.Model.extend({
defaults: {
TITLE:"",
AUTHOR:"",
ISBN:""
}
});

var BooksCollection = Backbone.Collection.extend({
model: BookModel

});

var BookRecordsView = Backbone.View.extend({
//The body element in which all elements are displayed
el: 'body',

//Events for the elements on the page.
events:{
'click button#btnadd': 'addData',
'click button#btnclear': 'clearInput'
},

  render: function () {
    //conole.log("hello");
var dvcontainer = $(this.el).find('#dvcontainer');
var viewHtml = '<table border="1">';
viewHtml += "<tr><td>TITLE</td><td>AUTHOR</td><td>ISBN</td></tr>";
//Iterate through the collection
_.each(this.collection.models, function (m, i, l) {
    var bookRecHtml = '<tr><td>' + m.get('TITLE') + '</td><td>' + m.get('AUTHOR') + '</td><td>' + m.get('ISBN') + '</td></tr>';
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

BookCollection.add(newBook);
 
},  

//Function to clear all textboxes.
clearInput: function (e) {
  e.preventDefault();
//Clear all Textboxes
$("#book-form input").val('');
}
});
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
