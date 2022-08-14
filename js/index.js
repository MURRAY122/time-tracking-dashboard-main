//Variables
var statBox = document.getElementById("stats_box");

/* Sets background color and svg to each stats card */
function setCardImg(title, div){
   var imgBaseUrl = "./assets/images/icon-"
   title = title.toLowerCase();
   title = title.replace(" ", "-")

   //Switch between card titles and sets background color
   switch (title) {
      case "work":
         div.parentElement.style.backgroundColor = "hsl(15, 100%, 70%)";
         break;
      case "play":
         div.parentElement.style.backgroundColor = "hsl(195, 74%, 62%)";
         break;
      case "study":
         div.parentElement.style.backgroundColor = "hsl(348, 100%, 68%)";
         break;
      case "exercise":
         div.parentElement.style.backgroundColor = "hsl(145, 58%, 55%)";
         break;
      case "social":
         div.parentElement.style.backgroundColor = "hsl(264, 64%, 52%)";
         break;
      case "self-care":
         div.parentElement.style.backgroundColor = "hsl(43, 84%, 65%)";
         break;
      default:
         div.parentElement.style.backgroundColor = "hsl(15, 100%, 70%)";
         break;
   }
   // Add the svg image
   title = title + ".svg";
   div.style.backgroundImage = "url("+imgBaseUrl + title +")";
   
}

/* Builds a stats card for each object in data */
function buildHTML(data){
   data.forEach(element => {
      var card = document.createElement('div');
      card.setAttribute("class","section__stats__card");
      statBox.appendChild(card);
   
      var img = document.createElement('div');
      img.setAttribute("class","section__stats__card__img");
      card.appendChild(img);
      setCardImg(element.title, img);
   
      var card_content = document.createElement('div');
      card_content.setAttribute("class","section__stats__card__content");
   
      var content_title = document.createElement('div');
      content_title.setAttribute("class","section__stats__card__content__title");
      content_title.innerHTML = element.title + "<span><svg width='21' height='5' xmlns='http://www.w3.org/2000/svg'><path d='M2.5 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Z' fill='#BBC0FF' fill-rule='evenodd' /></svg></span>"
      card_content.appendChild(content_title);
   
      var content_time = document.createElement('div');
      content_time.setAttribute("class","section__stats__card__content__time");
      content_time.innerHTML = element.current + "hrs <span>Last week -" + element.previous + "hrs</span>"
      card_content.appendChild(content_time);

      card.appendChild(card_content);
   });
}

/* Filters json data based on key and requests a new build of html */
function filterData(json, key){
   statBox.innerHTML = "";
   var filteredData = [];
   json.forEach(element => {
      var title = element.title;
      var current
      var previous

      // Switch betwwen Daily/Weekly/Monthly data times
      switch (key) {
         case "daily":
            current = element.timeframes.daily.current;
            previous = element.timeframes.daily.previous;
            break;
         case "weekly":
            current = element.timeframes.weekly.current;
            previous = element.timeframes.weekly.previous;
            break;
         case "monthly":
            current = element.timeframes.monthly.current;
            previous = element.timeframes.monthly.previous;
            break;
      
         default:
            current = element.timeframes.weekly.current;
            previous = element.timeframes.weekly.previous;
            break;
      }
      var new_data = {"title":title, "current":current, "previous":previous}
      filteredData.push(new_data)
   });
   return filteredData;
}

//Fetch data and display
function updateDisplay(filter) {
   var old_active = document.getElementsByClassName("active");
   old_active[0].classList.remove('active')
   document.getElementById(filter).classList.add("active");

   fetch("./data.json")
   .then(response => {
      return response.json();
   })
   .then(function(jsondata) { 
      var data = filterData(jsondata, filter);
      buildHTML(data);

   });
}
// Default data displayed on first load
window.onload = updateDisplay("weekly");