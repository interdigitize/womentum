$( document ).ready(function() {

    var article_feed = {
      "async": false,
      "crossDomain": true,
      "url": "https://api.havenondemand.com/1/api/sync/querytextindex/v1?text=Susan%20Wojcicki&absolute_max_results=50&ignore_operators=false&indexes=news_eng&print=none&promotion=false&total_results=false&apikey=42bde474-cd4c-4929-9dae-cf000db82f53",
      "method": "GET"
    };

    $.ajax(article_feed).done(function (response) {
      $( "#article_feed" ).attr( "href", response["documents"][4]["reference"]);
      imgLink = response["documents"][4]["reference"];
      imgLink2 = imgLink;
    });

    console.log(imgLink);

    var article_image = {
      "async": false,
      "crossDomain": true,
      "url": "http://api.diffbot.com/v3/image?token=69f2515921b7acd55e009b827228a3d2&url="+imgLink,
      "method": "GET"
    };

    $.ajax(article_image).done(function (response) {
      console.log(response["objects"][1]["url"]);
      $( "#article_image" ).attr( "href", response["objects"][1]["url"]);
      imgLink = "";
    });

    var text_extract_description = {
      "async": false,
      "crossDomain": true,
      "url": "https://api.havenondemand.com/1/api/sync/extracttext/v1?url=" + imgLink2 + "&apikey=42bde474-cd4c-4929-9dae-cf000db82f53",
      "method": "GET"
    }
    console.log(text_extract_description["url"]);
    $.ajax(text_extract_description).done(function (response) {
      console.log(response["document"][0]["title"]);
    });
});
