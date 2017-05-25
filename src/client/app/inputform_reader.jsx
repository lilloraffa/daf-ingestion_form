//import React from 'react';
//import {render} from 'react-dom';
/*
export class Prova extends React.Component{
  //var dcat_title = document.getElementById('dct:title').value
  getJsonDcatap(){
    alert("ciao")
  }

}
*/
export {getJsonCatalog}
function getJsonCatalog(){
  var json = {}
  json['dcatap'] = getJsonDcatap()
  json['dataschema'] = getJsonDataschema()
  json['operational'] = getJsonOperational()
  sendPostData(json)
  //alert(JSON.stringify(json))
  console.log(json)

  return json
}

function sendPostData(json) {
/*
  $.ajax({
  type: "POST",
  url: "http://localhost:9000/getJson",
  data: json,
  success: function( data ) {
    console.log(data)
    alert('ok')}
});
*/
  return json
}

function getJsonDcatap(){
  //Get Title (can be many)
  var dcat_title_n = document.querySelectorAll('[id^="dct:title_"]')
  //Get Description (can be many)
  var dcat_desc_n = document.querySelectorAll('[id^="dct:description_"]')
  //Get Theme (Needs to be one)
  var dcat_theme = document.querySelector('[id="dcat:theme"]')
  //Get Categories (can be many)
  var dcat_subject_n = document.querySelectorAll('[id^="dct:subject"]')
  //Get Keywords/Tags
  var dcat_keyword = document.querySelector('[id="dct:keyword"]')
  //Get Ownership (can be many)
  var dcat_rightsHolder_n = document.querySelectorAll('[id^="dct:rightsHolder"]')
  //Get Periodicity
  var dcat_accrualPeriodicity = document.querySelector('[id="dct:accrualPeriodicity"]')
  //Get Language
  var dcat_language = document.querySelector('[id="dct:language"]')
  //Get Landing Page
  var dcat_landingPage= document.querySelector('[id="dcat:landingPage"]')

  var json = {}
  json['dct:title'] = getMultiElement(dcat_title_n)
  json['dct:description'] = getMultiElement(dcat_desc_n)
  json['dct:theme'] = dcat_theme.value
  json['dct:subject'] = getMultiElement(dcat_subject_n)
  json['dct:keyword'] = dcat_keyword.value
  json['dct:rightsHolder'] = getMultiElement(dcat_rightsHolder_n)
  json['dct:accrualPeriodicity'] = dcat_accrualPeriodicity.value
  json['dct:language'] = dcat_language.value
  json['dcat:landingPage'] = dcat_landingPage.value
  //alert(JSON.stringify(json) + " - i")
  return json
}

function getJsonDataschema(){

  var namespace = document.querySelector('[id="ds_namespace"]')
  var name = document.querySelector('[id="ds_name"]')
  var aliases = document.querySelector('[id="ds_aliases"]')
  var fields_name = document.querySelectorAll('[id^="ds_fields-name"]')
  var fields_type = document.querySelectorAll('[id^="ds_fields-type"]')
  var fields_metadata_desc = document.querySelectorAll('[id^="ds_fields-metadata_desc"]')
  var fields_metadata_required = document.querySelectorAll('[id^="ds_fields-metadata_required"]')
  var fields_metadata_fieldtype = document.querySelectorAll('[id^="ds_fields-metadata_fieldtype"]')
  var fields_metadata_cat = document.querySelectorAll('[id^="ds_fields-metadata_cat"]')
  var fields_metadata_tag = document.querySelectorAll('[id^="ds_fields-metadata_tag"]')
  var fields_metadata_semsubj = document.querySelectorAll('[id^="ds_fields-metadata_sem-subj"]')
  var fields_metadata_semcontext = document.querySelectorAll('[id^="ds_fields-metadata_sem-context"]')
  var fields_metadata_constr = document.querySelectorAll('[id^="ds_fields-metadata_constr"]')
  var fields_metadata_constr_val = document.querySelectorAll('[id^="ds_fields-metadata_constr_val"]')

  var fieldsList = []

  for (var i=0; i<fields_name.length; i++) {
    var field = {}
    field['name'] = fields_name[i].value
    field['type'] = fields_type[i].value

    var metadata = {}
    metadata['desc'] = {val: fields_metadata_desc[i].value}
    metadata['required'] = fields_metadata_required[i].value
    metadata['field_type'] = fields_metadata_fieldtype[i].value
    metadata['cat'] = fields_metadata_cat[i].value
    metadata['tag'] = fields_metadata_tag[i].value
    metadata['constr'] = [{type: fields_metadata_constr[i].value, param: fields_metadata_constr_val[i].value}]
    metadata['semantics'] = {'@id': fields_metadata_semsubj[i].value, '@context': fields_metadata_semcontext[i].value}

    field['metadata'] = metadata
    fieldsList.push(field)
  }

  var json = {}
  json['namespace'] = namespace.value
  json['name'] = name.value
  json['aliases'] = aliases.value
  json['fields'] = fieldsList

  //alert(JSON.stringify(json) + " - i")
  return json

}

function getJsonOperational(){

  var ops_uri = document.querySelector('[id="ops_uri"]')
  var ops_group_own = document.querySelector('[id="ops_group_own"]')
  var ops_is_std = document.querySelector('[id="ops_is_std"]')
  var ops_std_uri = document.querySelector('[id="ops_std_uri"]')
  var ops_read_type = document.querySelector('[id="ops_read_type"]')
  var ops_georef_lat_list = document.querySelectorAll('[id^="ops_georef_lat"]')
  var ops_georef_lon_list = document.querySelectorAll('[id^="ops_georef_lon"]')

  var georef = []
  for (var i=0; i<ops_georef_lon_list.list; i++){
    var georefObj = {lat: ops_georef_lat_list[i].value, lon: ops_georef_lon_list[i].value}
    georef.push(georefObj)
  }

  var json = {}
  json['uri'] = ops_uri.value
  json['group_own'] = ops_group_own.value
  json['is_std'] = ops_is_std.value

  var std_schema = {}
  std_schema['std_uri'] = ops_std_uri.value
  json['std_schema'] = std_schema

  json['read_type'] = ops_read_type.value
  json['georef'] = georef
  json['input_src'] = {
    url: "file_url"
  }

  //alert(JSON.stringify(json) + " - i")
  return json
}

function getMultiElement(elements) {
  var json = {}
  for (var elem of elements) {
    const idParts = elem.id.split("_")
    const idValue = idParts[(idParts.length - 1)]
    json[idValue] = elem.value
  }
  return json
}
