
import { useState } from 'react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import Person from './Person';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy
} from '@dnd-kit/sortable';
import { Container, Row, Col } from 'react-bootstrap';

function App() {
  const [person, setPerson] = useState([
    { name: "emiliano", id: 1, position: 2 },
    { name: "joksan", id: 2, position: 0 },
    { name: "jon", id: 3, position: 1 }
  ]);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active && over) {
      const oldIndex = person.findIndex((person) => person.id === active.id);
      const newIndex = person.findIndex((person) => person.id === over.id);

      const newOrder = arrayMove(person, oldIndex, newIndex);
      const updatedOrder = newOrder.map((item, index) => ({ ...item, position: index }));
      console.log(updatedOrder);
      setPerson(updatedOrder);
    }
  };

  person.sort((a, b) => a.position - b.position);

  return (
    <Container className='d-flex justify-content-center align-items-center'>
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={person} strategy={verticalListSortingStrategy}>
          <Row>
            {person.map((user) => (
              <Col key={user.id} xs={12} className='mb-3'>
                <Person user={user} />
              </Col>
            ))}
          </Row>
        </SortableContext>
      </DndContext>
    </Container>
  );
}

export default App;


// import { useState } from 'react';
// import { DndContext, closestCenter } from '@dnd-kit/core';
// import Person from './Person'
// import {
//   arrayMove,
//   SortableContext,
//   sortableKeyboardCoordinates,
//   verticalListSortingStrategy
// } from '@dnd-kit/sortable';
// import { Container } from 'react-bootstrap';

// function App() {
//   const [person, setPerson] = useState([
//     { name: "emiliano", id: 1 }, { name: "joksan", id: 2 }, { name: "jon", id: 3 }
//   ])

//   // const handleDragEnd = (event) => {
//   //   const {active, over} =  event
    
   
    
//   //   setPerson((person)=>{
//   //     const oldIndex = person.findIndex(person => person.id === active.id)
//   //     const newIndex = person.findIndex(person => person.id === over.id)
     
//   //      const newOrder = arrayMove(person, oldIndex, newIndex)
//   //      console.log(newOrder)
//   //     return arrayMove(person, oldIndex, newIndex)
      
//   //   })
//   //  }
//   const handleDragEnd = (event) => {
//     const { active, over } = event;
  
//     if (active && over) {
//       const oldIndex = person.findIndex((person) => person.id === active.id);
//       const newIndex = person.findIndex((person) => person.id === over.id);
  
//       const newOrder = arrayMove(person, oldIndex, newIndex);
//       console.log(newOrder);
//       setPerson(newOrder);
//     }
//   };
//   return (
//     <>
//     <Container className='d-flex justify-content-center align-items-center'>

//     <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
//         <SortableContext
//         items={person}
//        strategy={verticalListSortingStrategy} 
//         >
//           <Person user={person}/>

//           {person.map((user) => (
//             <Person user={user} key={user.id}/>
//           ))}
//         </SortableContext>
//       </DndContext>
//     </Container>
      
//     </>
//   );
// }

// export default App;
