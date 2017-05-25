import React from 'react';
import {render} from 'react-dom';

const data_dcatap = {
  title: "DCATAP Catalogue Info",
  subtitle: "Info for DCATAP profile",
  hidden: false,
  fields: [
    {
      fieldType: "inputMultiLang",
      fieldName: "Titolo",
      fieldId: "dct:title"
    },
    {
      fieldType: "textMultiLang",
      fieldName: "Descrizione",
      fieldId: "dct:description"
    },
    {
      fieldType: "selectTheme",
      fieldName: "Ambito",
      fieldId: "dcat:theme"
    },
    {
      fieldType: "selectCategory",
      fieldName: "Categorie",
      fieldId: "dct:subject"
    },
    {
      fieldType: "text",
      fieldName: "Keywords / Tags",
      fieldId: "dct:accrualPeriodicity"
    },
    {
      fieldType: "inputMultiLang",
      fieldName: "Owner",
      fieldId: "dct:rightsHolder"
    },
    {
      fieldType: "input",
      fieldName: "Frequenza Aggiornamento",
      fieldId: "dct:accrualPeriodicity"
    },
    {
      fieldType: "selectLang",
      fieldName: "Lingua",
      fieldId: "dct:language"
    },
    {
      fieldType: "input",
      fieldName: "Landing Page",
      fieldId: "dcat:landingPage"
    },
  ]
}

const data_dataschema = {
  title: "Data Schema",
  subtitle: "Info for Dataset's data schema",
  hidden: false,
  fields: [
    {
      fieldType: "inputFile",
      fieldName: "Data File",
      fieldId: "ds_datafile"
    },
    {
      fieldType: "inputFile",
      fieldName: "Data File",
      fieldId: "ds_datafile"
    }
  ]
}

class NewDsForm extends React.Component {
  render () {
    return <div className="container">
            <form>
              <FormSection struct={this.props.dcatap} data="" />
              <FormSection struct={this.props.dataschema} data="" />
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
    return <select className={this.props.className} id={this.props.id} onChange={this.props.onChange}>
      <option value="" default></option>
      <option value="ita">Italiano</option>
      <option value="eng">English</option>
      <option value="ger">German</option>
      <option value="fra">Franch</option>
    </select>
  }
}
class FormItemSelectTheme extends React.Component{
  render() {
    return <select className={this.props.className} id={this.props.id} onChange={this.props.onChange}>
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
    return <select className={this.props.className} id={this.props.id} onChange={this.props.onChange}>
      <option value="" default></option>
      <option value="uri_cultura">Cultura & Turismo</option>
      <option value="uri_economia">Economia & Finanza</option>
      <option value="uri_sanita">Sanita</option>
      <option value="uri_trasporti">Trasporti</option>
    </select>
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

  _getTag(tagName) {
    switch(tagName){
      case "formiteminput": return "FormItemInput"
    }
  }

  elementSelector(info){
    switch(info){
      case "inputMultiLang" :
    }
  }
  //It shows an input for default value and a "plus" button that make appear a new pair (select language)(input) available.
  itemInputMultiLang(info) {

    const InputType = this.props.typeInput
    const SelType = this.props.typeSel
    return <div>
            <label htmlFor={info.fieldId + "_val"}> {info.fieldName} </label>
            <InputType className="form-control" id={info.fieldId + "_val"} />
            <div id={"inputMultiLang_" + info.fieldId}>
              {this.state.inputs.map(input =>
                <div>
                  <SelType className="form-control" id={"lang_" + info.fieldId + input} onChange={this.handleSelChange} />
                  <InputType className="form-control" id={info.fieldId + "_" + this.state.selects["lang_" + info.fieldId + input]} />
                </div>
              )}
            </div>
            <img src="img/icon-plus.png" height="20" width="20" onClick={() => this.addElement()} />
          </div>
  }

  handleSelChange(e){
    //console.log(e.target.value)
    //console.log(e.target.id)
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


  getItem(info) {
    console.log(JSON.stringify(info))
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
                <FormItemSelectTheme className="form-control" struct={info} typeInput={FormItemInput} typeSel={FormItemSelectLang}/>
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
                <FormItemSelectLang className="form-control" struct={info} typeInput={FormItemInput} typeSel={FormItemSelectLang}/>
              </div>
        break;

      case "inputMultiLang":
        return <FormItemMultiInput struct={info} typeInput={FormItemInput} typeSel={FormItemSelectLang}/>
        break;

      case "textMultiLang":
        return <FormItemMultiInput struct={info} typeInput={FormItemText} typeSel={FormItemSelectLang}/>
        break;

      case "inputFile":
        return <div className="form-group">
                <label htmlFor={info.fieldId}>{info.fieldName}</label>
                <input type="file" id={info.fieldId} accept=".csv, .txt, .json, .avro" />
              </div>
        break;

    }
  }

  render() {
    return <div className="form-group" key={this.props.fieldId}>
            {this.getItem(this.props.struct)}
          </div>
  }
}

class FormSection extends React.Component {

  getField(fieldProps) {
    return <div className="form-group" key={fieldProps.fieldId}>
            <FormSectionItem struct={fieldProps}/>
          </div>
  }
  fieldList() {
    var fields =[];
    for (var elem of this.props.struct.fields) {
      fields.push(this.getField(elem))
      console.log(JSON.stringify(elem))
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




render(<NewDsForm dcatap={data_dcatap} dataschema={data_dataschema} />, document.getElementById('app'));
