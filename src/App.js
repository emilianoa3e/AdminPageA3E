import { useState } from 'react';
import logo from './logo.svg';
import { DndContext, closestCenter } from '@dnd-kit/core';

function App() {
  const [person, setPerson] = useState([
    {name: "emiliano", id:1}, {name: "joksan", id:2}
  ]) 

  const handleDragEnd =()=>{}
  return (
    <>
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <div>

        </div>

      </DndContext>
    </>
  );
}

export default App;
