function GridHelperOnLoad(){
   window.addEventListener("resize", resizeAllGridItems);
   resizeAllGridItems();
}


function resizeGridItem(item){
   let grid = document.querySelector('.grid-container .list');
   rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-auto-rows'));
   rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-row-gap'));
   rowSpan = Math.ceil((item.querySelector('.content').getBoundingClientRect().height+rowGap)/(rowHeight+rowGap));
   item.style.gridRowEnd = "span "+rowSpan;
}

//Get the container and resize it
function resizeAllGridItems(){
   allItems = document.getElementsByClassName("imageContainer");
   allItems.forEach( element => {
      resizeGridItem(element);
   });

}

//We have the image Item on Load, we need to get the content and then the container
function onLoadResize(eventItem){
   let gridItem = eventItem.target.parentElement.parentElement;
   resizeGridItem(gridItem);
}



