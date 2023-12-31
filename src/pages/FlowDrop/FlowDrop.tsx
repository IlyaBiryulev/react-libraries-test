import './FlowDrop.scss';
import FlowDropItems from '../../components/FlowDropItems/FlowDropItems';


const initialNodes = [
  { id: "1", data: { label: "Node 1" }, position: { x: 100, y: 100 } },
  { id: "2", data: { label: "Node 2" }, position: { x: 100, y: 200 } }
];

const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];

function FlowDrop() {
    return (
        <div className='main'>
            <FlowDropItems initialNodes={initialNodes} initialEdges={initialEdges}/>
        </div>
    );
}

export default FlowDrop;
