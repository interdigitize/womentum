$( document ).ready(function() {

  //getArticleAndImage();
  // getArticleImage();
  //ExtractText();
  var people = ["Susan Wojcicki", "Genevieve Bell", "Sheryl Sandberg"];

  getPerson();

  function getPerson(){
    //encode str. there's an easier way with uriencode i think. 
    //think google has a problem with this:
    //Synchronous XMLHttpRequest on the main thread is deprecated because of its detrimental effects to the end user's experience."
    //it works tho
    person = people[0].split(" ").join("%20");
    var article_feed = {
        "async": false,
        "crossDomain": true,
        "url":"https://api.havenondemand.com/1/api/sync/querytextindex/v1?text="+person+"&absolute_max_results=50&ignore_operators=false&indexes=news_eng&print=none&promotion=false&total_results=false&apikey=42bde474-cd4c-4929-9dae-cf000db82f53",
        "method": "GET"
    };
    
    var imgLink;
    var imgLink2;

    $.ajax(article_feed).done(function (response) {
      $( "#article_feed" ).attr( "href", response["documents"][5]["reference"]);
      imgLink = response["documents"][5]["reference"];
      imgLink2 = imgLink; //what is this for?
    });

    console.log(imgLink);

    getArticleImage();
    extractText();

    function getArticleImage(){
      var article_image = {
          "async": false,
          "crossDomain": true,
          "url": "http://api.diffbot.com/v3/image?token=69f2515921b7acd55e009b827228a3d2&url="+imgLink,
          "method": "GET"
        };
    
      $.ajax(article_image).done(function (response) {
        console.log(response["objects"][1]["url"]);
        $( "#article_image" ).attr( "src", response["objects"][1]["url"]);
        imgLink = "";
      });
    }

    function extractText(){
      var text_extract_description = {
        "async": false,
        "crossDomain": true,
        "url": "https://api.havenondemand.com/1/api/sync/extracttext/v1?url=" + imgLink2 + "&apikey=42bde474-cd4c-4929-9dae-cf000db82f53",
        "method": "GET"
      };
      
      console.log(text_extract_description["url"]);

      $.ajax(text_extract_description).done(function (response) {
        console.log(response["document"][0]["title"]);
      });
    }
  
  }


});
