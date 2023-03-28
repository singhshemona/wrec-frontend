import {useState, useEffect} from 'react';
import { ResponsiveCirclePacking } from '@nivo/circle-packing';
import { generateLibTree } from '@nivo/generators'
import './App.css';

function App() {
  const [data, setData] = useState();
  const [zoomedId, setZoomedId] = useState<string | null>(null)

  useEffect(() => {
    fetch("https://store-api-w6cy.onrender.com/bookshelf")
      .then((response) => response.json())
      .then((json) => {
        setData(json);
        console.log(json)
        // console.log(generateLibTree())
      });
  }, []);

  const commonProperties = {
        width: 900,
       height: 500,
        data: data,
        
      //   {
      //     name: "science fiction",
      //     children: [
      //       {
      //           name: "dark matter",
      //           value: 1
      //       },
      //       {
      //           name: "hitchhikers guide to galaxy",
      //           value: 1 // this needs to be provided
      //       }, 
      //     ]
      // },
      
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
            motionConfig="slow"
            onClick={node => {
                setZoomedId(zoomedId === node.id ? null : node.id)
            }}
        />
      </div>  
      : <p>loading...</p>
  )
}

export default App;
