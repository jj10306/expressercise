let s1 = document.getElementById("s1");
let s2 = document.getElementById("s2");
let s3 = document.getElementById("s3");
let s4 = document.getElementById("s4");
let generate = document.getElementById("generate");

const checkBoxClick = (elem) => {
    let check1 = document.getElementById("check-" + elem.id[1]);

    if (check1.checked) {
        check1.checked = false;
        elem.style.border = "1px solid #7d7f81";
    }
        
    else {
        let num_selected_items = document.querySelectorAll('input[type="checkbox"]:checked').length;
        if (num_selected_items < 2) {
            check1.checked = true;
            elem.style.border = "5px solid #50b1e9";
            
        }
    }
        
};
const onGenerate = (event) => {
    let num_selected_items = document.querySelectorAll('input[type="checkbox"]:checked').length;
    if (num_selected_items < 2) {
        alert("Please select 2 excercises!");
        event.preventDefault();
    }
}
let elem_arr = [s1, s2, s3, s4];
elem_arr.forEach((elem) => {
    elem.addEventListener("click", function(){checkBoxClick(this)});
});
generate.addEventListener("click", function(){onGenerate(event)});
