import { useEffect, useState } from "react";
import QuestionsTab from "../components/QuestionsTab";
import Test from "../components/Test";
const SurveyCreator = () => {
  const [formDetails, setFormDetails] = useState({});
  return (
    <>
    <QuestionsTab formData={formDetails} />
    </>
  );
};

export default SurveyCreator;
