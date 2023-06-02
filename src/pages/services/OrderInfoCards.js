import { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy
} from '@dnd-kit/sortable';

import {
  closestCenter,
  DndContext,
} from "@dnd-kit/core";
import InfoCard from '../../components/services/InfoCard';

function OrderInfoCards() {
    const [person, setPerson] = useState([
      { type: 'text', text: 'John Doe', id: 1, position: 0 },
      { type: 'image', image: 'https://example.com/image1.jpg', text: 'Jane Smith', id: 2, position: 1 },
      { type: 'text', text: 'Michael Johnson', id: 3, position: 2 },
      { type: 'image', image: 'https://example.com/image2.jpg', text: 'Emily Davis', id: 4, position: 3 },
      { type: 'text', text: 'Daniel Wilson', id: 5, position: 4 },
      { type: 'image', image: 'https://example.com/image3.jpg', text: 'Sophia Anderson', id: 6, position: 5 },
      { type: 'text', text: 'William Thompson', id: 7, position: 6 },
      { type: 'image', image: 'https://example.com/image4.jpg', text: 'Olivia Martinez', id: 8, position: 7 },
      { type: 'text', text: 'James Garcia', id: 9, position: 8 },
      { type: 'image', image: 'https://example.com/image5.jpg', text: 'Isabella Robinson', id: 10, position: 9 },
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
                    <InfoCard item={user}/>
                  </Col>
                ))}
              </Row>
            </SortableContext>
          </DndContext>
        </Container>
    
      );
}

export default OrderInfoCards;