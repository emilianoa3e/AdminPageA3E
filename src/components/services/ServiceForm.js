import React from "react";
import EditorWys from "../../components/shared/EditorWys";
import { Form as FormBt, Row, Col } from "react-bootstrap";
import { TextInput } from "../../components/shared/TextInput";
import { MdTitle, MdOutlineFullscreen, MdArrowDownward } from "react-icons/md";
import EditorText from "../shared/EditorText";

function ServiceForm({
  errors,
  values,
  touched,
  setContent,
  initialContent,
  setResumeContent,
  initialResumeContent,
  onContext,
  refStepTitle,
  refStepSubtitle,
  refStepResume,
  refStepContent,
}) {
  return (
    <>
      <Row>
        <Col>
          <FormBt.Group className="mb-2" ref={refStepTitle}>
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
        <Col>
          <FormBt.Group className="mb-2" ref={refStepSubtitle}>
            <TextInput
              maxLength="100"
              label="Subtítulo"
              name="subtitle"
              icon={MdTitle}
              placeholder="Subtítulo"
              isInvalid={!!errors.subtitle && touched.subtitle}
            />
          </FormBt.Group>
        </Col>
      </Row>
      <FormBt.Group className="mb-2" ref={refStepResume}>
        <label>Resumen</label>
        <EditorText
          initialContent={initialResumeContent}
          setContent={setResumeContent}
        />
      </FormBt.Group>
      <p
        className="mt-3 text-center align-items-center"
        style={{
          color: "grey",
          fontSize: 14.5,
          fontStyle: "italic",
        }}
      >
        <MdArrowDownward size={23} className="me-1" />
        Para una mejor experiencia del editor trabaje en pantalla completa
        <MdOutlineFullscreen size={23} className="ms-1" />
        <MdArrowDownward size={23} className="ms-1" />
      </p>
      <FormBt.Group className="mb-2" ref={refStepContent}>
        <EditorWys
          setContent={setContent}
          initialContent={initialContent}
          onContext={onContext}
        />
      </FormBt.Group>
    </>
  );
}

export default ServiceForm;
