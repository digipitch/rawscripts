/**
 * Rawscripts - Screenwriting Software
 * Copyright (C) Ritchie Wilson
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */


/**
 * Run on body onload. Checks the browser, and the mode the user is
 * running in (either 'editor' or 'viewer'. Basicaly "write' or "read
 * only"). From that alters the DOM and sets up event listeners.  Then
 * calls for script data
 */
function init(){
	// basicaly, quit stuff if in IE,
	// tell them to get a better browser
	if(goog.userAgent.IE==true){
		goog.dom.removeNode(goog.dom.getElement('loading'));
		goog.dom.flattenElement(goog.dom.getElement('canvasText'));
		goog.dom.removeNode(goog.dom.getElement('gtb'));
		return;
	}
	// set up function for resizing windows
	var vsm = new goog.dom.ViewportSizeMonitor();
	goog.events.listen(vsm, goog.events.EventType.RESIZE, function(e) {resizeElements=true;});
	// then initial resize
	setElementSizes("i");
	
	// sets up key handler
	var docKh = new goog.events.KeyHandler(document);
	goog.events.listen(docKh, 'key', keyEvent)
	
	// set up mouse click handler
	goog.events.listen(document, goog.events.EventType.MOUSEMOVE, mouseMove)
	goog.events.listen(document, goog.events.EventType.MOUSEDOWN, mouseDown)
	goog.events.listen(document, goog.events.EventType.MOUSEUP, mouseUp)
	
	// set up mouse wheel handler
	var MouseWheelHandler = goog.events.MouseWheelHandler;
	var MOUSEWHEEL = MouseWheelHandler.EventType.MOUSEWHEEL;
    var mwh = new MouseWheelHandler(goog.dom.getElement('canvasText'));
	goog.events.listen(mwh, MOUSEWHEEL, handleMouseWheel);
	goog.events.listen(window, 'unload', function(e){goog.events.unlisten(mwh, MOUSEWHEEL, handleMouseWheel);});
	
	// setup context menu calls
	window.oncontextmenu = contextmenu;
	
	if (EOV=='viewer'){
		// strip dom elements if this is viewer
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
		// sets up the save button and rename thing
		// if this is an editor, not viewer
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
	// Prevent a bunch of defaults
	// i.e. in some browsers, pressing enter in these
	// text fields altomaticly opens a new, bad window
	goog.events.listen(goog.dom.getElement('find_input'), goog.events.EventType.KEYDOWN, function(e){if(e.keyCode==13){e.preventDefault();findDown()}});
	goog.events.listen(goog.dom.getElement('fr_find_input'), goog.events.EventType.KEYDOWN, function(e){if(e.keyCode==13){e.preventDefault();findDown()}});
	goog.events.listen(goog.dom.getElement('renameField'), goog.events.EventType.KEYDOWN, function(e){if(e.keyCode==13){e.preventDefault();renameScript()}});
    goog.events.listen(goog.dom.getElement('subject'), goog.events.EventType.KEYDOWN, function(e){if(e.keyCode==13)e.preventDefault()});
	
	// if user types in a dom text field,
	// don't have that show up in the canvas
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
	
	// set up menus (file, edit, view, share)
	// ** needs to be done after DOM elements
	// stipped because of Editor, or Viewer window
	fMenu = new goog.ui.Menu();
	fMenu.decorate(goog.dom.getElement('fileMenu'))
	fMenu.setPosition(0, 64)
	fMenu.setAllowAutoFocus(true);
	fMenu.setVisible(false);
	goog.events.listen(goog.dom.getElement('file'), goog.events.EventType.CLICK, openMenu);
	goog.events.listen(goog.dom.getElement('file'), goog.events.EventType.MOUSEOVER, topMenuOver);
	goog.events.listen(goog.dom.getElement('file'), goog.events.EventType.MOUSEOUT, topMenuOut);
	goog.events.listen(fMenu, 'action', menuSelect)
	goog.events.listen(goog.dom.getElement('canvasText'), goog.events.EventType.CLICK, function(e){typeToScript=true})
	
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
	sMenu.decorate(goog.dom.getElement('_shareMenu'))
	sMenu.setPosition(113, 64)
	sMenu.setAllowAutoFocus(true);
	sMenu.setVisible(false);
	goog.events.listen(goog.dom.getElement('share'), goog.events.EventType.CLICK, openMenu);
	goog.events.listen(goog.dom.getElement('share'), goog.events.EventType.MOUSEOVER, topMenuOver);
	goog.events.listen(goog.dom.getElement('share'), goog.events.EventType.MOUSEOUT, topMenuOut);
	goog.events.listen(sMenu, 'action', menuSelect)
	
	// Register Shortcut keys for save, export, undo, redo, find
	var shortcutHandler = new goog.ui.KeyboardShortcutHandler(document);
	shortcutHandler.registerShortcut('save', 'meta+s');
	shortcutHandler.registerShortcut('undo', 'meta+z');
	shortcutHandler.registerShortcut('redo', 'meta+shift+z');
	shortcutHandler.registerShortcut('export', 'meta+e');
	shortcutHandler.registerShortcut('find', 'meta+f');
	shortcutHandler.registerShortcut('all', 'meta+a');
	shortcutHandler.setAlwaysPreventDefault(true)
	goog.events.listen(
	       shortcutHandler,
	       goog.ui.KeyboardShortcutHandler.EventType.SHORTCUT_TRIGGERED,
	       shortcutTriggered
	);
	// then update the DOM to reflect shortcut keys on differant OSs
	var sKeys =	[['save','S'],
				['export', 'E'],
				['undo', 'Z'],
				['redo', 'Shift Z'],
				['find', 'F'],
				['selectAll', 'A']
				];
	var meta = (goog.userAgent.MAC==true ? "⌘" : "Ctrl+")
	for (i in sKeys){
		var d = goog.dom.getElement(sKeys[i][0]+'-shortcut');
		if (d!=null){goog.dom.setTextContent(d, meta+sKeys[i][1]);}
	}

	// decorate toolbar
	var tb = new goog.ui.Toolbar();
	tb.decorate(goog.dom.getElement('gtb'));
	goog.events.listen(tb, goog.ui.Component.EventType.ACTION, toolbarActions)
	 // Have the font size buttons be controlled by a selection model.
	var selectionModel = new goog.ui.SelectionModel();
 	selectionModel.setSelectionHandler(function(button, select) {
 		if (button) {
 			button.setChecked(select);
 		}
 	});
 	goog.array.forEach(['toolbar-font-small', 'toolbar-font-medium', 'toolbar-font-large'],
 	function(id) {
 		var button = tb.getChild(id);
 		// Let the selection model control the button's checked state.
 		button.setAutoStates(goog.ui.Component.State.CHECKED, false);
 		selectionModel.addItem(button);
 		goog.events.listen(button, goog.ui.Component.EventType.ACTION,
 		function(e) {
 			selectionModel.setSelectedItem(e.target);
 		});
 	});
	goog.dom.getElement('gtb').style.visibility = 'visible';
	goog.dom.getElement('sidebar').style.visibility = 'visible';
	
	// finally, figure out resource_id and call for content
	resource_id=window.location.href.split('=')[1];
	goog.net.XhrIo.send('scriptcontent',
		parseInitialJSON,
		'POST',
		'resource_id='+resource_id
	)
}

/**
 * Gets script data and puts it all in
 * it's place.
 * 
 * @param {goog.event.BroswerEvent} e JSON from the server with all
 * the script data
 */
function parseInitialJSON(e){
	// if script was not found on server, show that
    if(e.target.getResponseText()=='not found'){
        lines = [{}];
		lines[0].text="Sorry, the script wasn't found.";
		lines[0].format=1;
        paint();
        return;
    }
	// else, parse json, put stuff in place
    var p = e.target.getResponseJson();
	// script title
	// lines of text in the script
	// notes on the script
	// collaborators on script
	// autosave setting

	// set up title
    var title=p['title'];
    goog.dom.getElement('title').innerHTML=title;
	document.title = title;
    window["lastSavedVersionNumber"] = p["lastSavedVersionNumber"]

	// set up lines of text into global variable
    var x = p['lines'];

    for(var i=0; i<x.length; i++){
        lines.push({});
		lines[i].text=x[i][0];
		lines[i].format=x[i][1];
		var v=lines[i].format;
		if(v!=0 && v!=1 && v!=2 && v!=3 && v!=4 && v!=5){
			lines[i].format=1;
		}
		if(typeof lines[i].text!='string'){
			lines[i].text='';
		}
    }

	// if this script has just been started
	// put cursor at the end of line
    if(lines.length==2){
        pos.row=anch.row=1;
        pos.col=anch.col=lines[1].text.length;
    }
    
    // lots of blank lines at the end causes problems for some
    // reason. This is a bad fix for that.
    for (var i=lines.length-1; i>=0; i--){
	if (lines[i].text==''){
	    lines.splice(i,1);
	}
    }

    // put notes into global variable
	var x=p['notes'];
    for(i in x){
        notes.push({});
		notes[i].row=x[i]['row'];
		notes[i].col=x[i]['col'];
		notes[i].thread_id=x[i]['thread_id'];
		notes[i].msgs=[];
		for(j in x[i]['msgs']){
			notes[i].msgs.push({});
			notes[i].msgs[j].text=x[i]['msgs'][j]['text'];
			notes[i].msgs[j].msg_id=x[i]['msgs'][j]['msg_id'];
			notes[i].msgs[j].user=x[i]['msgs'][j]['user'];
			notes[i].msgs[j].readBool=x[i]['msgs'][j]['readBool'];
		}
    }
    // big fuck ups if notes arn't actually on a line
    for(i in notes){
	if(notes[i].row>lines.length-1){
	    notes[i].row=lines.length-1;
	    notes[i].col=0;
	}
    }
	uniqueNotePositions();

	// take collaborators list and put them
	// into dom
    var collabs=p['sharedwith'];
    var c = goog.dom.getElement('hasAccess');
    for (i in collabs){
        var TR = c.appendChild(document.createElement('tr'));
        TR.id=collabs[i];
        TR.appendChild(document.createElement('td')).appendChild(document.createTextNode(collabs[i]));
        var newA = TR.appendChild(document.createElement('td')).appendChild(document.createElement('a'));
        newA.appendChild(document.createTextNode('Remove Access'));
        newA.href="javascript:removeAccess('"+collabs[i]+"')";
    }

	// changes the autosave bool to user prefrence
	autosaveBool = (p['autosave']=='true' ? true : false);

	// open up scene tab
    tabs(0);

	// figure out character and scene names
    characterInit();
    sceneIndex();

	// put actual dom cursor into hidden text box
    goog.dom.getElement('ccp').focus();
    goog.dom.getElement('ccp').select();

	// set starting position for save button
    goog.dom.getElement('saveButton').value="Saved";
    goog.dom.getElement('saveButton').disabled=true;

	// set up canvas for printing, then print and repeat
    wrapAll();
	pagination();
    changeFontSize('font-small');
    	noteIndex();

	
	//make info bar visible
	goog.dom.getElement('info').style.width=(editorWidth-6)+"px";
	goog.dom.getElement('info').style.visibility="visible";
	fillInfoBar();
	
	(function animloop(){
        var needsRepaint = calculate();
        if (needsRepaint)
	        paint();
	    requestAnimFrame(animloop);
	})();
    //setInterval('paint()', 25);

	// stuff is running, gracefully fade to standard GUI
	var n = new goog.fx.dom.FadeOutAndHide(goog.dom.getElement('loading'), 500);
	goog.events.listen(n, goog.fx.Animation.EventType.END, function(e){goog.dom.removeNode(goog.dom.getElement('loading'))})
	n.play()
};
