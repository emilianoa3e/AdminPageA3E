import React, { useState } from "react";
import { Modal, Col, Row } from "react-bootstrap";
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Button,
  Paper,
  Typography,
} from "@mui/material";
import Colors from "../../utils/Colors";

export const ModalHelp = ({ props, show, handleClose, stepsTutorial }) => {
  const subStepsCounts = stepsTutorial.map(
    (step) => step.subSteps?.length || 0
  );

  const [activeStep, setActiveStep] = useState(0);
  const [subActiveSteps, setSubActiveSteps] = useState(
    Array(stepsTutorial.length).fill(0)
  );

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSubActiveSteps((prevSubActiveSteps) => {
      const newSubActiveSteps = [...prevSubActiveSteps];
      newSubActiveSteps[activeStep] = 0;
      return newSubActiveSteps;
    });
  };

  const handleSubNext = () => {
    setSubActiveSteps((prevSubActiveSteps) => {
      const newSubActiveSteps = [...prevSubActiveSteps];
      newSubActiveSteps[activeStep] = prevSubActiveSteps[activeStep] + 1;
      return newSubActiveSteps;
    });
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubBack = () => {
    setSubActiveSteps((prevSubActiveSteps) => {
      const newSubActiveSteps = [...prevSubActiveSteps];
      newSubActiveSteps[activeStep] = prevSubActiveSteps[activeStep] - 1;
      return newSubActiveSteps;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleSubReset = () => {
    setSubActiveSteps(Array(stepsTutorial.length).fill(0));
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      {...props}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      dialogClassName="modal-xl"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          ¿Como funciona?
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Box sx={{ width: "auto" }}>
          <Stepper activeStep={activeStep} orientation="vertical">
            {stepsTutorial.map((step, index) => (
              <Step key={step.label}>
                <StepLabel
                  optional={
                    <Typography variant="caption">
                      {step.isMandatory ? "Obligatorio" : "Opcional"}
                    </Typography>
                  }
                >
                  {step.label}
                </StepLabel>
                <StepContent>
                  <Typography>{step.description}</Typography>
                  {(step.imgPath || step.step) && (
                    <Col className="mt-2">
                      <Row className="mb-2 d-flex justify-content-center">
                        {step.imgPath && (
                          <img
                            src={step.imgPath}
                            alt={step.label}
                            style={{
                              width: "auto",
                              borderRadius: "10px",
                              border: "1px solid #ccc",
                            }}
                          />
                        )}
                      </Row>
                      <Row>
                        {step.step && (
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            align="center"
                          >
                            {step.step}
                          </Typography>
                        )}
                      </Row>
                      <Row className="mt-3">
                        {step.subSteps && (
                          <Box sx={{ width: "auto" }}>
                            <Stepper
                              activeStep={subActiveSteps[activeStep]}
                              orientation="vertical"
                            >
                              {step.subSteps.map((subStep, index) => (
                                <Step key={subStep.label}>
                                  <StepLabel
                                    optional={
                                      <Typography variant="caption">
                                        {subStep.isMandatory
                                          ? "Obligatorio"
                                          : "Opcional"}
                                      </Typography>
                                    }
                                  >
                                    {subStep.label}
                                  </StepLabel>
                                  <StepContent>
                                    <Typography>
                                      {subStep.description}
                                    </Typography>
                                    {(subStep.imgPath || subStep.step) && (
                                      <Col className="mt-2">
                                        <Row className="mb-2 d-flex justify-content-center">
                                          {subStep.imgPath && (
                                            <img
                                              src={subStep.imgPath}
                                              alt={subStep.label}
                                              style={{
                                                width: "auto",
                                                borderRadius: "10px",
                                                border: "1px solid #ccc",
                                              }}
                                            />
                                          )}
                                        </Row>
                                        <Row>
                                          {subStep.step && (
                                            <Typography
                                              variant="body2"
                                              color="text.secondary"
                                              align="center"
                                            >
                                              {subStep.step}
                                            </Typography>
                                          )}
                                        </Row>
                                      </Col>
                                    )}
                                    <Box sx={{ mb: 1, mt: 1 }}>
                                      <div>
                                        <Button
                                          variant="contained"
                                          onClick={handleSubNext}
                                          sx={{ mt: 1, mr: 1 }}
                                          style={{
                                            backgroundColor:
                                              Colors.PalleteSuccess,
                                          }}
                                        >
                                          {index ===
                                          subStepsCounts[activeStep] - 1
                                            ? "Terminar"
                                            : "Continuar"}
                                        </Button>
                                        <Button
                                          variant="outlined"
                                          color="success"
                                          disabled={index === 0}
                                          onClick={handleSubBack}
                                          sx={{ mt: 1, mr: 1 }}
                                        >
                                          Regresar
                                        </Button>
                                      </div>
                                    </Box>
                                  </StepContent>
                                </Step>
                              ))}
                            </Stepper>
                            {subActiveSteps[activeStep] ===
                              subStepsCounts[activeStep] && (
                              <Paper square elevation={0} sx={{ p: 3 }}>
                                <Typography>
                                  Todas las subetapas completadas - ¡Has
                                  terminado!
                                </Typography>
                                <Button
                                  variant="outlined"
                                  color="success"
                                  onClick={handleSubReset}
                                  sx={{ mt: 1, mr: 1 }}
                                >
                                  Reiniciar
                                </Button>
                              </Paper>
                            )}
                          </Box>
                        )}
                      </Row>
                    </Col>
                  )}
                  <Box sx={{ mb: 1, mt: 1 }}>
                    <div>
                      <Button
                        variant="contained"
                        onClick={handleNext}
                        sx={{ mt: 1, mr: 1 }}
                        style={{ backgroundColor: Colors.PalletePrimary }}
                      >
                        {index === stepsTutorial.length - 1
                          ? "Terminar"
                          : "Continuar"}
                      </Button>
                      <Button
                        variant="outlined"
                        disabled={index === 0}
                        onClick={handleBack}
                        sx={{ mt: 1, mr: 1 }}
                      >
                        Regresar
                      </Button>
                    </div>
                  </Box>
                </StepContent>
              </Step>
            ))}
          </Stepper>
          {activeStep === stepsTutorial.length && (
            <Paper square elevation={0} sx={{ p: 3 }}>
              <Typography>
                Todas las etapas completadas - ¡Has terminado!
              </Typography>
              <Button
                variant="outlined"
                onClick={handleReset}
                sx={{ mt: 1, mr: 1 }}
              >
                Reiniciar
              </Button>
            </Paper>
          )}
        </Box>
      </Modal.Body>
    </Modal>
  );
};
