import * as React from 'react';
import * as ReactDOM from 'react-dom';

type PropsType = {
    greeting: string;
    count?: number;
}

const App: React.FC<PropsType> = ({ greeting, count }) => {
    const [data, setData] = React.useState({ count: 0 });
    return <>
        <div>
            <h2>{ greeting }</h2>
            <button onClick={() => setData({ count: data.count + 1 })}>
                This button has been clicked { data.count } times.
            </button>
        </div>
    </>;
}

ReactDOM.render(<App greeting='Hello world' />, document.getElementById('app'));