var currQuote     = '',
    currentAuthor = '';
let quotesData;

// window documentation 
function inFrame() {
    try {
        return window.self !== window.top;
    } catch(e) {
        return true;
    }
}

function openURL(url){
    window.open(url, 'Share', 'width = 550, height = 400');
  }

function getRandomQuote() {
    return quotesData.quotes[Math.floor(Math.random() * quotesData.quotes.length)];
}

// make api request
function getQuotes() {
    return $.ajax({
      headers: {
        Accept: "application/json"
      },
      url: 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json',
      success: function(quotes) {
        if (typeof quotes === 'string') {
          quotesData = JSON.parse(quotes);
          console.log('quotesData');
          console.log(quotesData);
        }
      }
    });
}

function getQuote() {
    let randomQuote = getRandomQuote();

    currQuote  = randomQuote.quote;
    currAuthor = randomQuote.author;

    if(inFrame()) {
        // tweet window
        $('#tweet-quote').attr('href', 'https://twitter.com/intent/tweet?related=freecodecamp&text=' + encodeURIComponent('"' + currQuote + '" ' + '- ' + currAuthor));
    }

    $('.quote-text').animate(
        { opacity: 0 }, 1000, function() {
            $(this).animate(
                { opacity: 1 }, 1000
            );
            $('#text').text(randomQuote.quote);
        }
    );

    $('.quote-author').animate(
        { opacity: 0 }, 1000, function() {
            $(this).animate(
                { opacity: 1 }, 1000
            );
            $('#author').html(randomQuote.author);
        }
    );
}

$(document).ready(function() {
    getQuotes().then(() => {
        getQuote();
    });

    $('#new-quote').on('click', function() {
        getQuote();
    });
    
    $('#tweet-quote').on('click', function() {
        if(!inFrame()) {
            openURL('https://twitter.com/intent/tweet?related=freecodecamp&text=' + encodeURIComponent('"' + currQuote + '" ' + '- ' + currAuthor));
        }
    });
});

