const page_width = 50;
const page_start = 100;
let answer = "Hallo halloooo halloooooo?";

let current = "";
let backspace = false;
let backspace_time = 0;
let frame = 0;
function setup() {
    createCanvas(400, 400);
    

    // answer_arr = answer.split(" ");
}

function displayText(){
    let ans_arr = answer.split(" ");
    let cur_arr = current.split(" ");
    console.log(ans_arr);
    console.log(cur_arr);

    if(cur_arr.length > ans_arr.length){
        return;
    }
    let char_num = 0;
    let line_num = 0;
    for (let i=0; i<cur_arr.length; i++){
        if (max(cur_arr[i].length, ans_arr[i].length) + char_num > 15){
            char_num = 0;
            line_num++;
        }
        if (cur_arr[i].length < ans_arr[i].length){
            for (let j=0; j<cur_arr[i].length; j++){
                if (cur_arr[i][j] == ans_arr[i][j]){
                    fill(200);
                    text(ans_arr[i][j], 100+char_num*6, 100+line_num*20);
                    
                }
                else{
                    fill(160, 49, 49);
                    text(cur_arr[i][j], 100+char_num*6, 100+line_num*20);
                }
                char_num++;
            }

            for (let j=cur_arr[i].length; j<ans_arr[i].length; j++) {
                fill(150);
                text(ans_arr[i][j], 100+char_num*6, 100+line_num*20);
                char_num++;
            }
        }
        else{
            for(let j=0; j<ans_arr[i].length; j++){
                if (cur_arr[i][j] == ans_arr[i][j]){
                    fill(200);
                    text(ans_arr[i][j], 100+char_num*6, 100+line_num*20);
                    
                }
                else{
                    fill(200, 49, 49);
                    text(cur_arr[i][j], 100+char_num*6, 100+line_num*20);
                }
                char_num++;
            }

            for(let j=ans_arr[i].length; j<cur_arr[i].length; j++){
                fill(160, 30, 30);
                text(cur_arr[i][j], 100+char_num*6, 100+line_num*20);
                char_num++;
            }
        }
        text(" ", 100+char_num*6, 100+line_num*20);
        char_num++;
    }

    for (let i=cur_arr.length; i<ans_arr.length; i++){
        if(ans_arr[i].length + char_num > 15){
            char_num = 0;
            line_num++;
        }
        fill(150);
        text(ans_arr[i]+" ", 100+char_num*6, 100+line_num*20);
        char_num+=(ans_arr[i].length+1);
    }
}

function draw() {
    frame++;
    background(56);
    // background(220);
    // circle(100, 100, 100);
    textFont('Ubuntu Mono');
    fill(255);
    text(current, 0, 400);
    
    if (frame%3 == 0 && backspace && frame > backspace_time){
        current=current.substring(0, current.length-1);
        onInputChange();
    }

    displayText();
    // console.log(counter);
  
}

function onInputChange(){
    // if (current == answer.split(" ")[counter]){
    //     counter++;
    //     current = ""; 
    // }
    // if (current[current.length -1] == " "){

    // }
}

function keyTyped(){
    if (key == " "){
        if (current[current.length -1] == " ") return;
    }
    current += key;
    onInputChange();
}

function keyPressed(){
    if (keyCode == BACKSPACE){
        current=current.substring(0, current.length-1);

        backspace_time = frame+20;
        backspace = true;
        onInputChange();
    }
}

function keyReleased(){
    if (keyCode == BACKSPACE){
        backspace = false;
    }
}