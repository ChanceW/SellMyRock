import React, { useReducer, useEffect } from 'react';


function reducer(state, action) {
    switch (action.type) {
        case 'quotes':
            state.quotes = action.value;
            return { quotes: action.value, ...state };
        default:
            throw new Error();
    }
}


async function getQuotes(dispatch) {
    const response = await fetch('quote');
    const data = await response.json();
    dispatch({ type: 'quotes', value: data });
}

function buildInfo(quote) {
    let result = [];
    for (let [key, value] of Object.entries(quote)) {
        if (key !== "files") {
            result.push(<li><span><b>{key}: </b></span><span>{value}</span></li>);
        }
    }
    return result;
}

function renderImgaes(files) {
    return files.map((file) => {
        return <img src={`data:image/jpg;base64, ${file}`} />
    });
}

function getQuoteTiles(quotes) {
    return quotes.map((quote, idx) => {
        return <div key={idx} className="quoteTile">
            {renderImgaes(quote.files)}
            <ul>{buildInfo(quote)}</ul>
        </div>;
    });
}

export default function AllQuotes() {
    const [state, dispatch] = useReducer(reducer, {});

    useEffect(() => {
        getQuotes(dispatch);
    }, []);


    return <div className='allQuotes'>
        {state.quotes && state.quotes.length ? getQuoteTiles(state.quotes) : null}
    </div>;
}