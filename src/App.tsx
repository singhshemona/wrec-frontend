import {useState, useEffect} from 'react';
import { LabelComponent, CirclePackingHtml } from '@nivo/circle-packing';
import './App.css';

function App() {
  const [data, setData] = useState();
  const [zoomedId, setZoomedId] = useState<string | null>(null)

  useEffect(() => {
    fetch("https://wrec-api.onrender.com/bookshelf/circlepacking/user/1")
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setData(json);
      });
  }, []);

  const properties = {
    width: 750,
    height: 750,
    data: data,
    padding: 2,
    id: 'name',
    value: 'value',
    labelsSkipRadius: 16,
    enableLabels: true,
    theme: {
      "labels": {
          "text": {
            "fontWeight": 'bold',
          },
      },
    }
  }

  return (
    data ?
      <div style={{ height: 750, width: 750 }}>
        <CirclePackingHtml
            {...properties}
            labelsFilter={label => label.node.height === 0}
            labelTextColor={{
              from: 'color',
              modifiers: [['darker', 2]]
            }}
            zoomedId={zoomedId}
            onClick={node => {
                setZoomedId(zoomedId === node.id ? null : node.id)
            }}
        />
      </div>  
      : <p>loading...</p>
  )
}

export default App;
