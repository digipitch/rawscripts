# Rawscripts - Screenwriting Software
# Copyright (C) Ritchie Wilson
#
# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU Affero General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU Affero General Public License for more details.
#
# You should have received a copy of the GNU Affero General Public License
# along with this program.  If not, see <http://www.gnu.org/licenses/>.

import json

from flask import render_template, request, jsonify, Response
from flask_user import login_required, current_user
from htmltreediff import diff
from lxml import etree

from rawscripts import db, app
from flask_models import ResourceVersion, Screenplay, DuplicateScript, ScriptData
from flask_utils import resource_access


@app.route('/revisionhistory')
@login_required
@resource_access()
def revision_history():
    user = current_user.name
    resource_id = request.args.get('resource_id')
    version = request.args.get('version')
    revisions = ResourceVersion.get_historical_metadata(resource_id, version)
    data = []
    for revision in revisions:
        d = {'updated': revision.timestamp.strftime("%b %d")}
        d['version'] = revision.version
        d['autosave_class'] = 'autosave' if revision.autosave else 'manualsave'
        exports, tag = revision.get_exports_and_tags()
        d['export'] = exports
        d['tag'] = tag
        d['emailed'] = '' if exports.startswith('[[],') else 'Emailed'
        d['tagged'] = '' if tag == '' else 'Tag'
        data.append(d)

    title = Screenplay.get_title(resource_id)
    return render_template('revisionhistory.html', user=user, mode="PRO",
                           resource_id=resource_id, r=data, title=title)

@app.route('/revisionlist', methods=['POST'])
@login_required
@resource_access()
def revision_list():
    resource_id = request.form['resource_id']
    past_ids = []
    new_script = resource_id
    while True:
        past_script = DuplicateScript.query. \
                          filter_by(new_script=new_script).first()
        if past_script is None:
            break
        past_ids.append([past_script.from_script, past_script.from_version])
        new_script = past_script.from_script
    out = []
    for past_id, past_version in past_ids:
        revisions = ResourceVersion.get_historical_metadata(past_id, past_version)
        for revision in revisions:
            updated = revision.timestamp.strftime("%b %d")
            export, tag = revision.get_exports_and_tags()
            out.append([past_id, updated, revision.version, revision.autosave, export, tag])

    return Response(json.dumps(out), mimetype='text/plain')

@app.route('/revisioncompare', methods=['POST'])
@login_required
def compare_versions():
    resource_id_1 = request.form['v_o_id']
    resource_id_2 = request.form['v_t_id']
    version_1 = request.form['v_o']
    version_2 = request.form['v_t']
    html_1 = ScriptData.get_html_for_version(resource_id_1, version_1)
    html_2 = ScriptData.get_html_for_version(resource_id_2, version_2)
    if len(html_1) < 10000 and len(html_2) < 10000:
        return diff(html_1, html_2)
    begining_string = ''
    while '</p>' in html_1:
        first_tag = html_1.index('</p>') + 4
        if html_1[:first_tag] == html_2[:first_tag]:
            begining_string += html_1[:first_tag]
            html_1 = html_1[first_tag:]
            html_2 = html_2[first_tag:]
        else:
            break

    end_string = ''
    while '</p>' in html_1:
        last_tag_start = html_1.rfind('<p CLASS=')
        length_of_tag = len(html_1) - last_tag_start
        if html_1[-length_of_tag:] == html_2[-length_of_tag:]:
            end_string = end_string + html_1[-length_of_tag:]
            html_1 = html_1[:-length_of_tag]
            html_2 = html_2[:-length_of_tag]
        else:
            break

    return begining_string  + diff(html_1, html_2) + end_string

@app.route('/revisionget', methods=['POST'])
@login_required
@resource_access()
def get_version_html():
    resource_id = request.form['resource_id']
    version = request.form['version']
    if version == 'latest':
        version = ScriptData.get_last_version_number(resource_id).version
    return ScriptData.get_html_for_version(resource_id, version)
