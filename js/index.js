// toggle between percent and round tabs
function handleTabSelection (tabElement, sectionID) {
    const tabId = tabElement.id;
    const tabs = document.getElementById("navigation").children;

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
let billTotal, tipPercent, split;
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
    valueElement.innerText = removePerson(Number(value));
    split = removePerson(Number(value));

    calculatePercentTip(billTotal, tipPercent, split);
}
document.getElementById("add").onclick = function(e) {
    e.preventDefault();
    const valueElement = document.getElementById("split-count")
    let value = valueElement.innerHTML.trim();
    valueElement.innerText = addPerson(Number(value));
    split = addPerson(Number(value));

    calculatePercentTip(billTotal, tipPercent, split);
}

function calculatePercentTip(billTotal = 0.0, tipPercent = 5, split = 1) {
    const bill = Math.round((billTotal / split + Number.EPSILON) * 100) / 100;
    const tip = ((tipPercent / 100) * bill) / split;
    const formattedTip = Math.round((tip + Number.EPSILON) * 100) / 100

    const total = bill + tip;
    const prettyTotal = Math.round((total + Number.EPSILON) * 100) / 100;

    document.getElementById("grand-total").innerText = "$" + prettyTotal;
    document.getElementById("bill-total").innerText = "$" + bill;
    document.getElementById("tip-total").innerText = "$" + formattedTip;
}

document.getElementById("total").addEventListener("input", function (e) {
   billTotal = e.target.value.trim();
   
   calculatePercentTip(billTotal, tipPercent, split)
});
let percentRadios = document.getElementsByName("percent-number");
[...percentRadios].forEach((radio) => {
    radio.onclick = function() {
        if(radio.checked) {
            tipPercent = radio.value;
            
            calculatePercentTip(billTotal, tipPercent, split)
        }
    }
})