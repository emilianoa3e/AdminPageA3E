import React from "react";
import EditorWys from "../../components/shared/EditorWys";
import { Form as FormBt, Row, Col } from "react-bootstrap";
import { TextInput } from "../../components/shared/TextInput";
import { MdTitle, MdOutlineFullscreen, MdCoPresent } from "react-icons/md";
import { SelectInput } from "../../components/shared/SelectInput";
import EditorText from "../../components/shared/EditorText";

function NoticeForm({
  errors,
  values,
  touched,
  setContent,
  initialContent,
  setResumeContent,
  initialResumeContent,
  onContext,
}) {
  return (
    <>
      <Row>
        <Col md={9} lg={9}>
          <FormBt.Group className="mb-2">
            <TextInput
              maxLength="80"
              label="Título"
              name="title"
              icon={MdTitle}
              placeholder="Título"
              isInvalid={!!errors.title && touched.title}
            />
          </FormBt.Group>
        </Col>
        <Col md={3} lg={3}>
          <FormBt.Group className="mb-2">
            <SelectInput
              label="Tipo de Noticia"
              name="type"
              defaultText="Seleccione una opción..."
              options={[
                { value: "Novedades", label: "Novedades" },
                { value: "Cursos", label: "Cursos" },
                { value: "Convocatorias", label: "Convocatorias" },
              ]}
              isInvalid={!!errors.type && touched.type}
            />
          </FormBt.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <FormBt.Group className="mb-2">
            <label>Resumen</label>
            <EditorText
              initialContent={initialResumeContent}
              setContent={setResumeContent}
            />
          </FormBt.Group>
          <FormBt.Group className="mb-2">
            <TextInput
              label="Autor"
              name="author"
              icon={MdCoPresent}
              placeholder="Autor"
              isInvalid={!!errors.author && touched.author}
            />
          </FormBt.Group>
        </Col>
      </Row>
      <p
        className="mt-3 text-center align-items-center"
        style={{
          color: "grey",
          fontSize: 14.5,
          fontStyle: "italic",
        }}
      >
        Para una mejor experiencia del editor trabaje en pantalla completa
        <MdOutlineFullscreen size={23} className="ms-1" />
      </p>
      <FormBt.Group className="mb-2">
        <EditorWys
          setContent={setContent}
          initialContent={initialContent}
          onContext={onContext}
        />
      </FormBt.Group>
    </>
  );
}

export default NoticeForm;
