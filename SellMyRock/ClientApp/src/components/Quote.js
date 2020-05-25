import React, { useReducer } from 'react';
import ImageFileInput from '../components/Common/FileInput';

function reducer(state, action) {
    switch (action.type) {
        case 'change':
            state[action.prop] = action.val;
            return state;
        default:
            throw new Error();
    }
}

function Submit(form) {
    var data = new FormData();
    for (const property in form) {
        if (property === "files") {
            let idx = 0;
            for (const key in Object.keys(form[property])) {
                var file = form[property][key];
                data.append(`file${idx}`, file, file.name);
                idx++;
            }
        }
        else {
            data.append(property, form[property]);
        }
    }
    fetch("quote", {
        method: "POST",
        body: data,
    }).then(() => {
        alert(`Quote has been submitted.`);
    });
}


const defaultState = {
    name: "",
    address: "",
    phone: "",
    shape: "",
    carat: "",
    color: "",
    clarity: "",
    reportNumber: "",
    certified: "",
    files: ""
};

export default function Quote() {
    const [state, dispatch] = useReducer(reducer, defaultState);
    const fileInputChange = (files) => {
        dispatch({type:'change', prop:'files', val: files});
    };

    return <div>
                Contact Information
                <div className="quoteForm">
                    <div>
                        <span>Name</span>
                        <input className="form-control" onChange={(e) => dispatch({type:'change', prop:'name', val:e.target.value })} type="text" multiple  />
                    </div>
                    <div>
                        <span>Address</span>
                        <input className="form-control" onChange={(e) => dispatch({type:'change', prop:'address', val:e.target.value })} type="text" multiple  />
                    </div>
                    <div>
                        <span>Phone Number</span>
                        <input className="form-control" onChange={(e) => dispatch({type:'change', prop:'phone', val:e.target.value })} type="text" multiple  />
                    </div>
                </div>
                Diamond Information
                <div className="quoteForm">
                    <div>
                        <span>What is the diamond shape?</span>
                        <select className="form-control" onChange={(e) => dispatch({type:'change', prop:'shape', val:e.target.value })} type="text">
                            <option value="">— Please Select —</option><option value="Round Brilliant">Round Brilliant</option><option value="Pear">Pear</option><option value="Radiant">Radiant</option><option value="Emerald Cut">Emerald Cut</option><option value="Oval">Oval</option><option value="Princess">Princess</option><option value="Cushion">Cushion</option><option value="Asscher">Asscher</option><option value="Marquise">Marquise</option><option value="Heart">Heart</option><option value="Old Miner/European">Old Miner/European</option><option value="Triangle">Triangle</option><option value="Other">Other</option><option value="Not Sure">Not Sure</option>
                        </select>
                    </div>
                    <div>
                        <span>What is the carat weight of the main diamond?</span>
                        <input onChange={(e) => dispatch({type:'change', prop:'carat', val:e.target.value })} className="form-control" type="text" />
                    </div>
                    <div>
                        <span>What is the diamond's color?*</span>
                        <select className="form-control" onChange={(e) => dispatch({type:'change', prop:'color', val:e.target.value })} type="text">
                            <option value="">— Please Select —</option><option value="D - Colorless">D - Colorless</option><option value="E - Colorless">E - Colorless</option><option value="F - Colorless">F - Colorless</option><option value="G - Near Colorless">G - Near Colorless</option><option value="H - Near Colorless">H - Near Colorless</option><option value="I - Near Colorless">I - Near Colorless</option><option value="J - Near Colorless">J - Near Colorless</option><option value="K - Slightly Tinted">K - Slightly Tinted</option><option value="L - Slightly Tinted">L - Slightly Tinted</option><option value="M - Slightly Tinted">M - Slightly Tinted</option><option value="N-R - Very Light Yellow">N-R - Very Light Yellow</option><option value="S-Z - Light Yellow">S-Z - Light Yellow</option><option value="Fancy Color (explain in comments)">Fancy Color (explain in comments)</option><option value="Not Sure">Not Sure</option>
                        </select>
                    </div>
                    <div>
                        <span>What is the diamond's clarity?*</span>
                        <select className="form-control" onChange={(e) => dispatch({type:'change', prop:'clarity', val:e.target.value })} type="text">
                            <option value="">— Please Select —</option><option value="FL - Flawless">FL - Flawless</option><option value="IF - Internally Flawless">IF - Internally Flawless</option><option value="VVS1 - Very Very Slightly Included 1">VVS1 - Very Very Slightly Included 1</option><option value="VVS2 - Very Very Slightly Included 2">VVS2 - Very Very Slightly Included 2</option><option value="VS1 - Very Slightly Included 1">VS1 - Very Slightly Included 1</option><option value="VS2 - Very Slightly Included 2">VS2 - Very Slightly Included 2</option><option value="SI1 - Slightly Included 1">SI1 - Slightly Included 1</option><option value="SI2 - Slightly Included 2">SI2 - Slightly Included 2</option><option value="SI3 - Slightly Included 3">SI3 - Slightly Included 3</option><option value="I1 - Imperfect 1">I1 - Imperfect 1</option><option value="I2 - Imperfect 2">I2 - Imperfect 2</option><option value="I3 - Imperfect 3">I3 - Imperfect 3</option><option value="I'm Not Sure">I'm Not Sure</option>
                        </select>
                    </div>
                    <div>
                        <span>Diamond Report Number (if applicable)</span>
                        <input className="form-control" onChange={(e) => dispatch({type:'change', prop:'reportNumber', val:e.target.value })} type="text" />
                    </div>
                    <div>
                        <span>Has the diamond been certified?*</span>
                        <select className="form-control" onChange={(e) => dispatch({type:'change', prop:'certified', val:e.target.value })} type="text">
                            <option>Yes</option><option>No</option>
                        </select>
                    </div>
                    <div style={{'width':'100%'}}>
                        <ImageFileInput label={'Images'} onChange={fileInputChange} />
                    </div>
                </div>
        <button className={'btn btn-primary'} onClick={Submit.bind(null, state)}>Submit Quote</button>
        </div>;
}