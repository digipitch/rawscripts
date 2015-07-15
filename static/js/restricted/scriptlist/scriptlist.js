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



/* Closure Compiler for JS changes all function
 * names. To have human readable function names
 * in the html, need to attach those functions
 * to the window object; as done here.
 */
window['removeAccess'] = removeAccess;
window['sharePrompt'] = sharePrompt;
window['init'] = init;
window['hideEmailPrompt'] = hideEmailPrompt;
window['emailScript'] = emailScript;
window['hideRenamePrompt'] = hideRenamePrompt;
window['renameScript'] = renameScript;
window['hideUploadPrompt'] = hideUploadPrompt;
window['hideExportPrompt'] = hideExportPrompt;
window['exportScripts'] = exportScripts;
window['hideSharePrompt'] = hideSharePrompt;
window['shareScript'] = shareScript;
window['uploadPrompt'] = uploadPrompt;
window['renamePrompt'] = renamePrompt;
window['exportPrompt'] = exportPrompt;
window['emailPrompt'] = emailPrompt;
window['emailNotifyShare'] = emailNotifyShare;
window['emailNotifyMsg'] = emailNotifyMsg;



function init(){
	// grab scripts, and create lists
	refreshList();
	// prevent some defaults on forms in prompt
	goog.events.listen(goog.dom.getElement('renameField'), goog.events.EventType.KEYDOWN,
		function(e){
			if(e.keyCode==13){
				e.preventDefault();
				renameScript()
			}
		}
	);
	goog.events.listen(goog.dom.getElement('subject'), goog.events.EventType.KEYDOWN,
		function(e){
			if(e.keyCode==13){
				e.preventDefault();
			}
		}
	);

	// Some setup for contextual menus on the
	// user defined folders
	goog.events.listen(window, goog.events.EventType.CLICK, removeContextMenu)
	goog.events.listen(window, goog.events.EventType.CONTEXTMENU, contextmenu)
}

/**
 * Calls the server for all screenplay information
 * including names, last modified, folders,
 * permissions, unread notes, unread shared scripts,
 * etc. Server responds with JSON, function cleans
 * out old data, then puts new data in it's place
 * @param {string} v Script ID for if share prompt
 * is opened
 */
function refreshList(v){
    return;
}


/**
 * Opens the upload prompt on click
 */
function uploadPrompt(){
	goog.dom.getElement('uploadpopup').style.visibility = 'visible';
}
/**
 * Hides the upload prompt on click
 */
function hideUploadPrompt(){
	goog.dom.getElement('uploadFrame').src = '/convert';
	goog.dom.getElement('uploadpopup').style.visibility = 'hidden';
}

/**
 * Add listener for messages from upload iframes
 */
window.addEventListener("message", recieveMessage, false);

/**
 * Takes that message from iframe and shows correct
 * GUI, either "Loading" bar, or "Complete" message
 * @param {event object} e Contains data from cross
 * iframe message event
 */
function recieveMessage(e){
	if(e.origin!="http://www.rawscripts.com")return;
	if(e.data=="uploading"){
		goog.dom.getElement("uploading").style.display="block";
		goog.dom.getElement("uploadFrame").style.display="none";
	}
	else{
		goog.dom.getElement("uploading").style.display="none";
		goog.dom.getElement("uploadFrame").style.display="block";
		window.open("/editor?resource_id="+e.data);
		refreshList();
	}
    
}
/**
 * Opens the rename prompt on click
 */
function renamePrompt(){
	// first check that user has selected only
	// one script to rename
	var counter = 0;
	var listItems = document.getElementsByTagName('input');
	for (var i=0; i<listItems.length; i++){
		if(listItems[i].type == 'checkbox'){
			if (listItems[i].checked == true){
				if (listItems[i].name != 'trashListItems' && listItems[i].name != 'sharedListItems'){
					var resource_id = listItems[i].value;
					counter++;
				}
			}
		}
	}
	if(counter>1)alert("Please select one at a time");
	else if (counter==1){
		// if only one script, open rename prompt
		var title = 'name' + resource_id;
		goog.dom.getElement('renameTitle').innerHTML = "Rename " + goog.dom.getElement(title).innerHTML;
		goog.dom.getElement('renameField').value = goog.dom.getElement(title).innerHTML;
		goog.dom.getElement('renamepopup').style.visibility = 'visible';
		goog.dom.getElement('resource_id').value = resource_id;
	}
	
}
/**
 * hides the rename prompt on click
 */
function hideRenamePrompt(){
	goog.dom.getElement('renameField').value = "";
	goog.dom.getElement('renamepopup').style.visibility = 'hidden';
}

/**
 * Collects new user inputed title, updates GUI,
 * then sends new title and resource_id to server
 */	
function renameScript(){
	// Collect resource_id and new name
	var resource_id = goog.dom.getElement('resource_id').value;
	var rename = goog.dom.getElement('renameField').value;
	if (rename==""){return;}
	// Update DOM
	var id = "name"+resource_id;
	var a = document.getElementsByTagName('a');
	for (i in a){
		if (a[i].id==id){
			a[i].innerHTML = rename;
		}
	}
	// Send data to server
	goog.net.XhrIo.send('/rename',
		function(){},
		'POST',
		'resource_id='+resource_id+'&rename='+rename+'&fromPage=scriptlist'
	);
	// Hide prompt
	hideRenamePrompt()
}


/**
 * Takes checked boxes (selected scripts),
 * then creates a table in the export prompt
 * giving options for title page and export
 * format.
 */
function exportPrompt(){
	var counter = 0;
	var listItems = document.getElementsByTagName('input');
	for (var i=0; i<listItems.length; i++){
		if(listItems[i].type == 'checkbox'){
			if (listItems[i].checked == true){
				if (listItems[i].name.match(/listitems/gi)){
					var newRow = document.createElement('tr');
					var row = goog.dom.getElement('exportList').appendChild(newRow);
					var newData = row.appendChild(document.createElement('td'));
					var newTxt = document.createTextNode(goog.dom.getElement('name'+listItems[i].value).innerHTML);
					newData.appendChild(newTxt);
					//Create Selection cell					
					newData = row.appendChild(document.createElement('td'));
					var newSelect = document.createElement('select');
					var select = newData.appendChild(newSelect);
					select.name = listItems[i].value;
					select.className='export_format_select';
					var option = select.appendChild(document.createElement('option'));
					option.appendChild(document.createTextNode('Adobe PDF'));
					option = select.appendChild(document.createElement('option'));
					option.appendChild(document.createTextNode('.txt'));
                    newData = newRow.appendChild(document.createElement('td'));
                    newSelect = newData.appendChild(document.createElement('select'));
                    newSelect.name="export_format";
                    option = newSelect.appendChild(document.createElement('option'));
                    option.appendChild(document.createTextNode('Without Title Page'));
                    option = newSelect.appendChild(document.createElement('option'));
                    option.appendChild(document.createTextNode('With Title Page'));
                    var a = newRow.appendChild(document.createElement('td')).appendChild(document.createElement('a'));
                    a.appendChild(document.createTextNode('Edit Title page'));
                    a.href="/titlepage?resource_id="+listItems[i].value;
                    a.target="_blank"
					a.style.color="blue"
					counter++;
				}
			}
		}
	}
	if (counter>0){
		goog.dom.getElement('exportpopup').style.visibility = 'visible';
	}
}
/**
 * Hides export promt. Called when user clicks
 * close icon. Also called after user actually 
 * exports scripts.
 */
function hideExportPrompt(){
	goog.dom.getElement('exportpopup').style.visibility = 'hidden';
	goog.dom.getElement('exportList').innerHTML = '';
}
/**
 * Cycles through scripts to be exported. For
 * each script to be exported, collects options
 * and opens a new window at a url with those
 * options.
 */
function exportScripts(){
	var id;
	var format;
	var exports = document.getElementsByTagName('select');
	for (var i=0; i<exports.length; i++){
        if(exports[i].className=='export_format_select'){
            id = exports[i].name;
            if (exports[i].selectedIndex == 0){format = 'pdf';}
            else{format = 'txt';}
            var n = exports[i].parentNode;
            n = n.nextSibling;
            if(n.nodeName=="#text")n=n.nextSibling;
            n=n.firstChild;
            if(n.nodeName=="#text")n=n.nextSibling;
            var title = "&title_page="+n.selectedIndex;
            url = '/export?resource_id=' + id + '&export_format=' + format + '&fromPage=scriptlist'+title;
            window.open(url);
        }
    }
	hideExportPrompt();
}


/**
 * Opens email prompt GUI on click
 * @param { string } v resource_id of script
 */
function emailPrompt(v){
	var resource_id=v;
	goog.dom.getElement('emailpopup').style.visibility = 'visible';
    goog.dom.getElement('edit_title_href').href='/titlepage?resource_id='+resource_id
}

/**
 * Hide email prompt when email is complete
 * or when user chooses.
 */
function hideEmailPrompt(){
	goog.dom.getElement('emailpopup').style.visibility = 'hidden';
	goog.dom.getElement('recipient').value = "";
	goog.dom.getElement('subject').value = "";
	goog.dom.getElement('email_message').innerHTML = "";
}

/**
 * Does the job of collecting recipient names,
 * subject, and message, then sends that and
 * the resource_id to server.
 */
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
	var subject = goog.dom.getElement('subject').value;
	if(subject=="")subject="Script";
	var body_message = goog.dom.getElement('email_message').innerHTML;
    var title_page = goog.dom.getElement("emailTitle").selectedIndex;
    var resource_id = goog.dom.getElement('edit_title_href').href.split('=')[1];
	goog.net.XhrIo.send('/emailscript',
		emailComplete,
		'POST',
		'resource_id='+resource_id+'&recipients='+recipients+'&subject='+encodeURIComponent(subject)+'&body_message='+encodeURIComponent(body_message)+'&fromPage=scriptlist&title_page='+title_page
	);
	goog.dom.getElement('emailS').disabled = true;
	goog.dom.getElement('emailS').value = 'Sending...';
}

/**
 * If email sent, good. If not, alert
 */
function emailComplete(e){
    console.log(e)
	goog.dom.getElement('emailS').disabled = false;
	goog.dom.getElement('emailS').value = 'Send';
	if (e.target.getResponseText()=='sent'){
		alert("Email Sent")
		hideEmailPrompt();
	}
	else{
		alert("There was a problem sending your email. Please try again later.")
	}
}

/**
 * Opens the share prompt, and populate the
 * table with info on who already has access
 * @param { string } v Resource_id of script
 */
function sharePrompt(v){
	goog.dom.getElement('shareS').disabled = false;
	goog.dom.getElement('shareS').value = "Send Invitation";
	var collabs = (goog.dom.getElement('share'+v).title=="" ? [] : goog.dom.getElement('share'+v).title.split("&"));
	var hasAccess = goog.dom.getElement('hasAccess');
	goog.dom.getElement('collaborator').value = "";
	hasAccess.innerHTML="";
	for (var i=0; i<collabs.length; i++){
		if(collabs[i]!='none'){
			var collabTr = hasAccess.appendChild(document.createElement('tr'));
			collabTr.id='shared'+collabs[i].toLowerCase();
			var emailTd = collabTr.appendChild(document.createElement('td'));
			emailTd.appendChild(document.createTextNode(collabs[i]));
			var remove = collabTr.appendChild(document.createElement('td'));
			remove.align='right';
			var newA = remove.appendChild(document.createElement('a'));
			newA.appendChild(document.createTextNode('Remove Access'));
			var href = "javascript:removeAccess('"+collabs[i]+"')";
			newA.href = href;
		}
	}
	goog.dom.getElement('shareTitle').innerHTML = goog.dom.getElement('name'+v).innerHTML;
	goog.dom.getElement('sharepopup').style.visibility = 'visible';
	goog.dom.getElement('shareResource_id').value = v;
	goog.dom.getElement('email_notify_share').checked=true;
	goog.dom.getElement('email_notify_msg').checked = false;
	goog.dom.getElement('email_notify_msg').disabled = false;
	goog.dom.getElement('share_message').style.display='none';
}

/**
 * Hides share prompt and clears fields
 */
function hideSharePrompt(){
	goog.dom.getElement('sharepopup').style.visibility = 'hidden';
	goog.dom.getElement('collaborator').value = "";
	goog.dom.getElement('hasAccess').innerHTML = '';
	goog.dom.getElement('email_notify_msg').checked=false;
	goog.dom.getElement('share_message').style.display='none';
	goog.dom.getElement('share_message').innerHTML="";
}	

/**
 * Goes through fields in share prompt for
 * data and options, sends those to server
 */
function shareScript(){
	var r = goog.format.EmailAddress.parseList(goog.dom.getElement('collaborator').value)
	var arr=[];
	for(i in r){
		var a = r[i].address_;
		if(a!=""){
			arr.push(a);
		}
	}
	if(arr.length==0){
		alert('You need to add at least one email address.')
		return;
	}
	var collaborators = arr.join(',');
	var resource_id = goog.dom.getElement('shareResource_id').value;
	var sendEmail = (goog.dom.getElement('email_notify_share').checked==true ? 'y' : 'n');
	var addMsg = (goog.dom.getElement('email_notify_msg').checked==true ? 'y' : 'n');
	var msg = ((sendEmail=='y' && addMsg=='y') ? encodeURIComponent(goog.dom.getElement('share_message').innerHTML) : 'n');
	goog.net.XhrIo.send('/share',
		function(){
			goog.dom.getElement('email_notify_share').checked=true;
			goog.dom.getElement('email_notify_msg').checked=false;
			goog.dom.getElement('email_notify_msg').disabled=false;
			goog.dom.getElement('share_message').innerHTML = "";
			goog.dom.getElement('share_message').style.display='none';
			refreshList(resource_id)
		},
		'POST',
		'resource_id='+resource_id+'&collaborators='+collaborators+'&fromPage=scriptlist&sendEmail='+sendEmail+'&addMsg='+addMsg+'&msg='+msg
	);
	goog.dom.getElement('shareS').disabled = true;
	goog.dom.getElement('shareS').value = "Sending Invites...";
}

/**
 * Removes view access from a user
 * @param {string} email of user
 * to remove
 */
function removeAccess(v){
	var bool = confirm("Are you sure you want to take away access from "+v+"?");
	if (bool==true){
		var resource_id = goog.dom.getElement('shareResource_id').value;
		goog.net.XhrIo.send('/removeaccess',
			removeShareUser,
			'POST',
			'resource_id='+resource_id+'&fromPage=scriptlist&removePerson='+v
		);
		goog.dom.getElement('shared'+v.toLowerCase()).style.opacity = '0.5';
		goog.dom.getElement('shared'+v.toLowerCase()).style.backgroundColor = '#ddd';
	}
}
/**
 * Updates GUI after server says
 * a users access has been removed
 */
function removeShareUser(d){
	var data = d.target.getResponseText();
	goog.dom.getElement('shared'+data).parentNode.removeChild(goog.dom.getElement('shared'+data));
	refreshList();
}

/**
 * Changes GUI for email notification
 * when sharing script with other people
 * @param {this object} e The checkbox 
 * in the prompt
 */
function emailNotifyShare(e){
	var el = goog.dom.getElement('email_notify_msg');
	if (e.checked==true){
		el.disabled=false;
	}
	else{
		el.disabled=true;
		goog.dom.getElement('share_message').style.display='none'
		goog.dom.getElement('email_notify_msg').checked=false;
	}
}
/**
 * Changes GUI for email notification msg
 * when sharing script with other people
 * @param {this object} e The checkbox 
 * in the prompt
 */
function emailNotifyMsg(e){
	var el = goog.dom.getElement('share_message');
	if (e.checked==true){
		el.style.display='block'
	}
	else{
		el.style.display='none'
	}
}

/* FOLDER FUNCTIONS
 * 
 * Aside from permission based folders ("My Scripts", 
 * "Shared With Me", and "Trash"), Users can create
 * folders of their own to organize scripts how they
 * choose. 
 * 
 * Users can Create, Rename, and Delete folders. They
 * can move scripts into folders.
*/


/**
 * Prompts the user for a new name for the
 * folder. It then finds the relevant folder_id
 * and posts the change.
 * @param { string } v folder id
 */
function renameFolder(v){
	var prev_title=goog.dom.getTextContent(goog.dom.getElement('Folder'+v));
	var f = prompt("Rename Folder", prev_title)
	if(f!=null){
		f=f.replace(/^\s+/,"").replace(/\s+$/,"");
		if(f!=""){
			var folder_id = v;
			var d = goog.dom.getElement("Folder"+v);
			goog.dom.removeChildren(d);
			d.appendChild(document.createElement("img")).src="images/folder.png";
			d.appendChild(document.createElement("span")).appendChild(document.createTextNode(" "));
			d.appendChild(document.createTextNode(f));
			goog.net.XhrIo.send('/renamefolder',
				refreshList,
				'POST',
				'folder_name='+f+'&folder_id='+folder_id
			);
		}
	}
}
/**
 * Confirms the user wants to delete the
 * folder. Then does if if true
 */
function deleteFolder(){
	var c = confirm("Are you sure you want to delete this folder?")
	if(c==true){
		var f = folder_id.replace('Folder','');
		goog.net.XhrIo.send('/deletefolder',
			refreshList,
			'POST',
			'folder_id='+f
		);
	}
}


/**
 * Open context menu on user defined folders
 * @param {goog.events.BrowserEvent} e The div
 * object that is right clicked on.
 */
function contextmenu(e){
	if(goog.dom.getElement('folder_context_menu')!=null){
		goog.dom.removeNode('folder_context_menu')
	}
	if(e.target.className=="tab" || e.target.className=="tab current"){
		if(e.target.id!="ownedFolder" && e.target.id!="sharedFolder" && e.target.id!="trashFolder"){
			e.preventDefault();
			folder_id=e.target.id;
			var menu = new goog.ui.PopupMenu();
			menu.setId('folder_context_menu');
			menu.addItem(new goog.ui.MenuItem('Rename Folder'));
			menu.addItem(new goog.ui.MenuItem('Delete Folder'));
			menu.render(document.body);
			menu.setPosition(e.clientX,e.clientY);
			menu.setVisible(true)
			goog.events.listen(menu, 'action', folderContextMenuAction)
		}
	}
}

/**
 * Event from folder context menu
 * @param {goog.events.Event} e option clicked
 */
function folderContextMenuAction(e){
	if(e.target.content_=='Rename Folder'){
		renameFolder(folder_id.replace('Folder',''))
	}
	else if(e.target.content_=='Delete Folder'){
		deleteFolder(folder_id.replace('Folder',''))
	}

}
/**
 * Context menu doesn't dissaprear on
 * unfocus. So this function does that
 */
function removeContextMenu(){
	if(goog.dom.getElement('folder_context_menu')!=null){
		goog.dom.removeNode('folder_context_menu');
	}
}
