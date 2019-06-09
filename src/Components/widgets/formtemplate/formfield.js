import React from 'react';

const FormField = ({formdata,change,id}) => {
    // console.log(formdata, change, id)
    const showErr=()=>{
        let errMsg=null;
        if(formdata.validation && !formdata.valid){
            errMsg=(
                <div style={{ 
            "color": "red",
            "fontSize": "10px"}}>{formdata.validationMsg}</div>
            )
        }
        return errMsg
    }
    const renderTemplate=()=>{
        let fromTemplate = null;
        switch (formdata.element) {

            case 'input':
                fromTemplate=(
                    <div>
                         <input {...formdata.config}
                         className = "form-control"
                            value = {formdata.value}
                            onBlur={(event)=>change({event,id,blur:true})}
                            onChange={(event)=>change({event,id,blur:false})}
                    />
                    {showErr()}
                    </div>
                   
                )
                break;
                 case 'select':
                    fromTemplate=(
                        <div className = "form-group" >
                            <select 
                                value={formdata.value}
                                name={formdata.config.name}
                                onBlur={(event)=>change({event,id,blur:true})}
                                onChange={(event)=>change({event,id,blur:false})}
                                className = "form-control"
                            >
                            {formdata.config.options.map((item,id)=>(
                                <option key={id} value={item.id}>{item.name}</option>
                            ))}

                            </select>
                        </div>
                    )
                break;
            default:
                break;
        }
        return fromTemplate;
    }
    return(<div>{renderTemplate()}</div>)
    }

    export default FormField;