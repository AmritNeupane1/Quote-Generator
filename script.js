const quotecontainer = document.getElementById('quote-container');
const quotetext = document.getElementById('quote');
const quoteauthor = document.getElementById('author');
const twitterbtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader=document.getElementById("loader");

//show function
function loading(){
  loader.hidden=false;
  quotecontainer.hidden=true;
}
//hide loading
 function complete(){
   if(!loader.hidden){
     quotecontainer.hidden=false;
     loader.hidden=true;
   }
 }
//geting quotes
loading();
let resposeobj;

  const xhttp = new XMLHttpRequest();
  
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 & this.status == 200) {
      resposeobj = JSON.parse(this.responseText);
      newQuotes();


    }
  }
  xhttp.open("GET", "https://type.fit/api/quotes");
  xhttp.send();


// for new quotes
function newQuotes() {
 
  const quote = resposeobj[Math.floor(Math.random() * resposeobj.length)];


  if (!quote.author) {
    quoteauthor.innerText = "Unknown";
  }
  else {
    quoteauthor.innerText = quote.author;
  }
  if (quote.text.length > 100) {
    quotetext.classList.add("long-quote");
  } else {
    quotetext.classList.remove("long-quote");

  }


  quotetext.textContent = quote.text;
   complete();

}

//tweeting in twitter
function tweetQuote() {
  const quote = quotetext.innerText;
  const author = quoteauthor.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(twitterUrl, '_blank');
}

//event listers
newQuoteBtn.addEventListener('click', newQuotes);
twitterbtn.addEventListener('click', tweetQuote);





