
import React from "react";
import { Card } from 'react-bootstrap'
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from '@dnd-kit/utilities';

const Person = ({ user }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({
    id: user.id
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  return (
    <div className="bg-danger m-2" style={style} {...attributes} {...listeners} ref={setNodeRef} >
        {user.name}
    </div>
  );
};

export default Person;



// import React from "react";
// import { Card, Container } from 'react-bootstrap'
// import { useSortable } from "@dnd-kit/sortable";
// import { CSS } from '@dnd-kit/utilities'
// const Person = ({ user }) => {
//     const {
//         attributes,
//         listeners,
//         setNodeRef,
//         transform,
//         transition
//     } = useSortable({
//         id: user.id
//     })
//     const style = {
//         transform: CSS.Transform.toString(transform),
//         transition
//     }
//     return (
//         <>
//             <Container className='row'>
//                 <Container className='col'>
//                     <div className="bg-danger m-5" style={style} {...attributes} {...listeners} ref={setNodeRef} >
//                         {user.name}
//                     </div>
//                 </Container>
//             </Container>
        
//         </>
//     )
// }

// export default Person;