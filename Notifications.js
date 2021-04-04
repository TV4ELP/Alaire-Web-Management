function Notify(text){
    let notify = document.querySelector('#notification');
    notify.innerHTML = text;
    notify.className = "visible";

    notify.addEventListener("click", function(){
        let notify = document.querySelector('#notification');
        notify.className = "hidden";
    });
}


function NotifyOnload(){
    let notify = document.querySelector('#notification');
    //callback for the mutation observer
    const callback = function(mutationsList, observer) {
        mutationsList.forEach(mu => {
            if (mu.type !== "attributes" && mu.attributeName !== "class") return;
            //The class was changed. Make sure to set it back to hidden after 5 seconds
            window.setTimeout(() =>{
                let notify = document.querySelector('#notification');
                notify.className = "hidden";
            }, 5000);
        });
    };

    // Options for the observer (which mutations to observe)
    const config = { attributes: true, childList: true, subtree: true };
    const observer = new MutationObserver(callback);
    observer.observe(notify, config);
 }