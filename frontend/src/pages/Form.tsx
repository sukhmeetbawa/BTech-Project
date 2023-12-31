import { Step, StepLabel, Stepper } from "@mui/material";
import { useState } from "react";
import AlternativeForm from "./Form/AlternativeForm";
import BasicForm from "./Form/BasicForm";
import CriteriaForm from "./Form/CriteriaForm";
import Response from "./Form/Response";
import Result from "./Form/Result";

const Form = () => {
    //Criteria
    const [criteria, setCriteria] = useState<string[]>([]);
    const [criteriaMatrix, setCriteriaMatrix] = useState<number[][]>([]);

    //Alternative
    const [alternatives, setAlternatives] = useState<string[]>([]);
    const [alternativeMatrices, setAlternativeMatrices] = useState<
        number[][][]
    >([]);

    const steps = [
        "Basic Details",
        "Getting Data",
        "Criteria Details",
        "Alternative Details",
        "Result",
    ];

    //Usecase
    const [usecase, setUsecase] = useState<string>("");

    //Result
    const [result, setResult] = useState<AHPResult>();

    //Step Counter
    const [step, setStep] = useState(1);

    //Error
    const [error, setError] = useState<string>("");

    //Consistency Check
    const [consistencyCheck, setConsistencyCheck] = useState(false);

    //ChatGPT
    const [chatGPT, setChatGPT] = useState(false);

    //Functions
    const nextStep: () => void = () => {
        setStep(step + 1);
        setError("");
    };

    const prevStep: () => void = () => {
        setStep(step - 1);
        setError("");
    };

    const resetStep: () => void = () => {
        setStep(1);
        setError("");
        setAlternatives([]);
        setCriteria([]);
        setUsecase("");
        setCriteriaMatrix([]);
        setAlternativeMatrices([]);
        setResult(undefined);
    };

    //Rendering
    return (
        <>
            <Stepper activeStep={step - 1} alternativeLabel>
                {steps.map((label, index) => (
                    <Step key={index}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>

            {step === 1 && (
                <BasicForm
                    criteria={criteria}
                    alternatives={alternatives}
                    usecase={usecase}
                    nextStep={nextStep}
                    setCriteria={setCriteria}
                    setAlternatives={setAlternatives}
                    setUsecase={setUsecase}
                    consistency={consistencyCheck}
                    setConsistency={setConsistencyCheck}
                    chatgpt={chatGPT}
                    setChatGPT={setChatGPT}
                />
            )}
            {step == 2 && (
                <Response
                    criteria={criteria}
                    alternatives={alternatives}
                    usecase={usecase}
                    setCriteriaMatrix={setCriteriaMatrix}
                    setAlternativeMatrices={setAlternativeMatrices}
                    nextStep={nextStep}
                    chatgpt={chatGPT}
                />
            )}

            {step === 3 && (
                <CriteriaForm
                    nextStep={nextStep}
                    criteria={criteria}
                    updateMatrix={setCriteriaMatrix}
                    recievedMatrix={criteriaMatrix}
                    error={error}
                />
            )}

            {step === 4 && (
                <AlternativeForm
                    criteria={criteria}
                    alternatives={alternatives}
                    updateMatrix={setAlternativeMatrices}
                    nextStep={nextStep}
                    recievedMatrix={alternativeMatrices}
                    prevStep={prevStep}
                    error={error}
                />
            )}

            {step === 5 && (
                <Result
                    criteria={criteria}
                    alternatives={alternatives}
                    criteriaMatrix={criteriaMatrix}
                    alternativeMatrices={Array.from(
                        Array(criteria.length),
                        () =>
                            Array.from(Array(alternatives.length), () =>
                                new Array(alternatives.length).fill(1),
                            ),
                    )}
                    result={
                        result || {
                            error: "",
                            criterionWeights: [],
                            alternativeWeights: [],
                        }
                    }
                    setResult={setResult}
                    prevStep={prevStep}
                    resetStep={resetStep}
                    setStep={setStep}
                    setError={setError}
                    usecase={usecase}
                    consistency={consistencyCheck}
                />
            )}
        </>
    );
};
export default Form;
