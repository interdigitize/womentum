$( document ).ready(function() {

  //getArticleAndImage();
  // getArticleImage();
  //ExtractText();

  var people = ["Susan Wojcicki", "Genevieve Bell", "Sheryl Sandberg"];
  console.log("people + " + people);
//call choose random person
 choosePerson();



  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

//choose random person
  function choosePerson(){
    var random_person = getRandomInt(0, 3);
    console.log("randomized integer " + random_person);
    return getPerson(random_person);
  }


  function getPerson(elem){
    //encode str. there's an easier way with uriencode i think.
    //think google has a problem with this:
    //Synchronous XMLHttpRequest on the main thread is deprecated because of its detrimental effects to the end user's experience."
    //it works tho
    console.log("elem parameter " + elem)
    person = people[elem].split(" ").join("%20");
    console.log("randomized person " + person);
    var article_feed = {
        "async": false,
        "crossDomain": true,
        "url":"https://api.havenondemand.com/1/api/sync/querytextindex/v1?text="+person+"&absolute_max_results=50&ignore_operators=false&indexes=news_eng&print=none&promotion=false&total_results=false&apikey=42bde474-cd4c-4929-9dae-cf000db82f53",
        "method": "GET"
    };

    var imgLink;
    var imgLink2;
    var random_article;
    if(person === "Genevieve%20Bell"){
      console.log("Gen");
      //assign image to person
      random_article = Math.random() < 0.5 ? 0 : 5;
    }
    else if (person === "Susan%20Wojcicki"){
      console.log("Susan");
      random_article = Math.random() < 0.5 ? 3 : 5;
    }
    else {
      random_article = Math.random() < 0.5 ? 2 : 4;
    }
    console.log("This is random_article " + random_article);

    $.ajax(article_feed).done(function (response) {
      $( "#article_feed" ).attr( "href", response["documents"][random_article]["reference"]);
      imgLink = response["documents"][random_article]["reference"]; //HEREEEEE
      console.log("This is imgLink " + imgLink);
      imgLink2 = imgLink;
    });

    console.log(imgLink);

    // getArticleImage();
    extractText();


    // function getArticleImage(){
    //   var article_image = {
    //       "async": false,
    //       "crossDomain": true,
    //       "url": "http://api.diffbot.com/v3/image?token=69f2515921b7acd55e009b827228a3d2&url="+imgLink,
    //       "method": "GET"
    //     };
    //   $.ajax(article_image).done(function (response) {
    //     console.log(response["objects"][1]["url"]);
    //     $( "#article_image" ).attr( "src", response["objects"][1]["url"]);
    //     imgLink = "";
    //   });
    // }


    function extractText(){
      var text_extract_description = {
        "async": false,
        "crossDomain": true,
        "url": "https://api.havenondemand.com/1/api/sync/extracttext/v1?url=" + imgLink2 + "&apikey=42bde474-cd4c-4929-9dae-cf000db82f53",
        "method": "GET"
      };


      $.ajax(text_extract_description).done(function (response) {
        console.log(response["document"][0]["title"]);
        $("#article_description").append(response["document"][0].description);
      });

    }

  }


});
