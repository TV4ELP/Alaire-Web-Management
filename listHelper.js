function ListHelperOnLoad(){
   let select = document.querySelector('#listsDropDown');
   //Add Event Listener to render on change
   select.addEventListener("change", fillWithListOnchange)

   //Add a default unselectable Option
   let defaultOption = document.createElement("option");
   defaultOption.selected = true;
   defaultOption.disabled = true;
   defaultOption.text = "Please choose a list";
   select.add(defaultOption);
   
   putOptions(select);
}


//Request Options from API and put them into select Tag
async function putOptions(select){
   let res = await makeRequest("get", getBaseUrl() + "/lists");
   //now add all options

   let list = JSON.parse(res);
   list.forEach(element => {
      let option = document.createElement("option");
      option.text = element;
      option.value = element;
      select.add(option);
   });
}


function makeRequest(method, url, postParameter) {
   return new Promise(function (resolve, reject) {
       let xhr = new XMLHttpRequest();
       xhr.open(method, url);
       if(method == "post"){
         xhr.setRequestHeader("Content-Type", "application/json");
       }
       xhr.onload = function () {
           if (this.status >= 200 && this.status < 300) {
               resolve(xhr.response);
           } else {
               reject({
                   status: this.status,
                   statusText: xhr.statusText
               });
           }
       };
       xhr.onerror = function () {
           reject({
               status: this.status,
               statusText: xhr.statusText
           });
       };
       if(postParameter){
         xhr.send(JSON.stringify(postParameter));
       }else{
          xhr.send();
       }
   });
}

function getBaseUrl(){
   const pathname = window.location.pathname.substring(1); 
   const pathArray = pathname.split("/", 2);

   return "/" + pathArray[0] + "/" + pathArray[1];
}

//Add all images
async function fillWithListOnchange(){
   let listName = this.value;
   let container = document.querySelector('.grid-container .list');
   let res = await makeRequest("get", getBaseUrl() + "/list/" + listName);
   
   const json = JSON.parse(res);

   if(json) {
      doADumbPrintPls(container, json);
   }
}


function doADumbPrintPls(container, json){
   const images = json.images;
   container.innerHTML = "";
   images.forEach((element, index) => {
      let grid = document.createElement("div");
      grid.className = "imageContainer";
      //Add index for easy manipulation of lists
      grid.dataset.listIndex = index;

      //We need a content div to calculate the actual height with the item height
      let contentDiv = document.createElement("div");
      contentDiv.className = "content";

      //Create the image
      let img = document.createElement("img");
      img.src = element.url;
      img.addEventListener("load", onLoadResize);

      //Put Image into Content
      contentDiv.appendChild(img);

      //Put content into grid
      grid.appendChild(contentDiv);

      //Add delete Button
      grid.appendChild(addDeleteButton());

      //Add ImageName
      grid.appendChild(addImageName(element.name));

      //Put grid into container
      container.appendChild(grid);

   });
}

function addDeleteButton(){
   let button = document.createElement("button");
   button.className = "deleteButton";
   button.textContent = "X";
   button.addEventListener("click", event => {
      let container = event.target.parentElement;
      let index = container.dataset.listIndex;
      container.remove();
   });

   return button;
}

function addImageName(name){
   let span = document.createElement("span");
   let text = "No Name Set";
   if(name){
      text = name;
   }
   span.className = "imageName";
   span.textContent = text;
   span.addEventListener("click", event => {
      //rename
   });

   return span;
}