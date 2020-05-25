import React, { useReducer } from 'react';

function reducer(state, action) {
    switch (action.type) {
        case 'change':
            state.images = action.val;
            action.formChange(action.val);
            return { images : action.val , ...state };
        default:
            throw new Error();
    }
}

function openFileExplore(inputFile) {
    inputFile.current.click();
}

function renderImages(images) {
    var results = [];
    const style = {
        display: 'inline',
        width: '115px',
        marginRight: '15px'
    };

    for (let [key, value] of Object.entries(images)) {
        results.push(<img alt={value.name} src={window.URL.createObjectURL(value)} style={style} />);
    }
    return results;
}

export default function ImageFileInput(props) {
    const [state, dispatch] = useReducer(reducer, {images : []});
    const inputFile = React.createRef();
    const style = {
        cursor : "pointer"
    };

    return <div style={style} onClick={openFileExplore.bind(null, inputFile)}>
        <span>{props.label} ({state.images.length} Files)</span>
        <input ref={inputFile} onChange={(e) => dispatch({ type: 'change', val: e.target.files, formChange : props.onChange })} style={{ 'display': 'none' }} className="form-control" type="file" multiple />
        <div className='form-control' style={{ 'height': '300px', 'textAlign': 'center' }}>
            {renderImages(state.images)}
            <div style={{ 'marginTop': '25px' }}><button className='btn btn-outline-success'>Upload</button></div>
        </div>
    </div>;
}