goog.require('goog.userAgent')
goog.require('goog.events')
goog.require('goog.dom');
goog.require('goog.dom.DomHelper');
goog.require('goog.events.EventType');
goog.require('goog.math.Size');
goog.require('goog.style');
goog.require('goog.dom.ViewportSizeMonitor')
goog.require('goog.events.MouseWheelHandler');
goog.require('goog.events.KeyCodes');
goog.require('goog.events.KeyHandler');
goog.require('goog.ui.KeyboardShortcutHandler');
goog.require('goog.ui.Menu');
goog.require('goog.ui.Container');
goog.require('goog.net.XhrIo');
goog.require('goog.ui.Toolbar');
goog.require('goog.ui.ToolbarRenderer');
goog.require('goog.ui.ToolbarButton');
goog.require('goog.ui.ToolbarMenuButton');
goog.require('goog.ui.ToolbarSelect');
goog.require('goog.ui.ToolbarSeparator');
goog.require('goog.ui.ToolbarToggleButton');
goog.require('goog.array');
goog.require('goog.ui.Button');
goog.require('goog.ui.Component.EventType');
goog.require('goog.ui.Component.State');
goog.require('goog.ui.MenuItem');
goog.require('goog.ui.Option');
goog.require('goog.ui.SelectionModel');
goog.require('goog.ui.Separator');
goog.require('goog.ui.ButtonRenderer');
goog.require('goog.ui.CustomButton');
goog.require('goog.ui.CustomButtonRenderer');
goog.require('goog.debug.DivConsole');
goog.require('goog.debug.Logger');
goog.require('goog.debug.LogManager');
goog.require('goog.object');
goog.require('goog.ui.AutoComplete.Basic');
goog.require('goog.format.EmailAddress');
goog.require('goog.fx');
goog.require('goog.fx.dom');
goog.require('goog.ui.Dialog');
goog.require('goog.editor.Command');
goog.require('goog.editor.Field');
goog.require('goog.editor.plugins.BasicTextFormatter');
goog.require('goog.editor.plugins.EnterHandler');
goog.require('goog.editor.plugins.HeaderFormatter');
goog.require('goog.editor.plugins.LinkBubble');
goog.require('goog.editor.plugins.LinkDialogPlugin');
goog.require('goog.editor.plugins.ListTabHandler');
goog.require('goog.editor.plugins.LoremIpsum');
goog.require('goog.editor.plugins.RemoveFormatting');
goog.require('goog.editor.plugins.SpacesTabHandler');
goog.require('goog.editor.plugins.UndoRedo');
goog.require('goog.ui.editor.DefaultToolbar');
goog.require('goog.ui.editor.ToolbarController');
/**
 * @license Rawscripts.com copywrite 2010
 *
 *
 *
 */
window['markAsRead'] = markAsRead;
window['newMessage'] = newMessage;
window['deleteMessage'] = deleteMessage;
window['deleteThread'] = deleteThread;
window['EOV'] = EOV;
window['changeFormat'] = changeFormat;
window['deleteThread'] = deleteThread;
window['newThread'] = newThread;
window['tabs'] = tabs;
window['exportScripts'] = exportScripts;
window['hideExportPrompt'] = hideExportPrompt;
window['renameScript'] = renameScript;
window['hideRenamePrompt'] = hideRenamePrompt;
window['renamePrompt'] = renamePrompt;
window['hideNewScriptPrompt'] = hideNewScriptPrompt;
window['createScript'] = createScript;
window['hideSpellCheck'] = hideSpellCheck;
window['s_change'] = s_change;
window['s_ignore'] = s_ignore;
window['s_ignore_all'] = s_ignore_all;
window['replaceAndFind'] = replaceAndFind;
window['replaceText'] = replaceText;
window['hideFindReplacePrompt'] = hideFindReplacePrompt;
window['hideFindPrompt'] = hideFindPrompt;
window['findUp'] = findUp;
window['findDown'] = findDown;
window['shareScript'] = shareScript;
window['hideSharePrompt'] = hideSharePrompt;
window['hideEmailPrompt'] = hideEmailPrompt;
window['emailScript'] = emailScript;
window['save'] = save;
window['setJustPasted'] = setJustPasted;
window['paint'] = paint;
window['init'] = init;
window['paste'] = paste;
window['cut'] = cut;
var currentPage=0;
var currentScene=1;
var ud=0;
var viewNotes=true;
var timer;
var typeToScript=true;
var findForcePaint = false;
var pasting=false;
var justPasted=false;
var undoQue = [];
var redoQue = [];
var pageBreaks=[];
var mouseY=0;
var mouseDownBool=false;
var scrollBarBool=false;
var commandDownBool=false;
var characters =[];
var scenes=[];
var canvas;
var ctx;
var linesNLB= [];
var vOffset = 0;
var pos = { col: 0, row: 0};
var anch = {col:0, row:0};
var findArr = [];
var findReplaceArr=[];
var background = '#fff';
var font = '10pt Courier';
var fontWidth = 8;
var foreground = '#000';
var lineheight = 13;
var milli = 0;
var formatMenu = false;
var formats = ['Slugline', 'Action', 'Character', 'Dialog', 'Parenthetical', 'Transition'];
var resource_id='random123456789';
var autosaveBool = true;
   // Use the same wrapping procedure over and over
   // just define an array to pass into it
    //wrapVars[0]=character length before wrap
    //wrapVars[1]= distace from edge it should be placed ay
    //wrapVars[2]= bool, align right
    //wrapVars[3]= bool, uppercase
    //wrapVars[4]=number of line breaks after
    //
    //
    //
    //wrapvariablearray[0]=s
    //wrapvariablearray[1]=a
    //wrapvariablearray[2]=c
    //wrapvariablearray[3]=d
    //wrapvariablearray[4]=p
    //wrapvariablearray[5]=t
var WrapVariableArray = [[62, 111-10,0,1,2],[62,111-10,0,0,2],[40, 271-10,0,1,1],[36, 191-10,0,0,2],[30, 231-10,0,0,1],[61, 601-10,1,1,2]];
    
    //if ($.browser.mozilla)fontWidth=9;
var editorWidth = 850;
var headerHeight=65+26;
var lines = [];
	/*
	 * Notes notation
	 * notes[x] refers to thread
	 * notes[x][0], notes[x][1] is row and col
	 * notes[x][2] is content
	 * notes[x][2].length is number of messages in thread
	 * notes[x][2][0] ,[1], [2] =content, user, timestamp
     *
     *<thread>
     *  <row></row>
     *  <col></col>
     *  <content>
     *      <messageOne>
     *          <text></text>
     *          <user></user>
     *          <timestampt></timestamp>
	 *			<unread>bool</unread>
     *      </messageOne>
     *      <messageTwo>
     *          <text></text>
     *          <user></user>
     *          <timestampt></timestamp>
	 *			<unread>bool</unread>
     *      </messageTWo>
     *  </content>
     *  <id></id>
     *</thread>
     *
	 * */
	//var notes = [[1,2,[["message from ritchie and stuff and ore thigs and words","ritchie","timestamp"],["response","kristen","newTimestamp"]],123456789],[1,100,[["Second message and stuffmessage from ritchie and stuff and ore thigs and words","ritchie","timestamp"],["response","kristen","newTimestamp"]],123456709]];
notes=[];
var spellWrong=[];
var spellIgnore=[];
var checkSpell=false;
var fMenu, eMenu, vMenu, sMenu;
var notesPosition=[];


function init(){
	if(goog.userAgent.IE==true){
		goog.dom.removeNode(goog.dom.getElement('loading'));
		goog.dom.flattenElement(goog.dom.getElement('canvas'));
		goog.dom.removeNode(goog.dom.getElement('gtb'));
		return;
	}
	if (EOV=='viewer'){
		var f = goog.dom.getElement('format');
		f.style.visibility='hidden'
		f.disabled=true;
		goog.dom.removeNode(goog.dom.getElement('toolbarSave'));
		goog.dom.removeNode(goog.dom.getNextElementSibling(goog.dom.getElement('toolbarRedo')));
		goog.dom.removeNode(goog.dom.getElement('toolbarRedo'));
		goog.dom.removeNode(goog.dom.getElement('toolbarUndo'));
		goog.dom.removeNode(goog.dom.getElement('toolbarSpellcheck'));
		goog.dom.removeNode(goog.dom.getElement('rename'));
		goog.dom.removeNode(goog.dom.getElement('save'));
		goog.dom.removeNode(goog.dom.getNextElementSibling(goog.dom.getElement('duplicate')));
		goog.dom.removeNode(goog.dom.getElement('duplicate'));
		goog.dom.removeNode(goog.dom.getElement('undo'));
		goog.dom.removeNode(goog.dom.getNextElementSibling(goog.dom.getElement('redo')));
		goog.dom.removeNode(goog.dom.getElement('redo'));
		goog.dom.removeNode(goog.dom.getElement('editTitlePage'));
		goog.dom.removeNode(goog.dom.getNextElementSibling(goog.dom.getElement('tag')));
		goog.dom.removeNode(goog.dom.getElement('tag'));
		goog.dom.removeNode(goog.dom.getNextElementSibling(goog.dom.getElement('spellCheck')));
		goog.dom.removeNode(goog.dom.getElement('spellCheck'));
		goog.dom.removeNode(goog.dom.getNextElementSibling(goog.dom.getElement('findReplace')));
		goog.dom.removeNode(goog.dom.getElement('findReplace'));
		goog.dom.removeNode(goog.dom.getElement('format0'));
		goog.dom.removeNode(goog.dom.getElement('format1'));
		goog.dom.removeNode(goog.dom.getElement('format2'));
		goog.dom.removeNode(goog.dom.getElement('format3'));
		goog.dom.removeNode(goog.dom.getElement('format4'));
		goog.dom.removeNode(goog.dom.getElement('format5'));
		goog.dom.removeNode(goog.dom.getElement('revision'));
		goog.dom.removeNode(goog.dom.getElement('collaborators'));
		goog.dom.removeNode(goog.dom.getElement('titlePageHref'));
		
		
	}
	else{
		var f = goog.dom.getElement('saveButton');
		f.style.visibility='visible';
		f.disabled=false;
		goog.events.listen(goog.dom.getElement('title'), goog.events.EventType.MOUSEOVER, function(e){
			var d = goog.dom.getElement('title');
			d.style.backgroundColor = 'LightSkyBlue';
			d.style.border = '1px #666 solid';
			d.style.margin = '0';
			d.style.textShadow = 'none'
		})
		goog.events.listen(goog.dom.getElement('title'), goog.events.EventType.MOUSEOUT, function(e){
			var d = goog.dom.getElement('title');
			d.style.backgroundColor = '#6484DF';
			d.style.border = 'none';
			d.style.margin = '3px';
			d.style.textShadow = '1px 1px 1px #999'
		})
		goog.events.listen(goog.dom.getElement('title'), goog.events.EventType.CLICK, function(){
			renamePrompt()
		})
	}
	setElementSizes("i");
	var MouseWheelHandler = goog.events.MouseWheelHandler;
	var MOUSEWHEEL = MouseWheelHandler.EventType.MOUSEWHEEL;
    var mwh = new MouseWheelHandler(document.getElementById('canvas'));
	goog.events.listen(mwh, MOUSEWHEEL, handleMouseWheel);
	goog.events.listen(window, 'unload', function(e) {
	goog.events.unlisten(mwh, MOUSEWHEEL, handleMouseWheel);});
	goog.events.listen(goog.dom.getElement('find_input'), goog.events.EventType.KEYDOWN, function(e){if(e.keyCode==13){e.preventDefault();findDown()}});
	goog.events.listen(goog.dom.getElement('fr_find_input'), goog.events.EventType.KEYDOWN, function(e){if(e.keyCode==13){e.preventDefault();findDown()}});
	goog.events.listen(goog.dom.getElement('renameField'), goog.events.EventType.KEYDOWN, function(e){if(e.keyCode==13){e.preventDefault();renameScript()}});
    goog.events.listen(goog.dom.getElement('subject'), goog.events.EventType.KEYDOWN, function(e){if(e.keyCode==13)e.preventDefault()});
	goog.events.listen(goog.dom.getElement('find_input'), goog.events.EventType.FOCUS, function(e){
		typeToScript=false;
		findForcePaint=true;
		commandDownBool=false
	});
	goog.events.listen(goog.dom.getElement('find_input'), goog.events.EventType.BLUR, function(e){
		typeToScript=true;
		findForcePaint=false;
		commandDownBool=false
	});
	goog.events.listen(goog.dom.getElement('find_input'), goog.events.EventType.KEYUP, function(e){findInputKeyUp(e, "f")})
	goog.events.listen(goog.dom.getElement('fr_find_input'), goog.events.EventType.FOCUS, function(e){
		typeToScript=false;
		findForcePaint=true;
		commandDownBool=false
	});
	goog.events.listen(goog.dom.getElement('fr_find_input'), goog.events.EventType.BLUR, function(e){
		typeToScript=true;
		findForcePaint=false;
		commandDownBool=false
	});
	goog.events.listen(goog.dom.getElement('fr_find_input'), goog.events.EventType.KEYUP, function(e){findInputKeyUp(e, "r")});
	goog.events.listen(goog.dom.getElement('fr_replace_input'), goog.events.EventType.FOCUS, function(e){
		typeToScript=false;
		findForcePaint=true;
		commandDownBool=false
	});
	goog.events.listen(goog.dom.getElement('fr_replace_input'), goog.events.EventType.BLUR, function(e){
		typeToScript=true;
		findForcePaint=false;
		commandDownBool=false
	});
	fMenu = new goog.ui.Menu();
	fMenu.decorate(goog.dom.getElement('fileMenu'))
	fMenu.setPosition(0, 64)
	fMenu.setAllowAutoFocus(true);
	fMenu.setVisible(false);
	goog.events.listen(goog.dom.getElement('file'), goog.events.EventType.CLICK, openMenu);
	goog.events.listen(goog.dom.getElement('file'), goog.events.EventType.MOUSEOVER, topMenuOver);
	goog.events.listen(goog.dom.getElement('file'), goog.events.EventType.MOUSEOUT, topMenuOut);
	goog.events.listen(fMenu, 'action', menuSelect)
	goog.events.listen(goog.dom.getElement('canvas'), goog.events.EventType.CLICK, function(e){typeToScript=true})
	
	eMenu = new goog.ui.Menu();
	eMenu.decorate(goog.dom.getElement('editMenu'))
	eMenu.setPosition(35, 64)
	eMenu.setAllowAutoFocus(true);
	eMenu.setVisible(false);
	goog.events.listen(goog.dom.getElement('edit'), goog.events.EventType.CLICK, openMenu);
	goog.events.listen(goog.dom.getElement('edit'), goog.events.EventType.MOUSEOVER, topMenuOver);
	goog.events.listen(goog.dom.getElement('edit'), goog.events.EventType.MOUSEOUT, topMenuOut);
	goog.events.listen(eMenu, 'action', menuSelect)
	
	vMenu = new goog.ui.Menu();
	vMenu.decorate(goog.dom.getElement('viewMenu'))
	vMenu.setPosition(72, 64)
	vMenu.setAllowAutoFocus(true);
	vMenu.setVisible(false);
	goog.events.listen(goog.dom.getElement('view'), goog.events.EventType.CLICK, openMenu);
	goog.events.listen(goog.dom.getElement('view'), goog.events.EventType.MOUSEOVER, topMenuOver);
	goog.events.listen(goog.dom.getElement('view'), goog.events.EventType.MOUSEOUT, topMenuOut);
	goog.events.listen(vMenu, 'action', menuSelect)
	
	sMenu = new goog.ui.Menu();
	sMenu.decorate(goog.dom.getElement('shareMenu'))
	sMenu.setPosition(113, 64)
	sMenu.setAllowAutoFocus(true);
	sMenu.setVisible(false);
	goog.events.listen(goog.dom.getElement('share'), goog.events.EventType.CLICK, openMenu);
	goog.events.listen(goog.dom.getElement('share'), goog.events.EventType.MOUSEOVER, topMenuOver);
	goog.events.listen(goog.dom.getElement('share'), goog.events.EventType.MOUSEOUT, topMenuOut);
	goog.events.listen(sMenu, 'action', menuSelect)
	
	
	var sKeys= [['save','S'],['export', 'E'],['undo', 'Z'], ['redo', 'Shift Z'], ['find', 'F']];
	var meta = (goog.userAgent.MAC==true ? "⌘" : "Ctrl+")
	for (i in sKeys){
		var d = goog.dom.getElement(sKeys[i][0]+'-shortcut');
		if (d!=null){goog.dom.setTextContent(d, meta+sKeys[i][1]);}
	}
	try{
		var domain = goog.dom.getElement('user').innerHTML.split('@')[1].split('.')[0];
		if(domain=='gmail'){
			goog.net.XhrIo.send('/synccontacts',
				function(e){
					if(e.target.getResponseText()=='none')return;
					try{
						var arr = e.target.getResponseJson();
						var emailAutoComplete = new goog.ui.AutoComplete.Basic(arr, document.getElementById('recipient'), true);
						var shareAutoComplete = new goog.ui.AutoComplete.Basic(arr, document.getElementById('collaborator'), true);
					}
					catch(e){};
				},
				'POST'
			);
		};
	}
	catch(e){};
	resource_id=window.location.href.split('=')[1];
	goog.net.XhrIo.send('scriptcontent',
		setup,
		'POST',
		'resource_id='+resource_id
	)
  }
function setElementSizes(v){
	var s = goog.dom.getViewportSize();
	goog.style.setSize(goog.dom.getElement('container'), s);
	document.getElementById('canvas').height = s.height - 60-38;
	document.getElementById('canvas').width = s.width-320;
	editorWidth=s.width-323;
	goog.dom.getElement('insertNewNote').style.marginLeft=editorWidth-630*1+"px";
	document.getElementById('sidebar').style.height = (s.height-70)+'px';
	if(v=="r"){
		scroll(0);
		paint(false,false,false)
	}
}
var vsm = new goog.dom.ViewportSizeMonitor();
goog.events.listen(vsm, goog.events.EventType.RESIZE, function(e) {setElementSizes("r");});

var docKh = new goog.events.KeyHandler(document);
goog.events.listen(docKh, 'key', keyEvent)

function keyEvent(e){
	if(e.platformModifierKey){
		return;
	}
	else if(e.target.id=="ccp"){
      var d= new Date();
      milli = d.getMilliseconds();
      if(e.keyCode==13)enter();
      else if(e.keyCode==38)upArrow(e);
      else if(e.keyCode==40)downArrow(e);
      else if(e.keyCode==39)rightArrow(e);
      else if(e.keyCode==37)leftArrow(e);
      else if(e.keyCode==8)backspace(e);
      else if(e.keyCode==46)deleteButton();
	  else if(e.keyCode==16)return;
      else if(e.keyCode==9){e.preventDefault(); tab();}
	  else{handlekeypress(e)}
      if(ud<0 && typeToScript && e.keyCode!=13 && e.keyCode!=46 && e.keyCode!=8){
        scroll(ud-400);
      }
	  if(ud>document.getElementById('canvas').height-80 && typeToScript && e.keyCode!=13 && e.keyCode!=46 && e.keyCode!=8 ){

		scroll(ud-400);
	}
      //console.log(e.keyCode);
    d=null;
	}
    if(typeToScript){
		if (anch.row==pos.row && pos.col==anch.col)document.getElementById("ccp").value="";
        document.getElementById('ccp').focus();
        document.getElementById('ccp').select();
    }
}
goog.events.listen(document, goog.events.EventType.MOUSEMOVE, mouseMove)
goog.events.listen(document, goog.events.EventType.MOUSEDOWN, mouseDown)
goog.events.listen(document, goog.events.EventType.MOUSEUP, mouseUp)
var shortcutHandler = new goog.ui.KeyboardShortcutHandler(document);
shortcutHandler.registerShortcut('save', 'meta+s');
shortcutHandler.registerShortcut('undo', 'meta+z');
shortcutHandler.registerShortcut('redo', 'meta+shift+z');
shortcutHandler.registerShortcut('export', 'meta+e');
shortcutHandler.registerShortcut('find', 'meta+f');
shortcutHandler.setAlwaysPreventDefault(true)
goog.events.listen(
       shortcutHandler,
       goog.ui.KeyboardShortcutHandler.EventType.SHORTCUT_TRIGGERED,
       shortcutTriggered);
function shortcutTriggered(e){
	if(e.identifier=="save")save(0);
	else if(e.identifier=="undo")undo();
	else if(e.identifier=="redo")redo();
	else if(e.identifier=="export")exportPrompt();
	else if(e.identifier=="find")findPrompt();
}
window.oncontextmenu = contextmenu;
	
// Character and Scene Suggest
//Build it in the dom. Easier. Stick actual data in value, not in innerhtml

function createSuggestBox(d){
	if(EOV=='viewer')return;
	if(document.getElementById('suggestBox')!=null){
		goog.dom.removeNode(document.getElementById('suggestBox'));
	}
	if(d=='c'){
        var v=characters;
        var left=WrapVariableArray[2][1]+Math.round((editorWidth-fontWidth*87-24)/2)+'px';
    }
    else{
        var v=[];
        for(i in scenes){
            v.push([scenes[i][0].split(') ').splice(1).join(') ')]);
        }
        var left=WrapVariableArray[0][1]+Math.round((editorWidth-fontWidth*87-24)/2)+'px';
    }
	var l=lines[pos.row][0].length;
	var part=lines[pos.row][0].toUpperCase();
	for (x in v){
		var s = v[x][0].substr(0,l).toUpperCase();
		if (part==s && part!=v[x][0]){
			//create box now if doens't exist
			if(document.getElementById('suggestBox')==null){
				var box = document.body.appendChild(document.createElement('div'));
				box.id='suggestBox';
				box.style.position='fixed';
				box.style.top=ud+headerHeight+9+lineheight+"px";
				box.style.left=left;
				box.className = 'goog-menu'
			}
            var found=false;
            if(d=='s'){
                var c = box.childNodes;
                for (i in c){
                    if(v[x][0]==c[i].value)found=true;
                }
				c=null;
            }
            if(!found){
                var item = box.appendChild(document.createElement('div'));
                item.className="goog-menuitem";
                item.appendChild(document.createTextNode(v[x][0]))
                item.value=v[x][0];
				item=null;
            }
			found=null;
		}
	}
	if(document.getElementById('suggestBox')!=null){
		var menuDiv = goog.dom.getElement('suggestBox');
		googSuggestMenu = new goog.ui.Menu();
		googSuggestMenu.decorate(menuDiv)
		googSuggestMenu.setAllowAutoFocus(true);
		googSuggestMenu.setHighlightedIndex(0);
		goog.events.listen(googSuggestMenu, 'action', function(e) {
			var txt = e.target.getCaption();
			var len = lines[pos.row][0].length;
			lines[pos.row][0]=txt;
		    undoQue.push(['paste', pos.row, pos.col, lines[pos.row][0].substr(len)]);
			pos.col=anch.col=lines[pos.row][0].length;
			goog.dom.removeNode(document.getElementById('suggestBox'))
			txt=len=null;
	    });
		box = s = menuDiv = null;
	}
	d=v=part=l=left=x=null;
}
var googSuggestMenu;

function saveTimer(){
	if(EOV=='viewer')return;
	document.getElementById('saveButton').disabled=false;
	document.getElementById('saveButton').value='Save';
	checkSpell=true;
	if(autosaveBool){
		clearTimeout(timer);
		timer = setTimeout('save(1)',7000);
	}
}

function findInputKeyUp(e, w){
	if(e.which==13 && e.which!=1000){
		e.preventDefault();
		findDown();
		return;
	}
	var f = (w=="f" ? document.getElementById("find_input").value : document.getElementById("fr_find_input").value);
	var r = new RegExp(f.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"),"gi");
	findArr=[];
	findReplaceArr=[];
	if(f.length==0){
		document.getElementById('find_number_found').innerHTML="0 found"
		return;
	}
	var c = 0;
	for (i in lines){
		while (r.test(lines[i][0])==true){
			if(w=="f"){findArr.push([i*1,r.lastIndex-f.length])}
			else{findReplaceArr.push([i*1,r.lastIndex-f.length])}
		}
	}
	if(w=="f"){document.getElementById('find_number_found').innerHTML=findArr.length+" found"}
}
function findDown(){
	var tmpArr= (findArr.length!=0 ? findArr : findReplaceArr)
	if (tmpArr.length==0)return;
	var l = (findArr.length!=0 ? document.getElementById('find_input').value.length : document.getElementById('fr_find_input').value.length);
	for(i in tmpArr){
		if (tmpArr[i][0]==pos.row && tmpArr[i][1]>pos.col){
			anch.row=pos.row=tmpArr[i][0];
			anch.col=tmpArr[i][1]*1;
			pos.col=tmpArr[i][1]*1+l*1;
			jumpTo("find"+pos.row);
			return;
		}
		if(tmpArr[i][0]*1>pos.row*1){
			anch.row=pos.row=tmpArr[i][0]*1;
			anch.col=tmpArr[i][1]*1;
			pos.col=tmpArr[i][1]*1+l*1;
			jumpTo("find"+pos.row);
			return;
		}
	}
	pos.row=anch.row=pos.col=anch.col=0;
	findDown();
}

function findUp(){
	var tmpArr= (findArr.length!=0 ? findArr : findReplaceArr)
	if (tmpArr.length==0)return;
	var l = (findArr.length!=0 ? document.getElementById('find_input').value.length : document.getElementById('fr_find_input').value.length);
	var i = tmpArr.length-1;
	for(var i=tmpArr.length-1;i>=0;i--){
		if (tmpArr[i][0]==pos.row && tmpArr[i][1]<pos.col-l-1){
			anch.row=pos.row=tmpArr[i][0];
			anch.col=tmpArr[i][1]*1;
			pos.col=tmpArr[i][1]*1+l*1;
			jumpTo("find"+pos.row);
			return;
		}
		if(tmpArr[i][0]*1<pos.row*1){
			anch.row=pos.row=tmpArr[i][0]*1;
			anch.col=tmpArr[i][1]*1;
			pos.col=tmpArr[i][1]*1+l*1;
			jumpTo("find"+pos.row);
			return;
		}
	}
	pos.row=anch.row=tmpArr[tmpArr.length-1][0];
	anch.col = tmpArr[tmpArr.length-1][1];
	pos.col = anch.col+l;
	jumpTo("find"+pos.row);
}


function ajaxSpell(v, r){
	if(EOV=='viewer')return;
    checkSpell=false;
    var data = lines[v][0];
    if (lines[v][1]==0 || lines[v][1]==2 || lines[v][1]==5){
        data=data.toUpperCase();
    }
    var words = data.split(' ');
    for (i=0; i<words.length; i++){
        var found=false;
        for (j in spellWrong){
            if (words[i].toUpperCase()==spellWrong[j][0].toUpperCase()){
                found=true;
            }
        }
        for (j in spellIgnore){
            if (words[i].toUpperCase()==spellWrong[j][0].toUpperCase()){
                found=true;
            }
        }
        if(found){
            words.splice(i,1)
            i--;
        }
    }
	i=null;
    var j = JSON.stringify(words);
	goog.net.XhrIo.send('/spellcheck',
		function(d){
			if(d.target.getResponseText()=='correct')return;
			var x=d.target.getResponseJson();
			for (i in x){
	            spellWrong.push(x[i]);
	        }
			x=i=null;
		},
		'POST',
		'data='+escape(j)+'&resource_id='+resource_id
	)
}


function cut(){
	if(EOV=='viewer')return;
    if(pos.row!=anch.row || pos.col!=anch.col)backspace();
    saveTimer();
}
function copy(){
	if(EOV=='viewer')return;
}
function paste(){
	if(EOV=='viewer')return;
	if(!justPasted){
		var forceCalc = false;
    	saveTimer();
	    redoQue=[];
	    if(pos.row!=anch.row || pos.col!=anch.col)backspace();
	    var j=false;
	    var data=document.getElementById('ccp').value;
	    var r = new RegExp( "\\n", "g" );
	    if (data.split(r).length>1) {
	        var tmp=data.split(r);
	        var tmpArr=[];
	        for (x in tmp){
	            if(tmp[x]!='' && tmp[x]!=null)tmpArr.push([tmp[x],1])
	        }
	        data=JSON.stringify(tmpArr);
			x=tmp=tmpArr=null;
	    }
	    undoQue.push(['paste',pos.row,pos.col,data]);
	    //undoQue[x][0] ==paste
	    //[1]=pos.row
	    //[2]=pos.col
	    //[3]=data
	    //[4]=added to line
	    //[5]=deleted empty line at end
	    if(data[0]=='[' && data[1]=='[')j=true;
	    if(!j){
	        lines[pos.row][0]=lines[pos.row][0].slice(0,pos.col)+ data + lines[pos.row][0].slice(pos.col);
	        pos.col+=document.getElementById('ccp').value.length;
	        anch.col=pos.col;
	    }
	    else{
			forceCalc = true;
	        var arr=JSON.parse(data);
	        if (lines[pos.row][0]==''){
	            lines[pos.row][1]=arr[0][1];
	        }
	        if (lines[pos.row][1]==arr[0][1]){
	            undoQue[undoQue.length-1].push(1);
	            var tmp=[lines[pos.row][0].slice(pos.col), lines[pos.row][1]];
	            lines[pos.row][0]=lines[pos.row][0].slice(0,pos.col)+arr[0][0];
	            var i=1;
	            var p=pos.row+1;
	            while(i<arr.length){
	                lines.splice(p,0,arr[i]);
	                p++;
	                i++;
	            }
	            lines.splice(p,0,tmp);
	            if(lines[p][0]=='' || lines[p][0]==' '){
	                lines.splice(p,1);
	                undoQue[undoQue.length-1].push(0);
	            }
	            else{undoQue[undoQue.length-1].push(1)}
	        }
	        else{
	            undoQue[undoQue.length-1].push(0);
	            var tmp=[lines[pos.row][0].slice(pos.col), lines[pos.row][1]];
	            lines[pos.row][0]=lines[pos.row][0].slice(0,pos.col);
	            pos.row++;
	            lines.splice(pos.row,0,arr[0]);
	            var i=1;
	            var p=pos.row+1;
	            while(i<arr.length){
	                lines.splice(p,0,arr[i]);
	                p++;
	                i++;
	            }
	            lines.splice(p,0,tmp);
	            if(lines[p][0]=='' || lines[p][0]==' '){
	                lines.splice(p,1);
	                undoQue[undoQue.length-1].push(0);
	            }
	            else{undoQue[undoQue.length-1].push(1)}
	        }
	        pos.row=anch.row=p;
	        pos.col=anch.col=0;
	        if(pos.row>=lines.length){
	            pos.row=anch.row=lines.length-1
	            pos.col=anch.col=lines[pos.row][0].length;
	        }
			arr=i=p=tmp=null;
	    }
	    pasting=false;
		if(forceCalc){
			sceneIndex();
	    	paint(true,false,false);
		}
		goog.dom.getElement('ccp').value="";
		justPasted=true;
		setTimeout("setJustPasted()", 50);
		j=r=data=null;
	}
}
function setJustPasted(){
	if(EOV=='viewer')return;
	justPasted=false;
}
function selection(){
    //order stuff
    if(pos.row>anch.row){
        var startRange = {row:anch.row, col:anch.col};
        var endRange = {row:pos.row, col:pos.col};
    }
    else if(pos.row==anch.row && pos.col>anch.col){
        var startRange = {row:anch.row, col:anch.col};
        var endRange = {row:pos.row, col:pos.col};
    }
    else{
        var startRange = {row:pos.row, col:pos.col};
        var endRange = {row:anch.row, col:anch.col};
    }
    // figure and copy range
    if (startRange.row==endRange.row){
        var sel = lines[startRange.row][0].slice(startRange.col, endRange.col);
    }
    else{
        arr=[];
        arr.push([lines[startRange.row][0].slice(startRange.col),lines[startRange.row][1]]);
        startRange.row=startRange.row*1+1;
        while(startRange.row<endRange.row){
            arr.push([lines[startRange.row][0],lines[startRange.row][1]]);
            startRange.row+=1;
        }
        arr.push([lines[endRange.row][0].slice(0,endRange.col),lines[endRange.row][1]]);
        var sel=JSON.stringify(arr);
    }
    var c = document.getElementById('ccp');
    c.value=sel;
	if(!findForcePaint){
		c.focus();
		c.select();
	}
	startRange=endRange=sel=null;
}
function toolbarActions(e){
	var c = e.target.getId().replace('toolbar','')
	if(c=='New')newScriptPrompt();
	else if(c=='Save')save(0);
	else if(c=='Export')exportPrompt();
	else if(c=='Undo')undo();
	else if(c=='Redo')redo();
	else if(c=='InsertNote')newThread();
	else if(c=='Spellcheck')launchSpellCheck();
	else if(c=='Email')emailPrompt();
}
function setup(e){
	var tb = new goog.ui.Toolbar();
	tb.decorate(goog.dom.getElement('gtb'));
	goog.events.listen(tb, goog.ui.Component.EventType.ACTION, toolbarActions)
	goog.dom.getElement('gtb').style.visibility = 'visible';
	goog.dom.getElement('sidebar').style.visibility = 'visible';
    if(e.target.getResponseText()=='not found'){
        lines = [["Sorry, the script wasn't found.",1]];
        paint(true,false,false);
        return;
    }
    var p = e.target.getResponseJson();
    var title=p[0];
    document.getElementById('title').innerHTML=title;
	document.title = title;
    var x = p[1];
    for(var i=0; i<x.length; i++){
        lines.push([x[i][0], x[i][1]]);
    }
    if(lines.length==2){
        pos.row=anch.row=1;
        pos.col=anch.col=lines[1][0].length;
    }
    if(p[2].length!=0){
        var wrong=p[2][0];
        var ignore =p[2][1];
        for (w in wrong){
            spellWrong.push(wrong[w])
        }
        for (i in ignore){
            spellIgnore.push(ignore[i]);
        }
    }
    //setupnotes
    for(i in p[3]){
        notes.push(p[3][i]);
    }
    var collabs=p[4];
    var c = document.getElementById('hasAccess');
    for (i in collabs){
        var TR = c.appendChild(document.createElement('tr'));
        TR.id=collabs[i];
        TR.appendChild(document.createElement('td')).appendChild(document.createTextNode(collabs[i]));
        var newA = TR.appendChild(document.createElement('td')).appendChild(document.createElement('a'));
        newA.appendChild(document.createTextNode('Remove Access'));
        newA.href="javascript:removeAccess('"+collabs[i]+"')";
		TR=newA=null;
    }
	var emailAutoComplete = new goog.ui.AutoComplete.Basic(p[5], document.getElementById('recipient'), true);
	var shareAutoComplete = new goog.ui.AutoComplete.Basic(p[5], document.getElementById('collaborator'), true);
	autosaveBool = (p[6]=='true' ? true : false);
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    tabs(0);
    characterInit();
    sceneIndex();
    document.getElementById('ccp').focus();
    document.getElementById('ccp').select();
    document.getElementById('saveButton').value="Saved";
    document.getElementById('saveButton').disabled=true;
    paint(true,false,false);
    setInterval('paint(false,false,false)', 25);
	var n = new goog.fx.dom.FadeOutAndHide(goog.dom.getElement('loading'), 500);
	goog.events.listen(n, goog.fx.Animation.EventType.END, function(e){goog.dom.removeNode(goog.dom.getElement('loading'))})
	n.play()
	noteIndex();
}
function tabs(v){
    var t = ["sceneTab","noteTab"]
    for(i in t){
        var c = document.getElementById(t[i]);
        if(i==v){
            c.style.backgroundColor="#3F5EA6";
            c.style.color='white';
            document.getElementById(t[i].replace("Tab","s")).style.display="block";
        }
        else{
            c.style.backgroundColor="#6C8CD5";
            c.style.color='black';
            document.getElementById(t[i].replace("Tab","s")).style.display="none";
        }
    }
	t=i=null;
}
function changeFormat(v){
	if(EOV=='viewer')return;
	if(document.getElementById('suggestBox')!=null){document.getElementById('suggestBox').parentNode.removeChild(document.getElementById('suggestBox'))};
    saveTimer();
    undoQue.push(['format',pos.row,pos.col,lines[pos.row][1],v]);
    redoQue=[];
    lines[pos.row][1]=v;
    anch.col=pos.col;
    anch.row=pos.row;
    if(lines[pos.row][1]==4){
        if(lines[pos.row][0].charAt(0)!='('){
            lines[pos.row][0]='('+lines[pos.row][0];
            pos.col++;
            anch.col++;
        }
        if(lines[pos.row][0].charAt(lines[pos.row][0].length-1)!=')')lines[pos.row][0]=lines[pos.row][0]+')';
    }
    if(lines[pos.row][1]==3){
        if(lines[pos.row][0].charAt(0)=='('){
            lines[pos.row][0]=lines[pos.row][0].substr(1);
            pos.col--;
            anch.col--;
        }
        if(lines[pos.row][0].charAt(lines[pos.row][0].length-1)==')')lines[pos.row][0]=lines[pos.row][0].slice(0,-1);
    }
    sceneIndex();
}
function contextmenu(e){
	if(EOV=='viewer')return;
	if(e.clientX>headerHeight && e.clientX<editorWidth-100 && e.clientY-headerHeight>40 && e.target.id=="canvas"){
		e.preventDefault();
		var d = document.body.appendChild(document.createElement('div'));
		d.style.position="fixed";
		d.style.top=e.clientY-3+"px";
		d.style.left=e.clientX+5+"px";
		d.id="context_menu";
		for (i in formats){
			var u = d.appendChild(document.createElement('div'));
			u.innerHTML=formats[i];
			u.id="cm"+i;
			u.className="contextUnit";
			u=null;
		}
		d=i=null;
	}
}
function mouseUp(e){
	if(document.getElementById('suggestBox')!=null){
		goog.dom.removeNode(document.getElementById('suggestBox'));
	}
	if(typeToScript){
	    mouseDownBool=false;
	    scrollBarBool=false;
	    var width = document.getElementById('canvas').width;
	    var height = document.getElementById('canvas').height;
            
	    if(e.clientY-headerHeight>height-39 && e.clientY-headerHeight<height && e.clientX>editorWidth-22 && e.clientX<editorWidth-2){
	            if(e.clientY-headerHeight>height-20)scroll(30);
	            else scroll(-30);
	    }
		width=height=null;
		document.getElementById('ccp').focus();
        document.getElementById('ccp').select();
	}
	fMenu.setVisible(false)
	eMenu.setVisible(false)
	vMenu.setVisible(false)
	sMenu.setVisible(false)
	var arr=["file",'edit','view','share'];
	for(i in arr){
		var d = goog.dom.getElement(arr[i]);
		d.style.backgroundColor='#A2BAE9';
        d.style.color='black';
	}
}
function mouseDown(e){
	if(typeToScript){
	    if(checkSpell)ajaxSpell(pos.row);
	    
		if(document.getElementById('suggestBox')!=null){
			return;
		}
		else if(document.getElementById('context_menu')!=null){
			if(e.target.className=="contextUnit"){
				changeFormat(e.target.id.replace("cm",""));
			}
			document.getElementById('context_menu').parentNode.removeChild(document.getElementById('context_menu'));
		}
	    else{
	        var height = document.getElementById('canvas').height;
	        var pagesHeight = (pageBreaks.length+1)*72*lineheight;
	        var barHeight = ((height)/pagesHeight)*(height-39);
	        if (barHeight<20)barHeight=20;
	        if (barHeight>=height-39)barHeight=height-39;
	        var topPixel = (vOffset/(pagesHeight-height))*(height-39-barHeight)+headerHeight;
        
	        if(e.clientX<editorWidth-100 && e.clientY>60 && e.target.id=="canvas"){
	            mouseDownBool=true;
				mousePosition(e,"anch")
	        }
	        else if(e.clientX<editorWidth && e.clientX>editorWidth-20 && e.clientY>topPixel && e.clientY<topPixel+barHeight){
	            scrollBarBool=true;
	        }
	    	height=pagesHeight=barHeight=topPixel=null;
		}
	document.getElementById('ccp').focus();
	document.getElementById('ccp').select();
	}
}
function mousePosition(e, w){
	var d= new Date();
    milli = d.getMilliseconds();
	var count = 0;
	var found = 0;
	var mp=e.clientY+vOffset-31;
	var y=15*lineheight+3;
	var oldY=0;
	for(i in lines){
		oldY=y;
		if(pageBreaks.length!=0 && pageBreaks[count]!=undefined && pageBreaks[count][0]==i){
			if(pageBreaks[count][2]==0){
				y=72*lineheight*(count+1)+10*lineheight+headerHeight+3-31;
				count++;
			}
			else{
				y=72*lineheight*(count+1)+10*lineheight+headerHeight+3;
				y+=(linesNLB[i].length-pageBreaks[count][2])*lineheight-31;
				if(lines[i][1]==3)y+=lineheight;
				y-=(lineheight*linesNLB[i].length);
				count++;
			}
		}
		y+=(lineheight*linesNLB[i].length);
		if(y>mp){
			if(pageBreaks.length!=0 && pageBreaks[count-1]!=undefined && pageBreaks[count-1][0]==i && pageBreaks[count-1][2]!=0){
				if ((mp-oldY)/lineheight<pageBreaks[count-1][2]){
					var l = Math.round((mp-oldY)/lineheight+0.5);
				}
				else if (mp<72*lineheight*(count)+10*lineheight+headerHeight){
					var l = pageBreaks[count-1][2];
				}
				else{
					var l = Math.round((lineheight*linesNLB[i].length-y+mp)/lineheight+0.5);
				}
			}
			else{
				var l = Math.round((lineheight*linesNLB[i].length-y+mp)/lineheight+0.5);
			}
			var j=0;
			var tc=0;
			while(j+1<l){
				tc+=linesNLB[i][j]+1;
				j++;
			}
			var r;
			if(lines[i][1]!=5){
				r=Math.round((e.clientX-Math.round((editorWidth-fontWidth*87-24)/2)-WrapVariableArray[lines[i][1]][1])/fontWidth);
			}
			else{
				r=Math.round((e.clientX-Math.round((editorWidth-fontWidth*87-24)/2)-WrapVariableArray[lines[i][1]][1]+(lines[i][0].length*fontWidth))/fontWidth);
			}
			if(r<0)r=0;
			if(r>linesNLB[i][j])r=linesNLB[i][j];
			tc+=r;
			if(tc<0)tc=0;
            if(tc>lines[i][0].length)tc=lines[i][0].length;
			if (w=="anch"){
				pos.row = anch.row = i*1;
				pos.col = anch.col = tc*1;
			}
			else{
				pos.row = i;
				pos.col = tc;
			}
			r = y = tc = count = found = mp = oldY = l = d = null;
			return;
		}
	}
}
function mouseMove(e){
    if(scrollBarBool)scrollBarDrag(e);
    mouseY=e.clientY;
    if (mouseDownBool) mousePosition(e,"pos");
	var height = document.getElementById('canvas').height;
    var pagesHeight = (pageBreaks.length+1)*72*lineheight;
    var barHeight = ((height)/pagesHeight)*(height-39);
    if (barHeight<20)barHeight=20;
    if (barHeight>=height-39)barHeight=height-39;
    var topPixel = (vOffset/(pagesHeight-height))*(height-39-barHeight)+headerHeight;
	if (e.clientX<editorWidth && e.clientX>editorWidth-20){
		goog.dom.getElement('canvas').style.cursor = ((e.clientY>topPixel && e.clientY<topPixel+barHeight) ? "default" : "text");
	}
	else{
		var found=false;
		for(i in notesPosition){
			if (notesPosition[i][0]<e.clientX && notesPosition[i][0]+fontWidth>e.clientX){
				if(notesPosition[i][1]+headerHeight+6<e.clientY && notesPosition[i][1]+lineheight+headerHeight+6>e.clientY){
					found=notesPosition[i][2];
					break;
				}
			}
		}
		if (found!=false){
			goog.dom.getElement('canvas').style.cursor='pointer';
			goog.events.listen(goog.dom.getElement('canvas'), goog.events.EventType.CLICK, notesDialogFromScript);
		}
		else{
			goog.dom.getElement('canvas').style.cursor = 'text';
			goog.events.unlisten(goog.dom.getElement('canvas'), goog.events.EventType.CLICK, notesDialogFromScript);
		}
	}
}
function notesDialogFromScript(e){
	// This is a weird loophole to get 
	//the notesDialog going on script click
	for(i in notesPosition){
		if (notesPosition[i][0]<e.clientX && notesPosition[i][0]+fontWidth>e.clientX){
			if(notesPosition[i][1]+headerHeight+6<e.clientY && notesPosition[i][1]+lineheight+headerHeight+6>e.clientY){
				notesDialog(false, notesPosition[i][2], false, false);
				break;
			}
		}
	}
}
function handleMouseWheel(e){
	scroll(e.deltaY*2)
}
function scrollBarDrag(e){
    var diff = mouseY-e.clientY;
    var height = document.getElementById('canvas').height-50;
    var pagesHeight = (pageBreaks.length+1)*72*lineheight;
    vOffset-=pagesHeight/height*diff;
    if (vOffset<0)vOffset=0;
    var pagesHeight = (pageBreaks.length+1)*72*lineheight-document.getElementById('canvas').height+20;
    if(vOffset>pagesHeight)vOffset=pagesHeight+20;
	diff=height=pagesHeight=null;
}
function scroll(v){
    vOffset+=v;
    if (vOffset<0)vOffset=0;
    var pagesHeight = (pageBreaks.length+1)*72*lineheight-document.getElementById('canvas').height+20;
    if(vOffset>pagesHeight)vOffset=pagesHeight+20;
	var d= new Date();
    milli = d.getMilliseconds();
	if(document.getElementById('suggestBox')!=null){
		paint(false,false,false);
		createSuggestBox((lines[pos.row][1]==0 ? "s" : "c"));
	}
	pagesHeight=d=null;
}
function jumpTo(v){
    if(v.target!=undefined){
		v=v.target.id;
        var e = parseInt(v.replace('row',''));
        pos.row=e;
        anch.row=pos.row;
        pos.col=lines[pos.row][0].length;
        anch.col=pos.col;
		this.style.backgroundColor="#999ccc"
    }
	else if(v[0]=="f"){
		var e = parseInt(v.replace('find',''));
	}
    else {var e=pos.row;}
    var scrollHeight=0;
    for(var i=0;i<e;i++){
        for(var count=0; count<pageBreaks.length; count++){
            if(pageBreaks[count][0]==i){
                scrollHeight=lineheight*72*(count*1+1);
				if(pageBreaks[count][2]!=0){
					scrollHeight-=lineheight*(linesNLB[i].length-pageBreaks[count][2]);
				}
            }
        }
		count=null;
        scrollHeight+=(linesNLB[i].length*lineheight);
    }
    vOffset=scrollHeight;
    var pagesHeight = (pageBreaks.length+1)*72*lineheight-document.getElementById('canvas').height;
    if(vOffset>pagesHeight)vOffset=pagesHeight;
	e=i=scrollHeight=pagesHeight=null;
}
function upArrow(e){
    if(typeToScript && document.getElementById('suggestBox')==null){
        if (pos.row==0 && pos.col==0)return;
        var type = lines[pos.row][1];
        if (type==0) var wrapVars=WrapVariableArray[0];
        else if(type==1) var wrapVars = WrapVariableArray[1];
        else if(type==2) var wrapVars = WrapVariableArray[2];
        else if(type==3) var wrapVars = WrapVariableArray[3];
        else if(type==4) var wrapVars = WrapVariableArray[4];
        else if(type==5) var wrapVars = WrapVariableArray[5];
        // Only do calculations if 
        // there is wrapped text
        if(lines[pos.row][0].length>wrapVars[0]){
            var wordsArr = lines[pos.row][0].split(' ');
            var word = 0;
            var lineLengths=[];
            while(word<wordsArr.length){
				if(wordsArr[word].length>=wrapVars[0]){
					lineLengths.push(wordsArr[word].length)
					word++;
				}
                if(wordsArr.slice(word).join().length<=wrapVars[0]){
                    lineLengths.push(wordsArr.slice(word).join().length);
                    word=wordsArr.length
                    
                }
                else{
                    var integ=0;
                    while(wordsArr.slice(word, word+integ).join().length<wrapVars[0]){
                        integ++;
                    }
                    lineLengths.push(wordsArr.slice(word, word+integ-1).join().length);
                    word+=integ-1;
                }
            }
            // now we have the variable lineLengths
            // this is an array holding all the wrapped line lengths
            //
            //use variable 'integ' to figure out 
            //what line the cursor is on
            integ=0;
            var totalCharacters=lineLengths[0];
            while(totalCharacters<pos.col){
                integ++;
                totalCharacters+=lineLengths[integ]+1;
            }
            // totalCharacters now equals
            // all character up to and including
            // current line (integ) including spaces
            if(pos.row==0 && integ==0){
				pos.col=anch.col=0;
				return;
			}
            //if this is the first line in a block of wrapped text
            if(integ==0){
                if(checkSpell)ajaxSpell(pos.row);
                var prevLineType = lines[pos.row-1][1];
                if (prevLineType==0)var newWrapVars=WrapVariableArray[0];
                else if(prevLineType==1) var newWrapVars = WrapVariableArray[1];
                else if(prevLineType==2) var newWrapVars = WrapVariableArray[2];
                else if(prevLineType==3) var newWrapVars = WrapVariableArray[3];
                else if(prevLineType==4) var newWrapVars = WrapVariableArray[4];
                else if(prevLineType==5) var newWrapVars = WrapVariableArray[5];
                // If the previous line (the one we're jumping into)
                // has only one line, don't run the calcs, just go to it
                if(lines[pos.row-1][0].length<newWrapVars[0]){
                    pos.row--;
                    if(pos.col>lines[pos.row][0].length)pos.col=lines[pos.row][0].length;
                }
                else{
                    var wordsArr = lines[pos.row-1][0].split(' ');
                    var word = 0;
                    var lineLengths=[];
                    while(word<wordsArr.length){
						if(wordsArr[word].length>=wrapVars[0]){
							lineLengths.push(wordsArr[word].length)
							word++;
						}
                        else if(wordsArr.slice(word).join().length<=wrapVars[0]){
                            lineLengths.push(wordsArr.slice(word).join().length);
                            word=wordsArr.length
                            
                        }
                        else{
                            var integ = 0;
                            while(wordsArr.slice(word, word+integ).join().length<wrapVars[0]){
                                integ++;
                            }
                            lineLengths.push(wordsArr.slice(word, word+integ-1).join().length);
                            word+=integ-1;
                        }
                    // now we have the variable lineLengths
                    // this is an array holding all the wrapped line lengths
                    }
                    pos.row--;
                    pos.col+=lines[pos.row][0].length-lineLengths[lineLengths.length-1];
                    if(pos.col>lines[pos.row][0].length)pos.col = lines[pos.row][0].length;
                    
                }
            }
            // if this is some middle line in a block of wrapped text
            else{
                pos.col-=lineLengths[integ-1]+1;
                if(pos.col>(totalCharacters-lineLengths[integ]-1))pos.col=totalCharacters-lineLengths[integ]-1;
            }
        }
        //if the current block does
        //not have wrapped text
        else{
            if(pos.row==0){
                pos.col=0;
            }
            else{
                if(checkSpell)ajaxSpell(pos.row);
                var prevLineType = lines[pos.row-1][1];
                if (prevLineType==0)var newWrapVars=WrapVariableArray[0];
                else if(prevLineType==1) var newWrapVars = WrapVariableArray[1];
                else if(prevLineType==2) var newWrapVars = WrapVariableArray[2];
                else if(prevLineType==3) var newWrapVars = WrapVariableArray[3];
                else if(prevLineType==4) var newWrapVars = WrapVariableArray[4];
                else if(prevLineType==5) var newWrapVars = WrapVariableArray[5];
                // If the previous line (the one we're jumping into)
                // has only one line, don't run the calcs, just go to it
                if(lines[pos.row-1][0].length<newWrapVars[0]){
                    pos.row--;
                    if(pos.col>lines[pos.row][0].length)pos.col=lines[pos.row][0].length;
                }
                //if the previous line has wrapped text
                //do crazy calcs to figure where to
                // jump to
                else{
                    var wordsArr = lines[pos.row-1][0].split(' ');
                    var word = 0;
                    var lineLengths=[];
                    while(word<wordsArr.length){
						if(wordsArr[word].length>=wrapVars[0]){
							lineLengths.push(wordsArr[word].length)
							word++;
						}
                        else if(wordsArr.slice(word).join().length<=wrapVars[0]){
                            lineLengths.push(wordsArr.slice(word).join().length);
                            word=wordsArr.length
                            
                        }
                        else{
                            var integ = 0;
                            while(wordsArr.slice(word, word+integ).join().length<wrapVars[0]){
                                integ++;
                            }
                            lineLengths.push(wordsArr.slice(word, word+integ-1).join().length);
                            word+=integ-1;
                        }
                    // now we have the variable lineLengths
                    // this is an array holding all the wrapped line lengths
                    }
                    pos.row--;
                    pos.col+=lines[pos.row][0].length-lineLengths[lineLengths.length-1];
                    if(pos.col>lines[pos.row][0].length)pos.col = lines[pos.row][0].length;
                }
            }
        }
        if(!e.shiftKey){
            anch.col=pos.col;
            anch.row=pos.row;
        }
		if(ud<0)paint(false,false,false);
    }
	else if(document.getElementById('suggestBox')!=null){
		googSuggestMenu.highlightPrevious();
	}
}
	
function downArrow(e){
    if(typeToScript && document.getElementById('suggestBox')==null){
        if(pos.row==lines.length-1 && pos.col==lines[pos.row][0].length)return;
        var type = lines[pos.row][1];
        if (type==0)var wrapVars=WrapVariableArray[0];
        else if(type==1) var wrapVars = WrapVariableArray[1];
        else if(type==2) var wrapVars = WrapVariableArray[2];
        else if(type==3) var wrapVars = WrapVariableArray[3];
        else if(type==4) var wrapVars = WrapVariableArray[4];
        else if(type==5) var wrapVars = WrapVariableArray[5];
        if (lines[pos.row][0].length>wrapVars[0]){
            var wordsArr = lines[pos.row][0].split(' ');
            var word = 0;
            var lineLengths=[];
            while(word<wordsArr.length){
				if(wordsArr[word].length>=wrapVars[0]){
					lineLengths.push(wordsArr[word].length)
					word++;
				}
                else if(wordsArr.slice(word).join().length<=wrapVars[0]){
                    lineLengths.push(wordsArr.slice(word).join().length);
                    word=wordsArr.length
                    
                }
                else{
                    var integ = 0;
                    while(wordsArr.slice(word, word+integ).join().length<wrapVars[0]){
                        integ++;
                    }
                    lineLengths.push(wordsArr.slice(word, word+integ-1).join().length);
                    word+=integ-1;
                }
            }
            //use variable 'integ' to figure out 
            //what line the cursor is on
            integ=0;
            var totalCharacters=lineLengths[0];
            while(totalCharacters<pos.col){
                integ++;
                totalCharacters+=lineLengths[integ]+1;
            }
            //if this is the last line in a block of wrapped text
            if(integ+1==lineLengths.length){
                if(checkSpell)ajaxSpell(pos.row);
                for(var newinteg=0; newinteg<lineLengths.length-1;newinteg++){
                    pos.col-=lineLengths[newinteg];
                }
                pos.col--;
                pos.row++;
                if(pos.row>lines.length-1){
                    pos.row--;
                    pos.col=lines[pos.row][0].length;
                }
                if(pos.col>lines[pos.row][0].length)pos.col=lines[pos.row][0].length;
            }
            // if this is some middle line in a block of wrapped text
            else{
                pos.col+=lineLengths[integ]+1;
                if(pos.col>(totalCharacters+lineLengths[integ+1]+1))pos.col=totalCharacters+lineLengths[integ+1]+1;
            }
        }
        else{
            if(pos.row==lines.length-1){
                pos.col=lines[pos.row][0].length;
            }
            else{
                pos.row++;
                if(pos.row>lines.length-1) pos.row=lines.length-1;
                if(pos.col>lines[pos.row][0].length)pos.col=lines[pos.row][0].length;
            }
        }
        if(!e.shiftKey){
            anch.col=pos.col;
            anch.row=pos.row;
        }
        if(ud>document.getElementById('canvas').height-50)paint(false,false,false);
    }
	else if(document.getElementById('suggestBox')!=null){
		googSuggestMenu.highlightNext();
	}
}

function leftArrow(e){
    if(typeToScript){
		var change=false;
        if(pos.row==0 && pos.col==0) return;
        if(pos.col==0){
            if(checkSpell)ajaxSpell(pos.row);
            pos.row--;
            pos.col=lines[pos.row][0].length;
			var change=true;
        }
        else{
            pos.col = pos.col-1;
        }
        
        if(!e.shiftKey){
            anch.col=pos.col;
            anch.row=pos.row;
        }
		var c =document.getElementById('suggestBox');
		if(change && c!=null)c.parentNode.removeChild(c);
    }
}
	
function rightArrow(e){
    if(typeToScript){
		var change=false;
        if(pos.col==lines[pos.row][0].length && pos.row==lines.length-1)return;
        if(pos.col==lines[pos.row][0].length){
            if(checkSpell)ajaxSpell(pos.row);
            pos.row++;
            pos.col=0;
			change=true;
        }
        else pos.col = pos.col+1;
        
        if(!e.shiftKey){
            anch.col=pos.col;
            anch.row=pos.row;
        }
		var c =document.getElementById('suggestBox');
		if(change && c!=null)c.parentNode.removeChild(c);
    }
}

function backspace(e){
	if(EOV=='viewer')return;
    if(typeToScript){
        saveTimer();
		redoQue=[];
        if(e)e.preventDefault();
        var forceCalc=false;
        var slug=false;
        if (lines[pos.row][1]==0)var slug=true;
        // simple case, one letter backspace
        if(pos.row==anch.row && pos.col==anch.col){
            if(pos.col==0 && pos.row==0) return;
            else if(lines[pos.row][1]==4 && pos.col==1){
                for(x in notes){
                    if(pos.row<notes[x][0]){
                        notes[x][0]=notes[x][0]-1;
                    }
                    else if(pos.row==notes[x][0]){
                        notes[x][1]=notes[x][1]+lines[pos.row-1][0].length;
                        notes[x][0]=notes[x][0]-1;
                    }
                    if (notes[x][1]<0)notes[x][1]=0;
                }
                var j=lines[pos.row][0];
                if(j.charAt(0)=='(')j=j.substr(1);
                if(j.charAt(j.length-1)==')')j=j.slice(0,-1);
                var newPos = lines[pos.row-1][0].length;
                lines.splice(pos.row,1);
                pos.row--
                pos.col=newPos;
                lines[pos.row][0]=lines[pos.row][0]+j;
                undoQue.push(['back',pos.row, pos.col,'line',4]);
                slug=true;
				if(document.getElementById('suggestBox')!=null){document.getElementById('suggestBox').parentNode.removeChild(document.getElementById('suggestBox'))};
            }
            else if(pos.col==0){
                //shift notes
                for(x in notes){
                    if(pos.row<notes[x][0]){
                        notes[x][0]=notes[x][0]-1;
                    }
                    else if(pos.row==notes[x][0]){
                        notes[x][1]=notes[x][1]+lines[pos.row-1][0].length;
                        notes[x][0]=notes[x][0]-1;
                    }
                    if (notes[x][1]<0)notes[x][1]=0;
                }
                var elem = lines[pos.row][1];
                var j = lines[pos.row][0];
                lines.splice(pos.row,1);
                var newPos = lines[pos.row-1][0].length;
                lines[pos.row-1][0] = lines[pos.row-1][0]+j;
                pos.col=newPos;
                pos.row--;
                undoQue.push(['back',pos.row, pos.col,'line',elem]);
                forceCalc=true;
                slug=true;
				if(document.getElementById('suggestBox')!=null){document.getElementById('suggestBox').parentNode.removeChild(document.getElementById('suggestBox'))};
            }
            else{
                undoQue.push(['back',pos.row, pos.col,lines[pos.row][0][pos.col-1]]);
                lines[pos.row][0] = lines[pos.row][0].slice(0,pos.col-1)+lines[pos.row][0].slice(pos.col);
                pos.col--;
                //shift notes
                for(x in notes){
                    if(pos.row==notes[x][0]){
                        if (pos.col<notes[x][1])notes[x][1]=notes[x][1]-1;
                    }
                }
            }
            anch.col=pos.col;
            anch.row=pos.row;
        }
        // This is for deleting a range
        else{
			if(document.getElementById('suggestBox')!=null){document.getElementById('suggestBox').parentNode.removeChild(document.getElementById('suggestBox'))};
            forceCalc=true;
            //put the focus after the anchor
            var switchPos =false;
            if(anch.row>pos.row)switchPos=true;
            if(anch.row==pos.row && anch.col>pos.col)switchPos=true;
            if(switchPos){
                var coor = anch.row;
                anch.row = pos.row;
                pos.row = coor;
                coor = anch.col;
                anch.col = pos.col;
                pos.col = coor;
            }
            var undoCount=0;
            while(pos.col!=anch.col || pos.row!=anch.row){
                undoCount++;
                if(lines[pos.row][1]==0)slug=true;
                if(pos.col==0){
                    //shift notes
                    for(x in notes){
                        if(pos.row<notes[x][0]){
                            notes[x][0]=notes[x][0]-1;
                        }
                        else if(pos.row==notes[x][0]){
                            notes[x][1]=notes[x][1]+lines[pos.row-1][0].length;
                            notes[x][0]=notes[x][0]-1;
                        }
                        if (notes[x][1]<0)notes[x][1]=0;
                    }
                    var elem = lines[pos.row][1];
                    var j = lines[pos.row][0];
                    lines.splice(pos.row,1);
                    var newPos = lines[pos.row-1][0].length;
                    lines[pos.row-1][0] = lines[pos.row-1][0]+j;
                    pos.col=newPos;
                    pos.row--;
                    undoQue.push(['back',pos.row, pos.col,'line',elem]);
                    slug=true;
                }
                else{
                    undoQue.push(['back',pos.row, pos.col,lines[pos.row][0][pos.col-1]]);
                    lines[pos.row][0] = lines[pos.row][0].slice(0,pos.col-1)+lines[pos.row][0].slice(pos.col);
                    pos.col--;
                    //shift notes
                    for(x in notes){
                        if(pos.row==notes[x][0]){
                            if (pos.col<notes[x][1])notes[x][1]=notes[x][1]-1;
                        }
                    }
                }
            }
            undoQue.push(['br',undoCount]);
        }
		if(forceCalc==true){
			sceneIndex()
			paint(forceCalc,false,false);
			scroll(0)
		}
        if (slug)updateOneScene(pos.row);
		if(document.getElementById('find_div').style.display=="block")findInputKeyUp({"which":1000}, "f");
		if(document.getElementById('find_replace_div').style.display=="block")findInputKeyUp({"which":1000}, "r");
    }
}
function deleteButton(){
	if(EOV=='viewer')return;
    if(typeToScript){
    saveTimer();
	redoQue=[];
	if(document.getElementById('suggestBox')!=null){document.getElementById('suggestBox').parentNode.removeChild(document.getElementById('suggestBox'))};
        var slug=false;
        var forceCalc=false;
        if(pos.row==anch.row&&pos.col==anch.col){
            if (lines[pos.row][1]==0)var slug=true;
            if(pos.col==(lines[pos.row][0].length) && pos.row==lines.length-1) return;
            if(lines[pos.row][1]==4 && lines[pos.row][0]=='()'){
                undoQue.push(['delete',pos.row,pos.col,'line',4]);
                lines.splice(pos.row,1);
                pos.col=0;
                anch.col=0;
            }
            else if(pos.col==(lines[pos.row][0].length)){
                //shift notes
                for(x in notes){
                    if(pos.row+1==notes[x][0]){
                        notes[x][1]=notes[x][1]+lines[pos.row][0].length;
                        notes[x][0]=notes[x][0]-1;
                    }
                    else if(pos.row<notes[x][0]){
                        notes[x][0]=notes[x][0]-1;
                    }
                    
                    if (notes[x][1]<0)notes[x][1]=0;
                }
                undoQue.push(['delete',pos.row,pos.col,'line',lines[pos.row+1][1]]);
                if (lines[pos.row+1][1]==0)slug=true;
                var j = lines[pos.row+1][0];
                lines.splice((pos.row+1),1);
                lines[pos.row][0]+=j;
                forceCalc=true;
            }
            else{
                undoQue.push(['delete',pos.row,pos.col,lines[pos.row][0][pos.col]]);
                lines[pos.row][0] = lines[pos.row][0].slice(0,pos.col)+lines[pos.row][0].slice(pos.col+1);
                //shift notes
                for(x in notes){
                    if(pos.row==notes[x][0]){
                        if (pos.col<notes[x][1])notes[x][1]=notes[x][1]-1;
                    }
                }
            }
        }
        // This is for deleting a range
        else{
            forceCalc=true;
            //put the focus after the anchor
            var switchPos =false;
            if(anch.row>pos.row)switchPos=true;
            if(anch.row==pos.row && anch.col>pos.col)switchPos=true;
            if(switchPos){
                var coor = anch.row;
                anch.row = pos.row;
                pos.row = coor;
                coor = anch.col;
                anch.col = pos.col;
                pos.col = coor;
            }
            var undoCount=0;
            while(pos.col!=anch.col || pos.row!=anch.row){
                undoCount++;
                if(lines[pos.row][1]==0)slug=true;
                if(pos.col==0){
                    //shift notes
                    for(x in notes){
                        if(pos.row+1==notes[x][0]){
                            notes[x][1]=notes[x][1]+lines[pos.row][0].length;
                            notes[x][0]=notes[x][0]-1;
                        }
                        else if(pos.row<notes[x][0]){
                            notes[x][0]=notes[x][0]-1;
                        }
                        
                        if (notes[x][1]<0)notes[x][1]=0;
                    }
                    undoQue.push(['delete',pos.row-1,lines[pos.row-1][0].length,'line',lines[pos.row][1]]);
                    var j = lines[pos.row][0];
                    lines.splice(pos.row,1);
                    var newPos = lines[pos.row-1][0].length;
                    lines[pos.row-1][0] = lines[pos.row-1][0]+j;
                    pos.col=newPos;
                    pos.row--;
                    slug=true;
                }
                else{
                    undoQue.push(['delete',pos.row,pos.col,lines[pos.row][0][pos.col-1]]);
                    lines[pos.row][0] = lines[pos.row][0].slice(0,pos.col-1)+lines[pos.row][0].slice(pos.col);
                    pos.col--;
                    //shift notes
                    for(x in notes){
                        if(pos.row==notes[x][0]){
                            if (pos.col<notes[x][1])notes[x][1]=notes[x][1]-1;
                        }
                    }
                }
            }
            undoQue.push(['dr',undoCount]);
        }
        if(forceCalc==true){
			sceneIndex();
			paint(forceCalc,false,false);
			scroll(0);
		}
        if (slug)updateOneScene(pos.row);
    if(document.getElementById('find_div').style.display=="block")findInputKeyUp({"which":1000}, "f");
	if(document.getElementById('find_replace_div').style.display=="block")findInputKeyUp({"which":1000}, "r");
	}
}
	
function enter(){
	if(EOV=='viewer')return;
    if(typeToScript && document.getElementById('suggestBox')==null){
        saveTimer();
        if(checkSpell)ajaxSpell(pos.row);
        lines[pos.row][0]=lines[pos.row][0].replace(/\s+$/,"");
        //shift notes
        for(x in notes){
            if(pos.row<notes[x][0]){
                notes[x][0]=notes[x][0]+1;
            }
            if(pos.row==notes[x][0] && pos.col<notes[x][1]){
                notes[x][1]=notes[x][1]-pos.col;
                notes[x][0]=notes[x][0]+1;
            }
        }
        undoQue.push(['enter', pos.row, pos.col]);
		redoQue=[];
        if(lines[pos.row][1]==2)characterIndex(lines[pos.row][0]);
            
        var j = lines[pos.row][0].slice(0,pos.col);
        var k = lines[pos.row][0].slice(pos.col);
        lines[pos.row][0] = j;
        if (lines[pos.row][1] == 0)var newElem = 1;
        else if (lines[pos.row][1] == 1)var newElem = 2;
        else if (lines[pos.row][1] == 2)var newElem = 3;
        else if (lines[pos.row][1] == 4)var newElem = 3;
        else if (lines[pos.row][1] == 3)var newElem = 2;
        else if (lines[pos.row][1] == 5)var newElem = 0;
        var newArr = [k,newElem];
        lines.splice(pos.row+1,0,newArr);
        pos.row++;
        pos.col=0;
        anch.row=pos.row;
        anch.col=pos.col;
		if(document.getElementById('find_div').style.display=="block")findInputKeyUp({"which":1000}, "f");
		if(document.getElementById('find_replace_div').style.display=="block")findInputKeyUp({"which":1000}, "r");
        paint(true,'enter', false);
        paint(false,'enter',false);
    }
	else if(document.getElementById('suggestBox')!=null){
        saveTimer();
        var len = lines[pos.row][0].length;
		var txt = googSuggestMenu.getHighlighted().getCaption();
		lines[pos.row][0]= txt;
        undoQue.push(['paste', pos.row, pos.col, lines[pos.row][0].substr(len)]);
		document.getElementById('suggestBox').parentNode.removeChild(document.getElementById('suggestBox'));
		pos.col=anch.col=lines[pos.row][0].length;
	}
    sceneIndex();
	if(document.getElementById('find_div').style.display=="block")findInputKeyUp({"which":1000}, "f");
	if(document.getElementById('find_replace_div').style.display=="block")findInputKeyUp({"which":1000}, "r");
}

function tab(){
	if(EOV=='viewer')return;
	if(typeToScript){
		if(document.getElementById('suggestBox')!=null){document.getElementById('suggestBox').parentNode.removeChild(document.getElementById('suggestBox'))};
	    saveTimer();
	    undoQue.push(['format',pos.row,pos.col,lines[pos.row][1], 'tab']);
	    redoQue=[];
	    var slug=false;
	    if (lines[pos.row][1]==0)var slug=true;
		var type = lines[pos.row][1];
		if (type==1){
	        lines[pos.row][1]=0;
	        slug=true;
	    }
		else if (type==0)lines[pos.row][1]=2;
		else if (type==2)lines[pos.row][1]=1;
		else if (type==3)lines[pos.row][1]=4;
		else if (type==4)lines[pos.row][1]=3;
		else if (type==5){
	        lines[pos.row][1]=0;
	        slug=true;
	    }
	    if(slug)sceneIndex();
		slug=null;
	    if(lines[pos.row][1]==4){
	        if(lines[pos.row][0].charAt(0)!='('){
	            lines[pos.row][0]='('+lines[pos.row][0];
	            pos.col++;
	            anch.col++;
	        }
	        if(lines[pos.row][0].charAt(lines[pos.row][0].length-1)!=')')lines[pos.row][0]=lines[pos.row][0]+')';
	    }
	    if(lines[pos.row][1]==3){
	        if(lines[pos.row][0].charAt(0)=='('){
	            lines[pos.row][0]=lines[pos.row][0].substr(1);
	            pos.col--;
	            anch.col--;
	        }
	        if(lines[pos.row][0].charAt(lines[pos.row][0].length-1)==')')lines[pos.row][0]=lines[pos.row][0].slice(0,-1);
	    }
	}
}
	
function handlekeypress(e) {
	if(EOV=='viewer')return;
	//console.log(e.keyCode)
	if (findForcePaint)return;
	if((e.keyCode>=48 && e.keyCode<=90) || (e.keyCode>=96 && e.keyCode<=111) || (e.keyCode>=187 && e.keyCode<=222) || e.keyCode==32 || e.keyCode==186){
    	if(typeToScript && !commandDownBool){
	        e.preventDefault();
			redoQue=[];
	        var d= new Date();
	        milli = d.getMilliseconds();
	        d=null;
	        if (e.which!=13 && e.which!=37 && e.which!=0 && e.which!=8){
	            if(pos.row!=anch.row || pos.col!=anch.col)deleteButton();
	            undoQue.push([String.fromCharCode(e.charCode), pos.row, pos.col]);
	            lines[pos.row][0] = lines[pos.row][0].slice(0,pos.col) + String.fromCharCode(e.charCode) +lines[pos.row][0].slice(pos.col);
	            pos.col++;
	            if (lines[pos.row][1]==0)updateOneScene(pos.row);
				if (lines[pos.row][1]==2){
					createSuggestBox('c');
				}
	            if(lines[pos.row][1]==0){
	                createSuggestBox('s');
	            }
	            //shift notes
	            for(x in notes){
	                if(pos.row==notes[x][0]){
	                    if (pos.col-1<=notes[x][1])notes[x][1]=notes[x][1]+1;
	                }
	            }
	            saveTimer();
	            anch.col=pos.col;
	            anch.row=pos.row;
	        }
			if(document.getElementById('find_div').style.display=="block")findInputKeyUp({"which":1000}, "f");
	        if(document.getElementById('find_replace_div').style.display=="block")findInputKeyUp({"which":1000}, "r");
		
	        document.getElementById('ccp').focus();
	        document.getElementById('ccp').select();
	    }
	}
}

// Managining arrays
// calcing data
function undo(){
	if(EOV=='viewer')return;
    saveTimer();
    if (undoQue.length==0)return;
	var forceCalc = false;
    var dir = undoQue.pop();
	var tmp=[];
	for(x in dir){
		tmp.push(dir[x]);
	}
    redoQue.push(tmp);
    if(dir[0]=='enter'){
        var j = lines[dir[1]+1][0];
        lines.splice((dir[1]+1),1);
        if(lines[dir[1]][1]==4 && lines[dir[1]][0].charAt(lines[dir[1]][0].length-1)==')')lines[dir[1]][0]=lines[dir[1]][0].slice(0,-1);
        lines[dir[1]][0]+=j;
        forceCalc=true;
    }
    else if(dir[0]=='back'){
        if(dir[3]=='line'){
            //shift notes
            for(x in notes){
                if(dir[1]==notes[x][0]){
                    if (dir[2]<=notes[x][1]){
                        notes[x][0]=notes[x][0]+1;
                        notes[x][1]=notes[x][1]-dir[2];
                    }
                }
                else if(dir[1]<notes[x][0])notes[x][0]=notes[x][0]+1;
            }
            var j = lines[dir[1]][0].slice(0,dir[2]);
            var k = lines[dir[1]][0].slice(dir[2]);
            if(dir[4]==3 && k.charAt(k.length-1)==')')k=k.slice(0,-1);
            lines[dir[1]][0] = j;
            var newArr = [k,dir[4]];
            lines.splice(dir[1]+1,0,newArr);
            dir[1]=dir[1]+1;
            dir[2]=0;
            forceCalc=true;
        }
        else{
            lines[dir[1]][0] = lines[dir[1]][0].slice(0,dir[2]-1) + dir[3] +lines[dir[1]][0].slice(dir[2]-1);
			if (lines[dir[1]][1]==0)updateOneScene(dir[1]);
            //shift notes
            for(x in notes){
                if(dir[1]==notes[x][0]){
                    if (dir[2]<=notes[x][1])notes[x][1]=notes[x][1]+1;
                }
            }
        }
    }
    else if(dir[0]=='delete'){
        if(dir[3]=='line'){
            var j = lines[dir[1]][0].slice(0,dir[2]);
            var k = lines[dir[1]][0].slice(dir[2]);
            if(dir[4]==3 && k.charAt(k.length-1)==')')k=k.slice(0,-1);
            lines[dir[1]][0] = j;
            var newArr = [k,dir[4]];
            lines.splice(dir[1]+1,0,newArr);
            forceCalc=true;
        }
        else{
            lines[dir[1]][0] = lines[dir[1]][0].slice(0,dir[2]) + dir[3] +lines[dir[1]][0].slice(dir[2]);
			if (lines[dir[1]][1]==0)updateOneScene(dir[1]);
        }
    }
    else if(dir[0]=='format'){
        lines[dir[1]][1]=dir[3];
        if(lines[dir[1]][0].charAt(0)=='(')lines[dir[1]][0]=lines[dir[1]][0].substr(1);
        if(lines[dir[1]][0].charAt(lines[dir[1]][0].length-1)==')')lines[dir[1]][0]=lines[dir[1]][0].slice(0,-1);
		forceCalc = true;
    }
    else if(dir[0]=='br' || dir[0]=="dr"){
        var n=dir[1];
        for(var i=0; i<n; i++){
            var dir = undoQue.pop();
			tmp=[];
			for(x in dir){
				tmp.push(dir[x]);
			}
            redoQue.splice(redoQue.length-1,0,tmp);
            if(dir[3]=='line'){
                var j = lines[dir[1]][0].slice(0,dir[2]);
                var k = lines[dir[1]][0].slice(dir[2]);
                if(dir[4]==3 && k.charAt(k.length-1)==')')k=k.slice(0,-1);
                lines[dir[1]][0] = j;
                var newArr = [k,dir[4]];
                lines.splice(dir[1]+1,0,newArr);
                dir[1]=dir[1]+1;
                dir[2]=0;
                forceCalc=true;
            }
            else{
                lines[dir[1]][0] = lines[dir[1]][0].slice(0,dir[2]-1) + dir[3] +lines[dir[1]][0].slice(dir[2]-1);
				if (lines[dir[1]][1]==0)updateOneScene(dir[1]);
            }
        }
    }
    else if(dir[0]=='paste'){
        // if string and not json
        if(dir[3][0]!='[' && dir[3][1]!='['){
            lines[dir[1]][0]=lines[dir[1]][0].slice(0, dir[2])+lines[dir[1]][0].slice(dir[2]+dir[3].length);
			if (lines[dir[1]][1]==0)updateOneScene(dir[1]);
        }
        // if json
        else{
			forceCalc = true
            var d=JSON.parse(dir[3]);
            //if did not text to first line at paste
            if(dir[4]==0){
                lines.splice(dir[1]+1,d.length);
                //if deleted extra blank line from bad programing
                if(dir[5]==1){
                    lines[dir[1]][0]=lines[dir[1]][0]+lines[dir[1]+1][0];
                    lines.splice(dir[1]+1,1);
                }
            }
            //iff added text to first line at paste
            else{
                lines[dir[1]][0]=lines[dir[1]][0].slice(0,dir[2]);
                lines.splice(dir[1]+1,d.length-1);
                //if deleted extra blank line from bad programing
                if(dir[5]==1){
                    lines[dir[1]][0]=lines[dir[1]][0]+lines[dir[1]+1][0];
                    lines.splice(dir[1]+1,1);
                }
            }
            
        }
    }
    else{
        lines[dir[1]][0] = lines[dir[1]][0].slice(0,dir[2])+lines[dir[1]][0].slice(dir[2]+1);
        if(lines[dir[1]][1]==4 && lines[dir[1]][0][dir[2]-1]==')'){
            lines[dir[1]][0] = lines[dir[1]][0].slice(0,dir[2])+lines[dir[1]][0].slice(dir[2]+1);
            dir[2]=dir[2]-1;
        }
		if (lines[dir[1]][1]==0)updateOneScene(dir[1]);
        //shift notes
        for(x in notes){
            if(dir[1]==notes[x][0]){
                if (dir[2]<notes[x][1])notes[x][1]=notes[x][1]-1;
            }
        }
    }
    pos.row=dir[1];
    pos.col=dir[2];
    anch.row = pos.row;
    anch.col=pos.col;
	if (forceCalc == true){
		sceneIndex();
		paint(true,false,false);
		scroll(0)
    }
}
function redo(){
	if(EOV=='viewer')return;
    saveTimer();
    if (redoQue.length==0)return;
	var forceCalc=false;
    var dir = redoQue.pop();
	var tmp =[];
	for (x in dir){
		tmp.push(dir[x]);
	}
    undoQue.push(tmp);
    var forceCalc=false;
    if(dir[0]=='enter'){
        var j = lines[dir[1]][0].slice(0,dir[2]);
        var k = lines[dir[1]][0].slice(dir[2]);
        lines[dir[1]][0] = j;
        if (lines[dir[1]][1] == 0)var newElem = 1;
        else if (lines[dir[1]][1] == 1)var newElem = 2;
        else if (lines[dir[1]][1] == 2)var newElem = 3;
        else if (lines[dir[1]][1] == 4)var newElem = 3;
        else if (lines[dir[1]][1] == 3)var newElem = 2;
        else if (lines[dir[1]][1] == 5)var newElem = 0;
        var newArr = [k,newElem];
        lines.splice(dir[1]+1,0,newArr);
		dir[1]=dir[1]+1;
		dir[2]=0;
		forceCalc=true;
    }
    else if(dir[0]=='back'){
        if(dir[3]!='line'){
            lines[dir[1]][0] = lines[dir[1]][0].slice(0,dir[2]-1)+lines[dir[1]][0].slice(dir[2]);
            dir[2]=dir[2]-1;
			if (lines[dir[1]][1]==0)updateOneScene(dir[1]);
        }
        else{
            var j = lines[dir[1]+1][0];
            lines.splice(dir[1]+1,1);
            lines[dir[1]][0] = lines[dir[1]][0]+j;
			forceCalc=true;
        }
    }
    else if(dir[0]=='delete'){
		if(dir[3]!='line'){
			lines[dir[1]][0] = lines[dir[1]][0].slice(0,dir[2])+lines[dir[1]][0].slice(dir[2]+1);
			if (lines[dir[1]][1]==0)updateOneScene(dir[1]);
		}
		else{
			var j =lines[dir[1]+1][0];
			lines.splice(dir[1]+1,1);
			lines[dir[1]][0]=lines[dir[1]][0]+j;
		}
    }
    else if(dir[0]=='format'){
		if (dir[4]!='tab'){
			lines[dir[1]][1]=dir[4];
		}
		else{
			var j = dir[3];
			if (j==0) lines[dir[1]][1]=2;
			else if(j==1)lines[dir[1]][1]=0;
			else if(j==2)lines[dir[1]][1]=1;
			else if(j==3)lines[dir[1]][1]=4;
			else if(j==4)lines[dir[1]][1]=3;
			else if(j==5)lines[dir[1]][1]=0;
		}
		forceCalc=true;
    }
    else if(dir[0]=='br'){
		var n=dir[1];
        for(var i=0; i<n; i++){
            var dir = redoQue.pop();
			tmp=[];
			for(x in dir){
				tmp.push(dir[x]);
			}
            undoQue.splice(undoQue.length-1,0,tmp);
            if(dir[3]=='line'){
				var j=lines[dir[1]+1][0]
				lines.splice(dir[1]+1,1);
				lines[dir[1]][0]=lines[dir[1]][0]+j;
				forceCalc=true;
			}
			else{
				lines[dir[1]][0]=lines[dir[1]][0].slice(0,dir[2]-1)+lines[dir[1]][0].slice(dir[2]);
				if (lines[dir[1]][1]==0)updateOneScene(dir[1]);
			}
		}
		dir[2]=dir[2]-1;
    }
    else if(dir[0]=='dr'){
		var n=dir[1];
        for(var i=0; i<n; i++){
            var dir = redoQue.pop();
			tmp=[];
			for(x in dir){
				tmp.push(dir[x]);
			}
            undoQue.splice(undoQue.length-1,0,tmp);
            if(dir[3]=='line'){
				var j=lines[dir[1]+1][0]
				lines.splice(dir[1]+1,1);
				lines[dir[1]][0]=lines[dir[1]][0]+j;
				forceCalc=true;
			}
			else{
				lines[dir[1]][0]=lines[dir[1]][0].slice(0,dir[2]-1)+lines[dir[1]][0].slice(dir[2]);
				if (lines[dir[1]][1]==0)updateOneScene(dir[1]);
			}
		}
		dir[2]=dir[2]-1;
    }
    else if(dir[0]=='paste'){
        //for single line, no json
        if(dir[3][0]!='[' && dir[3][1]!='['){
            lines[dir[1]][0]=lines[dir[1]][0].slice(0, dir[2])+dir[3]+lines[dir[1]][0].slice(dir[2]);
			if (lines[dir[1]][1]==0)updateOneScene(dir[1]);
        }
        //for json
        else{
			forceCalc=true;
            var arr=JSON.parse(dir[3]);
            if (lines[dir[1]][0]==''){
                lines[dir[1]][1]=arr[0][1];
            }
            if (lines[dir[1]][1]==arr[0][1]){
                var tmp=[lines[dir[1]][0].slice(dir[2]), lines[dir[1]][1]];
                lines[dir[1]][0]=lines[dir[1]][0].slice(0,dir[2])+arr[0][0];
                var i=1;
                var p=dir[1]+1;
                while(i<arr.length){
                    lines.splice(p,0,arr[i]);
                    p++;
                    i++;
                }
                lines.splice(p,0,tmp);
                if(lines[p][0]=='' || lines[p][0]==' '){
                    lines.splice(p,1);
                }
            }
            else{
                var tmp=[lines[dir[1]][0].slice(dir[2]), lines[dir[1]][1]];
                lines[dir[1]][0]=lines[dir[1]][0].slice(0,dir[2]);
                dir[1]++;
                lines.splice(dir[1],0,arr[0]);
                var i=1;
                var p=dir[1]+1;
                while(i<arr.length){
                    lines.splice(p,0,arr[i]);
                    p++;
                    i++;
                }
                lines.splice(p,0,tmp);
                if(lines[p][0]=='' || lines[p][0]==' '){
                    lines.splice(p,1);
                }
            }
        }
        
    }
    else{
        lines[dir[1]][0] = lines[dir[1]][0].slice(0,dir[2]) + dir[0] +lines[dir[1]][0].slice(dir[2]);
        dir[2]=dir[2]+1;
		if (lines[dir[1]][1]==0)updateOneScene(dir[1]);
    }
    if (forceCalc == true){
		sceneIndex();
		paint(true,false,false);
		scroll(0)
    }
}



function pagination(){
    pageBreaks = [];
    i = 0;
    var r=0;
    while(i<lines.length){
        lineCount = r;
        while(lineCount+linesNLB[i].length<56){
            lineCount+=linesNLB[i].length;
            i++;
            if (i==lines.length){
                return;
            }
        }
        var s=0;
        r=0;
        if(lines[i][1]==3 && lineCount<54 && lineCount+linesNLB[i].length>57){
            s=55-lineCount;
            r=1-s;
            lineCount=56;
        }
        else if(lines[i][1]==3 && lineCount<54 && linesNLB[i].length>4){
            s=linesNLB[i].length-3;
            r=1-s;
            lineCount=55;
        }
        else if(lines[i][1]==1 && lineCount<55 && lineCount+linesNLB[i].length>57){
            s=55-lineCount;
            r=1-s;
            lineCount=56;
        }
        else if(lines[i][1]==1 && lineCount<55 && linesNLB[i].length>4){
            s=linesNLB[i].length-3;
            r=1-s;
            lineCount=55;
        }
        else{
            while(lines[i-1][1]==0 || lines[i-1][1]==2 || lines[i-1][1]==4){
                i--;
                lineCount-=linesNLB[i].length;
            }
        }
        pageBreaks.push([i, lineCount, s]);
    }
}

function characterInit(){
    for(var i=0; i<lines.length;i++){
        if (lines[i][1]==2){
            characterIndex(lines[i][0]);
        }
    }
}
function characterIndex(v){
    var chara = v.toUpperCase().replace(/\s+$/,"");
    var found=false;
    for(var i=0;i<characters.length;i++){
        if(characters[i][0]==chara){
            characters[i][1]=characters[i][1]+1;
            found=true;
        }
    }
    if (!found){
        characters.push([chara,1]);
    }
	found=chara=i=null;
}
function sceneIndex(){
    scenes=[];
    var num = 0;
    for (var i=0; i<lines.length; i++){
        if(lines[i][1]==0){
            num++;
			var tooltip="";
			if (i!=lines.length-1){
				tooltip=lines[i+1][0];
				if((lines[i+1][1]==2 || lines[i+1][1]==5) && i!=lines.length-2){
					tooltip+=" "+lines[i+2][0];
				}
				
			}
            scenes.push([String(num)+') '+lines[i][0].toUpperCase(), i, tooltip]);
			tooltip=null;
        }
    }
    goog.dom.removeChildren(goog.dom.getElement('sceneBox'));
    for (var i=0; i<scenes.length; i++){
        var elem = document.getElementById('sceneBox').appendChild(document.createElement('p'))
        elem.appendChild(document.createTextNode(scenes[i][0]));
        elem.className='sceneItem';
        elem.id="row"+scenes[i][1];
		elem.title=scenes[i][2];
		goog.events.listen(elem, goog.events.EventType.CLICK, jumpTo);
		goog.events.listen(elem, goog.events.EventType.MOUSEOVER, function(e){this.style.backgroundColor="#ccccff"});
		goog.events.listen(elem, goog.events.EventType.MOUSEOUT, function(e){this.style.backgroundColor="white"});
		elem=null;
    }
	c=i=num=null;
}
function updateOneScene(v){
	try{
		var d = document.getElementById("row"+v);	
		var num = d.innerHTML.split(")")[0];
		d.removeChild(d.firstChild);
		d.appendChild(document.createTextNode(num+") "+lines[v][0].toUpperCase()));
	}
	catch(e){};
}
//notes
function sortNotes(a,b){
    if (a[0]<b[0]) return -1;
    if (a[0]>b[0]) return 1;
    if (a[1]<b[1]) return -1;
    if (a[1]>b[1]) return 1;
    return 0;
}
function sortNotesCol(a,b){
    if (a[1]<b[1]) return -1;
    if (a[1]>b[1]) return 1;
    return 0;
}
function noteIndex(){
    notes.sort(sortNotes);
	var c = goog.dom.getElement('noteBox')
	goog.dom.removeChildren(c);
	for (x in notes){
		//build box
		var newDiv=c.appendChild(document.createElement('div'));
		newDiv.className='noteListUnit';
		newDiv.id = 'noteListUnit'+notes[x][3];
		// figure out what page its on
		if(pageBreaks.length==0){var pn = 1}
		else{
			var i=0;
			while(notes[x][0]*1+1*1>pageBreaks[i][0]){
				i++;
				if(i==pageBreaks.length)break
			}
			var pn=i*1+1;
		}
		//get note snippet
		var tmpEl = goog.dom.createElement('div');
		tmpEl.innerHTML = notes[x][2][0][0];
		var snippet = goog.dom.getTextContent(tmpEl);
		if (snippet.length>80)snippet = snippet.substr(0,77)+'...';
		snippet = '"'+snippet+'"';
		// figre out reply text
		var replySpan = goog.dom.createElement('span');
		if(notes[x][2].length==2){
			replySpan.appendChild(goog.dom.createTextNode('1 Reply'));
		}
		else if(notes[x][2].length>2){
			replySpan.appendChild(goog.dom.createTextNode((notes[x][2].length*1-1)+' Replies'));
		}
		//figure out how many new replies
		var r = 0;
		for (y in notes[x][2]){
			if(String(notes[x][2][y][3])=='0')r++;
		}
		var newReplySpan = goog.dom.createElement('span');
		newReplySpan.style.color = 'red';
		if(r!=0)newReplySpan.appendChild(goog.dom.createTextNode("("+r+" New)"))
		//build table
		var table = newDiv.appendChild(document.createElement('table'));
		table.style.fontFamily='sans-serif';
		table.width='100%';
		var tr = table.appendChild(document.createElement('tr'));
		var td = tr.appendChild(document.createElement('td'));
		td.appendChild(goog.dom.createTextNode('Page '+pn+' -'));
		td.width='23%';
		td.vAlign='top';
		tr.appendChild(document.createElement('td')).appendChild(goog.dom.createTextNode(snippet));
		tr = table.appendChild(document.createElement('tr'));
		tr.appendChild(document.createElement('td')).appendChild(replySpan);
		tr.appendChild(document.createElement('td')).appendChild(newReplySpan);
		goog.events.listen(newDiv, goog.events.EventType.CLICK, function(e){
			var el = e.target;
			while(el.className!='noteListUnit')el=el.parentNode;
			var id = parseInt(el.id.replace('noteListUnit',''));
			for(i in notes){
				if (notes[i][3]==id){
					var row = notes[i][0];
					var col = notes[i][1];
					pos.row=anch.row=row;
					pos.col=anch.col=col;
				}
			}
			jumpTo('find'+row);
			notesDialog(e, false, false, false)
		});
	}
    typeToScript=true;
	x=i=null;
}
function notesDialog(e, id, top, left){
	if (e){
		var c = e.target;
		while(c.nodeName!='DIV')c=c.parentNode;
		var id = parseInt(c.id.replace('noteListUnit',""));
	}
	var c = goog.dom.getElementsByClass('modal-dialog')
	for (i in c){
		if(c[i].id=='modal-dialog'+id){
			bringDialogToFront(id);
			return;
		}
	}
	var d = new goog.ui.Dialog();
	d.setModal(false);
	d.setTitle('Notes');
	//figure out what to put in there
	var str = "";
	var user = document.getElementById('user_email').innerHTML.toLowerCase();
	for (i in notes){
		if(notes[i][3]==id){
			for(j in notes[i][2]){
				var classN = (parseInt(notes[i][2][j][3])==0 ? "noteMessageUnread' title='Click To Mark As Read'" : 'noteMessage')
				str+="<div class='"+classN+"' id='"+notes[i][2][j][2]+"' onclick='markAsRead(this)'>";
				str+="<b>"+notes[i][2][j][1].split('@')[0]+" - </b><span> </span> ";
				str+=notes[i][2][j][0];
				//edit controls
				var edit = "";
				if(notes[i][2][j][1].toLowerCase()==user){
					edit+=" <span class='noteControls' onclick='newMessage(this)'>edit</span> |"
				}
				if(notes[i][2][j][1].toLowerCase()==user || EOV=='editor'){
					edit+=" <span class='noteControls' onclick='deleteMessage(this)'>delete</span>"
				}
				if(j==0 && EOV=='editor'){
					edit+=" | <span class='noteControls' onclick='deleteThread(this)'>delete all</a>"
				}
				if(edit!=""){
					str+=" <div align='right'>"+edit+"</div>"
				}
				str+="</div>";
			}
		}
	}
	str+='<input type="button" value="Reply">';
	d.setContent(str);
	d.setButtonSet(null);
	d.setVisible(true);
	d.setDisposeOnHide(true);
	d.getDialogElement().id='modal-dialog'+id;
	if(top){
		d.getDialogElement().style.top=top;
		d.getDialogElement().style.left=left;
	}
	d.getDialogElement().style.paddingBottom='10px';
	goog.events.listen(d.getDialogElement(), goog.events.EventType.MOUSEDOWN, bringDialogToFront);
	
	var mdc = d.getContentElement();
	var reply = mdc.getElementsByTagName('input')[0];
	goog.events.listen(reply, goog.events.EventType.CLICK, newMessage);
	bringDialogToFront(id);
}
function markAsRead(e){
	var el = e;
	while(el.className!='noteMessage' && el.className!='noteMessageUnread'){el=el.parentNode}
	if(el.className=='noteMessage')return;
	var msg_id=el.id;
	while(el.className!='modal-dialog')el=el.parentNode;
	var thread_id=parseInt(el.id.replace('modal-dialog',''));
	goog.net.XhrIo.send('/notesmarkasread',
		function(){
			var anim = new goog.fx.dom.BgColorTransform(e, [250, 128, 114], [255, 255, 224], 500);
			goog.events.listen(anim, goog.fx.Animation.EventType.END, function() {
				e.className='noteMessage'
				e.removeAttribute('title');
			});
			anim.play();
			for (i in notes){
				if (notes[i][3]==thread_id){
					for(j in notes[i][2]){
						if (notes[i][2][j][2]==msg_id){
							notes[i][2][j][3]=1;
						}
					}
				}
			}
			noteIndex();
		},
		'POST',
		'resource_id='+resource_id+'&thread_id='+thread_id+'&msg_id='+escape(msg_id)
	)
}
function newThread(){
	var id=Math.round(Math.random()*1000000000);
    var found=true;
    while (found==true){
        found=false;
        for (i in notes){
            if (String(notes[i][3])==String(id)){
                id=Math.round(Math.random()*1000000000);
                found=true;
            }
        }
    }
	notes.push([pos.row, pos.col, ['temp', 'temp', 'temp'],id])
	viewNotes=true;
	paint(false,false,false);
	//set up dialog box
	var d = new goog.ui.Dialog();
	d.setModal(false);
	d.setTitle('Notes');
	d.setContent('');
	d.setButtonSet(null);
	d.setVisible(true);
	d.setDisposeOnHide(true);
	d.setHasTitleCloseButton(false);
	d.getDialogElement().id='modal-dialog'+id;
	goog.events.listen(d.getDialogElement(), goog.events.EventType.MOUSEDOWN, bringDialogToFront);
	var c = d.getContentElement();
	var tb = c.appendChild(goog.dom.createElement('div'));
	var editMe = goog.dom.createElement('div');
	editMe.id = 'editMe';
	editMe.className='messageEditBox';
	goog.dom.insertSiblingAfter(editMe, tb);
	var sb = goog.dom.createElement('input');
	sb.type='button';
	sb.value = 'Save';
	goog.dom.insertSiblingAfter(sb, editMe);
	var cb = goog.dom.createElement('input');
	cb.type='button';
	cb.value = 'Cancel';
	goog.dom.insertSiblingAfter(cb, sb);
	var myField = new goog.editor.Field('editMe');
	editMe.removeAttribute('id');
	myField.registerPlugin(new goog.editor.plugins.BasicTextFormatter());
	myField.registerPlugin(new goog.editor.plugins.RemoveFormatting());
	myField.registerPlugin(new goog.editor.plugins.UndoRedo());
	myField.registerPlugin(new goog.editor.plugins.ListTabHandler());
	myField.registerPlugin(new goog.editor.plugins.SpacesTabHandler());
	myField.registerPlugin(new goog.editor.plugins.EnterHandler());
	myField.registerPlugin(new goog.editor.plugins.HeaderFormatter());
	var buttons = [
		goog.editor.Command.BOLD,
		goog.editor.Command.ITALIC,
		goog.editor.Command.UNDERLINE,
		goog.editor.Command.FONT_COLOR,
		goog.editor.Command.FONT_SIZE,
		goog.editor.Command.UNDO,
		goog.editor.Command.REDO,
		goog.editor.Command.UNORDERED_LIST,
		goog.editor.Command.ORDERED_LIST,
		goog.editor.Command.STRIKE_THROUGH,
		goog.editor.Command.REMOVE_FORMAT
	];
	var myToolbar = goog.ui.editor.DefaultToolbar.makeToolbar(buttons,tb);
	var myToolbarController = new goog.ui.editor.ToolbarController(myField, myToolbar);
	myField.makeEditable();
	myField.focusAndPlaceCursorAtStart();
	goog.events.listen(myField, goog.events.EventType.BLUR, function(e){typeToScript=true});
	goog.events.listen(myField, goog.events.EventType.FOCUS, function(e){typeToScript=false});
	goog.events.listen(sb, goog.events.EventType.CLICK, submitNewThread);
	goog.events.listen(cb, goog.events.EventType.CLICK, cancelNewThread);
}
function cancelNewThread(){
	var el = this;
	while(el.className!='modal-dialog')el=el.parentNode;
	var id = parseInt(el.id.replace('modal-dialog',''));
	for(i in notes){
		if(notes[i][3]==id){
			notes.splice(i,1);
			break;
		}
	}
	goog.dom.removeNode(el);
}
function submitNewThread(){
	var el = this;
	while(el.className!='messageEditBox editable')el=el.previousSibling;
    var content = el.contentWindow.document.body.innerHTML;
	while(el.className!='modal-dialog')el=el.parentNode;
	var thread_id = parseInt(el.id.replace('modal-dialog', ''));
	var top = el.style.top;
	var left = el.style.left;
	goog.net.XhrIo.send('/notesnewthread',
		function(e){
			var r = e.target.getResponseJson();
			if(r[0]=='error'){
				alert("Sorry, there was a problem sending that message. Please try again later.")
			}
			else{
				var row = r[0];
				var col = r[1];
				var thread_id = r[2];
				var msg_id = r[3];
				var user = r[4];
				for (i in notes){
					if (notes[i][3]==thread_id){
						notes[i][2]=[[content, user, msg_id]];
					}
				}
				noteIndex();
				goog.dom.removeNode(el);
				notesDialog(false, thread_id, top, left);
			}
		},
		'POST',
		'fromPage=editor&resource_id='+resource_id+'&row='+pos.row+'&col='+pos.col+'&content='+escape(content)+'&thread_id='+thread_id
	);
	this.disabled = true;
	this.value = 'Saving...';
}
function newMessage(t){
    typeToScript=false;
	if (this.nodeName=='INPUT'){
		var el = this;
		var content = "";
		var id = 'new'+ new Date().getTime();
	}
	else{
		var el = t;
		while(el.className!='noteMessage' && el.className!='noteMessageUnread'){el=el.parentNode}
		while (t.nodeName!='DIV')t=t.parentNode;
		goog.dom.removeNode(t);
		var c = el.childNodes;
		for (i in c){
			if(c[i].nodeName=='B'){
				goog.dom.removeNode(c[i]);
				break;
			}
		}
		var c = el.getElementsByTagName('*');
		for (i in c){
			if(c[i].nodeName=='A')goog.dom.flattenElement(c[i])
		}
		var content = el.innerHTML;
		var id = el.id;
		var reply = el;
		while(reply.value!='Reply')reply=reply.nextSibling;
		goog.dom.removeNode(reply);
	}
	var tb = goog.dom.createElement('div')
	goog.dom.insertSiblingAfter(tb,el);
	goog.dom.removeNode(el);
	var editMe = goog.dom.createElement('div')
	editMe.className='messageEditBox';
	editMe.id = id;
	goog.dom.insertSiblingAfter(editMe, tb);
	var sb = goog.dom.createElement('input');
	sb.type='button';
	sb.value = 'Save';
	goog.dom.insertSiblingAfter(sb, editMe);
	var cb = goog.dom.createElement('input');
	cb.type='button';
	cb.value = 'Cancel';
	goog.dom.insertSiblingAfter(cb, sb);
	goog.dom.removeNode(this);
	var myField = new goog.editor.Field(id);
	myField.registerPlugin(new goog.editor.plugins.BasicTextFormatter());
	myField.registerPlugin(new goog.editor.plugins.RemoveFormatting());
	myField.registerPlugin(new goog.editor.plugins.UndoRedo());
	myField.registerPlugin(new goog.editor.plugins.ListTabHandler());
	myField.registerPlugin(new goog.editor.plugins.SpacesTabHandler());
	myField.registerPlugin(new goog.editor.plugins.EnterHandler());
	myField.registerPlugin(new goog.editor.plugins.HeaderFormatter());
	var buttons = [
		goog.editor.Command.BOLD,
		goog.editor.Command.ITALIC,
		goog.editor.Command.UNDERLINE,
		goog.editor.Command.FONT_COLOR,
		goog.editor.Command.FONT_SIZE,
		goog.editor.Command.UNDO,
		goog.editor.Command.REDO,
		goog.editor.Command.UNORDERED_LIST,
		goog.editor.Command.ORDERED_LIST,
		goog.editor.Command.STRIKE_THROUGH,
		goog.editor.Command.REMOVE_FORMAT
	];
	var myToolbar = goog.ui.editor.DefaultToolbar.makeToolbar(buttons,tb);
	var myToolbarController = new goog.ui.editor.ToolbarController(myField, myToolbar);
	myField.makeEditable();
	myField.setHtml(false, content);
	myField.focusAndPlaceCursorAtStart();
	goog.events.listen(myField, goog.events.EventType.BLUR, function(e){typeToScript=true});
	goog.events.listen(myField, goog.events.EventType.FOCUS, function(e){typeToScript=false});
	goog.events.listen(sb, goog.events.EventType.CLICK, submitMessage);
	goog.events.listen(cb, goog.events.EventType.CLICK, cancelMessage);
}

function cancelMessage(){
	var el = this;
	while(el.className!='modal-dialog'){el=el.parentNode}
	var top = el.style.top;
	var left = el.style.left;
	var id = parseInt(el.id.replace('modal-dialog',''));
	goog.dom.removeNode(el)
	typeToScript=true;
	notesDialog(false, id, top, left);
}

function submitMessage(){
	this.disabled=true;
	this.value='Saving...'
	var el = this;
	while(el.className!='messageEditBox editable')el=el.previousSibling;
	var editorBox = el;
	var content = el.contentWindow.document.body.innerHTML;
	var msg_id=el.id;
	while(el.className!='modal-dialog')el=el.parentNode;
	var thread_id=parseInt(el.id.replace('modal-dialog',''));
    var d = new Date();
	goog.net.XhrIo.send('/notessubmitmessage',
		function(e){
			try{
				var r = e.target.getResponseJson()
			}
			catch(e){
				alert("Sorry, there was a problem sending that message. Please try again later.")
				return;
			}
			if(r[0]=='error'){
				alert("Sorry, there was a problem sending that message. Please try again later.")
			}
			else{
				var new_content = r[0];
				var timestamp = r[1];
				var user = r[2];
				var thread_id = r[3];
				var top = el.style.top;
				var left = el.style.left;
				goog.dom.removeNode(el)
				for(i in notes){
					if(notes[i][3]==thread_id){
						var found = false;
						for(j in notes[i][2]){
							if(notes[i][2][j][2]==timestamp){
								notes[i][2][j][0]=new_content;
								found=true;
							}
						}
						if(!found){
							notes[i][2].push([new_content, user, timestamp])
						}
					}
				}
				noteIndex();
				notesDialog(false, thread_id, top, left)
			}
		},
		'POST',
		'resource_id='+resource_id+'&content='+escape(content)+'&thread_id='+thread_id+'&msg_id='+msg_id+'&fromPage=editor'
	);
	noteIndex();
	x=d=content=u=n=null;
}

function deleteThread(v){
	var el = v;
	while(el.className!='modal-dialog')el=el.parentNode;
	v=parseInt(el.id.replace('modal-dialog',''));
    var c = confirm("Are you sure you want to Delete this thread? This cannot be undone.");
    if(c==true){
        if(resource_id!="Demo"){
			goog.net.XhrIo.send('/notesdeletethread',
				function(e){},
				'POST',
				'resource_id='+resource_id+'&thread_id='+v
			);
        }
    for (i in notes){
        if (notes[i][3]==v)var found = i;
    }
	goog.dom.removeNode(el)
    notes.splice(found,1);
    noteIndex();
    }
}

function deleteMessage(v){
	var c = confirm("Are you sure you want to delete this message? This cannot be undone.")
	if(c==true){
		var el = v;
		while(el.className!='noteMessage' && el.className!='noteMessageUnread'){el=el.parentNode}
		var msgId = el.id;
		el.style.backgroundColor='grey';
		while(el.className!='modal-dialog'){el=el.parentNode}
		var threadId = parseInt(el.id.replace('modal-dialog',''))
		goog.net.XhrIo.send('/notesdeletemessage',
			function(e){
				var r = e.target.getResponseText();
				if (r=='deleted'){
					for(i in notes){
						if(notes[i][3]==threadId){
							for (j in notes[i][2]){
								if(notes[i][2][j][2]==msgId){
									notes[i][2].splice(j,1)
									if(notes[i][2].length==0){
										notes.splice(i,1);
										var el = goog.dom.getElement(msgId);
										while(el.className!='modal-dialog')el=el.parentNode;
										goog.dom.removeNode(el);
									}
									else{
										goog.dom.removeNode(goog.dom.getElement(msgId));
									}
								}
							}
						}
					}
					noteIndex();
				}
				else{
					msgId.style.backgroundColor='lightYellow';
					alert("There was a problem deleting that message. Please try again later.")
				}
			},
			'POST',
			'resource_id='+resource_id+'&thread_id='+threadId+'&msgId='+escape(msgId)
		);
	}
}

function bringDialogToFront(id){
	var z=0;
	var c = goog.dom.getElementsByClass('modal-dialog');
	for(i in c){
		if(c[i].nodeName=='DIV' && c[i].style.zIndex>z)z=c[i].style.zIndex*1;
	}
	if((typeof id)=='number'){var el = goog.dom.getElement('modal-dialog'+id)}
	else{var el = this}
	el.style.zIndex=z*1+1;
}

//Menu
// function to hand the file like menu

function openMenu(e){
	var v = e.target.id;
	var arr = [['file', fMenu],['edit', eMenu],['view', vMenu],['share', sMenu]];
    document.getElementById(v).style.backgroundColor='#6484df';
    document.getElementById(v).style.color='white';
    var open = 'notfound';
	var t=0;
	for (i in arr){
		if(arr[i][1].isVisible()==true){
			open=i;
			arr[open][1].setVisible(false);
		}
		if(v==arr[i][0]){t=arr[i][1];}
	}
	if (open=='notfound'){
		t.setVisible(true)
	}
	else if(arr[open][1]==t){
		t.setVisible(false)
	}
	else{
		arr[open][1].setVisible(false);
		t.setVisible(true)
	}
	
	i=null;
}

function topMenuOver(e){
	var v = e.target.id
	var arr = [['file', fMenu],['edit', eMenu],['view', vMenu],['share', sMenu]];
    var open='not open';
	for(i in arr){
		var d = goog.dom.getElement(arr[i][0]);
		d.style.backgroundColor='#A2BAE9';
        d.style.color='black';
		if(arr[i][1].isVisible())open=i;
		if(v==arr[i][0]){
			var t = arr[i][1];
			var d = goog.dom.getElement(t.id_.replace("Menu",""));
			d.style.backgroundColor='#6484df';
	        d.style.color='white';
		}
	}
	if(open!='not open'){
		arr[open][1].setVisible(false);
		t.setVisible(true)
	}
	open=i=null;
}

function topMenuOut(e){
	var v = e.target.id;
    if(document.getElementById(v+'Menu').style.display=='none'){
        document.getElementById(v).style.backgroundColor='#A2BAE9';
        document.getElementById(v).style.color='black';
    }
}

function menuSelect(e){
	var id=e.target.getId();
	if(id=='save')save(0);
    else if(id=='new'){
        if(resource_id=="Demo"){
            alert("Sorry, you'll have to login to start saving.");
        }
        else {newScriptPrompt();}
    }
    else if(id=='open'){
        if(resource_id=="Demo"){
            alert("Sorry, you'll have to login to open new scripts.");
        }
        else{openPrompt();}
    }
    else if(id=='rename')renamePrompt();
    else if(id=='exportas')exportPrompt();
    else if(id=='duplicate'){
        if(resource_id=="Demo"){
            alert("Sorry, you'll have to login to start doing that.");
            return;
        }
        else{duplicate();}
    }
    else if(id=='close')closeScript();
    //Edit
    else if(id=='undo')undo();
    else if(id=='redo')redo();
    else if(id=='insertNote'){
        viewNotes=true;
        newThread();
    }
    else if(id=='editTitlePage')window.open('/titlepage?resource_id='+resource_id);
	else if(id=='tag'){
		if(resource_id=="Demo"){
            alert("Sorry, you'll have to login to start doing that.");
            return;
        }
		else{tagPrompt();}
	}
    else if(id=='spellCheck')launchSpellCheck();
	else if(id=='find')findPrompt();
	else if(id=='findReplace')findReplacePrompt();
    //View
    else if(id=='revision'){
        if(resource_id=="Demo"){
            alert("Sorry, you'll have to login to start doing that.");
            return;
        }
        else{window.open('/revisionhistory?resource_id='+resource_id);}
    }
    else if(id=='notes'){
        viewNotes = (viewNotes ? false : true);
    }
	else if(id.substr(0,6)=='format'){
		changeFormat(parseInt(id.replace('format','')))
	}
    //Share
    else if(id=='collaborators'){
        if(resource_id=="Demo"){
            alert("Sorry, you'll have to login to start doing that.");
            return;
        }
        else{sharePrompt();}
    }
    else if(id=='email'){
        if(resource_id=="Demo"){
            alert("Sorry, you'll have to login to email scripts.");
            return;
        }
        else{emailPrompt();}
    }
	fMenu.setVisible(false)
	eMenu.setVisible(false)
	vMenu.setVisible(false)
	sMenu.setVisible(false)
	var arr=["file",'edit','view','share'];
	for(i in arr){
		var d = goog.dom.getElement(arr[i])
		d.style.backgroundColor='#A2BAE9';
        d.style.color='black';
	}
}

//menu options and stuff
// closing the window
function closeScript(){
	clearTimeout(timer);
    if(resource_id=='Demo' || EOV=='viewer'){
        self.close()
    }
    var data=JSON.stringify(lines);
    document.getElementById('saveButton').value='Saving...';
    goog.net.XhrIo.send('/save', function(d){
        self.close();
		},
		'POST',
		"data="+escape(data)+"&resource_id="+resource_id+"&autosave=0"
	);
    var arr = []
    for (i in notes){
        arr.push([notes[i][0], notes[i][1], notes[i][3]])
    }
    if(arr.length!=0){
		goog.net.XhrIo.send('/notesposition', 
			function(d){},
			'POST',
			"positions="+escape(JSON.stringify(arr))+"&resource_id="+resource_id
		);
    }
	data=arr=i=null;
}
// new script
function newScriptPrompt(){
	if(resource_id=="Demo"){
        alert("Sorry, you'll have to login to open new scripts.");
		return;
    }
    typeToScript=false;
	document.getElementById('newscriptpopup').style.visibility = 'visible';
}

function hideNewScriptPrompt(){
    typeToScript=true;
	document.getElementById('newScript').value = "";
	document.getElementById('newscriptpopup').style.visibility = 'hidden';
	document.getElementById('createScriptButton').disabled=false;
	document.getElementById('createScriptButton').value="Create";
	document.getElementById('createScriptIcon').style.visibility="hidden";
}

function createScript (){
	var filename = document.getElementById('newScript').value;
	if (filename!=''){
		document.getElementById('createScriptButton').disabled=true;
		document.getElementById('createScriptButton').value="Creating Script...";
		document.getElementById('createScriptIcon').style.visibility="visible";
		goog.net.XhrIo.send('/newscript',
			function(e){
				window.open('editor?resource_id='+e.target.getResponseText());
				hideNewScriptPrompt();
			},
			'POST',
			'filename='+escape(filename)+'&fromPage=editor'
		);
	}
}
// duplicate
function duplicate(){
	if(EOV=='viewer')return;
	goog.net.XhrIo.send('/duplicate',
		function(e){
			if(e.target.getResponseText()=='fail')return;
			else{window.open(e.target.getResponseText())}
		},
		'POST',
		'fromPage=editor&resource_id='+resource_id
	)
}
// save
goog.events.listen(goog.dom.getElement('saveError'), goog.events.EventType.CLICK, function(e){
	var n = new goog.fx.dom.FadeOut(goog.dom.getElement('saveError'), 500);
	goog.events.listen(n, goog.fx.Animation.EventType.END, function(e){
		goog.dom.getElement('saveError').style.display='none';
		goog.dom.getElement('saveError').style.opacity='100'
		
	})
	n.play()
});
function save(v){
	if(EOV=='viewer')return;
    clearTimeout(timer);
    if(resource_id=='Demo'){
        if(v==0){
            alert("Sorry, but you'll have to login to start saving scripts!");
        }
        return;
    }
    var data=JSON.stringify(lines);
    document.getElementById('saveButton').value='Saving...';
    goog.net.XhrIo.send('/save', function(d){
			if(d.target.getResponseText()=='1'){
	        	goog.dom.getElement('saveButton').value='Saved';
	        	goog.dom.getElement('saveButton').disabled=true;
				goog.dom.getElement('saveError').style.display='none';
			}
			else{
				goog.dom.getElement('saveButton').value='Save';
	        	goog.dom.getElement('saveButton').disabled=false;
				goog.dom.getElement('saveError').style.display='table';
			}
		},
		'POST',
		"data="+escape(data)+"&resource_id="+resource_id+"&autosave="+v
	);
    var arr = []
    for (i in notes){
        arr.push([notes[i][0], notes[i][1], notes[i][3]])
    }
    if(arr.length!=0){
		goog.net.XhrIo.send('/notesposition', 
			function(d){},
			'POST',
			"positions="+escape(JSON.stringify(arr))+"&resource_id="+resource_id
		);
    }
	data=arr=i=null;
}
// open other script
function openPrompt(){
    window.open("/scriptlist")
}

//rename
function renamePrompt(){
	if(EOV=='viewer')return;
    typeToScript=false;
    document.getElementById('renameTitle').innerHTML = "Rename: " + document.getElementById('title').innerHTML;
    document.getElementById('renameField').value = document.getElementById('title').innerHTML;
    document.getElementById('renamepopup').style.visibility = 'visible';
}

function hideRenamePrompt(){
	if(EOV=='viewer')return;
	document.getElementById('renameField').value = "";
	document.getElementById('renamepopup').style.visibility = 'hidden';
    typeToScript=true;
}
	
function renameScript(){
	if(EOV=='viewer')return;
	if(resource_id=="Demo"){
        alert("Sorry, you'll have to login to do that.");
        return;
    }
	var rename = document.getElementById('renameField').value;
	if (rename==""){return;}
	document.getElementById('title').innerHTML = rename;
	document.title = rename;
	goog.net.XhrIo.send('/rename', 
		function(d){},
		'POST',
		"fromPage=scriptlist&resource_id="+resource_id+"&rename="+rename
	);
	hideRenamePrompt()
}
//exporting
function exportPrompt(){
	if(resource_id!="Demo"){
        if(document.getElementById('saveButton').value=="Save")save(0);
    }
    typeToScript=false;
    document.getElementById("exportpopup").style.visibility="visible"
}
function hideExportPrompt(){
    typeToScript=true;
    document.getElementById("exportpopup").style.visibility="hidden";
}
function exportScripts(){
    if(resource_id=="Demo"){
        alert("Sorry, you'll have to login to export scripts.");
        return;
    }
    else{
        var d;
        var title="&title_page="+document.getElementById('et').selectedIndex;
        var a=document.getElementsByTagName("input");
        for(var c=0;c<a.length;c++){
            if(a[c].checked==true){
                if(a[c].className=="exportList"){
                    d=a[c].name;
                    b="/export?resource_id="+resource_id+"&export_format="+d+"&fromPage=editor"+title;
                    window.open(b)
                }
            }
        }
		d=title=a=c=null;
    }
}
// emailing
function emailPrompt(){
	if(resource_id=="Demo"){
        alert("Sorry, you'll have to login to email scripts.");
		return;
    }
    if(document.getElementById('saveButton').value=="Save")save(0);
    typeToScript=false;
    document.getElementById("emailpopup").style.visibility='visible'
}
function hideEmailPrompt(){
    document.getElementById("emailpopup").style.visibility='hidden';
    document.getElementById('recipient').value='';
    document.getElementById('message').innerHTML='';
    typeToScript=true;
}

function emailComplete(e){
	document.getElementById('emailS').disabled = false;
	document.getElementById('emailS').value = 'Send';
	if (e.target.getResponseText()=='sent'){
		alert("Email Sent")
		hideEmailPrompt();
	}
	else{
		alert("There was a problem sending your email. Please try again later.")
	}
}
function emailScript(){
	var r = goog.format.EmailAddress.parseList(goog.dom.getElement('recipient').value)
	var arr=[];
	for(i in r){
		if(r[i].address_!="")arr.push(r[i].address_);
	}
	if(arr.length==0){
		alert('You need to add at least one email address.')
		return;
	}
	var recipients = arr.join(',');
	var subject = document.getElementById('subject').value;
	if(subject=="")subject="Script";
	var body_message = document.getElementById('message').innerHTML;
	goog.net.XhrIo.send('/emailscript', 
		emailComplete,
		'POST',
		"resource_id="+resource_id+"&recipients="+recipients+"&subject="+subject+"&body_message="+escape(body_message)+"&fromPage=editor"
	);
	document.getElementById('emailS').disabled = true;
	document.getElementById('emailS').value = 'Sending...';
	c=arr=recipients=subject=body_message=null;
}

//Sharing scripts
function sharePrompt(){
	if(EOV=='viewer')return;
typeToScript=false;
    document.getElementById("sharepopup").style.visibility="visible";
}
function hideSharePrompt(){
	if(EOV=='viewer')return;
    typeToScript=true;
    document.getElementById("sharepopup").style.visibility="hidden";
    document.getElementById("collaborator").value="";
}
function removeAccess(v){
	if(EOV=='viewer')return;
    var c = confirm("Are you sure you want to remove access for this user?");
    if(c==true){
        var c = document.getElementById(v);
        c.style.backgroundColor="#ccc";
		goog.net.XhrIo.send('/removeaccess', function(d){
			var id = d.target.getResponseText();
	        goog.dom.removeNode(goog.dom.getElement(id))},
			'POST',
			"removePerson="+escape(v)+"&resource_id="+resource_id+"&autosave="+v
		);
    }
	c=null;
}

function shareScript(){
	if(EOV=='viewer')return;
	var r = goog.format.EmailAddress.parseList(goog.dom.getElement('collaborator').value)
	var arr=[];
	var nonValidEmail=false;
	for(i in r){
		var a = r[i].address_;
		if(a!=""){
			if(a.split('@')[1]!=undefined && (a.split('@')[1].split('.')[0]=='gmail' || a.split('@')[1].split('.')[0]=='yahoo')){
				arr.push(a);
			}
			else{nonValidEmail=true}
		}
	}
	if(nonValidEmail==true){
		alert('At this time you can only collaborate with Gmail or Yahoo accounts.')
	}
	if(arr.length==0){
		alert('You need to add at least one email address.')
		return;
	}
	var collaborators = arr.join(',');
	goog.net.XhrIo.send('/share',
		function(d){
			var people = d.target.getResponseText().split(",");
	        var c=document.getElementById('hasAccess');
	        for(i in people){
				if(people[i]!="" && people[i]!=="not sent"){
		            var TR = c.appendChild(document.createElement("tr"));
		            TR.id = people[i];
		            TR.appendChild(document.createElement("td")).appendChild(document.createTextNode(people[i]));
		            var newA = TR.appendChild(document.createElement("td")).appendChild(document.createElement("a"));
		            newA.appendChild(document.createTextNode("Remove Access"));
		            newA.href="javascript:removeAccess('"+people[i]+"')";
				}
	        }
	        document.getElementById('shareS').disabled = false;
	        document.getElementById('shareS').value = "Send Invitations";
		},
		'POST',
		'resource_id='+resource_id+'&collaborators='+escape(collaborators)+'&fromPage=scriptlist'	
	)
	document.getElementById('shareS').disabled = true;
	document.getElementById('shareS').value = "Sending Invites...";
}
//tag
function tagPrompt(){
	if(EOV=='viewer')return;
	save(0);
	var t = prompt("Leave a tag for this version:");
	if (t!=null && t!=""){
		goog.net.XhrIo.send('/revisiontag',
			function(d){
				if(d.target.getResponseText()!='tagged'){
					alert("There was a problem tagging this script. Please try again later.")
				}
			},
			'POST',
			'resource_id='+resource_id+'&version=latest&tag='+escape(t)
		)
	}
}
// find prompts and stuff
function findPrompt(){
	hideFindReplacePrompt();
	if(document.getElementById('find_div').style.display=="block")findInputKeyUp({"which":1000}, "f");
	typeToScript=false;
	findForcePaint=true;
	document.getElementById('find_div').style.display="block";
	document.getElementById('find_input').select();
	document.getElementById('find_input').focus();
}
function hideFindPrompt(){
	typeToScript=true;
	findForcePaint=false;
	findArr=[];
	document.getElementById('find_div').style.display="none";
	commandDownBool=false;
}
// Find Replace Prompt
function findReplacePrompt(){
	hideFindPrompt();
	if(document.getElementById('find_replace_div').style.display=="block")findInputKeyUp({"which":1000}, "r");
	typeToScript=false;
	findForcePaint=true;
	document.getElementById('find_replace_div').style.display="block";
	document.getElementById('fr_find_input').select();
	document.getElementById('fr_find_input').focus();
}
function hideFindReplacePrompt(){
	typeToScript=true;
	findForcePaint=false;
	findReplaceArr=[];
	document.getElementById('find_replace_div').style.display="none";
	commandDownBool=false;
}
function replaceText(){
	if(EOV=='viewer')return;
	var d = document.getElementById('fr_replace_input').value;
	if(d.length==0)return;
	if(pos.row==anch.row && pos.col==anch.col)return;
	if(pos.row!=anch.row)return;
	if(findReplaceArr.length==0)return;
	document.getElementById('ccp').value=d;
	paste();
	anch.col=pos.col-d.length;
	if(document.getElementById('find_replace_div').style.display=="block")findInputKeyUp({"which":1000}, "r");
	//backspace();
	//lines[pos.row][0]=lines[pos.row][0].slice(0, pos.col)+d+lines[pos.row][0].slice(pos.col)
}
function replaceAndFind(){
	if(EOV=='viewer')return;
	replaceText();
	findDown();
}
// spellCheck
function launchSpellCheck(){
	if(EOV=='viewer')return;
    typeToScript=false;
    ajaxSpell(pos.row)
    var firstLine = (pos.row==0 ? true : false);
    document.getElementById('spellcheckpopup').style.visibility = 'visible';
    spellCheckCycle(firstLine, 0, 0)
    
}
function spellCheckCycle(firstLine, r, w){
	if(EOV=='viewer')return;
    if(r=='finished'){
        alert('Spell Check Complete');
        hideSpellCheck();
        return;
    }
    var line=lines[r][0].split(' ');
    var found = false;
    while (found==false){
        var word = line[w].replace("?", "").replace(".","").replace(",","").replace("(","").replace(")","");
        for (i in spellWrong){
            if (spellWrong[i][0].toUpperCase()==word.toUpperCase()){
                found=[r,w,i];
                for(v in spellIgnore){
                    if (spellIgnore[v].toUpperCase()==word.toUpperCase())found=false;
                }
            }
        }
        if (!found){
            w++;
            if (w==line.length){
                w=0;
                r++;
                if (r==lines.length){
                    found='finished';
                }
                else{
                    line = lines[r][0].split(' ');
                }
            }
        }
    }
    if (found=='finished'){
        document.getElementById('sSuggest').innerHTML="";
        document.getElementById('sSentance').innerHTML = "";
        alert("Spell Check Complete");
        hideSpellCheck()
    }
    else{
        var sen =lines[r][0];
        var reg = new RegExp(word,'i');
        var rep = "<span id='sFocus' title='"+word+"' style='color:red'>"+word+"</span>"
        sen = sen.replace(reg, rep);
        if(lines[r][1]==0 || lines[r][1]==2 || lines[r][1]==5){
            document.getElementById('sSentance').innerHTML = sen.toUpperCase();
            document.getElementById('sSentance').innerHTML =document.getElementById('sSentance').innerHTML.replace("SFOCUS","sFocus")
        }
        else{
            document.getElementById('sSentance').innerHTML = sen;
        }
        document.getElementById('sSentance').title = r;
        var sug = spellWrong[found[2]][1];
        var d=document.getElementById('sSuggest')
        d.innerHTML="";
        for (i in sug){
            var item =d.appendChild(document.createElement('div'))
            item.className='spellcheckitem';
			goog.events.listen(item, goog.events.EventType.CLICK, function(e){
				var f = document.getElementById('spellcheckfocus');
	            if (f!=undefined){
	                f.removeAttribute('id');
	            }
	            e.target.id='spellcheckfocus'
	            document.getElementById('sFocus').innerHTML=e.target.title;
			})
            if(lines[r][1]==0 || lines[r][1]==2 || lines[r][1]==5){
                item.appendChild(document.createTextNode(sug[i].toUpperCase()));
            }
            else{
                item.appendChild(document.createTextNode(sug[i]));
            }
            item.title=sug[i];
        }
        w++;
        if (w==line.length){
            w=0;
            r++;
            if (r==lines.length){
                found='finished';
            }
            else{
                line = lines[r][0].split(' ');
            }
        }
        var h = (found=='finished' ? found : [r,w].join(','))
        document.getElementById('sHidden').value=h;
    }
}

function hideSpellCheck(){
    document.getElementById('spellcheckpopup').style.visibility='hidden';
    typeToScript=true;
    //spellIgnore=[];
	saveTimer()
}
function s_ignore(){
    var tmp = document.getElementById('sHidden').value;
    spellCheckCycle(false, tmp.split(',')[0], tmp.split(',')[1]);
}
function s_ignore_all(){
    spellIgnore.push(document.getElementById('sFocus').title);
    var tmp = document.getElementById('sHidden').value;
    spellCheckCycle(false, tmp.split(',')[0], tmp.split(',')[1]);
}
function s_change(){
    var s=document.getElementById('sSentance');
    var r = s.title;
    lines[r][0]="";
    for (i in s.childNodes){
        if(s.childNodes[i].nodeName=="#text")lines[r][0]=lines[r][0]+s.childNodes[i].nodeValue;
        else{
            var c = s.childNodes[i].childNodes;
            for (j in c){
                if (c[j].nodeName=="#text")lines[r][0]=lines[r][0]+c[j].nodeValue;
            }
        }
    }
    var tmp = document.getElementById('sHidden').value;
    spellCheckCycle(false, tmp.split(',')[0], tmp.split(',')[1]);
    paint(true,false,false);
}



	


//drawing functions
// like the scroll arrows
function scrollArrows(ctx){
    var height = document.getElementById('canvas').height;
    //up arrow
    ctx.fillStyle="#333";
    ctx.fillRect(editorWidth-21, height-39, 21,20);
    ctx.fillStyle='#ddd';
    ctx.fillRect(editorWidth-19, height-37, 16, 16);
    ctx.beginPath();
    ctx.moveTo(editorWidth-16, height-24);
    ctx.lineTo(editorWidth-10.5, height-35);
    ctx.lineTo(editorWidth-5, height-24);
    ctx.closePath();
    ctx.fillStyle="#333";
    ctx.fill();
    //down arrow
    ctx.fillStyle="#333";
    ctx.fillRect(editorWidth-21, height-19, 20,20);
    ctx.fillStyle='#ddd';
    ctx.fillRect(editorWidth-19, height-18, 16, 16);
    ctx.beginPath();
    ctx.moveTo(editorWidth-16, height-15);
    ctx.lineTo(editorWidth-10.5, height-4);
    ctx.lineTo(editorWidth-5, height-15);
    ctx.closePath();
    ctx.fillStyle="#333";
    ctx.fill();
	height=null;
}
function scrollBar(ctx, y){
	var lingrad = ctx.createLinearGradient(editorWidth-15,0,editorWidth,0);
	lingrad.addColorStop(0, "#5587c4");
	lingrad.addColorStop(.8, "#95a7d4"); 
	ctx.strokeStyle="#333";
	//ctx.lineWidth=2;
	ctx.fillStyle=lingrad;
    var height = document.getElementById('canvas').height;
    var pagesHeight = (pageBreaks.length+1)*72*lineheight+40;
    var barHeight = ((height)/pagesHeight)*(height-39);
    if (barHeight<20)barHeight=20;
    if (barHeight>=height-39)barHeight=height-39;
    var topPixel = (vOffset/(pagesHeight-height))*(height-39-barHeight);
    ctx.fillRect(editorWidth-18.5, topPixel+8, 16,barHeight-17);
	ctx.strokeRect(editorWidth-18.5, topPixel+8, 16,barHeight-17);
	ctx.beginPath();
	ctx.arc(editorWidth-10.5, topPixel+9,8, 0, Math.PI, true);
	ctx.fill();
	ctx.stroke();
	ctx.beginPath()
	ctx.arc(editorWidth-10.5, topPixel+barHeight-11, 8, 0, Math.PI, false);
	ctx.fill();
	ctx.stroke();
	var sh = topPixel;
	while(sh < topPixel+barHeight){
		var radgrad = ctx.createRadialGradient(editorWidth,sh+10,4,editorWidth+200,sh,10);  
		radgrad.addColorStop(0, 'rgba(100,140,210,0.4)');  
		radgrad.addColorStop(0.4, 'rgba(180,160,240,0.4)');  
		radgrad.addColorStop(1, 'rgba(1,159,98,0)');
		ctx.fillStyle=radgrad;
		ctx.fillRect(editorWidth-18.5, topPixel+8, 16,barHeight-17);
		
		
		sh+=20;
	}
	ctx.beginPath();
	ctx.moveTo(editorWidth-7, topPixel+9);
	ctx.lineTo(editorWidth-7, topPixel+barHeight-10);
	ctx.lineCap="round";
	ctx.strokeStyle = "rgba(200,220,255,0.3)";
	ctx.lineWidth=4;
	ctx.stroke()
	ctx.beginPath();
	ctx.moveTo(editorWidth-9, topPixel+10);
	ctx.lineTo(editorWidth-9, topPixel+barHeight-10);
	ctx.strokeStyle = "rgba(200,220,255,0.1)";
	ctx.lineWidth=2;
	ctx.stroke()
	height=pagesHeight=barHeight=topPixel=sh=null;
}
function drawFindArr(ctx,pageStartX){
	ctx.fillStyle="yellow";
	var l = (findArr.length==0 ? document.getElementById("fr_find_input").value.length : document.getElementById("find_input").value.length);
	var characterCount=0;
	var iterant=0;
	var count=0;
	var tmpArr=(findArr.length==0 ? findReplaceArr : findArr)
	var colorHeight=lineheight*9+3;
	for (i in linesNLB){
		if(colorHeight-vOffset>1200)break;
		var characterCount=0;
		for (j in linesNLB[i]){
			if(pageBreaks[count]!=undefined && pageBreaks[count][0]==i && pageBreaks[count][2]==j){
				count++;
				colorHeight=72*lineheight*count+9*lineheight+4;
				if(lines[i]!=undefined && lines[i][1]==3)colorHeight+=lineheight
			}
			colorHeight+=lineheight;
			while(tmpArr[iterant]!=undefined && tmpArr[iterant][0]==i && tmpArr[iterant][1]>=characterCount && tmpArr[iterant][1]<characterCount+linesNLB[i][j]+1){
				//find the lr of where the rect should go
				// but only when necessary
				if(colorHeight-vOffset>-100){
					var lr = pageStartX+WrapVariableArray[lines[i][1]][1]+(tmpArr[iterant][1]-characterCount)*fontWidth;
					if(tmpArr[iterant][1]+l>characterCount+linesNLB[i][j]+1){
						ctx.fillRect(lr, colorHeight-vOffset, (characterCount+linesNLB[i][j]-tmpArr[iterant][1])*fontWidth, lineheight-2)
						ctx.fillRect(pageStartX+WrapVariableArray[lines[i][1]][1], colorHeight+lineheight-vOffset, (l-(characterCount+linesNLB[i][j]-tmpArr[iterant][1]+1))*fontWidth, lineheight-2)
					}
					else{
						ctx.fillRect(lr, colorHeight-vOffset, l*fontWidth, lineheight-2)
					}
				}
				iterant++;
			}
			characterCount+=linesNLB[i][j]+1;
		}
	}
}
function drawRange(ctx, pageStartX){
    if(pos.row>anch.row){
        var startRange = {row:anch.row, col:anch.col};
        var endRange = {row:pos.row, col:pos.col};
    }
    else if(pos.row==anch.row && pos.col>anch.col){
        var startRange = {row:anch.row, col:anch.col};
        var endRange = {row:pos.row, col:pos.col};
    }
    else{
        var startRange = {row:pos.row, col:pos.col};
        var endRange = {row:anch.row, col:anch.col};
    }
    
    //get the starting position
    var startHeight = lineheight*9+3;
    var count=0;
    for (var i=0; i<startRange.row;i++){
        if(pageBreaks.length!=0 && pageBreaks[count][2]==0 && pageBreaks[count][0]-1==i){
            startHeight=72*lineheight*(count+1)+9*lineheight+4;
            //startHeight-=(pageBreaks[count][2])*lineheight;
            //if(lines[i][1]==3)startHeight+=lineheight;
            count++;
            if(count==pageBreaks.length)count--;
        }
        else if(pageBreaks.length!=0 && pageBreaks[count][2]!=0 && pageBreaks[count][0]==i){
            startHeight=72*lineheight*(count+1)+9*lineheight+4;
            startHeight+=(linesNLB[i].length-pageBreaks[count][2])*lineheight;
            if(lines[i][1]==3)startHeight+=lineheight;
            count++;
            if(count==pageBreaks.length)count--;
        }
        else{startHeight+=lineheight*linesNLB[i].length;}
    }
    var i=0;
    var startRangeCol=linesNLB[startRange.row][i]+1;
    while(startRange.col>startRangeCol){
        startHeight+=lineheight;
        if(pageBreaks.length!=0 && pageBreaks[count][0]==startRange.row && pageBreaks[count][2]==i+1){
            startHeight=72*lineheight*(count+1)+9*lineheight+4;
            if(lines[startRange.row][1]==3)startHeight+=lineheight;
        }
        //else if(pageBreaks.length!=0 && pageBreaks[count][0]-1==startRange.row && pageBreaks[count][2]==i){
        //    startHeight=72*lineheight*(count+1)+9*lineheight+4;
        //    if(lines[startRange.row][1]==3)startHeight+=lineheight;
        //}
        i++;
        startRangeCol+=linesNLB[startRange.row][i]+1;
    }
    startRangeCol-=linesNLB[startRange.row][i]+1;
    var startWidth = WrapVariableArray[lines[startRange.row][1]][1];
    startWidth+=((startRange.col-startRangeCol)*fontWidth);
    startHeight+=lineheight;
    // calc notes
    for (note in notes){
        if(notes[note][0]==startRange.row){
            if(startRangeCol< notes[note][1] && startRangeCol+linesNLB[startRange.row][i]+1 >notes[note][1]){
                if(notes[note][1]<startRange.col)startWidth+=fontWidth;
            }
        }
    }
    
    //getting the ending position

    var endHeight = lineheight*9+3;
    count=0;
    for (var j=0; j<endRange.row;j++){
        if(pageBreaks.length!=0 && pageBreaks[count][2]==0 && pageBreaks[count][0]-1==j){
            endHeight=72*lineheight*(count+1)+9*lineheight+4;
            count++;
            if(count==pageBreaks.length)count--;
        }
        else if(pageBreaks.length!=0 && pageBreaks[count][2]!=0 && pageBreaks[count][0]==j){
            endHeight=72*lineheight*(count+1)+9*lineheight+4;
            endHeight+=(linesNLB[j].length-pageBreaks[count][2])*lineheight;
            if(lines[j][1]==3)endHeight+=lineheight;
            count++;
            if(count==pageBreaks.length)count--;
        }
        else{endHeight+=lineheight*linesNLB[j].length;}
    }
    var j=0;
    var endRangeCol=linesNLB[endRange.row][j]+1;
    while(endRange.col>endRangeCol){
        endHeight+=lineheight;
        if(pageBreaks.length!=0 && pageBreaks[count][0]==endRange.row && pageBreaks[count][2]==j+1){
            endHeight=72*lineheight*(count+1)+9*lineheight+4;
            if(lines[endRange.row][1]==3)endHeight+=lineheight;
        }
        //else if(pageBreaks.length!=0 && pageBreaks[count][0]-1==endRange.row && pageBreaks[count][2]==i){
        //    endHeight=72*lineheight*(count+1)+9*lineheight+4;
        //    if(lines[endRange.row][1]==3)endHeight+=lineheight;
        //}
        j++;
        endRangeCol+=linesNLB[endRange.row][j]+1;
    }
    endRangeCol-=linesNLB[endRange.row][j]+1;
    var endWidth = WrapVariableArray[lines[endRange.row][1]][1];
    endWidth+=((endRange.col-endRangeCol)*fontWidth);
    endHeight+=lineheight;
    // calc notes
    for (note in notes){
        if(notes[note][0]==endRange.row){
            if(endRangeCol< notes[note][1] && endRangeCol+linesNLB[endRange.row][j]+1 >notes[note][1]){
                if(notes[note][1]<endRange.col)endWidth+=fontWidth;
            }
        }
    }
    
    // Now compare stuff and draw blue Box
    ctx.fillStyle='lightBlue';
    if(endHeight==startHeight){
        var onlyBlueLine = startWidth;
        if (lines[startRange.row][1]==5)onlyBlueLine-=(lines[startRange.row][0].length*fontWidth);
        ctx.fillRect(onlyBlueLine+pageStartX, startHeight-vOffset,endWidth-startWidth, 12);
		onlyBlueLine=null;
    }
    else{
        var firstLineBlue = startWidth;
        if (lines[startRange.row][1]==5)firstLineBlue-=(lines[startRange.row][0].length*fontWidth);
        ctx.fillRect(firstLineBlue+pageStartX,startHeight-vOffset, (startRangeCol+linesNLB[startRange.row][i]-startRange.col)*fontWidth, 12);
        while(startHeight+lineheight<endHeight){
            for(var counter=0; counter<pageBreaks.length; counter++){
                if(pageBreaks.length!=0 && pageBreaks[counter][0]-1==startRange.row && pageBreaks[counter][2]==0 && i==linesNLB[startRange.row].length-1){
                    startHeight=72*lineheight*(counter+1)+9*lineheight+4;
                }
                else if(pageBreaks.length!=0 && pageBreaks[counter][0]==startRange.row && i==pageBreaks[counter][2]-1){
                    startHeight=72*lineheight*(counter+1)+9*lineheight+4;
                    if(lines[startRange.row][1]==3)startHeight+=lineheight;
                }
            }
			counter=null;
            i++;
            startHeight+=lineheight;
            if(linesNLB[startRange.row].length<=i){
                startRange.row++;
                i=0;
            }
            if(startHeight!=endHeight){
                var blueStart = WrapVariableArray[lines[startRange.row][1]][1];
                if (lines[startRange.row][1]==5)blueStart-=(lines[startRange.row][0].length*fontWidth);
                ctx.fillRect(blueStart+pageStartX, startHeight-vOffset, linesNLB[startRange.row][i]*fontWidth, 12);
				blueStart=null;
            }
            
        }
        //ctx.fillStyle="blue";
        var lastBlueLine=WrapVariableArray[lines[endRange.row][1]][1]; 
        if (lines[endRange.row][1]==5)lastBlueLine-=(lines[endRange.row][0].length*fontWidth);
        ctx.fillRect(lastBlueLine+pageStartX, endHeight-vOffset, (endRange.col-endRangeCol)*fontWidth,12);
		firstLineBlue=lastBlueLine=null;
    }
	startRange=endRange=startHeight=endHeight=startWidth=endWidth=i=j=count=startRangeCol=endRangeCol=null;
}


function drawNote(width, height, col, ctx, i, pageStartX, id){
    if(lines[i][1]==5){
		notesPosition.push([width-fontWidth*(lines[i][0].length-col+1)+pageStartX, height-vOffset-lineheight+3, id]);
        ctx.fillStyle="gold";
        ctx.beginPath();
        ctx.moveTo(width-fontWidth*(lines[i][0].length-col+1)+pageStartX, height-vOffset-lineheight+3);
        ctx.lineTo(width-fontWidth*(lines[i][0].length-col+1)+pageStartX, height-vOffset-lineheight+3+lineheight);
        ctx.lineTo(width-fontWidth*(lines[i][0].length-col+1)+fontWidth+pageStartX, height-vOffset-lineheight+3+lineheight);
        ctx.lineTo(width-fontWidth*(lines[i][0].length-col+1)+fontWidth+pageStartX, height-vOffset-lineheight+3+4);
        ctx.lineTo(width-fontWidth*(lines[i][0].length-col+1)+fontWidth-4+pageStartX, height-vOffset-lineheight+3);
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle="#333";
        ctx.lineWidth = 1;
        ctx.beginPath();
        for(var j=1; j<6; j++){
            ctx.moveTo(width-fontWidth*(lines[i][0].length-col+1)+1+pageStartX, height-vOffset-lineheight+3+(2*j)+0.5);
            ctx.lineTo(width-fontWidth*(lines[i][0].length-col+1)+fontWidth-1+pageStartX, height-vOffset-lineheight+3+(2*j)+0.5);
            ctx.stroke();
        }
		j=null;
        ctx.strokeStyle="#999";
        ctx.beginPath();
        ctx.moveTo(width-fontWidth*(lines[i][0].length-col+1)+fontWidth-4+pageStartX, height-vOffset-lineheight+3);
        ctx.lineTo(width-fontWidth*(lines[i][0].length-col+1)+fontWidth-4+pageStartX, height-vOffset-lineheight+3+4);
        ctx.lineTo(width-fontWidth*(lines[i][0].length-col+1)+fontWidth+pageStartX, height-vOffset-lineheight+3+4);
        ctx.stroke();
    }
    else{
		notesPosition.push([width+fontWidth*col+pageStartX, height-vOffset-lineheight+3, id])
        ctx.fillStyle="gold";
        ctx.beginPath();
        ctx.moveTo(width+fontWidth*col+pageStartX, height-vOffset-lineheight+3);
        ctx.lineTo(width+fontWidth*col+pageStartX, height-vOffset-lineheight+3+lineheight);
        ctx.lineTo(width+fontWidth*col+fontWidth+pageStartX, height-vOffset-lineheight+3+lineheight);
        ctx.lineTo(width+fontWidth*col+fontWidth+pageStartX, height-vOffset-lineheight+3+4);
        ctx.lineTo(width+fontWidth*col+fontWidth-4+pageStartX, height-vOffset-lineheight+3);
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle="#333";
        ctx.lineWidth = 1;
        ctx.beginPath();
        for(var i=1; i<6; i++){
            ctx.moveTo(width+fontWidth*col+1+pageStartX, height-vOffset-lineheight+3+(2*i)+0.5);
            ctx.lineTo(width+fontWidth*col+fontWidth-1+pageStartX, height-vOffset-lineheight+3+(2*i)+0.5);
            ctx.stroke();
        }
		j=null;
        ctx.strokeStyle="#999";
        ctx.beginPath();
        ctx.moveTo(width+fontWidth*col+fontWidth-4+pageStartX, height-vOffset-lineheight+3);
        ctx.lineTo(width+fontWidth*col+fontWidth-4+pageStartX, height-vOffset-lineheight+3+4);
        ctx.lineTo(width+fontWidth*col+fontWidth+pageStartX, height-vOffset-lineheight+3+4);
        ctx.stroke();
    }
    ctx.fillStyle=foreground;
}

function sortNumbers(a,b){
    return a - b;
}

function paint(forceCalc, forceScroll){
	notesPosition=[];
	var linesLength = lines.length;
	var linesNLBLength = linesNLB.length;
	var linesLV = lines;
	var canvasHeight = document.getElementById('canvas').height;
	if(typeToScript || findForcePaint){
		var canvas = document.getElementById('canvas');
		var ctx = canvas.getContext('2d');
		ctx.fillStyle = '#ccc';
		ctx.fillRect(0, 0, editorWidth, canvasHeight);
		
		//draw pages
		var pageStartX= Math.round((editorWidth-fontWidth*87-24)/2);
		var pageStartY = lineheight;
		ctx.font=font;
		ctx.lineWidth = 1;
		for(var i=0; i<=pageBreaks.length;i++){
			if (pageStartY-vOffset>1200)break;
			if (pageStartY-vOffset>-lineheight*72){
				ctx.fillStyle = background;
				ctx.fillRect(pageStartX, pageStartY-vOffset, fontWidth*87, lineheight*70);
				ctx.strokeStyle = '#000';
				ctx.strokeRect(pageStartX, pageStartY-vOffset, Math.round(fontWidth*87), lineheight*70);
				ctx.strokeStyle = '#999';
				ctx.strokeRect(pageStartX-2, pageStartY-vOffset-2, Math.round(fontWidth*87)+4, lineheight*70+4);
				ctx.fillStyle = foreground;
				if(i>0)ctx.fillText(String(i+1)+'.', 550+pageStartX, pageStartY-vOffset+85);
			}
			pageStartY+= lineheight*72;
		}
		pageStartY=null;
		// use this opportunity to put in the grey backing
		// also figure out the current page
		
		if(!forceCalc){
			var greyHeight = lineheight*9+2;
			var wrapVars=WrapVariableArray[0];
			ctx.fillStyle='#ddd';
			var count=0;
			for (var i=0;i<linesLength;i++){
				if(pos.row==i)currentPage=count*1+1;
				if(pageBreaks.length!=0 && pageBreaks[count]!=undefined && pageBreaks[count][0]==i){
					if(pos.row==i)currentPage+=1;
					greyHeight=72*lineheight*(count+1)+9*lineheight+2;
					if(pageBreaks[count][2]!=0){
						greyHeight-=pageBreaks[count][2]*lineheight;
						if(linesLV[i][1]==3)greyHeight+=lineheight;
					}
					count++;
				}
				if(i<linesNLB.length){
					for(var j=0; j<linesNLB[i].length; j++){
						greyHeight+=lineheight;
						if (linesLV[i][1]==0){
							if(linesNLB[i][j]!=0)ctx.fillRect(wrapVars[1]-3+pageStartX,greyHeight-vOffset,61*fontWidth+6, 14);
							if(linesLV[i][0]=='' && j==0)ctx.fillRect(wrapVars[1]-3+pageStartX,greyHeight-vOffset,61*fontWidth+6, 14);
						}
					}
					j=null;
				}
				if(greyHeight-vOffset>1200)break;
			}
			greyHeight=wrapVars=count=i=null;
		}
		// draw finds if there are any
		if(findArr.length!=0 || findReplaceArr.length!=0){
			drawFindArr(ctx, pageStartX);
		}
		//Draw in range if there is one
		if(pos.row!=anch.row || anch.col!=pos.col){
			drawRange(ctx, pageStartX);
			if(!pasting)selection();
		}
    
		ctx.fillStyle=foreground;
    
		ctx.font=font;
		var y = lineheight*11;
		var cos=[];
		var latestCharacter = '';
		var count = 0;
		var sceneCount=0;
		var pageBreaksLength = pageBreaks.length;
		//Stary Cycling through lines
		for (var i=0; i<linesLength; i++){
			var thisLineText = linesLV[i][0];
			var thisLineType = linesLV[i][1];
			if (thisLineType==0)sceneCount++;
			//make sure there are parenthesese for parenthetics
			if(thisLineType==4){
				if(thisLineText.charAt(0)!='(')thisLineText='('+thisLineText;
				if(thisLineText.charAt(thisLineText.length-1)!=')')thisLineText=thisLineText+')';
				lines[i][0]=thisLineText;
			}
			//set correct line height
			//on page breaks
			var bb=false;
			if(!forceCalc){
				if(pageBreaksLength!=0 && pageBreaks[count]!=undefined && pageBreaks[count][0]==i){
					if(pageBreaks[count][2]==0){
						y=72*lineheight*(count+1)+11*lineheight;
						count++;
						if(count>=pageBreaksLength){
							count=pageBreaksLength-2;
						}
					}
					else{
						bb=true;
					}
				}
			}
			//Don't render things way outside the screen
			if(!forceCalc && !bb && y-vOffset<-200){
				y+=(lineheight*linesNLB[i].length);
				if(i==pos.row){
					var cursorY=y;
					wrappedText=[];
				}
			}
			else if(!forceCalc && !bb && y-vOffset>1200)break;
			else{
				// calc if there are notes in this line
				var notesArr=[];
				if(viewNotes){
					for (note in notes){
						if(notes[note][0]==i)notesArr.push([notes[note][1], notes[note][3]]);
					}
				}
				notesArr = notesArr.sort(sortNumbers);
				var type = thisLineType;
				var lineLengthInCharacters = WrapVariableArray[thisLineType][0];
				var distanceFromEdge = WrapVariableArray[thisLineType][1];
				var ifAlignRight = WrapVariableArray[thisLineType][2];
				var ifUppercase = WrapVariableArray[thisLineType][3];
				var lineBreaksAfter = WrapVariableArray[thisLineType][4];
				//Cursor position
				if (i==pos.row){
					var cursorY = y-lineheight;
					var cursorX = distanceFromEdge;
					var thisRow = true;
					var wrappedText = [];
				}
				if (i==anch.row){
					var anchorY = y-lineheight;
					var anchorThisRow = true;
					var anchorWrappedText = []
				}
            
				var wordsArr = thisLineText.split(' ');
				var word = 0;
				linesNLB[i]=[];
				// tc = total characters, used
				// mainly to put in notes
				var tc = 0;
				var anchEFound=false;
				var eFound=false;
				while(word<wordsArr.length){
					var itr=0;
					//for if the one word is too big
					if (wordsArr[word].length>=lineLengthInCharacters){
						var printString = wordsArr[word];
						if (ifUppercase==1)printString= printString.toUpperCase();
						var altPrintString = printString;
						var notesInThisLine=[];
						if(viewNotes){
							for(note in notesArr){
							    if (notesArr[note][0]>=thisLineText.length-printString.length){
							        altPrintString=altPrintString.substr(0,notesArr[note][0]-tc+notesInThisLine.length)+" "+altPrintString.substr(notesArr[note][0]-tc+notesInThisLine.length);
							        drawNote(distanceFromEdge, y, notesArr[note][0]-tc+notesInThisLine.length, ctx, i, pageStartX, notesArr[note][1]);
							        notesInThisLine.push(notesArr[note][0]);
							    }
							}
						}
						ctx.fillText(altPrintString, distanceFromEdge+pageStartX , y-vOffset);
						linesNLB[i].push(printString.length);
						y+=lineheight;
						if(lineBreaksAfter==2){
							linesNLB[i].push(0);
							y+=lineheight;
						}
						word++;
						if(thisRow)wrappedText.push(printString.length);
						if(anchorThisRow)anchorWrappedText.push(printString.length);
					}
					else if (wordsArr.slice(word).join().length<lineLengthInCharacters){
						var printString = wordsArr.slice(word).join(' ');
						if (thisLineType==2 && latestCharacter!='' && thisLineText.toUpperCase()==latestCharacter.toUpperCase())printString+=" (Cont'd)";
						if (thisLineType==0)latestCharacter='';
						if (ifUppercase==1)printString= printString.toUpperCase();
						if (ifAlignRight==1)ctx.textAlign='right';
						var altPrintString = printString;
						var notesInThisLine=[];
						if(viewNotes){
							for(note in notesArr){
								if (notesArr[note][0]>=thisLineText.length-printString.length){
									altPrintString=altPrintString.substr(0,notesArr[note][0]-tc+notesInThisLine.length)+" "+altPrintString.substr(notesArr[note][0]-tc+notesInThisLine.length);
									drawNote(distanceFromEdge, y, notesArr[note][0]-tc+notesInThisLine.length, ctx, i, pageStartX, notesArr[note][1]);
									notesInThisLine.push(notesArr[note][0]);
								}
							}
						}
						if(printString!='')ctx.fillText(altPrintString, distanceFromEdge+pageStartX , y-vOffset);
						ctx.textAlign='left';
						word=wordsArr.length;
						linesNLB[i].push(printString.length);
						y+=lineheight;
						if(lineBreaksAfter==2){
							linesNLB[i].push(0);
							y+=lineheight;
						}
						if(thisRow)wrappedText.push(printString.length);
						if(anchorThisRow)anchorWrappedText.push(printString.length);
					}
					else{
						var itr=0;
						while(wordsArr.slice(word, word+itr).join(' ').length<lineLengthInCharacters){
							newLineToPrint=wordsArr.slice(word, word+itr).join(' ');
							itr++;
						}
						if (ifUppercase==1)newLineToPrint= newLineToPrint.toUpperCase();
						var altNewLineToPrint = newLineToPrint;
						var notesInThisLine=[];
						if(viewNotes){
							for(note in notesArr){
								if (notesArr[note][0]>=tc && notesArr[note][0]<=tc+newLineToPrint.length){
									altNewLineToPrint=altNewLineToPrint.substr(0,notesArr[note][0]-tc+notesInThisLine.length)+" "+altNewLineToPrint.substr(notesArr[note][0]-tc+notesInThisLine.length);
									drawNote(distanceFromEdge, y, notesArr[note][0]-tc+notesInThisLine.length, ctx, i, pageStartX, notesArr[note][1]);
									notesInThisLine.push(notesArr[note][0]);
								}
							}
						}
						tc+=newLineToPrint.length+1;
						ctx.fillText(altNewLineToPrint, distanceFromEdge+pageStartX, y-vOffset);
						linesNLB[i].push(newLineToPrint.length);
						y+=lineheight;
						word+=itr-1;
						itr =0;
						if (thisRow)wrappedText.push(newLineToPrint.length);
						if(anchorThisRow)anchorWrappedText.push(newLineToPrint.length);
					}
					//remve a line if it's dialog
					//followed by parenthetics
					if(thisLineType==3 && i+1!=linesLength && linesLV[i+1][1]==4 && linesNLB[i][linesNLB[i].length-1]==0){
						linesNLB[i].pop();
						y-=lineheight;
					}
					
					if(bb && linesNLB[i].length==pageBreaks[count][2]){
						if(thisLineType==3)ctx.fillText("(MORE)", WrapVariableArray[2][1]+pageStartX, y-vOffset);
						y=72*lineheight*(count+1)+11*lineheight;
						if(thisLineType==3){
							ctx.fillText(latestCharacter.toUpperCase()+" (CONT'D)", WrapVariableArray[2][1]+pageStartX, y-vOffset);
							y+=lineheight;
						}
						count++;
						bb=false;
						if(pos.row==i){cos.push(count);}
					}
				}
				var thisRow=false;
				var anchorThisRow=false;
			}
			//setup stuff of Con't
			if(thisLineType==2)var latestCharacter = thisLineText;
			if(i==pos.row){
				currentScene=sceneCount;
				var notesOnThisLine=notesArr; 
			}
			if(count>=pageBreaksLength){
				count=pageBreaksLength-2;
			}
		}
		// End Looping through lines
		// delete extra data in linesNLB
	
		while(linesLength<linesNLB.length){
			linesNLB.pop();
		}
      
		// Cursor
		var d= new Date();
		var newMilli = d.getMilliseconds();
		var diff = newMilli-milli;
		var cursor = false;
		if (diff>0 && diff<500){
			cursor = true;
		}
		if (diff<0 && diff<-500){
			cursor = true;
		}
		d=newMilli=diff=i=null;
		if(wrappedText){
			var wrapCounter=0;
			var lrPosDiff = pos.col;
			var totalCharacters=wrappedText[wrapCounter];
			while (pos.col>totalCharacters){
				wrapCounter++;
				totalCharacters+=1+wrappedText[wrapCounter];
			}
			totalCharacters-=wrappedText[wrapCounter];
			//count notes on this line
			// and figure which is before the cursor
			var notesSpacingDiff=0;
			for (note in notesOnThisLine){
				var n = notesOnThisLine[note];
				if(n<pos.col && n>totalCharacters && n<totalCharacters+wrappedText[wrapCounter]){
					notesSpacingDiff++;
				}
				n=null;
			}
			note=null;
			//console.log(notesSpacingDiff);
			if(cos.length>0 && wrapCounter>=pageBreaks[cos[0]-1][2]){
				cursorY=72*cos[0]*lineheight+9*lineheight;
				if(linesLV[pos.row][1]==3){
					cursorY+=lineheight*2;
					wrapCounter-=pageBreaks[cos[0]-1][2];
				}
				else if(linesLV[pos.row][1]==1){
					wrapCounter-=pageBreaks[cos[0]-1][2];
					cursorY+=lineheight;
				}
			}
			if(cursor){
				var lr = cursorX+((pos.col-totalCharacters+notesSpacingDiff)*fontWidth)+pageStartX;
				if(linesLV[pos.row][1]==5)lr -= linesLV[pos.row][0].length*fontWidth;
				ud = 2+cursorY+(wrapCounter*lineheight)-vOffset;
				try{
					ctx.fillRect(lr,ud,2,17);
				}
				catch(err){}
				lr=null;
			}
			wrapCounter=lrPosDiff=totalCharacters=null;
		}
      
    
		//Start work on frame and buttons and stuff
		ctx.lineWidth = 4;
		ctx.strokeStyle = '#ddd';
		ctx.beginPath();
		ctx.moveTo(2,2);
		ctx.lineTo(2,canvasHeight-1);
		ctx.lineTo(editorWidth, canvasHeight-1);
		ctx.lineTo(editorWidth,2);
		//ctx.lineTo(2,2);
		ctx.stroke();
		//
		// bottom status bar
		ctx.fillStyle = "#ccc";
		ctx.fillRect(2,canvasHeight-24, editorWidth-25, 24);
		ctx.strokeStyle = "#aaa";
		ctx.lineWidth = 1;
		ctx.beginPath()
		ctx.moveTo(1.5,canvasHeight-25.5);
		ctx.lineTo(1.5,canvasHeight-1.5);
		ctx.lineTo(editorWidth-22.5,canvasHeight-1.5);
		ctx.lineTo(editorWidth-22.5,canvasHeight-25.5);
		ctx.closePath();
		ctx.strokeStyle = "#999";
		ctx.stroke();
		ctx.beginPath()
		ctx.moveTo(0.5,canvasHeight-24.5);
		ctx.lineTo(0.5,canvasHeight-0.5);
		ctx.lineTo(editorWidth-21.5,canvasHeight-0.5);
		ctx.lineTo(editorWidth-21.5,canvasHeight-24.5);
		ctx.closePath();
		//write current page number
		ctx.strokeStyle = "#333";
		ctx.stroke();
		var tp=pageBreaksLength+1;
		var pages="Page "+currentPage+" of "+tp;
		ctx.font="10pt sans-serif";
		ctx.fillStyle="#000"
		ctx.fillText(pages, editorWidth-150, canvasHeight-8);
		if(EOV=='editor'){
			//write enter and tab directions
			var wordArr=["Enter : Action  --  Tab : Character", "Enter : Character  --  Tab : Slugline", "Enter : Dialog  --  Tab : Action", "Enter : Character  --  Tab : Parenthetical", "Enter : Dialog  --  Tab : Dialog", "Enter : Slugline  --  Tab : Slugline"];
			ctx.fillText(wordArr[linesLV[pos.row][1]], 15, canvasHeight-8);
		}
		//write current scene number
		var txt="Scene "+ currentScene + " of " + scenes.length;
		ctx.fillText(txt, (editorWidth/2)-30, canvasHeight-8);
		ctx.font = font;
		txt=wordArr=pages=tp=null;
		//Make ScrollBar
		scrollArrows(ctx);
		scrollBar(ctx, y);

		pagination();
		if(forceCalc){noteIndex()}
		
		if(mouseDownBool && pos.row<anch.row && mouseY<40)scroll(-20);
		if(mouseDownBool && pos.row>anch.row && mouseY>canvasHeight-50)scroll(20);
		if(forceScroll=="enter"){
			if (ud>canvasHeight)scroll(600);
			else if(forceScroll){
				if((2+cursorY+(wrapCounter*lineheight)-vOffset)>canvasHeight-60){
					scroll(45);
				}
				else if(ud<45){
					scroll(-45);
				}
			}
			document.getElementById('format').selectedIndex=linesLV[pos.row][1];
		}
		if(EOV=='editor'){
			for(i=0; i<=5; i++){
				eMenu.getChild('format'+i).setChecked((linesLV[pos.row][1]==i ? true : false));
			}
		}
	}
}