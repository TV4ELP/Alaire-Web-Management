function GridHelperOnLoad(){
   window.addEventListener("resize", resizeAllGridItems);
   resizeAllGridItems();
}


function resizeGridItem(item){
   let grid = document.querySelector('.grid-container .list');
   let rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-auto-rows'));
   let rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-row-gap'));
   let itemheight = item.querySelector('.content').getBoundingClientRect().height;
   rowSpan = Math.ceil((itemheight) / (rowHeight + rowGap));
   item.style.gridRowEnd = "span "+rowSpan;
}

//Get the container and resize it
function resizeAllGridItems(){
   allItems = document.getElementsByClassName("imageContainer");
   for(let i = 0; i < allItems.length; i++){
     resizeGridItem(allItems[i]);
   }
}

//We have the image Item on Load, we need to get the content and then the container
function onLoadResize(eventItem){
   let gridItem = eventItem.target.parentElement.parentElement;
   resizeGridItem(gridItem);
}



