// toggle between percent and round tabs
function handleTabSelection (tabElement, sectionID) {
    const tabId = tabElement.id;
    const tabs = document.getElementById("navigation").children;

    console.log(tabs);
    if (!tabElement.classList.contains("active")) {
        tabElement.classList.add("active")
    }
    [...tabs].forEach(tab => {
        const anchor = tab.firstChild;
        if(anchor.id !== tabId) {
            anchor.classList.remove("active")
        }
    })

    const sections = document.getElementsByTagName('section');
    let sectionElement = document.getElementById(sectionID);
    
    if (!sectionElement.classList.contains("showing")) {
        sectionElement.classList.add("showing")
    }
    [...sections].forEach(section => {
        if (section.id !== sectionID) {
            section.classList.remove("showing")
        }
    });
}
document.getElementById("percent").onclick = function (e){
    e.preventDefault();
    handleTabSelection(this, "tip-percent")
}
document.getElementById("round").onclick = function (e){
    e.preventDefault();
    handleTabSelection(this, "tip-round")
}

// ------------ calculate bill/tip total
// increment / decrement split count
function addPerson(value) {
    // set a max of 10 guests
    if (value < 10) return ++value;
    return 10;
}
function removePerson(value) {
    if (value <= 1) return 1;
    return --value 
}
document.getElementById("subtract").onclick = function(e) {
    e.preventDefault();
    const valueElement = document.getElementById("split-count")
    const value = valueElement.innerHTML.trim();
    valueElement.innerText = removePerson(value);
}
document.getElementById("add").onclick = function(e) {
    e.preventDefault();
    const valueElement = document.getElementById("split-count")
    let value = valueElement.innerHTML.trim();
    valueElement.innerText = addPerson(value);
}