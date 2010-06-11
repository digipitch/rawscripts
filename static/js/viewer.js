// Onload - a big init file setting up jquery and everything
function viewerinit(resource_id)
{	
	htmlTitleUpdate();
	infoSizes('init');
	notesIndex();
	totalPages();
	$('#textEditor').click(function(){currentPage()});
	$('#textEditor').bind("contextmenu", function(e){insertNote(e); return false;});
	$('.infoHandle').mousedown(function(e){trackMouseDown(e)});
	$(window).mouseup(function(e){trackMouseUp(e)});
	$(window).mousemove(function(e){if(document.getElementById('mouseInfo').innerHTML.split('?')[0]=='down')infoResize(e);});
	$(window).resize(function(){infoSizes()});
	$('.postit').focusin(function(e){document.getElementById('format').disabled=true});
	$('.postit').focusout(function(e){document.getElementById('format').disabled=false});
	$('.postit').click(function(e){scrollToNote(e.target)});
	$('body').keydown(function(e){
	if(e.which!=37 && e.which!=38 && e.which!=39 && e.which!=40 && e.which!=91 && e.which!=93 && e.which!=16 && e.which!=17 && e.which!=18 && e.which!=34 && e.which!=33){
		clearTimeout(t);
		t = setTimeout("submitNotes()", 10000);
		var s = document.getElementById('submit');
		if(s.value == 'Saved Notes'){s.disabled=false; s.value = 'Submit Notes';}
	}
	});
	$('#renameField').keydown(function(e){if(e.which==13){e.preventDefault(); renameScript()}});
	$('#recipient').keydown(function(e){if(e.which==13){e.preventDefault();}});
	$('#subject').keydown(function(e){if(e.which==13){e.preventDefault()}});
	$('#newScript').keydown(function(e){if(e.which==13){e.preventDefault();createScript()}});
	$('#collaborator').keydown(function(e){if(e.which==13){e.preventDefault();}});
	document.getElementById('textEditor').focus();
	var sel = window.getSelection();
	sel.collapseToStart();
	var t;
	$('#recipient').keyup(function(event){if(event.which==188)tokenize('recipient')});
	$('#collaborator').keyup(function(event){if(event.which==188)tokenize('collaborator')});
	$("#optionMenu").mouseover(function(){document.getElementById('hiddenMenu').style.display='block';});
	$("#optionMenu").mouseout(function(){document.getElementById('hiddenMenu').style.display='none';});
	$(".menuItem").mouseover(function(){$(this).css("background-color", "#bbb");});
	$(".menuItem").mouseout(function(){$(this).css("background-color", "#ddd");});
	characterIndex();
	var $button = $("#sidebarButton");
    var $sidebar = $("#effect");
    var $container = $("#container");
	var $info = $("#info");
    $sidebar.animate({marginRight:'+=360px'},600);
    $container.animate({right:'+=360px'},600);
	$info.animate({right:'+=360px'},600);
    $button.toggle(
                   function()
                   {
                      $sidebar.animate({marginRight:'-=360px'},600);
                      $container.animate({right:'-=360px'},600);
					  $info.animate({right:'-=360px'},600);
    
                   },
                   function()
                   {
                       $sidebar.animate({marginRight:'+=360px'},600);
                       $container.animate({right:'+=360px'},600);
					   $info.animate({right:'+=360px'},600);
                   });
	try{
		sceneIndex();
		getFormat();
	}
	catch(err){;}
	document.getElementById('loading').style.visibility = 'hidden';
	
	
};

//---------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------//


function couldNotLoad(data){
    var alternate_link= data.split("&alternate_link&")[1];
    document.getElementById('couldnotloadpopup').style.visibility = 'visible';
    document.getElementById('alt_link').href = alternate_link;
}
function refresh(){
    window.location=window.location.href;
}

function infoSizes(){
	var total = $('#scriptInfo').height() - 50;
	var oneBox = (total/3) - $('#sceneBoxHandle').height();
	$('#sceneindex').height(oneBox)
	$('#noteindex').height(oneBox)
	$('#characterindex').height(oneBox);
	while ($('#characterindex').height()>+0){
		$('#noteindex').height($('#noteindex').height()+1);
		$('#characterindex').height($('#characterindex').height()-1);
	}
	while ($('#sceneindex').height()>+0){
		$('#noteindex').height($('#noteindex').height()+1);
		$('#sceneindex').height($('#sceneindex').height()-1);
	}
}
function infoResize(e){
	var raw = document.getElementById('mouseInfo').innerHTML.split('?');
	var header = raw[1];
	var difference = raw[2] - e.clientY;
	if (header=='noteBoxHandle'){
		if ($('#sceneindex').height()-difference>=0){
			if($('#noteindex').height()+difference>=0){
				$('#sceneindex').height($('#sceneindex').height()-difference);
				$('#noteindex').height($('#noteindex').height()+difference);
			}
		}
	}
	else if (header=='characterBoxHandle'){
		if($('#noteindex').height()-difference>=0){
			if($('#characterindex').height()+difference>=0){
				$('#noteindex').height($('#noteindex').height()-difference);
				$('#characterindex').height($('#characterindex').height()+difference);
			}
		}
	}
	raw[2] = e.clientY;
	document.getElementById('mouseInfo').innerHTML = raw.join('?');
}
function trackMouseDown(event){
	if(event.target.id!='sceneBoxHandle'){
		var init = event.clientY;
		document.getElementById('mouseInfo').innerHTML = 'down?'+ event.target.id + '?' + init;
	}
}
function trackMouseUp(event){
	document.getElementById('mouseInfo').innerHTML = 'up?0?0';
}
function tokenize(kind){
	var counter = 0;
	var c = document.getElementsByTagName('div');
		for(var i=0;i<c.length;i++){
			if(c[i].className=='token'){
				counter++;
				}
			}
	if (counter>4){alert('You can only have 5 recipients at a time for now. Only the first five will be sent.');return;}
	var txtbox = document.getElementById(kind);
	var data = txtbox.value.replace(',','');
	var whitespace = data.replace(/ /g, "");
	if (whitespace==""){return;}
	var arr = data.split(' ');
	var email = arr.pop();
	var name = "";
	if(arr.length == 0){name = email;}
	else{name = arr.join(' ').replace(/"/g, '');}
	// Create Token div
	var newToken = document.createElement('div');
	var insertedToken = document.getElementById(kind+'s').appendChild(newToken);
	insertedToken.className='token';
	insertedToken.id = email;
	// Create Name Area
	var newSpan = document.createElement('span');
	var nameSpan = insertedToken.appendChild(newSpan);
	var nameText = document.createTextNode(name);
	nameSpan.appendChild(nameText);
	//Create Mailto area
	var newSpan = document.createElement('span');
	var emailSpan = insertedToken.appendChild(newSpan);
	var emailText = document.createTextNode(email);
	emailSpan.className = 'mailto';
	emailSpan.appendChild(emailText);
	// create X button
	var newA = document.createElement('a');
	var xA = insertedToken.appendChild(newA);
	var xText = document.createTextNode(" | X");
	xA.appendChild(xText);
	var js = 'javascript:removeToken("'+email+'")'
	xA.setAttribute('href', js);
	txtbox.value='';
	
}
function removeToken(v){
	var token = document.getElementById(v);
	token.parentNode.removeChild(token);	
	}



//--------------------
//-----------------------------------
//-----------------------------------
//-------------- Handling Notes ands stuff------
//--------------next five or six fucntions------

function insertSharedNotes(data){
	if (data=='none') {;}
	else if (data=='nonedata') {;}
	else {
		var c = document.getElementById('textEditor').childNodes;
		data = data.slice(6);
		var users = data.split('&user&');
		for (var i=0; i<users.length; i++){
			console.log('users.length='+users.length);
			var arrOne = users[i].split('&data&');
			var user = arrOne[0];
			var notesUnits = arrOne[1].split("&unit&");
			for (var j=0; j<notesUnits.length; j++){
				console.log('notesUnites.length='+notesUnits.length);
				var id = notesUnits[j].split("?comment=")[0];
				var comment = notesUnits[j].split("?comment=")[1].split('?position=')[0];
				var position = notesUnits[j].split("?comment=")[1].split('?position=')[1];
				for (var k=0; k<c.length; k++){
					if (String(k) == position){
						var node = c[k];
						node = (node.nodeName=='#text' ? c[k+1] : node);
						var insertedNote = node.appendChild(document.createElement('span'));
						insertedNote.className = 'sharedNotes';
						insertedNote.title = id+'?comment='+comment+'?user='+user;
						insertedNote.appendChild(document.createTextNode('X'));
						console.log('inserted note');
					}
				}
			}
		}
	}
}

function updateNote(obj){
	var id = obj.id;
	if (id==''){id=obj.parentNode.id;}
	var spans = document.getElementsByTagName('span');
	for(var i=0; i<spans.length; i++){
		if(spans[i].title.split('?comment=')[0] == id){
			var reone = new RegExp('<br>', 'ig');
			var retwo = new RegExp('<div>', 'ig');
			var rethree = new RegExp('</div>', 'ig');
			if ($.browser.mozilla){
				var data = obj.innerHTML.replace(reone, 'HTMLLINEBREAK')
			}
			else{var data = obj.innerHTML.replace(reone, '').replace(rethree, '').replace(retwo, 'HTMLLINEBREAK');}
			spans[i].title = id + '?comment=' + data + '?user=' + document.getElementById('user').innerHTML;
			obj.id = id;
		}
	}
}
function insertNote(e){
	e.preventDefault();
	var obj = e.target;
	while (obj.nodeName!='H1' && obj.nodeName!='H2' && obj.nodeName!='H3' && obj.nodeName!='H4' && obj.nodeName!='H5' && obj.nodeName!='H6'){
				obj = obj.parentNode;
			}
	var newNote = obj.appendChild(document.createElement('span'));
	newNote.className = 'sharedNotes';
	newNote.appendChild(document.createTextNode('X'));
	var d = new Date();
	var id = d.getTime();
	newNote.title = id + '?comment=CODEFILLER?user=' + document.getElementById('user').innerHTML; 
	notesIndex();
	document.getElementById(id).focus();
}

function selectNote(obj){
	notesIndex();
	var prev = obj.title;
	var arr = prev.split('?comment=');
	var id = arr[0];
	document.getElementById(id).focus();
}
function notesIndex(){
	// Romove old notes
	var c = document.getElementById('noteindex').childNodes;
	for(var j=0; j<c.length; j++){
		document.getElementById('noteindex').removeChild(c[j]);
		j--;
	}
	var noteCounter = 0;
	var spans = document.getElementsByTagName('span');
	for (var i=0; i<spans.length; i++){
		if(spans[i].className == 'notes' || spans[i].className == 'sharedNotes'){
			var arr = spans[i].title.split('?comment=');
			var data = (arr.length>1 ? arr[1].split('?user=')[0] : spans[i].title);
			if (data!=''){
				data = data.replace('CODEFILLER','');
				spans[i].title = spans[i].title.replace('CODEFILLER','');
				if ($.browser.mozilla){
					var pattern = new RegExp('HTMLLINEBREAK', 'gi');
					var noteHTML = data.replace(pattern,'<br>');
				}
				else{
					var lines = data.split('HTMLLINEBREAK');
					var noteHTML = lines[0];
					for (var j=1; j<lines.length; j++){
						noteHTML = noteHTML+'<div>';
						if(lines[j]=='') noteHTML = noteHTML+'<br>';
						else noteHTML = noteHTML + lines[j];
						noteHTML = noteHTML+'</div>';
					}
				}
				var note = document.getElementById('noteindex').appendChild(document.createElement('div'));
				note.innerHTML=noteHTML;
				if (spans[i].className == 'notes'){
					note.className = 'postit';
				}
				if (spans[i].className == 'sharedNotes'){
					note.className = 'sharedPostit';
					if(arr[1].split('?user=')[1]==document.getElementById('user').innerHTML){
						note.contentEditable = 'true';
					}
					else {
						note.innerHTML= note.innerHTML+"<br><br><br>--"+arr[1].split('?user=')[1];
					}
				}
				note.id = arr[0];
				noteCounter++;
			}
			else {
				// what to do if note has no data. Delete it
				spans[i].parentNode.removeChild(spans[i]);
				i--;
		}
		
	}
}
	$('.sharedPostit').keyup(function(e){updateNote(e.target)});
	$('.sharedPostit').blur(function(e){updateNote(e.target)});
	$('.sharedPostit').click(function(e){scrollToNote(e.target)});
	$('.postit').click(function(e){scrollToNote(e.target)});
	return noteCounter
}

function scrollToNote(obj){
	
	var id = obj.id;
	if (id==''){id=obj.parentNode.id;}
	var c = document.getElementsByTagName('span');
	var i =0;
	var marker=0;
	while (marker == 0){
		if (c[i].title.split('?comment=')[0]==id){
			marker = 1;
			c[i].id = 'note'
			c[i].innerHTML = 'X';
			$('#container').scrollTo('#note',500, {onAfter:function(){c[i].removeAttribute('id');}});
		}
		else i++;
		if(i>c.length) marker = 1;
	}
}

function submitNotes(){
	notesIndex();
	var c = document.getElementsByTagName('span');
	var d = document.getElementById('textEditor').childNodes;
	var elem;
	var data='';
	for (var i=0; i<c.length; i++){
		if(c[i].className=='sharedNotes'){
			// only submit if this note is from this user
			if(c[i].title.split('?user=')[1]==document.getElementById('user').innerHTML){
				//firugre out where the note was placed
				elem = c[i].parentNode;
				while (elem.nodeName!='H1' && elem.nodeName!='H2' && elem.nodeName!='H3' && elem.nodeName!='H4' && elem.nodeName!='H5' && elem.nodeName!='H6'){
					elem = elem.parentNode;
				}
				var j=0;
				while (d[j]!=elem){
					j++;
				}
				data = data + '&unit&' + c[i].title.split('?user=')[0] + '?position=' + j;
			}
			
		}
	}
	data = data.slice(6);
	if (data=='')data='none';
	var user = document.getElementById('user').innerHTML;
	var url = window.location.href;
	var resource_id = url.split('=')[1];
	
	$.post('/postnotes', {data : data , user : user , resource_id : resource_id}, function(e){document.getElementById('submit').value="Saved Notes"; document.getElementById('submit').disabled=true;});
}


//---------------------------------- End of notes fucntions----------------------------
//------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------

	
function sceneIndex () {
var p = document.getElementById('textEditor').getElementsByTagName( "h1" ); 
	var k = 0;
var s = document.getElementById('sceneindex');
//remove previous nodes
var prev = s.childNodes;
for (var i=0; i<prev.length; i=0){
	prev[0].parentNode.removeChild(prev[0]);
	}
while (k<p.length){
	var newP = document.createElement('p');
	var newScene = s.appendChild(newP);
	var l = k +1;
	var slug = "";
	var parts = p[k].childNodes;
	//--
	//--TOTO fix try, make it work when one of the sluglines is blank
	//--
	try{
	for(var i=0; i<parts.length; i++){
		var ifNotes = 0;
		if (parts[i].className=='notes' || parts[i].className=='sharedNotes') ifNotes = 1;
		if (parts[i].nodeName=='undefined'){;}
		else if (parts[i].nodeName=='#text') slug = slug+parts[i].nodeValue;
		else if (parts[i].nodeName=='SPAN'&& ifNotes == 0) {
			var spanTxt = parts[i].firstChild.nodeValue;
			slug = slug +spanTxt;
			parts[i].parentNode.removeChild(parts[i]);
			p[k].lastChild.nodeValue = p[k].firstChild.nodeValue + spanTxt;
		}
		else if (ifNotes==1) {;}
		else slug = slug+parts[i].firstChild.nodeValue;
		}
	}
	catch(err){;}
	var newText = l +") "+ slug;
	newText = newText.replace(/<BR>/i, "");
	var newNode = document.createTextNode(newText);
	newScene.appendChild(newNode);
	newScene.className = 'scene';
	newScene.id = 'p'+ l;
	newScene.style.cursor = "pointer";
	p[k].setAttribute('id', l);
	k++;
	}
	$(".scene").mouseover(function(){$(this).css("background-color", "#ccccff");});
	$(".scene").mouseout(function(){$(this).css("background-color", "white");});
	$(".scene").click(function(){$(this).css("background-color", "#999ccc");sceneSelect(this.id);});
}
 
function sceneSelect(p) {
var id = "p" + p;
var v = "#" + p.replace(/p/,"");
$('#container').scrollTo(v,500);
}
 
function characterIndex() {
var c = document.getElementsByTagName('h3');
if (c[0]==null){return;}
var e = new Array();
for (var x = 0;x<c.length;x++){
	if(c[x].className!='more')
	e[x] = String(c[x].firstChild.nodeValue).toUpperCase().replace(" (CONT'D)", "").replace(/&nbsp;/gi,"").replace(/\s+$/,"").replace(" (O.S.)", "").replace(" (O.C.)", "").replace(" (V.O.)", "");
	}
e.sort();
var a = 0;
var b = 1;
while (a<e.length-1){
	if (e[a] == e[b])
		{e.splice(b,1)}
	else {a++; b++}
	}
var cI = document.getElementById('characterindex');
// remove previous nodes
var prevChar = cI.childNodes;
for (var i=0; i<prevChar.length; i=0){
	prevChar[0].parentNode.removeChild(prevChar[0]);
	}
var k = 0;
while (k<e.length){
	if(e[k]!='(MORE)'){
		var newP = document.createElement('p');
		var newChar = cI.appendChild(newP);
		newChar.innerHTML = e[k];
		newChar.className = "character";
		}
	k++;
	}
}
function totalPages(){
	var c = document.getElementsByTagName('hr');
	document.getElementById('totalPages').appendChild(document.createTextNode(' of '+ (c.length+1)));
}
function currentPage(){
	var node = window.getSelection().anchorNode;
    var startNode = (node.nodeName == "#text" ? node.parentNode : node);
	if (startNode.nodeName=='SPAN'){
		selectNote(startNode)
		return;
	}
    var c = document.getElementById('textEditor').childNodes;
	var i = 0;
	var count = 1;
	while(c[i]!=startNode){
		try{
			if(c[i].nodeName=='HR'){
				count++;
			}
		}
		catch(err){;}
		
		i++;
		if(i>c.length) return;
		}
	document.getElementById('currentPage').innerHTML = count;
}
	
 
 function htmlTitleUpdate(){
	if (document.getElementById('title') == "") {document.title = "Script Editor";}
	else {document.title = document.getElementById('title').innerHTML;}

}

 

function printPrompt(){
	var notesCounter = notesIndex();
	if (notesCounter==0) printScript(0);
	else document.getElementById('printpopup').style.visibility = 'visible';
	}
function hidePrintPrompt(){
	document.getElementById('printpopup').style.visibility = 'hidden';
	}
//---- HTML style printing with and without notes----
//----- Done Local so doenst need server connection----
function printScript(bool){
	document.getElementById('wholeShebang').style.display = 'none';
	var printDiv = document.body.appendChild(document.createElement('div'));
	printDiv.id = 'printDiv';
	printDiv.style.width = '600px';
	printDiv.style.margin = 'auto';
	var content = '<div>';
	var script = document.getElementById('textEditor').innerHTML;
	script = script.replace(/<hr class="pb">/gi, '<p style="display:none"></p>');
	script = script.replace(/class="pn"/gi, 'class="printPageBreak"');
	script = script.replace(/<h3 class="more">/gi, '<h3 class="printMore">');
	script = script.replace(/<span class="notes"/gi, '<span class="printNotes"');
	script = script.replace(/<span class="sharedNotes"/gi, '<span class="printNotes"');
	printDiv.innerHTML = script;
	var c = printDiv.childNodes;
	for (var i=0; i<c.length; i++){
		if(c[i].className!='printPageBreak' && c[i].className!='printMore' && c[i].className!='printPageBreak')c[i].className = 'print';
	}
	// Printing Notes
	if(bool==1){
		var notesHeader = printDiv.appendChild(document.createElement('p'));
		notesHeader.appendChild(document.createTextNode('Notes for '+ document.getElementById('title').firstChild.nodeValue.toUpperCase() +':'));
		notesHeader.style.pageBreakBefore = 'always';
		var orderedList = printDiv.appendChild(document.createElement('ol'));
		var notesCounter = 1;
		var notes = document.getElementsByTagName('span');
		for(var i=0; i<notes.length;i++){
			if (notes[i].className=='printNotes'){
				notes[i].removeAttribute('style');
				notes[i].innerHTML = notesCounter;
				// figure out what page it's on
				var prevSib = notes[i].parentNode;
				var findPage = 0;
				while(findPage==0){
					if(prevSib = prevSib.previousSibling){
						if(prevSib.className=='printPageBreak'){
							var pageSpan = prevSib.nextSibling;
							pageSpan = (pageSpan.nodeName=='#text' ? pageSpan.nextSibling : pageSpan);
							var pageNumber = prevSib.innerHTML.replace('.','');
							findPage=1;
						}
					}
					else{
						var pageNumber = 1;
						findPage=1;
					}
				}
				var splitVar = notes[i].title.split('?comment=')[1].split('?user=');
				var noteText = 'Page ' + pageNumber + ' -- ' + splitVar[0].replace(/HTMLLINEBREAK/g, '<br>');
				if (splitVar.length>1){
					noteText=noteText+"<br><br>--"+splitVar[1];
				}
				var footnote = orderedList.appendChild(document.createElement('li'));
				footnote.className = 'footnote';
				footnote.innerHTML = noteText;
				notesCounter++;
			}
		}
	}
	// end routine for printing notes
	else $('.printNotes').css('display', 'none');
	$('.printPageBreak').css('page-break-before', 'always');
	window.print() ;
	hidePrintPrompt();
	document.getElementById('wholeShebang').style.display = 'block'; 
	printDiv.parentNode.removeChild(printDiv);
	
}

//
//----------------------------------------------
//---------Backend Processes-------------------
//
//
//

	
	
//// export functions
function hideExportPrompt(){
	document.getElementById('exportpopup').style.visibility = 'hidden';
	}
function exportPrompt(){
	document.getElementById('exportpopup').style.visibility = 'visible';
	}
function exportScripts(){
	if(document.getElementById('demo').innerHTML=='demo'){
		nope();
		return;
	}
	var url = window.location.href;
	var resource_id = url.split('=')[1];
	var format;
	var exports = document.getElementsByTagName('input');
	for (var i=0; i<exports.length; i++){
		if (exports[i].checked==true){
			if (exports[i].className=='exportList'){
				format = exports[i].name;
				url = '/export?resource_id=' + resource_id + '&export_format=' + format + '&fromPage=editor';
				window.open(url);
				}
			}
	}
	hideExportPrompt();
}

	
//------------Emailing fucntions

function emailComplete(e){
	document.getElementById('emailS').disabled = false;
	document.getElementById('emailS').value = 'Send';
	if (e=='sent'){
		alert("Email Sent")
		hideDiv();
	}
	else{
		alert("There was a problem sending your email. Please try again later.")
	}
}
	
function emailScript(){
	if(document.getElementById('demo').innerHTML=='demo'){
		nope();
		return;
	}
	tokenize('recipient');
	var arr = new Array();
	var c = document.getElementsByTagName('span');
	for(var i=0;i<c.length; i++){
		if (c[i].className=='mailto'){
			arr.push(c[i].innerHTML);
			}
		}
	var recipients = arr.join(',');
	var subject = document.getElementById('subject').value;
	var body_message = document.getElementById('message').innerHTML;
	var url = window.location.href;
	var resource_id = url.split('=')[1];
	$.post("/emailscript", {resource_id : resource_id, recipients : recipients, subject :subject, body_message:body_message, fromPage : 'editor'}, function(e){emailComplete(e)});
	document.getElementById('emailS').disabled = true;
	document.getElementById('emailS').value = 'Sending...';
}
function emailPrompt(v){
	
	$.post('/contactlist', {fromPage : 'editorEmail'}, function(data){var contacts = data.split(';');$("input#recipient").autocomplete({source: contacts});});
	document.getElementById('hideshow').style.visibility = 'visible';
}
function hideDiv(){
document.getElementById('hideshow').style.visibility = 'hidden';
document.getElementById('recipient').value = "";
document.getElementById('subject').value = "";
document.getElementById('message').innerHTML = "";
document.getElementById('recipients').innerHTML = "";
}