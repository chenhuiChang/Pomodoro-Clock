var timerstate = 'session_stop'; //4 state: session_stop session_run break_stop break_run
var tick; // for setInterval

//setting buttons
function minus_break() {
    if (timerstate=='break_stop') {
      //minus_break
      //setting change
      var t = get_break()-1;
      t = (t==0)?1:t;
      set_break(t);
      //circle change
      update_time(t,0);
    }
}

function plus_break() {
  if (timerstate=='break_stop') {
    //plus_break
    //setting change
    var t = get_break()+1;
    t = (t==60)?1:t;
    set_break(t);
      //circle change
      update_time(t,0);
  }
}   

function minus_session() {
    if (timerstate=='session_stop') {
      //minus_session
      //setting change
      var t = get_session()-1;
      t = (t==0)?1:t;
      set_session(t);
      //circle change
      update_time(t,0);
    }
}

function plus_session() {
  if (timerstate=='session_stop') {
    //plus_session
    //setting change
    var t =get_session()+1;
    t = (t==60)?1:t;
    set_session(t);
      //circle change
      update_time(t,0);
  }
}

//setting information get
function get_break(){
  return Math.round(document.getElementById("break-time").innerHTML);
}
function get_session()
{
  return Math.round(document.getElementById("session-time").innerHTML);
}
//setting information update
function set_break (num) {
  $("#break-time").html(String(num));
}
function set_session(num){
  $("#session-time").html(String(num));
}

//timer state control
function stop_run_change_state() {
    if (timerstate == 'session_stop')
    {
        timerstate = 'session_run';
    } else if (timerstate == 'session_run'){
        timerstate = 'session_stop';
    } else if (timerstate == 'break_stop') {
      timerstate = 'break_run';
    } else if (timerstate == 'break_run') {
      timerstate = 'break_stop';
    }
    console.log(timerstate);
}

function is_timer_run(){
  if (timerstate == 'session_run') return true;
  else if (timerstate == 'break_run') return true;
  else return false;
}

function stop_timer() {
  clearInterval(tick);
}

//timer show
function conunt_down() {
    var min = Math.round(get_left()[0]);
    var sec = Math.round(get_left()[1]);
    if(min===0 && sec===0) 
    {
      min = (timerstate=='session_run')?Math.round(get_break()):Math.round(get_session());
      sec = 0;
      timerstate = (timerstate=='session_run')? 'break_run':'session_run';
      update_time(min,sec);
      state_show_update();
    }
    else if (sec !== 0) sec -= 1;
    else {
        sec = 59;
        min -= 1;
    }
    update_time(min, sec);
}

function update_time(m, s) {
    $("#left-time-first").html(String(m));
    var strings;
    if (s < 10) strings = '0' + String(s);
    else strings = String(s);
    $("#left-time-second").html(strings);
}

function get_left() {
    var first = document.getElementById("left-time-first").innerHTML;
    var second = document.getElementById("left-time-second").innerHTML;
    return [first, second];
}


//timer control
function clock_click(){
  test();
  if(is_timer_run()){
    stop_run_change_state();
    stop_timer();
  }
  else{
    stop_run_change_state();
    //timer start
    tick = setInterval(conunt_down, 1000);
  }
}

function state_show_update(){
  if (timerstate=='break_run' || timerstate=='break_stop')
    {
      $("#state").html('Break');
      $(".time-font").css('color','#AAA');
    }
  else if(timerstate=='session_run' || timerstate=='session_stop')
    {
      $("#state").html('Session');
      $(".time-font").css('color','#EEE');
    }
}

var f = 0;
function test(){
  if (f == 0)
  {
    $(".show-time-area").addClass("change-color-ani");
    f = 1;
    console.log(f);
  }
  else if(f==1)
  {
    $(".show-time-area").removeClass("change-color-ani");
    f =0;
    console.log(f);
  }
}

function short(){
  update_time(0,3);
}
