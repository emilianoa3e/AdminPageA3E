import ImgStep1 from "../../assets/imagesTutorial/service/paso1-service.png";
import ImgStep2 from "../../assets/imagesTutorial/service/paso2-service.png";
import ImgStep3 from "../../assets/imagesTutorial/service/paso3-service.png";
import ImgStep4 from "../../assets/imagesTutorial/service/paso4-service.png";
import ImgStep4_1 from "../../assets/imagesTutorial/galery/paso1-galery.png";
import ImgStep4_2 from "../../assets/imagesTutorial/galery/paso2-galery.png";
import ImgStep4_3 from "../../assets/imagesTutorial/galery/paso3-galery.png";
import ImgStep4_4 from "../../assets/imagesTutorial/galery/paso4-galery.png";

export const stepsService = [
  {
    label: "Título",
    description:
      "El título es el nombre de la noticia, que se mostrará en la página principal de noticias. El titulo no debe repetirse.",
    imgPath: ImgStep1,
    step: "Puede ingresar el título de la noticia en el campo de texto.",
    isMandatory: true,
  },
  {
    label: "Subtítulo",
    imgPath: ImgStep2,
    step: "Puede ingresar el subtítulo de la noticia en el campo de texto.",
    isMandatory: false,
  },
  {
    label: "Resumen",
    description:
      "El resumen es una breve descripción de lo que va a tratar el servicio.",
    imgPath: ImgStep3,
    step: "Puede ingresar el resumen del servicio en el campo de texto. Debe ser breve y conciso.",
    isMandatory: true,
  },
  {
    label: "Contenido",
    description:
      "El contenido es toda la información que se mostrará en el servicio.",
    imgPath: ImgStep4,
    step:
      "Puede ingresar el contenido del servicio en el editor que se implementó. Puede agregar imágenes, videos, tablas, etc. " +
      "A continuación se muestra como agregar imagenes/videos al servicio:",
    isMandatory: true,
    subSteps: [
      {
        label: "Abrir galería",
        description:
          "La galería es un espacio donde se guardan las imagenes/videos.",
        imgPath: ImgStep4_1,
        step: "Para abrir la galería, debe darle click al icono de album que se encuentra en la parte inferior izquierda de la pantalla.",
        isMandatory: false,
      },
      {
        label: "Agregar imagenes/videos a la galería",
        description:
          "Estas imagenes/videos se guardaran en la galería, para poder ser utilizadas en otras noticias o servicios.",
        imgPath: ImgStep4_2,
        step:
          "Para subir una imagen/video, puede darle click o arrastrar la imagen al recuadro que dice 'Arrastre y suelte su imagen aquí'." +
          "Una vez subida la imagen/video, para usarla en la noticia, debe darle click al icono de copiar que se encuentra en la parte inferior izquierd de la imagen/video.",
        isMandatory: false,
      },
      {
        label: "Agregar imagenes/videos a la noticia/servicio",
        description: "Estas imagenes/videos se mostrarán en la noticia.",
        imgPath: ImgStep4_3,
        step: "Para poner una imagen/video en la noticia, debe darle click al menú de insertar, y seleccionar la opción de imagen/medios",
        isMandatory: false,
      },
      {
        label: "Insertar imagen/video",
        imgPath: ImgStep4_4,
        step: "Se abrirá una ventana, en el cual podrá ingresar el link que copió de la imagen/video que subió a la galería. Podrá ajustar el tamaño de la imagen/video.",
      },
    ],
  },
];
