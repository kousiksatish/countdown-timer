/*

JQUERY: STOPWATCH & COUNTDOWN

This is a basic stopwatch & countdown plugin to run with jquery. Start timer, pause it, stop it or reset it. Same behaviour with the countdown besides you need to input the countdown value in seconds first. At the end of the countdown a callback function is invoked.

Any questions, suggestions? marc.fuehnen(at)gmail.com

*/

$(document).ready(function() {

    setBackgroundImage();

    (function($){
    
        $.extend({
            
            APP : {                
                
                formatTimer : function(a) {
                    if (a < 10) {
                        a = '0' + a;
                    }                              
                    return a;
                },    
                
                setTimer : function() {
                    var td = parseFloat($('#cd_seconds').val())*60000;
                    console.log(td);
                    ms = td%1000;
                    td = td/1000;
                    s = parseInt(td%60); // $("#timer").css("color", "white");
                    // $("#m
                    console.log(s);
                    console.log(td)
                    td /= 60;
                    console.log(td);
                    m = parseInt(td%60);
                    td /= 60;
                    h = td;
                    $.APP.dir = 'cd';
                    $('#' + $.APP.dir + '_ms').html($.APP.formatTimer(ms));
                    $('#' + $.APP.dir + '_s').html($.APP.formatTimer(s));
                    $('#' + $.APP.dir + '_m').html($.APP.formatTimer(m));
                    $('#' + $.APP.dir + '_h').html($.APP.formatTimer(h));
                },
                startTimer : function(dir) {
                    var a;
                    
                    // save type
                    $.APP.dir = dir;
                    
                    // get current date
                    $.APP.d1 = new Date();
                    
                    switch($.APP.state) {
                            
                        case 'pause' :
                            
                            // resume timer
                            // get current timestamp (for calculations) and
                            // substract time difference between pause and now
                            $.APP.t1 = $.APP.d1.getTime() - $.APP.td;                            
                            
                        break;
                            
                        default :
                            
                            // get current timestamp (for calculations)
                            $.APP.t1 = $.APP.d1.getTime(); 
                            
                            // if countdown add ms based on seconds in textfield
                            if ($.APP.dir === 'cd') {
                                $.APP.t1 += parseFloat($('#cd_seconds').val())*60000;
                            }    
                        
                        break;
                            
                    }                                   
                    
                    // reset state
                    $.APP.state = 'alive';   
                    $('#' + $.APP.dir + '_status').html('Running');
                    
                    // start loop
                    $.APP.loopTimer();
                    
                },
                
                pauseTimer : function() {
                    
                    // save timestamp of pause
                    $.APP.dp = new Date();
                    $.APP.tp = $.APP.dp.getTime();
                    
                    // save elapsed time (until pause)
                    $.APP.td = $.APP.tp - $.APP.t1;
                    
                    // change button value
                    $('#' + $.APP.dir + '_start').val('Resume');
                    15
                    // set state
                    $.APP.state = 'pause';
                    $('#' + $.APP.dir + '_status').html('Paused');
                    
                },
                
                stopTimer : function() {
                    
                    // change button value
                    $('#' + $.APP.dir + '_start').val('Restart');                    
                    
                    // set state
                    $.APP.state = 'stop';
                    $('#' + $.APP.dir + '_status').html('Stopped');
                    
                },
                
                resetTimer : function() {
                    console.log("resettimer");
                    // reset display
                    $("#timer").css("color", "white");
                    $("#minus").css("display", "none");
                    $('#cd_ms,#cd_s,#cd_m,#cd_h').html('00');                 
                    
                    // change button value
                    $('#cd_start').val('Start');                    
                    
                    // set state
                    $.APP.state = 'reset';  
                    $('#cdstatus').html('Reset & Idle again');
                    
                },
                
                endTimer : function(callback) {
                   console.log("endtimer");
                    // change button value
                    $('#' + $.APP.dir + '_start').val('Restart');
                    
                    // set state
                    $.APP.state = 'end';
                    
                    // invoke callback
                    if (typeof callback === 'function') {
                        callback();
                    }    
                    
                },    
                
                loopTimer : function() {
                    
                    var td;
                    var d2,t2;
                    
                    var ms = 0;
                    var s  = 0;
                    var m  = 0;
                    var h  = 0;
                    
                    if ($.APP.state === 'alive') {
                                
                        // get current date and convert it into 
                        // timestamp for calculations
                        d2 = new Date();
                        t2 = d2.getTime();   
                        
                        // calculate time difference between
                        // initial and current timestamp
                        if ($.APP.dir === 'sw') {
                            td = t2 - $.APP.t1;
                        // reversed if countdown
                        } else {
                            td = $.APP.t1 - t2;
                            if (td < 1000) {
                                console.log("ed");
                                //if time difference is 0 end countdown
                                $.APP.endTimer(function(){
                                    $.APP.resetTimer();
                                    $.APP.startTimer('sw');
                                    $("#timer").css("color", "red");
                                    $("#minus").show();
                                    $('#' + $.APP.dir + '_status').html('Ended & Reset');
                                });
                            }    
                        }    
                        
                        // calculate milliseconds
                        ms = td%1000;
                        if (ms < 1) {
                            ms = 0;
                        } else {    
                            // calculate seconds
                            s = (td-ms)/1000;
                            if (s < 1) {
                                s = 0;
                            } else {
                                // calculate minutes   
                                var m = (s-(s%60))/60;
                                if (m < 1) {
                                    m = 0;
                                } else {
                                    // calculate hours
                                    var h = (m-(m%60))/60;
                                    if (h < 1) {
                                        h = 0;
                                    }                             
                                }    
                            }
                        }
                      
                        // substract elapsed minutes & hours
                        ms = Math.round(ms/100);
                        s  = s-(m*60);
                        m  = m-(h*60);                                
                        
                        // update display
                        $('#cd_ms').html($.APP.formatTimer(ms));
                        $('#cd_s').html($.APP.formatTimer(s));
                        $('#cd_m').html($.APP.formatTimer(m));
                        $('#cd_h').html($.APP.formatTimer(h));
                        
                        // loop
                        $.APP.t = setTimeout($.APP.loopTimer,1);
                    
                    } else {
                    
                        // kill loop
                        clearTimeout($.APP.t);
                        return true;
                    
                    }  
                    
                }
                    
            }    
        
        });
          
        $('#sw_start').live('click', function() {
            $.APP.startTimer('sw');
        });    

        $('#cd_start').live('click', function() {
            $.APP.startTimer('cd');
        });           
        
        $('#sw_stop,#cd_stop').live('click', function() {
            $.APP.stopTimer();
        });
        
        $('#sw_reset,#cd_reset').live('click', function() {
            $.APP.resetTimer();
            setBackgroundImage();
        });  
        
        $('#sw_pause,#cd_pause').live('click', function() {
            $.APP.pauseTimer();
        }); 

        $('#sw_set,#cd_set').live('click', function() {
            $.APP.setTimer();
        });                               
                
    })(jQuery);
        
});

var image_id = 0;

//TODO 
//remove unnecessary images used for testing
//add image names of images to be added as background
var images = [
                'logo_nc.png',
                'pragyan_logo.png',
                'lifelameme.jpg',
                'pragyan.png'                
];
   
function setBackgroundImage()
{
    $(".background-container img").attr("src",images[image_id]);

    if(image_id<images.length-1)     //increment image id as long as next image in array exists 
    {
        image_id = image_id + 1;
    }
    else                             //repeat cycle from start
    {
        image_id = 0;
    }
}
