window.onload = function () {
   let select = document.querySelector('#listsDropDown');
   //Add Event Listener to render on change
   select.addEventListener("change", fillWithListOnchange)

   //now add all options
   list.forEach(element => {
      const keys = Object.keys(element);
      let option = document.createElement("option");
      option.text = keys[0];
      option.value = keys[0];
      select.add(option);
   });
};

function fillWithListOnchange(){
   let listName = this.value;
   let container = document.querySelector('.grid-container .list');
   const json = getListWithName(listName);

   if(json) doADumbPrintPls(container, json);
}


//Get a list with a name from the global List Variable
function getListWithName(name){
   var ret = undefined;
   list.forEach(element => {
      const listname = Object.keys(element)[0];
      if(name === listname) ret = element[listname];
   });
   console.log(ret);
   return ret;
}


function doADumbPrintPls(container, json){
   const images = json.images;
   container.innerHTML = "";
   images.forEach(element => {
      let div = document.createElement("div");
      div.className = "imageContainer";

      let img = document.createElement("img");
      let span = document.createElement("span");
      img.src = element.url;
      div.appendChild(img);
      span.innerHTML = JSON.stringify(element);
      div.appendChild(span);

      container.appendChild(div);
   })
}