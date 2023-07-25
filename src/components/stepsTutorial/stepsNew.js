import ImgStep1 from "../../assets/imagesTutorial/new/paso1-new.png";
import ImgStep2 from "../../assets/imagesTutorial/new/paso2-new.png";
import ImgStep3 from "../../assets/imagesTutorial/new/paso3-new.png";
import ImgStep4 from "../../assets/imagesTutorial/new/paso4-new.png";
import ImgStep5 from "../../assets/imagesTutorial/new/paso5-new.png";
import ImgStep5_1 from "../../assets/imagesTutorial/galery/paso1-galery.png";
import ImgStep5_2 from "../../assets/imagesTutorial/galery/paso2-galery.png";
import ImgStep5_3 from "../../assets/imagesTutorial/galery/paso3-galery.png";
import ImgStep5_4 from "../../assets/imagesTutorial/galery/paso4-galery.png";

export const stepsNew = [
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
    label: "Autor",
    description: "El autor es la persona que escribió la noticia.",
    imgPath: ImgStep4,
    step: "Puede ingresar el nombre del autor de la noticia en el campo de texto.",
    isMandatory: true,
  },
  {
    label: "Contenido",
    description:
      "El contenido es toda la información que se mostrará en la noticia.",
    imgPath: ImgStep5,
    step:
      "Puede ingresar el contenido de la noticia en el editor que se implementó. Puede agregar imágenes, videos, tablas, etc. " +
      "A continuación se muestra como agregar imagenes/videos a la noticia:",
    isMandatory: true,
    subSteps: [
      {
        label: "Abrir galería",
        description:
          "La galería es un espacio donde se guardan las imagenes/videos.",
        imgPath: ImgStep5_1,
        step: "Para abrir la galería, debe darle click al icono de album que se encuentra en la parte inferior izquierda de la pantalla.",
        isMandatory: false,
      },
      {
        label: "Agregar imagenes/videos a la galería",
        description:
          "Estas imagenes/videos se guardaran en la galería, para poder ser utilizadas en otras noticias o servicios.",
        imgPath: ImgStep5_2,
        step:
          "Para subir una imagen/video, puede darle click o arrastrar la imagen al recuadro que dice 'Arrastre y suelte su imagen aquí'." +
          "Una vez subida la imagen/video, para usarla en la noticia, debe darle click al icono de copiar que se encuentra en la parte inferior izquierd de la imagen/video.",
        isMandatory: false,
      },
      {
        label: "Agregar imagenes/videos a la noticia/servicio",
        description: "Estas imagenes/videos se mostrarán en la noticia.",
        imgPath: ImgStep5_3,
        step: "Para poner una imagen/video en la noticia, debe darle click al menú de insertar, y seleccionar la opción de imagen/medios",
        isMandatory: false,
      },
      {
        label: "Insertar imagen/video",
        imgPath: ImgStep5_4,
        step: "Se abrirá una ventana, en el cual podrá ingresar el link que copió de la imagen/video que subió a la galería. Podrá ajustar el tamaño de la imagen/video.",
      },
    ],
  },
];
