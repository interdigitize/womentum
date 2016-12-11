$( document ).ready(function() {

    var article_feed = {
      "async": true,
      "crossDomain": true,
      "url": "https://api.havenondemand.com/1/api/sync/querytextindex/v1?text=Susan%20Wojcicki&absolute_max_results=50&ignore_operators=false&indexes=news_eng&print=none&promotion=false&total_results=false&apikey=42bde474-cd4c-4929-9dae-cf000db82f53",
      "method": "GET"
    }

    var article_image = {
      "async": true,
      "crossDomain": true,
      "url": "http://api.diffbot.com/v3/image?token=69f2515921b7acd55e009b827228a3d2&url=http%3A%2F%2Fbits.blogs.nytimes.com%2F2015%2F07%2F13%2Fyoutube-chief-talks-children-mobile-and-competition-with-facebook%2F",
      "method": "GET"
    }

    var resized_image = {
      "async": true,
      "crossDomain": true,
      "url": "https://api.imageresizer.io/images?url=https%3A%2F%2Fstatic01.nyt.com%2Fimages%2F2015%2F07%2F14%2Ftechnology%2F14bits-wojcicki2%2F14bits-wojcicki2-blog480.jpg&size=900x300",
      "method": "GET"
    }


    $.ajax(article_feed).done(function (response) {
      $( "#article_feed" ).attr( "href", response["documents"][0]["reference"]);
    });

    $.ajax(article_image).done(function (response) {
      console.log(response["objects"][1]["url"]);
      $( "#article_image" ).attr( "href", response["objects"][1]["url"]);
    });

    $.ajax(resized_image).done(function (response) {
      var url = "https://im.ages.io/" + response["response"]["id"]
      $( "#resized_image" ).attr("href", url);
    });
});
