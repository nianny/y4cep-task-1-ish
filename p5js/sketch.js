let halloooo_width = 50;
let halloooo_start = 150;
let letter_width = 10;
let letter_height = 25;
let hallooo_fun_guess_thingi = "Snipe the potato :O";

let wot_people_guessed = "";
let backspace = false;
let backspace_time = 0;
let frame = 0;
let start_time = 0;
let end_time = 0;
let ans_arr = [];
let cur_arr = [];
let game_over = false;
let started = false;
let wpm = 0;
let raw_wpm = 0;

//post-typeracer graph globals
let wpm_arr = [];
let available_width = 0;
let available_height = 0;
let max_wpm = 0;
let max_height = 0;

function recalculate_arrays(){
    ans_arr = hallooo_fun_guess_thingi.split(" ");
    cur_arr = wot_people_guessed.split(" ");

    let word_count = 0;
    for (let i=0; i<min(cur_arr.length, ans_arr.length); i++){
        if (cur_arr[i] == ans_arr[i]) word_count++;
    }
    raw_wpm = Math.round(cur_arr.length*(60*1000/(Date.now()-start_time)));
    wpm = Math.round(word_count*60*1000/(Date.now()-start_time));
    // console.log(Date.now() - start_time, (wpm_arr.length + 1)*1000, started);
    // console.log(Date.now() - start_time, raw_wpm, wpm);
    if (started && ((Date.now() - start_time) > (wpm_arr.length + 1)*1000)){
        wpm_arr.push([Date.now() - start_time, wpm]);
    }
    // console.log(wpm_arr);
    // console.log(ans_arr);
    // console.log(cur_arr);
}
function setup() {
    // createCanvas(400, 400);
    createCanvas(windowWidth, windowHeight);
    halloooo_width = (windowWidth-2*halloooo_start)/letter_width;

    // hallooo_fun_guess_thingi_arr = hallooo_fun_guess_thingi.split(" ");
}

function convert_cord(x, y){
    return [(available_width/max_time * (x-1000)) + halloooo_start*2, halloooo_start*1.25 + available_height/max_wpm * (max_wpm - y)]
}

function draw_graph(){
    available_width = width - halloooo_start*4;
    available_height = height - halloooo_start*3;

    max_wpm = 0;
    for (let i=0; i<wpm_arr.length; i++){
        max_wpm = Math.max(max_wpm, wpm_arr[i][1]);
    }
    max_time = wpm_arr[wpm_arr.length -1][0];
    console.log(max_wpm);

    for (let i=0; i<wpm_arr.length; i++) {
        let cords = convert_cord(wpm_arr[i][0], wpm_arr[i][1]);
        // console.log(wpm_arr[i][0], wpm_arr[i][1], cords[0], cords[1]);
        circle(cords[0], cords[1], letter_width);
    }

}
function displayText(){
    recalculate_arrays();

    if(cur_arr.length > ans_arr.length){
        return;
    }
    let char_num = 0;
    let line_num = 0;
    for (let i=0; i<cur_arr.length; i++){
        if (max(cur_arr[i].length, ans_arr[i].length) + char_num > halloooo_width){
            char_num = 0;
            line_num++;
        }
        if (cur_arr[i].length < ans_arr[i].length){
            for (let j=0; j<cur_arr[i].length; j++){
                if (cur_arr[i][j] == ans_arr[i][j]){
                    fill(200);
                    text(ans_arr[i][j], halloooo_start+char_num*letter_width, halloooo_start+line_num*letter_height);
                    
                }
                else{
                    fill(200, 49, 49);
                    text(ans_arr[i][j], halloooo_start+char_num*letter_width, halloooo_start+line_num*letter_height);
                }
                char_num++;
            }

            for (let j=cur_arr[i].length; j<ans_arr[i].length; j++) {
                fill(150);
                text(ans_arr[i][j], halloooo_start+char_num*letter_width, halloooo_start+line_num*letter_height);
                char_num++;
            }
        }
        else{
            for(let j=0; j<ans_arr[i].length; j++){
                if (cur_arr[i][j] == ans_arr[i][j]){
                    fill(200);
                    text(ans_arr[i][j], halloooo_start+char_num*letter_width, halloooo_start+line_num*letter_height);
                    
                }
                else{
                    fill(200, 49, 49);
                    text(ans_arr[i][j], halloooo_start+char_num*letter_width, halloooo_start+line_num*letter_height);
                }
                char_num++;
            }

            for(let j=ans_arr[i].length; j<cur_arr[i].length; j++){
                fill(160, 30, 30);
                text(cur_arr[i][j], halloooo_start+char_num*letter_width, halloooo_start+line_num*letter_height);
                char_num++;
            }
        }
        text(" ", halloooo_start+char_num*letter_width, halloooo_start+line_num*letter_height);
        char_num++;
    }

    for (let i=cur_arr.length; i<ans_arr.length; i++){
        if(ans_arr[i].length + char_num > halloooo_width){
            char_num = 0;
            line_num++;
        }
        fill(150);
        text(ans_arr[i]+" ", halloooo_start+char_num*letter_width, halloooo_start+line_num*letter_height);
        char_num+=(ans_arr[i].length+1);
    }
}

function draw() {
    frame++;
    background(56);
    textFont('Ubuntu Mono', 20);
    fill(255);

    if(game_over){
        text(end_time-start_time, 100, 100);
        text(wpm, 100, 150);
        draw_graph();
        return;
    }
    // text(wot_people_guessed, 0, 400);
    // console.log(wot_people_guessed);

    recalculate_arrays();
    if(cur_arr.length > ans_arr.length || (cur_arr.length == ans_arr.length && cur_arr[cur_arr.length -1] == ans_arr[cur_arr.length-1])){
        game_over = true;
        end_time = Date.now();
        // console.log(wpm, start_time, end_time);
        wpm_arr.push([end_time-start_time, wpm]);
        // console.log(Date());
        console.log(wpm_arr);
    }
    
    if (frame%3 == 0 && backspace && frame > backspace_time){
        deleteInput();
        // onInputChange();
    }

    displayText();
    // console.log(counter);
  
}

function onInputChange(){
    if (wot_people_guessed.length == 1 && !started){
        start_time = Date.now();
        started = true;
    }
    recalculate_arrays();
}

function keyTyped(){
    if (key == " "){
        if (wot_people_guessed == "" || wot_people_guessed[wot_people_guessed.length -1] == " ") return;
    }
    wot_people_guessed += key;
    onInputChange();
}

function keyPressed(){
    if (keyCode == BACKSPACE){
        deleteInput();

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

function deleteInput(){
    if (wot_people_guessed == "") return;
    if (wot_people_guessed[wot_people_guessed.length-1] == ' '){
        if (cur_arr[cur_arr.length - 2] == ans_arr[cur_arr.length - 2]){
            return;
        }
    }
    wot_people_guessed = wot_people_guessed.substring(0, wot_people_guessed.length-1);
    onInputChange();
}