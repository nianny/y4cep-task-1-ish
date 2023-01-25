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
    

    // answer_arr = answer.split(" ");
    parse_string();
    console.log(answer_arr);
}

function displayText(){
    let words_displayed = 0;
    let character_displayed = 0;
    console.log(answer_arr);
    for (let i=0; i<answer_arr.length; i++) {
        character_displayed = 0;
        for (let j=0; j<answer_arr[i].length; j++){
            // console.log(words_displayed, counter);
            if (words_displayed < counter){
                fill(200);
                text(answer_arr[i][j]+" ", 100+6*character_displayed, 100+i*50);
                character_displayed+=answer_arr[i][j].length+1;
                words_displayed++;
            }
            // else if (words_displaed == counter){

            // }  
            else{
                fill(100);
                text(answer_arr[i][j]+" ", 100+6*character_displayed, 100+i*50);
                character_displayed+=answer_arr[i][j].length+1;
                words_displayed++;
            }
        }
    }
}

function draw() {
    current_time++;
    background(54);
    // background(220);
    // circle(100, 100, 100);
    textFont('Ubuntu Mono');
    fill(255);
    text(current, 0, 400);
    
    if (current_time%3 == 0 && backspace && current_time > backspace_time){
        current=current.substring(0, current.length-1);
        onInputChange();
    }

    displayText();
    // console.log(counter);
  
}

function onInputChange(){
    if (current == answer.split(" ")[counter]){
        counter++;
        current = ""; 
    }
}

function keyTyped(){
    current += key;
    onInputChange();
}

function keyPressed(){
    if (keyCode == BACKSPACE){
        current=current.substring(0, current.length-1);

        backspace_time = current_time+20;
        backspace = true;
        onInputChange();
    }
}

function keyReleased(){
    if (keyCode == BACKSPACE){
        backspace = false;
    }
}