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
   
   //now add all options
   list.forEach(element => {
      const keys = Object.keys(element);
      let option = document.createElement("option");
      option.text = keys[0];
      option.value = keys[0];
      select.add(option);
   });
}

//Add all images
function fillWithListOnchange(){
   let listName = this.value;
   let container = document.querySelector('.grid-container .list');
   const json = getListWithName(listName);

   if(json) {
      doADumbPrintPls(container, json);
   }
}


//Get a list with a name from the global List Variable
function getListWithName(name){
   var ret = undefined;
   list.forEach(element => {
      const listname = Object.keys(element)[0];
      if(name === listname) ret = element[listname];
   });
   return ret;
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