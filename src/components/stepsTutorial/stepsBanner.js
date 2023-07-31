import ImgStep1 from "../../assets/imagesTutorial/banner/paso1-banner.png";
import ImgStep1_1 from "../../assets/imagesTutorial/banner/paso1-1-banner.png";
import ImgStep1_2 from "../../assets/imagesTutorial/banner/paso1-2-banner.png";
import ImgStep2 from "../../assets/imagesTutorial/banner/paso2-banner.png";
import ImgStep3 from "../../assets/imagesTutorial/banner/paso3-banner.png";
import ImgStep4 from "../../assets/imagesTutorial/banner/paso4-banner.png";
import ImgStep4_1 from "../../assets/imagesTutorial/banner/paso4-1-banner.png";

export const stepsBanner = [
  {
    label: "Imagen banner",
    imgPath: ImgStep1,
    step:
      "Sube una imagen para el banner. Puede arrastrar la imagen al recuadro que dice " +
      " 'Arrastre y suelte su imagen aquí' al recuadro o darle click para seleccionarla.",
    isMandatory: true,
    subSteps: [
      {
        label: "Visualización de la imagen (Sin imagen)",
        description:
          "La imagen que subiste se mostrará en la vista previa. Si no se muestra, es porque la imagen no se subió correctamente.",
        imgPath: ImgStep1_1,
        step: "Una vez que suba la imagen, se mostrará en la vista previa. Y conforme vaya editando el banner, se irá actualizando la vista previa.",
        isMandatory: false,
      },
      {
        label: "Visualización de la imagen (Con imagen)",
        imgPath: ImgStep1_2,
        step: "Aquí se muestra la imagen que subiste.",
        isMandatory: false,
      },
    ],
  },
  {
    label: "Título",
    description:
      "El título es el nombre del banner, que se mostrará en la página principal de banners. El titulo no debe repetirse.",
    imgPath: ImgStep2,
    step: "Puede ingresar el título del banner en el campo de texto.",
    isMandatory: true,
  },
  {
    label: "Descripción",
    description:
      "La descripción es el texto que se mostrará en la página principal de banners.",
    imgPath: ImgStep3,
    step: "Puede ingresar la descripción del banner en el campo de texto.",
    isMandatory: false,
  },
  {
    label: "Link",
    description:
      "El link es la dirección web a la que se redirigirá al usuario cuando de click al botón del banner.",
    imgPath: ImgStep4,
    step: "Puede ingresar el link del banner en el campo de texto.",
    isMandatory: false,
    subSteps: [
      {
        label: "Visualización del link (Con link)",
        imgPath: ImgStep4_1,
        step: "Aquí se muestra el link que ingresaste. Puede darle click al botón para abrir el link en una nueva pestaña.",
        isMandatory: false,
      },
      {
        label: "Visualización del link (Sin link)",
        step: "Si no ingresaste un link, no se mostrará el botón.",
      }
    ],
  },
];
