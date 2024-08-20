import React, { useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { RedBlackTreeNode } from './RedBlackTreeNode';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Cant find element with id "root"');
}

const root = createRoot(rootElement);
root.render(<RedBlackTreeVisualizer />);

function RedBlackTreeVisualizer() {
  const [initialValues] = useState(() => {
    const arrays = [
      [-10, -9, -9, -9, -7, -2, -1, 2, 4],
      [-9, -7, -6, -6, -3, 0, 1, 3],
      [-10, -9, -2, -1, 1, 3],
    ];
    return arrays.flatMap((array) => array);
  });
  const values = useRef([...initialValues]);
  const [nextValue, setNextValue] = useState(() => values.current.pop());

  const rootRef = useRef<RedBlackTreeNode | null>(null);
  const [, rerender] = useState({});

  return (
    <div>
      <p>Visualizer</p>

      {rootRef.current ? <Node node={rootRef.current} /> : <NullNode />}

      <button
        disabled={typeof nextValue !== 'number'}
        onClick={() => {
          if (nextValue === undefined) {
            return;
          }

          if (!rootRef.current) {
            rootRef.current = new RedBlackTreeNode(nextValue, 'black');
          } else {
            rootRef.current = rootRef.current.addValueToTree(nextValue);
          }
          if (values.current.length) {
            setNextValue(values.current.pop());
          } else {
            setNextValue(undefined);
          }
          rerender({});
        }}
      >
        Add new value ({nextValue}) to the tree
      </button>
    </div>
  );
}

function Node(props: { node: RedBlackTreeNode }) {
  const { node } = props;

  return (
    <div className="nodes">
      <div className={`node ${node.color}`}>{node.value}</div>

      <div className="siblings">
        {node.leftChild ? <Node node={node.leftChild} /> : <NullNode />}
        {node.rightChild ? <Node node={node.rightChild} /> : <NullNode />}
      </div>
    </div>
  );
}

function NullNode() {
  return <div className="node empty"></div>;
}
