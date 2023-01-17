const page_width = 10;

let answer = "Hallo halloooo halloooooo?";
let counter = 0;
let answer_arr = [];

let current = "";
let backspace = false;
let backspace_time = 0;
let current_time = 0;

function parse_string(){
    let temp = answer.split(" ");

    let line = 0;
    let total_length = 0;
    answer_arr[line] = "";
    for (let i=0; i<temp.length; i++) {
        if (temp[i].length + total_length > page_width) { //REMEMBER TO CHECK THAT LENGTHS OF ALL WORDS LESS THAN PAGE_WIDTH
            line ++;
            total_length = 0;
            answer_arr[line]=(temp[i]+" ");
        }
        else{
            answer_arr[line] += (temp[i] + " ");
        }
    }

    for (let i=0; i<answer_arr.length; i++) {
        answer_arr[i] = answer_arr[i].split(" ");
    }
}
function setup() {
    createCanvas(400, 400);
    background(54);

    // answer_arr = answer.split(" ");
    parse_string();
    console.log(answer_arr);
}

function displayText(){
    let words_displayed = 0;
    for (let i=0; i<answer_arr.length; i++) {
        for (let j=0; j<answer_arr[i].length; j++){
            if (words_displayed <= counter){
                fill(200);
                
            }
        }
    }
}

function draw() {
    current_time++;
    // background(220);
    // circle(100, 100, 100);
    textFont('Ubuntu Mono');
    text(current, 0, 400);
    
    if (current_time%3 == 0 && backspace && time > backspace_time){
        current=current.substring(0, current.length-1);
    }

    displayText();
  
}

function onInputChange(){
    if (current == ans_arr[counter]){
        counter++;
        current = ""; 
    }
}

function keyTyped(){
    current += key;
}

function keyPressed(){
    if (keyCode == BACKSPACE){
        current=current.substring(0, current.length-1);

        backspace_time = time+20;
        backspace = true;
        
    }
}

function keyReleased(){
    if (keyCode == BACKSPACE){
        backspace = false;
    }
}