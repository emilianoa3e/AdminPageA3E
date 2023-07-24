import ImgStep1 from "../../assets/imagesTutorial/paso1-createnew.png";
import ImgStep2 from "../../assets/imagesTutorial/paso2-createnew.png";
import ImgStep3 from "../../assets/imagesTutorial/paso3-createnew.png";
import ImgStep4 from "../../assets/imagesTutorial/paso4-createnew.png";

export const stepsCreateNew = [
  {
    label: "Título",
    description:
      "El título es el nombre de la noticia, que se mostrará en la página principal de noticias. El titulo no debe repetirse.",
    imgPath: ImgStep1,
    step: "Puede ingresar el título de la noticia en el campo de texto.",
    isMandatory: true,
  },
  {
    label: "Categoría",
    description:
      "La categoría es el tipo de noticia, que se mostrará en la página principal de noticias.",
    imgPath: ImgStep2,
    step: "Se muestran 3 opciones, seleccione la que más se ajuste a la noticia que desea crear.",
    isMandatory: true,
  },
  {
    label: "Resumen",
    description:
      "El resumen es una breve descripción de lo que va a tratar la noticia.",
    imgPath: ImgStep3,
    step: "Puede ingresar el resumen de la noticia en el campo de texto. Debe ser breve y conciso.",
    isMandatory: true,
  },
  {
    label: "Contenido",
    description:
      "El contenido es toda la información que se mostrará en la noticia.",
    imgPath: ImgStep4,
    step: "Puede ingresar el contenido de la noticia en el editor que se implementó. Puede agregar imágenes, videos, tablas, etc.",
    isMandatory: true,
  },
];
