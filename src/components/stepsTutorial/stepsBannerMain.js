import ImgStep1 from "../../assets/imagesTutorial/bannerMain/paso1-bannermain.png";
import ImgStep2 from "../../assets/imagesTutorial/bannerMain/paso2-bannermain.png";

export const stepsBannerMain = [
  {
    label: "Principal",
    description: "El banners main es la pagina principal de banners.",
    imgPath: ImgStep1,
    step:
      "En esta página se muestran todos los banners que se han creado. " +
      "Puede cambiar el status de un banner, eliminar un banner, crear un nuevo banner y editar un banner. ",
  },
  {
    label: "Filtro de status",
    description:
      "El filtro de status permite filtrar los banners por status. Los que estan activos o inactivos.",
    imgPath: ImgStep2,
    step:
      "La tabla cuenta con un filtro, que se encuentra en la parte superior derecha de la tabla. El filtro muestra los banners activados y no activados. Si el banner se encuentra desactivado," +
      "no se mostrara en la página de A3E.",
  },
];
