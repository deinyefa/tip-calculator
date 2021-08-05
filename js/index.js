// toggle between percent and round tabs
function handleTabSelection (sectionID) {
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
document.getElementById("percent").onclick = (e) => {
    e.preventDefault();
    handleTabSelection("tip-percent")
}
document.getElementById("round").onclick = (e) => {
    e.preventDefault();
    handleTabSelection("tip-round")
}