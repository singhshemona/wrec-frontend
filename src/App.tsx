import {useState, useEffect} from 'react';
import { ResponsiveCirclePacking } from '@nivo/circle-packing';
import './App.css';

function App() {
  const [data, setData] = useState();
  const [zoomedId, setZoomedId] = useState<string | null>(null)

  useEffect(() => {
    fetch("https://wrec-api.onrender.com/bookshelf/user/1")
      .then((response) => response.json())
      .then((json) => {
        setData(json);
        console.log(json)
      });
  }, []);

  const commonProperties = {
    width: 900,
    height: 500,
    data: data,
    padding: 2,
    id: 'name',
    value: 'value',
    labelsSkipRadius: 16,
  }

  return (
    data ?
      <div style={{ height: "400px", width: '600px' }}>
        <ResponsiveCirclePacking
            {...commonProperties}
            enableLabels
            labelsSkipRadius={16}
            labelsFilter={label => label.node.height === 0}
            labelTextColor={{
              from: 'color',
              modifiers: [['darker', 2]],
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
