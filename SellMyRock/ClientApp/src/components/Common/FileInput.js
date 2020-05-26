import React, { useReducer } from 'react';

function filesToList(filesObj) {
    let result = [];
    for (let [key, value] of Object.entries(filesObj)) {
        result.push(value);
    }
    return result;
}

function reducer(state, action) {
    switch (action.type) {
        case 'change':
            const images = filesToList(action.val);
            state.images = images;
            action.formChange(action.val);
            return { images : action.val , ...state };
        default:
            throw new Error();
    }
}

export default function ImageFileInput(props) {
    const [state, dispatch] = useReducer(reducer, {images : []});
    const inputFile = React.createRef();

    function handleDragDrop(e) {
        const images = state.images.concat(filesToList(e.dataTransfer.files));
        dispatch({ type: 'change', val: images, formChange: props.onChange });
        e.preventDefault();
        e.stopPropagation();
    }

    const dragProps = {
        onDrop: handleDragDrop,
        onDragOver: handleDragDrop,
        onDragEnter: handleDragDrop,
        onDragLeave: handleDragDrop
    };

    function openFileExplore(inputFile) {
        inputFile.current.click();
    }

    function renderImages(images) {
        const style = {
            display: 'inline',
            width: '115px',
            marginRight: '15px'
        };

        return images.map((img, idx) => {
            return <img key={idx} alt={img.name} src={window.URL.createObjectURL(img)} style={style} />;
        });
    }


    return <div {...dragProps}>
        <span>{props.label} ({state.images.length} Files)</span>
        <input ref={inputFile} onChange={(e) => dispatch({ type: 'change', val: state.images.concat(filesToList(e.target.files)), formChange : props.onChange })} style={{ 'display': 'none' }} className="form-control" type="file" multiple />
        <div className='form-control' style={{ 'minHeight': '200px', 'height': 'auto', 'textAlign': 'center' }}>
            <div style={{ 'textAlign': 'right', 'marginBottom':'15px' }}>
                <button style={{ marginRight: '15px' }} onClick={openFileExplore.bind(null, inputFile)} className='btn btn-outline-success'>Upload</button>
                <button className='btn btn-outline-danger' onClick={(e) => { e.stopPropagation(); dispatch({ type: 'change', val: [], formChange: props.onChange }); }}>Clear All</button>
            </div>
            {renderImages(state.images)}
        </div>
    </div>;
}