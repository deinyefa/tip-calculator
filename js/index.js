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