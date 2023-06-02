import React from "react";
import { Card } from 'react-bootstrap';
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from '@dnd-kit/utilities';

const InfoCard = ({ item }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({
    id: item.id
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  return (
    <div className="bg-danger m-2" style={style} {...attributes} {...listeners} ref={setNodeRef}>
      {item.type === 'text' ? (
        <div>{item.text}</div>
      ) : (
        <Card>
          <Card.Img variant="top" src={item.image} />
          <Card.Body>
            <Card.Title>{item.text}</Card.Title>
          </Card.Body>
        </Card>
      )}
    </div>
  );
};

export default InfoCard;

