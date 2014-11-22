/*
	Subjects [id,subject,empty,empty,[grade,name,date],[name,hour,date]]
	Hours [id,hour_start,hour_end]
	Types [id,type,color]
	Settings [auto_delete,add_lesson,button_ab,days[,,,,,,,],week_ab]
	Notes [notes]
	Schedule [id_subject,id_hour,room,teacher,id_type,week_ab]
*/

var activeDay;
var colors = new Array();
if(localStorage["Settings"]){
	var subject = JSON.parse(localStorage["Subjects"]);
	var hour = JSON.parse(localStorage["Hours"]);
	var type = JSON.parse(localStorage["Types"]);
	var setting = JSON.parse(localStorage["Settings"]);
	var note = JSON.parse(localStorage["Notes"]);
	var schedule = JSON.parse(localStorage["Schedule"]);
}
var debug = false; // function name => console.log

 navigator.mozL10n.ready( function() { 
  init();
	document.querySelector('#panel1').addEventListener ('click', function () {
		deleteEvent();
		updateDay(0);
	});
	document.querySelector('#panel2').addEventListener ('click', function () {
		deleteEvent();
		updateDay(1);
	});
	document.querySelector('#panel3').addEventListener ('click', function () {
		deleteEvent();
		updateDay(2);
	});
	document.querySelector('#panel4').addEventListener ('click', function () {
		deleteEvent();
		updateDay(3);
	});
	document.querySelector('#panel5').addEventListener ('click', function () {
		deleteEvent();
		updateDay(4);
	});
	document.querySelector('#panel6').addEventListener ('click', function () {
		deleteEvent();
		updateDay(5);
	});
	document.querySelector('#panel7').addEventListener ('click', function () {
		deleteEvent();
		updateDay(6);
	});

	document.querySelector('#Menu1').addEventListener ('click', function () {
	  updateListSubjects();
	  document.querySelector('#subjects').className = 'current';
	  document.querySelector('[data-position="current"]').className = 'left';
	});
	document.querySelector('#Menu2').addEventListener ('click', function () {
	  updateListEvents();
	  document.querySelector('#events').className = 'current';
	  document.querySelector('[data-position="current"]').className = 'left';
	});
	document.querySelector('#Menu3').addEventListener ('click', function () {
	  updateListGrades();
	  document.querySelector('#grades').className = 'current';
	  document.querySelector('[data-position="current"]').className = 'left';
	});
	document.querySelector('#Menu4').addEventListener ('click', function () {
	  updateListNotes();
	  document.querySelector('#notes').className = 'current';
	  document.querySelector('[data-position="current"]').className = 'left';
	});
	document.querySelector('#Menu5').addEventListener ('click', function () {
	  updateListTypes();
	  document.querySelector('#types').className = 'current';
	  document.querySelector('[data-position="current"]').className = 'left';
	});
	document.querySelector('#Menu6').addEventListener ('click', function () {
	  updateListHours();
	  document.querySelector('#hours').className = 'current';
	  document.querySelector('[data-position="current"]').className = 'left';
	});
	document.querySelector('#Menu7').addEventListener ('click', function () {
		if(setting[0])document.querySelector('#sett1').checked = true;
		else document.querySelector('#sett1').checked = false;
		if(setting[1])document.querySelector('#sett2').checked = true;
		else document.querySelector('#sett2').checked = false;
		if(setting[2])document.querySelector('#sett3').checked = true;
		else document.querySelector('#sett3').checked = false;
		aDay = [navigator.mozL10n.get('aDay1'),navigator.mozL10n.get('aDay2'),navigator.mozL10n.get('aDay3'),navigator.mozL10n.get('aDay4'),navigator.mozL10n.get('aDay5'),navigator.mozL10n.get('aDay6'),navigator.mozL10n.get('aDay7')];
		document.querySelector('#fake-select').innerHTML = "";
		for(var i=0;i<7;i++){
		  if(setting[3][i]){
			document.querySelector('#setDays').options[i].selected=true;
			document.querySelector('#fake-select').innerHTML += aDay[i]+", "
		  } else{
			document.querySelector('#setDays').options[i].selected=false;
		  }
		  document.querySelector('#setDays').addEventListener ('change', function () {
			this.className="changed";
		  });
		}
	  document.querySelector('#settings').classList.add('current');
	  document.querySelector('#settings').classList.remove('right');
	  document.querySelector('[data-position="current"]').className = 'left';
	});

	document.querySelector('#back-index').addEventListener ('click', function () {
	  updateDay(activeDay);
	  document.querySelector('#subjects').className = 'right';
	  document.querySelector('[data-position="current"]').className = 'current';
	});
	document.querySelector('#back-index2').addEventListener ('click', function () {
	  updateDay(activeDay);
	  document.querySelector('#events').className = 'right';
	  document.querySelector('[data-position="current"]').className = 'current';
	});
	document.querySelector('#back-index3').addEventListener ('click', function () {
	  document.querySelector('#grades').className = 'right';
	  document.querySelector('[data-position="current"]').className = 'current';
	});
	document.querySelector('#back-index4').addEventListener ('click', function () {
	  document.querySelector('#vGrades').className = 'right';
	});
	document.querySelector('#back-index5').addEventListener ('click', function () {
	  document.querySelector('#notes').className = 'right';
	  document.querySelector('[data-position="current"]').className = 'current';
	});
	document.querySelector('#back-index6').addEventListener ('click', function () {
	  document.querySelector('#vNotes').className = 'right';
	  document.querySelector('[data-position="current"]').className = 'current';
	});
	document.querySelector('#back-index7').addEventListener ('click', function () {
	  updateDay(activeDay);
	  document.querySelector('#hours').className = 'right';
	  document.querySelector('[data-position="current"]').className = 'current';
	});
	document.querySelector('#back-index8').addEventListener ('click', function () {
	  updateDay(activeDay);
	  document.querySelector('#types').className = 'right';
	  document.querySelector('[data-position="current"]').className = 'current';
	});
	document.querySelector('#back-index9').addEventListener ('click', function () {
	  document.querySelector('#eSchedule').classList.add("right");
	  document.querySelector('#eSchedule').classList.remove("current");
	  document.querySelector('[data-position="current"]').className = 'current';
	});
	document.querySelector('#back-index10').addEventListener ('click', function () {
	  updateDay(activeDay);
	  document.querySelector('#vSchedule').className = 'right'
	  document.querySelector('[data-position="current"]').className = 'current';
	});
	document.querySelector('#back-index11').addEventListener ('click', function () {
	  document.querySelector('#settings').classList.add('right');
	  document.querySelector('#settings').classList.remove('current');
	  document.querySelector('[data-position="current"]').className = 'current';
	});
	document.querySelector('#back-index12').addEventListener ('click', function () {
	  document.querySelector('#donate').className = "right";
	  document.querySelector('[data-position="current"]').className = 'current';
	});

	document.querySelector('#back-subjects').addEventListener ('click', function () {
		document.querySelector('#eSubject').classList.add("right");
		document.querySelector('#eSubject').classList.remove("current");
	});
	document.querySelector('#back-events').addEventListener ('click', function () {
		document.querySelector('#eEvent').classList.add("right");
		document.querySelector('#eEvent').classList.remove("current");
	});
	document.querySelector('#back-grades').addEventListener ('click', function () {
		document.querySelector('#eGrade').classList.add("right");
		document.querySelector('#eGrade').classList.remove("current");
	});
	document.querySelector('#back-notes').addEventListener ('click', function () {
		document.querySelector('#eNote').classList.add("right");
		document.querySelector('#eNote').classList.remove("current");
	});
	document.querySelector('#back-hours').addEventListener ('click', function () {
		document.querySelector('#eHour').classList.add("right");
		document.querySelector('#eHour').classList.remove("current");
	});
	document.querySelector('#back-types').addEventListener ('click', function () {
		document.querySelector('#eType').classList.add("right");
		document.querySelector('#eType').classList.remove("current");
	});

	document.querySelector('#doneSubject').addEventListener ('click', function () {
		  document.querySelector('#eSubject').classList.add("right");
		  document.querySelector('#eSubject').classList.remove("current");
		  saveSubject(document.querySelector('#inputSubject').value,document.querySelector('#inputSubject').placeholder);
	});
	document.querySelector('#doneEvent').addEventListener ('click', function () {
		document.querySelector('#eEvent').classList.add("right");
		document.querySelector('#eEvent').classList.remove("current");
		dat = new Date();
			mm = dat.getMonth()+1;
			dd = dat.getDate();
			if(dd<10)
			  dd='0'+dd;
			if(mm<10)
			  mm='0'+mm;
			dats = dat.getFullYear()+"-"+mm+"-"+dd;
		if((setting[0] && dats<=document.querySelector('#dateEvent').value) || !setting[0]){
		  saveEvent(document.querySelector('#inputEvent').value,document.querySelector('#jEvent').placeholder,document.querySelector('#timeEvent').value,document.querySelector('#dateEvent').value,document.querySelector('#eventSubject').value,document.querySelector('#jEvent').value);
		  if(document.querySelector('#h1vSchedule').innerHTML==document.querySelector('#eventSubject').value && document.querySelector('#inputEvent').value){
			if(document.querySelector('#eiEventsSchedule').innerHTML=='<li><a href="#"><p>'+navigator.mozL10n.get('no-events')+'</p></a></li>')document.querySelector('#eiEventsSchedule').innerHTML="";
			 document.querySelector('#eiEventsSchedule').innerHTML += '<li><a href="#"><p>'+document.querySelector('#inputEvent').value+'</p><p><time>'+document.querySelector('#timeEvent').value+' '+document.querySelector('#dateEvent').value+'</time></p></a></li>';
		  }
		}
	});
	document.querySelector('#doneGrade').addEventListener ('click', function () {
		  document.querySelector('#eGrade').classList.add("right");
		  document.querySelector('#eGrade').classList.remove("current");
		  saveGrade(document.querySelector('#h2eGrade').innerHTML,document.querySelector('#inputGrade').value,document.querySelector('#nameGrade').value,document.querySelector('#dateGrade').value,document.querySelector('#idGrade').value);
		  if(document.querySelector('#inputGrade').value){
			if(document.querySelector('#eiGradesSchedule').innerHTML==navigator.mozL10n.get('no-grades'))document.querySelector('#eiGradesSchedule').innerHTML="";
			document.querySelector('#eiGradesSchedule').innerHTML += document.querySelector('#inputGrade').value+', ';
		  }
	});
	document.querySelector('#doneNote').addEventListener ('click', function () {
		  document.querySelector('#eNote').classList.add("right");
		  document.querySelector('#eNote').classList.remove("current");
		  saveNote(document.querySelector('#inputNotes').value,document.querySelector('#jNotes').value);
	});
	document.querySelector('#doneHour').addEventListener ('click', function () {
		  document.querySelector('#eHour').classList.add("right");
		  document.querySelector('#eHour').classList.remove("current");
		  saveHour(document.querySelector('#idHour').value,document.querySelector('#startHour').value,document.querySelector('#stopHour').value);
	});
	document.querySelector('#doneType').addEventListener ('click', function () {
		  document.querySelector('#eType').classList.add("right");
		  document.querySelector('#eType').classList.remove("current");
		  saveType(document.querySelector('#idType').value,document.querySelector('#nameType').value,document.querySelector('#colorType').value);
	});
	document.querySelector('#doneSchedule').addEventListener ('click', function () {
	  document.querySelector('#eSchedule').classList.add("right");
	  document.querySelector('#eSchedule').classList.remove("current");
	  document.querySelector('[data-position="current"]').className = 'current';
	  saveSchedule(document.querySelector('#jSchedule').value,document.querySelector('#subjectSchedule').value,document.querySelector('#typeSchedule').value,document.querySelector('#hourSchedule').value,document.querySelector('#abSchedule').value,document.querySelector('#teacherSchedule').value,document.querySelector('#roomSchedule').value);
	});
	document.querySelector('#doneSettings').addEventListener ('click', function () {
		  document.querySelector('#settings').classList.add("right");
		  document.querySelector('#settings').classList.remove("current");
		  document.querySelector('[data-position="current"]').className = 'current';
		  saveSettings(document.querySelector('#sett1').checked,document.querySelector('#sett2').checked,document.querySelector('#sett3').checked);
	});
	
	document.querySelector('#aSubject').addEventListener ('click', function () {
	  document.querySelector('#h1eSubject').innerHTML =  navigator.mozL10n.get('add-subject');
	  document.querySelector('#inputSubject').value = "";
	  document.querySelector('#inputSubject').placeholder = navigator.mozL10n.get('subject-name');
	  document.querySelector('#eSubject').classList.add("current");
	  document.querySelector('#eSubject').classList.remove("right");
	});
	document.querySelector('#aEvent').addEventListener ('click', function () {
		newEvent();
	});
	document.querySelector('#aGrade').addEventListener ('click', function () {
		ev = document.querySelector('#h2vGrades').innerHTML;
		idp = null;
		for(var i=0;i<subject.length;i++){
			if(ev==subject[i][1]) idp = i;
		}
		editGrade(idp);
	});
	document.querySelector('#aNote').addEventListener ('click', function () {
	  document.querySelector('#h1eNote').innerHTML =  navigator.mozL10n.get('add-note');
	  document.querySelector('#inputNotes').value = "";
	  document.querySelector('#jNotes').value = "";
	  document.querySelector('#eNote').classList.add("current");
	  document.querySelector('#eNote').classList.remove("right");
	});
	document.querySelector('#aHour').addEventListener ('click', function () {
	  document.querySelector('#h1eHour').innerHTML =  navigator.mozL10n.get('add-schedule');
	  document.querySelector('#startHour').value = "";
	  document.querySelector('#stopHour').value = "";
	  document.querySelector('#idHour').value = "";
	  document.querySelector('#eHour').classList.add("current");
	  document.querySelector('#eHour').classList.remove("right");
	});
	document.querySelector('#aType').addEventListener ('click', function () {
	  document.querySelector('#h1eType').innerHTML =  navigator.mozL10n.get('add-type');
	  document.querySelector('#nameType').value = "";
	  document.querySelector('#colorType').value = "";
	  document.querySelector('#idType').value = "";
	  document.querySelector('#eType').classList.add("current");
	  document.querySelector('#eType').classList.remove("right");
	});

	document.querySelector('#dSubjects').addEventListener ('click', function () {
		  document.querySelector('#listuSubjects').innerHTML = '';
		  for(var i=0;i<subject.length;i++){
			  document.querySelector('#listuSubjects').innerHTML += '<li><label class="pack-checkbox danger"> <input id="delSubject'+i+'" type="checkbox"><span></span></label>'+subject[i][1]+'</li>';
		  }
		document.querySelector('#uSubjects').classList.add("current");
		document.querySelector('#uSubjects').classList.remove("down");
		document.querySelector('#uSubjects').classList.remove("down2");
	});
	document.querySelector('#dEvents').addEventListener ('click', function () {
		  document.querySelector('#listuEvents').innerHTML = '';
		  for(var i=0;i<subject.length;i++){
			if(subject[i][5]){
			  for(var j=0;j<subject[i][5].length;j++){
				  document.querySelector('#listuEvents').innerHTML += '<li class="detail"><label class="pack-checkbox danger"> <input id="del'+i+'Event'+j+'" type="checkbox"><span></span></label><p>'+subject[i][5][j][0]+'</p> <p><em>'+subject[i][1]+'</em> <time>'+subject[i][5][j][1]+' '+subject[i][5][j][2]+'</time></p></li>';
			  }
			}
		  }
		document.querySelector('#uEvents').classList.add("current");
		document.querySelector('#uEvents').classList.remove("down");
		document.querySelector('#uEvents').classList.remove("down2");
	});
	document.querySelector('#dGrades').addEventListener ('click', function () {
		ev = document.querySelector('#h2uGrades').innerHTML = document.querySelector('#h2vGrades').innerHTML;
		idp = null;
		for(var i=0;i<subject.length;i++){
			if(ev==subject[i][1]) idp = i;
		}
		document.querySelector('#listuGrades').innerHTML = '';
	      if(subject[idp][4]){
		    for(var i=0;i<subject[idp][4].length;i++){
			  pp2 = subject[idp][4][i][2] ? '<p>'+subject[idp][4][i][2]+'</p>' : "<p>&nbsp;</p>";
			  document.querySelector('#listuGrades').innerHTML += '<li class="detail"><label class="pack-checkbox danger"> <input id="delGrade'+i+'" type="checkbox"><span></span></label><p>'+subject[idp][4][i][1]+' <em>('+subject[idp][4][i][0]+')</em></p>'+pp2+'</li>';
		    }
		  }
		document.querySelector('#uGrades').classList.add("current");
		document.querySelector('#uGrades').classList.remove("down");
		document.querySelector('#uGrades').classList.remove("down2");
	});
	document.querySelector('#dNotes').addEventListener ('click', function () {
		  document.querySelector('#listuNotes').innerHTML = '';
		  for(var i=0;i<note.length;i++){
			  document.querySelector('#listuNotes').innerHTML += '<li><label class="pack-checkbox danger"> <input id="delNote'+i+'" type="checkbox"><span></span></label>'+note[i]+'</li>';
		  }
		document.querySelector('#uNotes').classList.add("current");
		document.querySelector('#uNotes').classList.remove("down");
		document.querySelector('#uNotes').classList.remove("down2");
	});
	document.querySelector('#dHours').addEventListener ('click', function () {
		  document.querySelector('#listuHours').innerHTML = '';
		  hour.sort(function(a,b){
			  if(a[1]<b[1]) return -1;
			  else if(a[1]>b[1]) return 1;
			  else return 0;
		  });
		  for(var i=0;i<hour.length;i++){
			  document.querySelector('#listuHours').innerHTML += '<li><label class="pack-checkbox danger"> <input id="delHour'+i+'" type="checkbox"><span></span></label>'+hour[i][1]+' - '+hour[i][2]+'</li>';
		  }
		document.querySelector('#uHours').classList.add("current");
		document.querySelector('#uHours').classList.remove("down");
		document.querySelector('#uHours').classList.remove("down2");
	});
	document.querySelector('#dTypes').addEventListener ('click', function () {
		  document.querySelector('#listuTypes').innerHTML = '';
		  for(var i=0;i<type.length;i++){
			  document.querySelector('#listuTypes').innerHTML += '<li><label class="pack-checkbox danger"> <input id="delType'+i+'" type="checkbox"><span></span></label>'+type[i][1]+'</li>';
		  }
		document.querySelector('#uTypes').classList.add("current");
		document.querySelector('#uTypes').classList.remove("down");
		document.querySelector('#uTypes').classList.remove("down2");
	});
	document.querySelector('#abtSchedule').addEventListener ('click', function () {
		abt = this.innerHTML;
		if(abt=="A"){
			this.innerHTML="B";
			setting[4] = "B";
		}else if(abt=="B"){
			this.innerHTML="AB";
			setting[4] = "AB";
		}else if(abt=="AB"){
			this.innerHTML="A";
			setting[4] = "A";
		}
		localStorage["Settings"] = JSON.stringify(setting);
		updateDay(activeDay);
	});
	document.querySelector('#dSchedule').addEventListener ('click', function () {
		delSchedule();
	});

	document.querySelector('#closeSubjects').addEventListener ('click', function () {
		document.querySelector('#uSubjects').classList.add("down");
		document.querySelector('#uSubjects').classList.remove("current");
	});
	document.querySelector('#closeEvents').addEventListener ('click', function () {
		document.querySelector('#uEvents').classList.add("down");
		document.querySelector('#uEvents').classList.remove("current");
	});
	document.querySelector('#closeGrades').addEventListener ('click', function () {
		document.querySelector('#uGrades').classList.add("down");
		document.querySelector('#uGrades').classList.remove("current");
	});
	document.querySelector('#closeNotes').addEventListener ('click', function () {
		document.querySelector('#uNotes').classList.add("down");
		document.querySelector('#uNotes').classList.remove("current");
	});
	document.querySelector('#closeHours').addEventListener ('click', function () {
		document.querySelector('#uHours').classList.add("down");
		document.querySelector('#uHours').classList.remove("current");
	});
	document.querySelector('#closeTypes').addEventListener ('click', function () {
		document.querySelector('#uTypes').classList.add("down");
		document.querySelector('#uTypes').classList.remove("current");
	});
	document.querySelector('#closeSchedule').addEventListener ('click', function () {
		document.querySelector('#uSchedule').classList.add("down");
		document.querySelector('#uSchedule').classList.remove("current");
	});

	document.querySelector('#deleteSubjects').addEventListener ('click', function () {
	  document.querySelector('#confirm').className = 'fade-in';
	});
	document.querySelector('#deleteEvents').addEventListener ('click', function () {
	  document.querySelector('#confirm2').className = 'fade-in';
	});
	document.querySelector('#deleteGrades').addEventListener ('click', function () {
	  document.querySelector('#confirm3').className = 'fade-in';
	});
	document.querySelector('#deleteNotes').addEventListener ('click', function () {
	  document.querySelector('#confirm4').className = 'fade-in';
	});
	document.querySelector('#deleteHours').addEventListener ('click', function () {
	  document.querySelector('#confirm5').className = 'fade-in';
	});
	document.querySelector('#deleteTypes').addEventListener ('click', function () {
	  document.querySelector('#confirm6').className = 'fade-in';
	});
	document.querySelector('#deleteSchedule').addEventListener ('click', function () {
	  document.querySelector('#confirm7').className = 'fade-in';
	});

	document.querySelector('#btn-delete').addEventListener ('click', function () {
		document.querySelector('#confirm').className = 'fade-out';
		deleteSubjects();
		document.querySelector('#uSubjects').classList.add("down2");
		document.querySelector('#uSubjects').classList.remove("current");
	});
	document.querySelector('#btn-delete2').addEventListener ('click', function () {
		document.querySelector('#confirm2').className = 'fade-out';
		deleteEvents();
		document.querySelector('#uEvents').classList.add("down2");
		document.querySelector('#uEvents').classList.remove("current");
	});
	document.querySelector('#btn-delete3').addEventListener ('click', function () {
		document.querySelector('#confirm3').className = 'fade-out';
		deleteGrades();
		document.querySelector('#uGrades').classList.add("down2");
		document.querySelector('#uGrades').classList.remove("current");
	});
	document.querySelector('#btn-delete4').addEventListener ('click', function () {
		document.querySelector('#confirm4').className = 'fade-out';
		deleteNotes();
		document.querySelector('#uNotes').classList.add("down2");
		document.querySelector('#uNotes').classList.remove("current");
	});
	document.querySelector('#btn-delete5').addEventListener ('click', function () {
		document.querySelector('#confirm5').className = 'fade-out';
		deleteHours();
		document.querySelector('#uHours').classList.add("down2");
		document.querySelector('#uHours').classList.remove("current");
	});
	document.querySelector('#btn-delete6').addEventListener ('click', function () {
		document.querySelector('#confirm6').className = 'fade-out';
		deleteTypes();
		document.querySelector('#uTypes').classList.add("down2");
		document.querySelector('#uTypes').classList.remove("current");
	});
	document.querySelector('#btn-delete7').addEventListener ('click', function () {
		document.querySelector('#confirm7').className = 'fade-out';
		deleteSchedule();
		document.querySelector('#uSchedule').classList.add("down2");
		document.querySelector('#uSchedule').classList.remove("current");
	});

	document.querySelector('#btn-cancel').addEventListener ('click', function () {
	  document.querySelector('#confirm').className = 'fade-out';
	});
	document.querySelector('#btn-cancel2').addEventListener ('click', function () {
	  document.querySelector('#confirm2').className = 'fade-out';
	});
	document.querySelector('#btn-cancel3').addEventListener ('click', function () {
	  document.querySelector('#confirm3').className = 'fade-out';
	});
	document.querySelector('#btn-cancel4').addEventListener ('click', function () {
	  document.querySelector('#confirm4').className = 'fade-out';
	});
	document.querySelector('#btn-cancel5').addEventListener ('click', function () {
	  document.querySelector('#confirm5').className = 'fade-out';
	});
	document.querySelector('#btn-cancel6').addEventListener ('click', function () {
	  document.querySelector('#confirm6').className = 'fade-out';
	});
	document.querySelector('#btn-cancel7').addEventListener ('click', function () {
	  document.querySelector('#confirm7').className = 'fade-out';
	});
	
	document.querySelector('#setDays').addEventListener ('change', function () {
	  selDay="";
		aDay = [navigator.mozL10n.get('aDay1'),navigator.mozL10n.get('aDay2'),navigator.mozL10n.get('aDay3'),navigator.mozL10n.get('aDay4'),navigator.mozL10n.get('aDay5'),navigator.mozL10n.get('aDay6'),navigator.mozL10n.get('aDay7')];
	  for(var i=0;i<7;i++){
		if(document.querySelector('#setDays').options[i].selected)selDay+=aDay[i]+", ";
	  }
	  document.querySelector('#fake-select').innerHTML = selDay;
	});
	document.querySelector('#aDonate').addEventListener ('click', function () {
	  document.querySelector('#donate').className = 'current';
	  document.querySelector('[data-position="current"]').className = 'left';
	});

	colors = [
	[255, 0, 0, navigator.mozL10n.get('red')],
	[50, 205, 50, navigator.mozL10n.get('green')],
	[127, 255, 0, navigator.mozL10n.get('green2')],
	[65, 105, 225, navigator.mozL10n.get('blue')],
	[0, 191, 255, navigator.mozL10n.get('blue2')],
	[138, 43, 226, navigator.mozL10n.get('violet')],
	[248, 137, 169, navigator.mozL10n.get('pink')],
	[235, 1, 101, navigator.mozL10n.get('raspberry')],
	[255, 215, 0, navigator.mozL10n.get('gold')],
	[255, 165, 0, navigator.mozL10n.get('orange')],
	[249, 124, 23, navigator.mozL10n.get('orange2')],
	[54, 69, 79, navigator.mozL10n.get('graphite')]];
	
  document.querySelector('#teacherSchedule').placeholder = navigator.mozL10n.get('teacher');
  document.querySelector('#roomSchedule').placeholder = navigator.mozL10n.get('classroom');
  document.querySelector('#inputSubject').placeholder = navigator.mozL10n.get('subject-name');
  document.querySelector('#inputEvent').placeholder = navigator.mozL10n.get('event-name');
  document.querySelector('#nameGrade').placeholder = navigator.mozL10n.get('grade-name');
  document.querySelector('#inputGrade').placeholder = navigator.mozL10n.get('grade');
  document.querySelector('#inputNotes').placeholder = navigator.mozL10n.get('note-content');
  document.querySelector('#nameType').placeholder = navigator.mozL10n.get('type');
});

function init(){
  if(debug)console.log('init');
	 if(!localStorage["Subjects"]){
		subject = new Array();
		localStorage["Subjects"] = JSON.stringify(subject);
	}
	 if(!localStorage["Notes"]){
		note = new Array();
		localStorage["Notes"] = JSON.stringify(note);
	}
	 if(!localStorage["Hours"]){
		hour = new Array();
		localStorage["Hours"] = JSON.stringify(hour);
	}
	 if(!localStorage["Types"]){
		type = new Array();
		localStorage["Types"] = JSON.stringify(type);
	}
	 if(!localStorage["Schedule"]){
		schedule = new Array(); schedule = [[],[],[],[],[],[],[]];
		localStorage["Schedule"] = JSON.stringify(schedule);
	 }
	 if(!localStorage["Settings"]){
		setting = new Array(); setting = [true,true,true,[true,true,true,true,true,false,false],"AB"];
		localStorage["Settings"] = JSON.stringify(setting);
	 }
	 start();
}

function start(){
  if(debug)console.log('start');
	for(var i=0;i<7;i++){
		if(setting[3][i])document.querySelector('#panel'+(i+1)).classList.remove('none');
		else document.querySelector('#panel'+(i+1)).classList.add('none');
	}
	 if(setting[2]) document.querySelector('#abtSchedule').classList.remove("none");
	 else document.querySelector('#abtSchedule').classList.add("none");
	 document.querySelector('#abtSchedule').innerHTML = setting[4];
	 if(setting[0]) deleteEvent();
	 numDay = new Date().getDay(); 
	 if(setting[3][numDay-1]){
		numDay = numDay;
	 }else{
		for(var i=numDay;i<7;i++){
			if(setting[3][i]){
				numDay = i+1;
				i=8;
			}else{
				for(j=0;j<7;j++){
					if(setting[3][j]){
						numDay = j+1;
						i=8; j=8;
					}
				}
			}
		}
	 }
	updateDay(numDay-1);
}

function deleteEvent(){
  if(debug)console.log('deleteEvent');
	e = setting[0];
	if(e){
		for(var i=0;i<subject.length;i++){
		  if(subject[i][5]){
			for(var j=0;j<subject[i][5].length;j++){
				dat = new Date();
				mm = dat.getMonth()+1;
				dd = dat.getDate();
				if(dd<10)
				dd='0'+dd;
				if(mm<10)
				mm='0'+mm;
				dats = dat.getFullYear()+"-"+mm+"-"+dd;
				if(dats>subject[i][5][j][2] && subject[i][5][j].length)subject[i][5].splice(j,1);
				localStorage["Subjects"] = JSON.stringify(subject);
			}
		  }
		}
	}
}

function saveSchedule(e,ws,type,hour,ab,teacher,room){
  if(debug)console.log('saveSchedule');
	if(document.querySelector('#cSchedule').className.length){
		schedule[e][document.querySelector('#cSchedule').className]=[ws,hour,room,teacher,type,ab];
	}else{
		schedule[e].push([ws,hour,room,teacher,type,ab]);
	}
	localStorage["Schedule"] = JSON.stringify(schedule);
	updateDay(e);
	if(document.querySelector('#cSchedule').className.length)
		viewSchedule(e,document.querySelector('#cSchedule').className);
}

function newEvent(r){
  if(debug)console.log('newEvent');
    if(subject.length && r!="---"){
	  document.querySelector('#h1eEvent').innerHTML =  navigator.mozL10n.get('add-event');
	  document.querySelector('#inputEvent').value = "";
	  document.querySelector('#eventSubject').innerHTML = "";
	  for(var i=0;i<subject.length;i++){
		document.querySelector('#eventSubject').innerHTML  += '<option value="'+subject[i][1]+'">'+subject[i][1]+'</option>';
	  }
	  if(r)document.querySelector('#eventSubject').value = r;
	  document.querySelector('#eEvent').classList.add("current");
	  document.querySelector('#eEvent').classList.remove("right");
	}
}

function newGrade(r){
  if(debug)console.log('newGrade');
  for(var i=0;i<subject.length;i++){
	  if(r==subject[i][1]){
		editGrade(i);
	  }
  }
}

function delSchedule(){
if(debug)console.log('delSchedule');
	document.querySelector('#listuSchedule').innerHTML="";
	if(schedule[activeDay].length){
	  document.querySelector('#listuSchedule').innerHTML = '';
	  for(var i=0;i<schedule[activeDay].length;i++){
		ess = "";
		ess2 = "";
		for(var j=0;j<hour.length;j++){
		  if(hour[j][0]==schedule[activeDay][i][1]){
			ess2=hour[j][1]+" - "+hour[j][2];
		  }
		}
		for(var j=0;j<type.length;j++){
		  if(type[j][0]==schedule[activeDay][i][4]){
			ess2 += " - "+type[j][1];
		  }
		}
		for(var j=0;j<subject.length;j++){
		  if(schedule[activeDay][i][0]==subject[j][0]){
		    ess=subject[j][1]+" <sup>"+schedule[activeDay][i][5]+"</sup> <em>("+schedule[activeDay][i][2]+")</em> ";
		  }
		}
		document.querySelector('#listuSchedule').innerHTML += '<li class="detail"><label class="pack-checkbox danger"> <input id="delSchedule'+i+'" type="checkbox"><span></span></label><p>'+ess+'</p><p>'+ess2+'</p></li>';
	  }
	  document.querySelector('#uSchedule').classList.add("current");
      document.querySelector('#uSchedule').classList.remove("down");
      document.querySelector('#uSchedule').classList.remove("down2");
	}  
}

function updateListSubjects(){
  if(debug)console.log('updateListSubjects');
	  document.querySelector('#subjectList').innerHTML = '';
	  if(!subject.length)
		document.querySelector('#dSubjects').classList.add("hidden");
	  else{
		document.querySelector('#dSubjects').classList.remove("hidden");
		for(var i=0;i<subject.length;i++){
			document.querySelector('#subjectList').innerHTML += '<li><a id="prze'+i+'" onclick="editSubject('+i+')" href="#"><p>'+subject[i][1]+'</p></a></li>';
		}
	  }
}

function editSubject(i) {
  if(debug)console.log('editSubject');
	  document.querySelector('#h1eSubject').innerHTML =  navigator.mozL10n.get('edit-subject');
	  document.querySelector('#inputSubject').value = subject[i][1];
	  document.querySelector('#inputSubject').placeholder = subject[i][1];
	  document.querySelector('#eSubject').classList.add("current");
	  document.querySelector('#eSubject').classList.remove("right");
}

function saveSubject(e,p){
  if(debug)console.log("saveSubject");
	if(e){
		isit = 0;
		if(subject==""){
			subject.push([0,e,null,null,null,null]);
		}else{
			isit = 0;
			place = null;
			for(var i=0;i<subject.length;i++){
				if(subject[i][1]==e)
					isit = 1;
				if(subject[i][1]==p)
					place = i;
			}
			var ids = subject[subject.length-1][0];
			if(isit==0){
				if(e && place==null){
					subject.push([ids+1,e,null,null,null,null]);
				}else if(e && place >= 0){
					subject[place][1] = e;
				}
			}
		}
		if(isit==0){
			localStorage["Subjects"] = JSON.stringify(subject);
			updateListSubjects();
		}
	}
}

function deleteSubjects() {
  if(debug)console.log('deleteSubjects');
		delid = new Array();
		for(var i=0;i<subject.length;i++){
			if(document.querySelector('#delSubject'+i).checked==true){
				delid.push(i);
			}
		}
		for(var i=0;i<delid.length;i++){
			subject.splice(delid[i]-i,1);
		}
	  	localStorage["Subjects"] = JSON.stringify(subject);
		updateListSubjects();
}

function updateListEvents(){
  if(debug)console.log('updateListEvents');
  if(!subject.length){
	document.querySelector('#dEvents').classList.add("hidden");
	document.querySelector('#aEvent').classList.add("hidden");
	document.querySelector('#eventsList').innerHTML = '<p>'+navigator.mozL10n.get('events1')+'</p>';
  }else{
	  document.querySelector('#aEvent').classList.remove("hidden");
	  document.querySelector('#eventsList').innerHTML = '';
	  for(var i=0;i<subject.length;i++){
		  qEvent = subject[i][5];
		  if(qEvent && qEvent.length){
		    document.querySelector('#dEvents').classList.remove("hidden");
			for(var j=0;j<qEvent.length;j++){
			  document.querySelector('#eventsList').innerHTML += '<li><a href="#"  onclick="editEvent('+i+','+j+')"><p>'+qEvent[j][0]+' <em>'+subject[i][1]+'</em></p><p><time>'+qEvent[j][1]+' '+qEvent[j][2]+'</time></p></a></li>';
			}
		  }else{
		  	document.querySelector('#dEvents').classList.add("hidden");
		  }
	  }
  }
  if(setting[0])deleteEvent();
}

function editEvent(i,j) {
   if(debug)console.log('editEvent');
	  document.querySelector('#eventSubject').innerHTML = "";
	  for(var q=0;q<subject.length;q++){
		document.querySelector('#eventSubject').innerHTML  += '<option value="'+subject[q][1]+'">'+subject[q][1]+'</option>';
	  }
	  document.querySelector('#h1eEvent').innerHTML =  navigator.mozL10n.get('edit-event');
	  document.querySelector('#inputEvent').value = subject[i][5][j][0];
	  document.querySelector('#timeEvent').value = subject[i][5][j][1];
	  document.querySelector('#dateEvent').value = subject[i][5][j][2];
	  document.querySelector('#eventSubject').value = subject[i][1];
	  document.querySelector('#jEvent').value = j;
	  document.querySelector('#jEvent').placeholder = subject[i][1];
	  document.querySelector('#eEvent').classList.add("current");
	  document.querySelector('#eEvent').classList.remove("right");
}

function saveEvent(e,p,t,d,n,j){
   if(debug)console.log('saveEvent');
		place = null;
		idp = null;
		idr = null;
		for(var i=0;i<subject.length;i++){
			if(n==subject[i][1]) idp = i;
		}
		for(var u=0;u<subject.length;u++){
			if(p==subject[u][1]) idr = u;
		}
		if(!subject[idp][5] && e){
			if(idr!=null)subject[idr][5].splice(j,1);
			 subject[idp][5] = [];
			 subject[idp][5].push([e,t,d,n]);
		}
		else if(subject[idp][5] && e){
			if(idr!=null)subject[idr][5].splice(j,1);
			subject[idp][5].push([e,t,d,n]);
		}
	localStorage["Subjects"] = JSON.stringify(subject);
	updateListEvents();
}

function deleteEvents() {
   if(debug)console.log('deleteEvents');
		delid = new Array();
		for(var i=0;i<subject.length;i++){
		 if(subject[i][5]){
		  for(var j=0;j<subject[i][5].length;j++){
			if(document.querySelector('#del'+i+'Event'+j).checked==true){
				delid.push([i,j]);
			}
		  }
		 }
		}
		deleted = 0;
		pId = null;
		for(var i=0;i<delid.length;i++){
			if(delid[i][0]==pId)deleted++;
			else deleted=0;
			pId=delid[i][0];
			subject[delid[i][0]][5].splice(delid[i][1]-deleted,1);
		}
	  	localStorage["Subjects"] = JSON.stringify(subject);
		updateListEvents();
}

function updateListGrades(){
  if(debug)console.log('updateListGrades');
  if(!subject.length){
	document.querySelector('#gradesList').innerHTML = '<p>'+navigator.mozL10n.get('grades1')+'</p>';
  }else{
	  document.querySelector('#gradesList').innerHTML = '';
	  for(var i=0;i<subject.length;i++){
		  qGrades = subject[i][4];
		  if(qGrades && qGrades.length){
			sGrades = "";
			for(var j=0;j<qGrades.length;j++){
			  sGrades += qGrades[j][0]+', ';
			}
			document.querySelector('#gradesList').innerHTML += '<li><a href="#"  onclick="viewGrades('+i+')"><p>'+subject[i][1]+'</p><p>'+sGrades+'</p></a><button class="gaia-icon icon-newadd" onclick="editGrade('+i+')"></button></li>';
		  }else{
				document.querySelector('#gradesList').innerHTML += '<li><a href="#"><p>'+subject[i][1]+'</p></a><button class="gaia-icon icon-newadd" onclick="editGrade('+i+')"></button></li>';
		  }
	  }
	}
}

function editGrade(e,j) {
   if(debug)console.log('editGrade');
	if(j>=0){
	  document.querySelector('#h1eGrade').innerHTML = navigator.mozL10n.get('edit-grade');
	  document.querySelector('#h2eGrade').innerHTML = subject[e][1];
	  document.querySelector('#nameGrade').value = subject[e][4][j][1];
	  document.querySelector('#inputGrade').value = subject[e][4][j][0];
	  document.querySelector('#idGrade').value = j;
	}else{
	  document.querySelector('#h1eGrade').innerHTML = navigator.mozL10n.get('add-grade');
	  document.querySelector('#h2eGrade').innerHTML = subject[e][1];
	  document.querySelector('#nameGrade').value = "";
	  document.querySelector('#inputGrade').value = "";
	  document.querySelector('#idGrade').value = "";
	}
	  document.querySelector('#eGrade').classList.add("current");
	  document.querySelector('#eGrade').classList.remove("right");
  	localStorage["Subjects"] = JSON.stringify(subject);
}

function viewGrades(e,b){
   if(debug)console.log('viewGrades');
	if(!b){
		document.querySelector('#vGrades').className = 'current';
		document.querySelector('[data-position="current"]').className = 'left';
	}
	document.querySelector('#h2vGrades').innerHTML = subject[e][1];
	document.querySelector('#gradesList2').innerHTML = '';
	if(!subject[e][4].length){
		document.querySelector('#dGrades').classList.add("hidden");
	}else{
		document.querySelector('#dGrades').classList.remove("hidden");
		qGrades = subject[e][4];
		for(var i=0;i<qGrades.length;i++){
			document.querySelector('#gradesList2').innerHTML += '<li><a href="#" onclick="editGrade('+e+','+i+')"><p>'+qGrades[i][1]+' <em>('+qGrades[i][0]+')</em></p><p>'+qGrades[i][2]+'</p></a></li>';
		}
	}
}

function saveGrade(e,o,n,d,p){
   if(debug)console.log('saveGrade');
		idp = null;
		for(var i=0;i<subject.length;i++){
			if(e==subject[i][1]) idp = i;
		}
		if(!subject[idp][4] && o){
			 subject[idp][4] = [];
			 subject[idp][4].push([o,n,d]);
		}
		else if(subject[idp][4] && o){
			if(p!="")subject[idp][4].splice(p,1);
			subject[idp][4].push([o,n,d]);
		}
	localStorage["Subjects"] = JSON.stringify(subject);
	if(p>=0)viewGrades(idp,1);
	updateListGrades();
}

function deleteGrades() {
   if(debug)console.log('deleteGrades');
		delid = new Array();
		ev = document.querySelector('#h2uGrades').innerHTML;
		idp = null;
		for(var i=0;i<subject.length;i++){
			if(ev==subject[i][1]) idp = i;
		}
		 if(subject[idp][4]){
		  for(var i=0;i<subject[idp][4].length;i++){
			if(document.querySelector('#delGrade'+i).checked==true){
				delid.push(i);
			}
		  }
		 }
		deleted = 0;
		for(var i=0;i<delid.length;i++){
			subject[idp][4].splice(delid[i]-i,1);
		}
	  	localStorage["Subjects"] = JSON.stringify(subject);
		if(subject[idp][1] == document.querySelector('#h1vSchedule').innerHTML){
			eiGrades = navigator.mozL10n.get('no-grades');
			if(subject[idp][4] && subject[idp][4].length){
				eiGrades = "";
				for(var w=0;w<subject[idp][4].length;w++){
					eiGrades += subject[idp][4][w][0]+", ";
				}
			}
			document.querySelector('#eiGradesSchedule').innerHTML = eiGrades;
		}
		updateListGrades();
		viewGrades(idp,1);
}

function updateListNotes(){
  if(debug)console.log('updateListNotes');
	if(!note.length){
		document.querySelector('#dNotes').classList.add("hidden");
		document.querySelector('#noteList').innerHTML = '';
	}else{
	  document.querySelector('#dNotes').classList.remove("hidden");
	  document.querySelector('#noteList').innerHTML = '';
	  for(var i=0;i<note.length;i++){
		  document.querySelector('#noteList').innerHTML += '<li><a id="nota'+i+'" onclick="viewNote('+i+')" href="#"><p>'+note[i]+'</p></a></li>';
	  }
	}
}

function editNote(i) {
   if(debug)console.log('editNote');
	  document.querySelector('#h1eNote').innerHTML =  navigator.mozL10n.get('edit-note');
	  document.querySelector('#inputNotes').value = note[i];
	  document.querySelector('#jNotes').value = i;
	  document.querySelector('#eNote').classList.add("current");
	  document.querySelector('#eNote').classList.remove("right");
}

function viewNote(idn){
   if(debug)console.log('viewNote');
	document.querySelector('#vNotes').className = 'current';
	document.querySelector('#viewNote').innerHTML = note[idn];
	document.querySelector('#cNote').addEventListener ('click', function () {
	  editNote(idn);
	});
}

function saveNote(n,idn){
   if(debug)console.log('saveNote');
	if(n){
		if(idn!=""){
			note[idn] = n;
			document.querySelector('#viewNote').innerHTML = n;
		}else{
			note.push(n);
		}
	}
	localStorage["Notes"] = JSON.stringify(note);
	updateListNotes();
}

function deleteNotes() {
   if(debug)console.log('deleteNotes');
		delid = new Array();
		for(var i=0;i<note.length;i++){
			if(document.querySelector('#delNote'+i).checked==true){
				delid.push(i);
			}
		}
		for(var i=0;i<delid.length;i++){
			note.splice(delid[i]-i,1);
		}
	  	localStorage["Notes"] = JSON.stringify(note);
		updateListNotes();
}

function updateListHours(){
   if(debug)console.log('updateListHours');
	document.querySelector('#hourList').innerHTML = '';
	if(!hour.length){
		document.querySelector('#dHours').classList.add("hidden");
	}else{
		document.querySelector('#dHours').classList.remove("hidden");
		hour.sort(function(a,b){
			if(a[1]<b[1]) return -1;
			else if(a[1]>b[1]) return 1;
			else return 0;
		});
		for(var i=0;i<hour.length;i++){
			document.querySelector('#hourList').innerHTML += '<li><a id="hour'+i+'" onclick="editHour('+i+')" href="#"><p>'+hour[i][1]+' - '+hour[i][2]+'</p></a></li>';
		}
	}
}

function editHour(i) {
   if(debug)console.log('editHour');
	  document.querySelector('#h1eHour').innerHTML =  navigator.mozL10n.get('edit-schedule');
	  document.querySelector('#startHour').value = hour[i][1];
	  document.querySelector('#stopHour').value = hour[i][2];
	  document.querySelector('#idHour').value = i;
	  document.querySelector('#eHour').classList.add("current");
	  document.querySelector('#eHour').classList.remove("right");
}

function saveHour(idg,start,stop){
   if(debug)console.log('saveHour');
	  hour.sort(function(a,b){
		if(a[1]<b[1]) return -1;
		else if(a[1]>b[1]) return 1;
		else return 0;
	  });
	if(start && stop){
		if(hour==""){
			hour.push([0,start,stop]);
		}else if(idg!=""){
			hour[idg][1] = start;
			hour[idg][2] = stop;
		}else{
			maxId=0;
			for(var i=0;i<hour.length;i++){
				if(hour[i][0]>maxId) maxId = hour[i][0];
			}
			hour.push([maxId+1,start,stop]);
		}
	}
	localStorage["Hours"] = JSON.stringify(hour);
	updateListHours();
}

function deleteHours() {
   if(debug)console.log('deleteHours');
	    hour.sort(function(a,b){
		  if(a[1]<b[1]) return -1;
		  else if(a[1]>b[1]) return 1;
		  else return 0;
	    });
		delid = new Array();
		for(var i=0;i<hour.length;i++){
			if(document.querySelector('#delHour'+i).checked==true){
				delid.push(i);
			}
		}
		for(var i=0;i<delid.length;i++){
			hour.splice(delid[i]-i,1);
		}
	  	localStorage["Hours"] = JSON.stringify(hour);
		updateListHours();
}

function updateListTypes(){
   if(debug)console.log('updateListTypes');
	aColors = "";
	for(var i=0;i<colors.length;i++){
		aColors += '<option value="'+colors[i][0]+','+colors[i][1]+','+colors[i][2]+'">'+colors[i][3]+'</option>';
	}
	document.querySelector('#typesList').innerHTML = '';
	if(!type.length){
		document.querySelector('#dTypes').classList.add("hidden");
	}else{
		document.querySelector('#dTypes').classList.remove("hidden");
		for(var i=0;i<type.length;i++){
			document.querySelector('#typesList').innerHTML += '<li  style="background-color:rgba('+type[i][2]+',.15);"><a id="type'+i+'" onclick="editType('+i+')" href="#"><p style="color:rgb('+type[i][2]+');">'+type[i][1]+'</p></a></li>';
		}
	}
		document.querySelector('#colorType').innerHTML = aColors;
		document.querySelector('#colorType').style.color = "rgb("+document.querySelector('#colorType').value+")";
		document.querySelector('#colorType').style.backgroundColor = "rgba("+document.querySelector('#colorType').value+",.15)";
		document.querySelector('#colorType').addEventListener ('change', function () {
			this.style.color = "rgb("+this.value+")";
			this.style.backgroundColor = "rgba("+this.value+",.15)";
		});
}

function editType(i) {
  if(debug)console.log('editType');
	  document.querySelector('#h1eType').innerHTML =  navigator.mozL10n.get('edit-type');
	  document.querySelector('#nameType').value = type[i][1];
	  document.querySelector('#colorType').value = type[i][2];
	  document.querySelector('#colorType').style.color = "rgb("+type[i][2]+")";
	  document.querySelector('#colorType').style.backgroundColor = "rgba("+type[i][2]+",.15)";
	  document.querySelector('#idType').value = i; 
	  document.querySelector('#eType').classList.add("current");
	  document.querySelector('#eType').classList.remove("right");
}

function saveType(idg,name,color){
  if(debug)console.log('saveType');
	if(name){
		if(type==""){
			type.push([0,name,color]);
		}else if(idg!=""){
			type[idg][1] = name;
			type[idg][2] = color;
		}else{
			type.push([type[type.length-1][0]+1,name,color]);
		}
	}
	localStorage["Types"] = JSON.stringify(type);
	updateListTypes();
}

function deleteTypes() {
  if(debug)console.log('deleteTypes');
		delid = new Array();
		for(var i=0;i<type.length;i++){
			if(document.querySelector('#delType'+i).checked==true){
				delid.push(i);
			}
		}
		for(var i=0;i<delid.length;i++){
			type.splice(delid[i]-i,1);
		}
	  	localStorage["Types"] = JSON.stringify(type);
		updateListTypes();
}

function deleteSchedule() {
   if(debug)console.log('deleteSchedule');
		delid = new Array();
		for(var i=0;i<schedule[activeDay].length;i++){
			if(document.querySelector('#delSchedule'+i).checked==true){
				delid.push(i);
			}
		}
		for(var i=0;i<delid.length;i++){
			schedule[activeDay].splice(delid[i]-i,1);
		}
	  	localStorage["Schedule"] = JSON.stringify(schedule);
		updateDay(activeDay);
}

function newSchedule(e,r){
  if(debug)console.log('newSchedule');
	updateListSchedule();
	document.querySelector('#jSchedule').value = e;
	if(!r){
		document.querySelector('#h1eSchedule').innerHTML = navigator.mozL10n.get('add-lesson');
		document.querySelector('#subjectSchedule').value = "";
		document.querySelector('#typeSchedule').value = "";
		document.querySelector('#hourSchedule').value = "";
		document.querySelector('#abSchedule').value = document.querySelector('#abtSchedule').innerHTML;
		document.querySelector('#teacherSchedule').value = "";
		document.querySelector('#roomSchedule').value = "";
		document.querySelector('#cSchedule').className = "";
	}else if(r){
		document.querySelector('#h1eSchedule').innerHTML = navigator.mozL10n.get('edit-lesson');
		document.querySelector('#subjectSchedule').value = r[2]; 
		document.querySelector('#typeSchedule').value = r[0]; 
		document.querySelector('#hourSchedule').value = r[1]; 
		document.querySelector('#abSchedule').value = document.querySelector('#h2vpAB').innerHTML; 
		document.querySelector('#teacherSchedule').value = document.querySelector('#eiteacherSchedule').innerHTML; 
		document.querySelector('#roomSchedule').value = document.querySelector('#eiroomSchedule').innerHTML; 
	}
	document.querySelector('#eSchedule').classList.add('current');
	document.querySelector('#eSchedule').classList.remove('right');
	document.querySelector('[data-position="current"]').className = 'left';
  }

function updateListSchedule(){
  if(debug)console.log('updateListSchedule');
	hour.sort(function(a,b){
		  if(a[1]<b[1]) return -1;
		  else if(a[1]>b[1]) return 1;
		  else return 0;
	  });
	document.querySelector('#subjectSchedule').innerHTML = "";
	document.querySelector('#typeSchedule').innerHTML = "";
	document.querySelector('#hourSchedule').innerHTML = "";
	  for(var i=0;i<subject.length;i++){
		  document.querySelector('#subjectSchedule').innerHTML += '<option value="'+subject[i][0]+'">'+subject[i][1]+'</option>';
	  }
	  for(var i=0;i<type.length;i++){
		  document.querySelector('#typeSchedule').innerHTML += '<option value="'+type[i][0]+'">'+type[i][1]+'</option>';
	  }
	  for(var i=0;i<hour.length;i++){
		  document.querySelector('#hourSchedule').innerHTML += '<option value="'+hour[i][0]+'">'+hour[i][1]+' - '+hour[i][2]+'</option>';
	  }
	
	document.querySelector('#typeSchedule').innerHTML = '<option value="default">---</option>'+ document.querySelector('#typeSchedule').innerHTML;
}  

function viewSchedule(e,i){
  if(debug)console.log('viewSchedule');
	vSchedulePlace = [,,];
	document.querySelector('#vSchedule').className = 'current';
	document.querySelector('[data-position="current"]').className = 'left';
			  eiType = "";
			  for(var q=0;q<type.length;q++){
				if(schedule[e][i][4]==type[q][0]){
					eiType = type[q][1];
					vSchedulePlace[0] = type[q][0];
				}
			  }
			  eiTime = "00:00 - 00:00";
			  for(var q=0;q<hour.length;q++){
				if(schedule[e][i][1]==hour[q][0]){
					eiTime = hour[q][1]+" - "+hour[q][2];
					vSchedulePlace[1] = hour[q][0];
				}
			  }
			  eiName = "---";
			  eiEvents = '<li><a href="#"><p>'+navigator.mozL10n.get('no-events')+'</p></a></li>';
			  eiGrades = navigator.mozL10n.get('no-grades');
			  for(var q=0;q<subject.length;q++){
				if(schedule[e][i][0]==subject[q][0]){
					eiName = subject[q][1];
					vSchedulePlace[2] = q;
					if(subject[q][4]){
					  if(subject[q][4].length>0){
						eiGrades = "";
						for(var w=0;w<subject[q][4].length;w++){
							eiGrades += subject[q][4][w][0]+", ";
						}
					  }	
					}
					if(subject[q][5]){
					  if(subject[q][5].length>0){
						eiEvents = "";
						for(var w=0;w<subject[q][5].length;w++){
							eiEvents += '<li><a href="#"><p>'+subject[q][5][w][0]+'</p><p><time>'+subject[q][5][w][1]+' '+subject[q][5][w][2]+'</time></p></a></li>';
						}
					  }
					}
				}
			  }	
			  
			  eiDay = "";
		      switch (e){
			  case 0: eiDay = navigator.mozL10n.get('monday'); break;
			  case 1: eiDay = navigator.mozL10n.get('tuesday'); break;
			  case 2: eiDay = navigator.mozL10n.get('wednesday'); break;
			  case 3: eiDay = navigator.mozL10n.get('thursday'); break;
			  case 4: eiDay = navigator.mozL10n.get('friday'); break;
			  case 5: eiDay = navigator.mozL10n.get('saturday'); break;
			  case 6: eiDay = navigator.mozL10n.get('sanday'); break;
			  }
			  
	document.querySelector('#h1vSchedule').innerHTML = eiName;
	document.querySelector('#cSchedule').className = i;
	document.querySelector('#h2vSchedule').innerHTML = eiDay+" <time id='h2vpTime'>"+eiTime+"</time> <span id='h2vpAB'>"+schedule[e][i][5]+"</span>";
	document.querySelector('#eitypeShedule').innerHTML = eiType;
	document.querySelector('#eiroomSchedule').innerHTML = schedule[e][i][2];
	document.querySelector('#eiteacherSchedule').innerHTML = schedule[e][i][3];
	document.querySelector('#eiGradesSchedule').innerHTML = eiGrades;
	document.querySelector('#eiEventsSchedule').innerHTML = eiEvents;
	document.querySelector('#cSchedule').addEventListener ('click', function () {
	  newSchedule(e,vSchedulePlace);
	});
}

function pViewSchedule(e){
  if(debug)console.log('pViewSchedule');
		for(var i=0;i<subject.length;i++){
			if(e==subject[i][1]){
				if(subject[i][4] && subject[i][4].length)viewGrades(i);
			}
		}
}

function updateDay(e){
  if(debug)console.log('updateDay');
	f = parseInt(e);
    document.querySelector('#panel1').classList.remove('selecto');
    document.querySelector('#panel2').classList.remove('selecto');
    document.querySelector('#panel3').classList.remove('selecto');
    document.querySelector('#panel4').classList.remove('selecto');
    document.querySelector('#panel5').classList.remove('selecto');
    document.querySelector('#panel6').classList.remove('selecto');
    document.querySelector('#panel7').classList.remove('selecto');
	document.querySelector('#panel'+(f+1)).classList.add('selecto');
	
	document.querySelector('#panelo1').className = 'right';
    document.querySelector('#panelo2').className = 'right';
    document.querySelector('#panelo3').className = 'right';
    document.querySelector('#panelo4').className = 'right';
    document.querySelector('#panelo5').className = 'right';
    document.querySelector('#panelo6').className = 'right';
    document.querySelector('#panelo7').className = 'right';
	document.querySelector('#panelo'+(f+1)).className = 'current';

	  activeDay = e;
	  document.querySelector('#schedulee'+e).innerHTML = '';
	  if(!schedule[e].length){
		document.querySelector('#dSchedule').classList.add("hidden");
	  }else{
	  	document.querySelector('#dSchedule').classList.remove("hidden");
		abt = document.querySelector('#abtSchedule').innerHTML;
		switch(abt) {
		case "A":
			abt1 = "A";abt2 = "A";abt3 = "AB";
			break;
		case "B":
			abt1 = "B";abt2 = "B";abt3 = "AB";
			break;
		case "AB":
			abt1 = "A";abt2 = "B";abt3 = "AB";
			break;
		}
		var sortes = new Array();
		poSort = "";
		for(var i=0;i<schedule[e].length;i++){
			if(schedule[e][i][5]==abt1 || schedule[e][i][5]==abt2 || schedule[e][i][5]==abt3){
			  rgbColor = "";
			  rgbaColor = "";
			  eiType = "";
			  for(var q=0;q<type.length;q++){
				if(schedule[e][i][4]==type[q][0]){
					rgbaColor = ' style="background-color:rgba('+type[q][2]+',.15);"';
					rgbColor = ' style="color:rgb('+type[q][2]+');"';
					eiType = type[q][1];
				}
			  }
			  eiTime = "00:00 - 00:00";
			  strTime = "00:00";
			  for(var q=0;q<hour.length;q++){
				if(schedule[e][i][1]==hour[q][0]){
					eiTime = hour[q][1]+" - "+hour[q][2];
					strTime = hour[q][1];
				}
			  }
			  eiName = "---";
			  eiclasso = "";
			  for(var q=0;q<subject.length;q++){
				if(schedule[e][i][0]==subject[q][0]){
					eiName = subject[q][1];
					if(subject[q][5] && subject[q][5].length)eiclasso = " class='event'";
				}
			  }
			  eiRoom = schedule[e][i][2];
			  eiTeacher = schedule[e][i][3];
			  eiAB = schedule[e][i][5];
			  sortes.push([strTime,'<li'+eiclasso+rgbaColor+'><a id="schedule'+e+'i'+i+'" onclick="viewSchedule('+e+','+i+')" href="#"><p><time>'+eiTime+'</time></p><p>'+eiType+'<span>'+eiAB+'</span></p><p'+rgbColor+'>'+eiName+'</p><p>'+eiTeacher+'<span>'+eiRoom+'</span></p></a></li>']);
			}
		 }
			sortes.sort();
			for(var i=0;i<sortes.length;i++){
				poSort += sortes[i][1];
			}
		   document.querySelector('#schedulee'+e).innerHTML  = poSort;
	 }
	 if(subject.length && hour.length){
		AddLesson = navigator.mozL10n.get('add-lesson');
		if(setting[1]){
		document.querySelector('#schedulee'+e).innerHTML += '<li id="newles"><a href="#" onclick="newSchedule('+e+')"><p>'+AddLesson+'</p></a></li>';
		}else{
		document.querySelector('#schedulee'+e).innerHTML += '<li id="newles" class="none"><a href="#" onclick="newSchedule('+e+')"><p>'+AddLesson+'</p></a></li>';
		}
	 }else if(!subject.length && hour.length){
		document.querySelector('#schedulee'+e).innerHTML += navigator.mozL10n.get('schedulee1');
	 }else if(subject.length && !hour.length){
		document.querySelector('#schedulee'+e).innerHTML += navigator.mozL10n.get('schedulee2');
	 }else{
		document.querySelector('#schedulee'+e).innerHTML += navigator.mozL10n.get('schedulee3');
	 }
}

function saveSettings(u1,u2,u3){
  if(debug)console.log('saveSettings');
	if(document.querySelector('#newles')){
		if(u2)document.querySelector('#newles').classList.remove("none");
		else document.querySelector('#newles').classList.add("none");
	}
	if(u3)document.querySelector('#abtSchedule').classList.remove("none");
	else document.querySelector('#abtSchedule').classList.add("none");
	
	setting[0] = u1;
	setting[1] = u2;
	setting[2] = u3;
	iDay=0;
	for(var i=0;i<7;i++){
		if(document.querySelector('#setDays').options[i].selected) setting[3][i]=true;
		else{
			setting[3][i]=false;
			iDay++;
		}
	}
	if(iDay==7)setting[3][0]=true;
	localStorage["Settings"] = JSON.stringify(setting);
	if(u1)deleteEvent();
	if(document.querySelector('#setDays').className=="changed")start();
}