import React from 'react';
import {render} from 'react-dom';
import {getJsonCatalog} from './inputform_reader.jsx'
import {processInputFile, getFlatSchema} from './avroschema.jsx'
import DataInputForm from './data_form.jsx'

const data_dcatap = DataInputForm.getDcatap()
const data_dataschema = DataInputForm.getDataschema()
const data_dataschema_field = DataInputForm.getDataschemaField()
const data_dataschema_field_metadata = DataInputForm.getDataschemaFieldMetadata()
const data_operational = DataInputForm.getOperational()


class NewDsForm extends React.Component {
  render () {
    return <div className="container">
            <form>
              <FormSection struct={this.props.dcatap} data="" />
              <FormSectionDataSchema struct={this.props.dataschema} data="" />
              <FormSection struct={this.props.operational} data="" />
              <input type="button" value="Calc Schema" onClick={() => getJsonCatalog()}/>
            </form>
           </div>;
  }
}

class FormSectTitle extends React.Component {
  render () {
    return <div>
          <div className='sectionTitle'>
            <h2>{this.props.title}</h2>
           </div>
           <div className='sectionSubTitle'>
            <p>{this.props.subtitle}</p>
           </div>
           </div>;
  }
}

class FormItemInput extends React.Component{
  render() {
    return <input className={this.props.className} id={this.props.id} />
  }
}
class FormItemText extends React.Component{
  render() {
    //console.log((typeof this.props.textVal !== "undefined") ? this.props.textVal : '')
    return <textarea className={this.props.className} id={this.props.id} ></textarea>
  }
}
class FormItemSelectLang extends React.Component{
  render() {
    ///console.log(this.props.defaultVal)

    return <select className={this.props.className} id={this.props.fieldId} onChange={this.props.onChange} value={this.props.defaultVal}>
      <option value=""></option>
      <option value="ita">Italiano</option>
      <option value="eng">English</option>
      <option value="ger">German</option>
      <option value="fra">Franch</option>
    </select>
  }
}

//TODO Add mechanism to automatically add multiple constraints starting from zero.
class FormItemSelectConstr extends React.Component{
  render() {
    return <div>
            <select className={this.props.className} id={this.props.id + "_" + this.props.fieldNum} onChange={this.props.onChange}>
              <option value="" default></option>
              <option value=">"> &gt; </option>
              <option value=">="> &gt; = </option>
              <option value="<"> &lt; </option>
              <option value="<="> &lt; = </option>
              <option value="list"> list </option>
            </select>
            <input className={this.props.className} id={this.props.id + "_value_" + this.props.fieldNum} />
          </div>
  }
}
class FormItemSelectTheme extends React.Component{
  render() {
    return <select className={this.props.className} id={this.props.struct.fieldId} onChange={this.props.onChange}>
      <option value="" default></option>
      <option value="uri_cultura">Cultura & Turismo</option>
      <option value="uri_economia">Economia & Finanza</option>
      <option value="uri_sanita">Sanita</option>
      <option value="uri_trasporti">Trasporti</option>
    </select>
  }
}
//Still to be implemented
class FormItemSelectCategory extends React.Component{
  render() {
    return <select className={this.props.className} id={this.props.struct.fieldId} onChange={this.props.onChange}>
      <option value="" default></option>
      <option value="uri_cultura">Cultura & Turismo</option>
      <option value="uri_economia">Economia & Finanza</option>
      <option value="uri_sanita">Sanita</option>
      <option value="uri_trasporti">Trasporti</option>
    </select>
  }
}
//Still to be implemented
class FormItemSelectYesNo extends React.Component{
  render() {
    return <select className={this.props.className} id={this.props.id}>
      <option value="" default></option>
      <option value="1">Yes</option>
      <option value="0">No</option>
    </select>
  }
}

class FormItemSelectFieldType extends React.Component{
  render() {
    return <select className={this.props.className} id={this.props.id}>
      <option value="" default></option>
      <option value="dimension">Dimensione</option>
      <option value="numval">Numerical Value</option>
      <option value="textval">Textual Value</option>
    </select>
  }
}

class FormItemSelectDsReadType extends React.Component{
  render() {
    return <div>
    <label htmlFor={this.props.struct.fieldId}>{this.props.struct.fieldName}</label>
    <select className="form-control" id={this.props.struct.fieldId}>
      <option value="update">Ultimo Aggiornamento</option>
      <option value="ts">Time Series (ritorna tutto il dataset)</option>
    </select>
    </div>
  }
}

class FormItemGeoRef extends React.Component{
  render() {
    return <div>
            Latitudine: <input className="form-control" id={this.props.struct.fieldId + "_lat"} /> <br />
            Longitude: <input className="form-control" id={this.props.struct.fieldId + "_lon"} /> <br />
          </div>
  }
}
class FormItemInputDataType extends React.Component {
  constructor(props){
    super(props)
    this.state = {inputVal: this.props.value}

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    this.setState({inputVal: event.target.value});
  }

  render() {
    return <div>
      <label htmlFor={this.props.fieldId}>{this.props.fieldName}</label>
      <input className="form-control" id={this.props.fieldId} value={this.state.inputVal} onChange={this.handleChange}/>
    </div>
  }
}
//Fields for dataschema
class FormItemFieldNum extends React.Component{
  constructor(props) {
    super(props);
    this.state = {numFields: '', fields: Array()};

    this.addFields = this.addFields.bind(this);
  }

  addFields(){
    const currFields = this.state.fields
    const currNumFields = this.state.fields.length
    const numDeltaFields = this.state.numFields - this.state.fields.length
    if(numDeltaFields < 0) {
      this.setState({
        numFields: this.state.fields.splice(0, this.state.numFields)
      });
    } else {
      var listFields = []
      for (var i = 0; i<numDeltaFields; i++) {
        listFields.push(<FormItemField fieldNum={i + currNumFields}/>)
      }

      this.setState({
        fields: this.state.fields.concat(listFields)
      });
    }
  }
  updateInputValue(evt) {
    this.setState({
      numFields: evt.target.value
    });
  }
  render(){
    return <div>
            <label htmlFor={this.props.struct.fieldId}> {this.props.struct.fieldName} </label>
            <input className="form-control" id={this.props.struct.fieldId} onChange={evt => this.updateInputValue(evt)} />
            <img src="img/icon-plus.png" height="20" width="20" onClick={() => this.addFields()} />
            <div id="field-list">{this.state.fields}</div>
          </div>
  }
}

//Fields for dataschema
class FormItemField extends React.Component{
  constructor(props){
    super(props)
    this.state = {nameField: props.fieldName, fieldProps: props.fieldProps}

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    this.setState({nameField: event.target.value});
  }

  render(){
    return <div key={this.props.fieldNum}>
            <h3>Field {this.props.fieldNum}</h3>
            <label htmlFor={"ds_fields-name_" + this.props.fieldNum}> Nome Campo </label>
            <input className="form-control" id={"ds_fields-name_" + this.props.fieldNum} value={this.state.nameField} onChange={this.handleChange} />
            <FormItemInputDataType className="form-control" fieldId={"ds_fields-type_" + this.props.fieldNum} fieldName="Tipo Campo" value={this.state.fieldProps.type}/>
            <FormItemFieldMetadata className="form-control" fieldId={"ds_fields-metadata"} fieldNum={this.props.fieldNum}/>
          </div>
  }
}

class FormItemInputDataFile extends React.Component {
  calcDataFields(){
    //var data = processInputFile()
    //alert(JSON.stringify(data))
    //alert(JSON.stringify(this.props.compInfo))

    processInputFile((resData)=>{
      console.log(JSON.stringify(resData))
      //this.props.compInfo.
    })
  }
  render(){
    return <div className="form-group">
            <label htmlFor={this.props.fieldId}>{this.props.fieldName}</label>
            <input className={this.props.className} type="file" id={this.props.fieldId} accept=".csv, .txt, .json, .avro" />
            <input type="button" value="Calc Schema" onClick={() => this.calcDataFields()}/>
          </div>
  }
}

//This is the metadata part to be showned to each field of the Dataset
class FormItemFieldMetadata extends React.Component {
  render(){
    return <div>
            <h4>Field Metadata</h4>
            <label htmlFor={this.props.fieldId + "_desc_" + this.props.fieldNum}> Descrizione </label>
            <textarea className="form-control" id={this.props.fieldId + "_desc_" + this.props.fieldNum} ></textarea>
            <label htmlFor={this.props.fieldId + "_required_" + this.props.fieldNum}> Obbligatorio? </label>
            <FormItemSelectYesNo className="form-control" id={this.props.fieldId + "_required_" + this.props.fieldNum} />
            <label htmlFor={this.props.fieldId + "_fieldtype_" + this.props.fieldNum}> Tipo di Campo </label>
            <FormItemSelectFieldType className="form-control" id={this.props.fieldId + "_fieldtype_" + this.props.fieldNum} />
            <label htmlFor={this.props.fieldId + "_cat_" + this.props.fieldNum}> Categoria </label>
            <input className="form-control" id={this.props.fieldId + "_cat_" + this.props.fieldNum} />
            <label htmlFor={this.props.fieldId + "_tag_" + this.props.fieldNum}> Tags </label>
            <input className="form-control" id={this.props.fieldId + "_tag_" + this.props.fieldNum} />
            <label htmlFor={this.props.fieldId + "_sem-subj_" + this.props.fieldNum}> Semantics - Subject URI </label>
            <input className="form-control" id={this.props.fieldId + "_sem-subj_" + this.props.fieldNum} />
            <label htmlFor={this.props.fieldId + "_sem-context_" + this.props.fieldNum}> Semantics - Context URIs </label>
            <input className="form-control" id={this.props.fieldId + "_sem-context_" + this.props.fieldNum} />
            <label htmlFor={this.props.fieldId + "_constr_" + this.props.fieldNum}> Restrizioni & Regole </label>
            <FormItemSelectConstr className="form-control" id={this.props.fieldId + "_constr"} fieldNum={this.props.fieldNum}/>

          </div>
  }
}

class FormItemMultiInput extends React.Component{
  //Mettere gestione stato e constructor()
  constructor(props) {
    super(props);
    this.state = {inputs: Array(), selects: {test: ''}};

    this.handleSelChange = this.handleSelChange.bind(this);
    this.addElement = this.addElement.bind(this);
  }

  //It shows an input for default value and a "plus" button that make appear a new pair (select language)(input) available.
  itemInputMultiLang(info) {

    const InputType = this.props.typeInput
    const SelType = this.props.typeSel
    return <div>
            <label htmlFor={info.fieldId + "_value"}> {info.fieldName} </label>
            <InputType className="form-control" id={info.fieldId + "_value"} />
            <div id={"inputMultiLang_" + info.fieldId}>
              {this.state.inputs.map(input =>
                <div key={info.fieldId + "_" + this.state.selects["lang_" + info.fieldId + input]}>
                  <SelType className="form-control" fieldId={"lang_" + info.fieldId + input} onChange={this.handleSelChange} struct={info} defaultVal={this.state.selects["lang_" + info.fieldId + input]}/>
                  <InputType className="form-control" id={info.fieldId + "_" + this.state.selects["lang_" + info.fieldId + input]} />
                </div>
              )}
            </div>
            <img src="img/icon-plus.png" height="20" width="20" onClick={() => this.addElement()} />
          </div>
  }

  handleSelChange(e){
    var x={}
    x[e.target.id]=e.target.value
    this.setState({selects: Object.assign(this.state.selects, x)})
  }

  addElement(){
    var newInputId = "_" + this.state.inputs.length
    this.setState({inputs: this.state.inputs.concat([newInputId])})
  }

  render() {
    return <div>{this.itemInputMultiLang(this.props.struct)}</div>
  }
}

class FormSectionItem extends React.Component{


  getItem(info, compInfo) {
    //console.log(JSON.stringify(info))
    switch(info.fieldType) {
      case "input":
        return <div>
          <label htmlFor={info.fieldId}>{info.fieldName}</label>
          <input className="form-control" id={info.fieldId} />
        </div>
        break;

      case "text":
        return <div>
          <label htmlFor={info.fieldId}>{info.fieldName}</label>
          <textarea className="form-control" id={info.fieldId}></textarea>
        </div>
        break;

      case "selectTheme":
        return <div>
                <label htmlFor={info.fieldId}>{info.fieldName}</label>
                <FormItemSelectTheme className="form-control" struct={info} />
              </div>
        break;

      case "selectCategory":
        return <div>
                <label htmlFor={info.fieldId}>{info.fieldName}</label>
                <FormItemSelectCategory className="form-control" struct={info} typeInput={FormItemInput} typeSel={FormItemSelectLang}/>
              </div>
        break;

      case "selectLang":
        return <div>
                <label htmlFor={info.fieldId}>{info.fieldName}</label>
                <FormItemSelectLang className="form-control" fieldId ={info.fieldId} struct={info} />
              </div>
        break;

      case "inputMultiLang":
        return <FormItemMultiInput struct={info} typeInput={FormItemInput} typeSel={FormItemSelectLang}/>
        break;

      case "textMultiLang":
        return <FormItemMultiInput struct={info} typeInput={FormItemText} typeSel={FormItemSelectLang}/>
        break;

      case "inputMultiFieldConstr":
        return <FormItemMultiInput struct={info} typeInput={FormItemInput} typeSel={FormItemSelectConstr}/>
        break;

      case "inputNumField":
        return <FormItemFieldNum struct={info}/>
        break;

      case "inputFieldDataType":
        return <FormItemInputDataType struct={info}/>
        break;

      case "selectDsReadType":
        return <FormItemSelectDsReadType struct={info}/>
        break;

      case "geoRef":
        return <FormItemGeoRef struct={info}/>
        break;

        case "selectYesNo":
          return <div>
                  <label htmlFor={info.fieldId}>{info.fieldName}</label>
                  <FormItemSelectYesNo className="form-control" id={info.fieldId}/>
                </div>
          break;



      case "inputFile":
        return <FormItemInputDataFile fieldId={info.fieldId} fieldName={info.fieldName} className="form-control" compInfo={compInfo}/>
        break;

    }
  }
//
  render() {
    return <div className="form-group" key={this.props.fieldId}>
            {this.getItem(this.props.struct, this.props.compInfo)}
          </div>
  }
}

class FormSection extends React.Component {

  getField(fieldProps) {
    return <div className="form-group" key={fieldProps.fieldId}>
            <FormSectionItem struct={fieldProps} compInfo={this.props.conpInfo}/>
          </div>
  }
  fieldList() {
    var fields =[];
    for (var elem of this.props.struct.fields) {
      fields.push(this.getField(elem))
      //console.log(JSON.stringify(elem))
    }
    //console.log(JSON.stringify(fields))
    return fields;
  }
  render () {
    return <div className="dcatap">
            <FormSectTitle title={this.props.struct.title} subtitle={this.props.struct.subtitle} />
            {this.fieldList()}
          </div>;
  }
}

class FormSectionDataSchema extends React.Component{
  constructor(props){
    super(props)
    this.state = {fieldsObj: {}, numFields: '', fields: Array(), dataFile: ''}

    this.getFieldsObj = this.getFieldsObj.bind(this);
  }
  //Input data file func
  calcDataFields(){
    //var data = processInputFile()
    //alert(JSON.stringify(data))
    //alert(JSON.stringify(this.props.compInfo))
    if(this.state.dataFile!=''){
      processInputFile((resData)=>{
        console.log(JSON.stringify(resData))
        this.setState({
          fieldsObj: resData
        });
        //this.state.fieldsObj = resData
        this.addFieldsFromFile()
      })
    } else if (this.state.numFields!='') {
      this.addFieldsFromNum()
    }
  }

  addFieldsFromFile(){
    var listFields = []
    const fieldsList = this.state.fieldsObj
    for (var i=0; i<fieldsList.names.length; i++){
      listFields.push(<FormItemField key={"ds_field_" + i} fieldNum={i} fieldName={fieldsList.names[i]} fieldProps={fieldsList.props[i]}/>)
    }

    this.setState({
      fields: listFields
    });
  }

  addFieldsFromNum(){
    const currFields = this.state.fields
    const currNumFields = this.state.fields.length
    const numDeltaFields = this.state.numFields - this.state.fields.length
    if(numDeltaFields < 0) {
      var fieldsArr = this.state.fields
      fieldsArr.splice(-1, -1*numDeltaFields)
      this.setState({
        numFields: fieldsArr.length,
        fields: fieldsArr
      });
    } else {
      var listFields = []
      for (var i = 0; i<numDeltaFields; i++) {
        listFields.push(<FormItemField key={"ds_field_" + i} fieldNum={i + currNumFields}/>)
      }

      this.setState({
        fields: this.state.fields.concat(listFields)
      });
    }
  }

  updateNumFieldVal(evt) {
    this.setState({
      numFields: evt.target.value
    });
  }
  updateFileFieldVal(evt) {
    this.setState({
      dataFile: evt.target.files[0]
    });
    console.log(evt.target.files[0])
  }


  getFieldsObj(fieldsObj){
    this.state.fieldsObj = fieldsObj
  }
  render(){
    return <div id="FormSectionDataSchema">
            <FormSection struct={this.props.struct} data="" compInfo={this.state.compInfo}/>
            <input type="hidden" id="avro_schema_datafile" />
            <input type="hidden" id="avro_schema" />
            <label htmlFor="ds_nfields"> Numero Campi </label>
            <input className="form-control" id="ds_nfields" onChange={evt => this.updateNumFieldVal(evt)} />
            <label htmlFor={this.props.fieldId}>{this.props.fieldName}</label>
            <input className="form-control" type="file" id="ds_datafile" accept=".csv, .txt, .json, .avro" onChange={evt => this.updateFileFieldVal(evt)} />
            <input type="button" value="Calc Schema" onClick={() => this.calcDataFields()}/>
            <img src="img/icon-plus.png" height="20" width="20" onClick={() => this.addFields()} />
            <div id="field-list">{this.state.fields}</div>
          </div>
  }
}



render(<NewDsForm dcatap={data_dcatap} dataschema={data_dataschema} operational={data_operational} />, document.getElementById('app'));
