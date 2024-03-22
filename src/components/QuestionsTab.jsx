import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import Loader from "../components/Loader";
import Accordion from "../components/Accordion";
import { RiAddCircleLine } from "react-icons/ri";
import { FaSave } from "react-icons/fa";
import { MdOutlineDragIndicator } from "react-icons/md";

const QuestionsTab = (props) => {
  const [questions, setQuestions] = useState([]);
  const [formData, setFormData] = useState({});
  const [loadingFormData, setLoadingFormData] = useState(true);

  useEffect(() => {
    console.log(props.formData.questions, "Hello WOrld", props);
    if (props.formData.questions !== undefined) {
      //console.log(props.formData.questions.length);
      if (props.formData.questions.length == 0) {
        setQuestions([
          {
            questionText: "Question",
            options: [{ optionText: "Option 1" }],
            open: false,
          },
        ]);
      } else {
        setQuestions(props.formData.questions);
      }
    }
    setFormData(props.formData);
    setLoadingFormData(false);
  }, [props.formData]);

  
  function checkImageHereOrNotForQuestion(gg) {
    // console.log(gg);
    if ((gg === undefined) || (gg === "")) {
      return false;
    } else {
      return true;
    }
  }

  function checkImageHereOrNotForOption(gg) {
    // console.log(gg);
    if ((gg === undefined) || (gg === "")) {
      return false;
    } else {
      return true;
    }
  }

  function addMoreQuestionField() {
    expandCloseAll(); //I AM GOD

    setQuestions(questions => [...questions, { questionText: "Question", options: [{ optionText: "Option 1" }], open: true }]);
  }

  function copyQuestion(i) {
    let qs = [...questions];
    expandCloseAll();
    const myNewOptions = [];
    qs[i].options.forEach(opn => {
      if ((opn.optionImage !== undefined) || (opn.optionImage !== "")) {
        var opn1new = {
          optionText: opn.optionText,
          optionImage: opn.optionImage
        }
      } else {
        var opn1new = {
          optionText: opn.optionText
        }
      }
      myNewOptions.push(opn1new)
    });
    const qImage = qs[i].questionImage || "";
    var newQuestion = { questionText: qs[i].questionText, questionImage: qImage, options: myNewOptions, open: true }
    setQuestions(questions => [...questions, newQuestion]);
  }

  const handleImagePopupOpen = () => {
    setOpenUploadImagePop(true);
  };


  function uploadImage(i, j) {

    setImageContextData({
      question: i,
      option: j
    });
    handleImagePopupOpen();

  }

  function updateImageLink(link, context) {

    var optionsOfQuestion = [...questions];
    var i = context.question

    if (context.option == null) {
      optionsOfQuestion[i].questionImage = link;
    } else {
      var j = context.option
      optionsOfQuestion[i].options[j].optionImage = link;
    }
    setQuestions(optionsOfQuestion);
  }

  function deleteQuestion(i) {
    let qs = [...questions];
    if (questions.length > 1) {
      qs.splice(i, 1);
    }
    setQuestions(qs)
  }

  function handleOptionValue(text, i, j) {
    var optionsOfQuestion = [...questions];
    optionsOfQuestion[i].options[j].optionText = text;
    //newMembersEmail[i]= email;
    setQuestions(optionsOfQuestion);
  }

  function handleQuestionValue(text, i) {
    var optionsOfQuestion = [...questions];
    optionsOfQuestion[i].questionText = text;
    setQuestions(optionsOfQuestion);
  }

  function onDragEnd(result) {
    if (!result.destination) {
      return;
    }
    var itemgg = [...questions];

    const itemF = reorder(
      itemgg,
      result.source.index,
      result.destination.index
    );

    setQuestions(itemF);
  }

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  function showAsQuestion(i) {
    let qs = [...questions];
    qs[i].open = false;
    setQuestions(qs);
  }

  function addOption(i) {
    var optionsOfQuestion = [...questions];
    if (optionsOfQuestion[i].options.length < 5) {
      optionsOfQuestion[i].options.push({ optionText: "Option " + (optionsOfQuestion[i].options.length + 1) })
    } else {
      console.log("Max  5 options ");
    }
    //console.log(optionsOfQuestion);
    setQuestions(optionsOfQuestion)
  }

  function removeOption(i, j) {
    var optionsOfQuestion = [...questions];
    if (optionsOfQuestion[i].options.length > 1) {
      optionsOfQuestion[i].options.splice(j, 1);
      setQuestions(optionsOfQuestion)
      console.log(i + "__" + j);
    }
  }

  function expandCloseAll() {
    let qs = [...questions];
    for (let j = 0; j < qs.length; j++) {
      qs[j].open = false;
    }
    setQuestions(qs);
  }

  function handleExpand(i) {
    let qs = [...questions];
    for (let j = 0; j < qs.length; j++) {
      if (i === j) {
        qs[i].open = true;

      } else {
        qs[j].open = false;
      }
    }
    setQuestions(qs);
  }

  const questionsUI = () => {
    return questions.map((ques, i) => (
      <Draggable key={i} draggableId={i + "id"} index={i}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <div>
              <div className="mb-4">
                <div className="w-full -mb-2">
                  <MdOutlineDragIndicator className="rotate-90 text-sm" />
                </div>
                <Accordion
                  title={ques.questionText}
                  onChanges={() => {
                    handleExpand(i);
                  }}
                  expanded={questions[i].open}
                >
                  <p>{ques.questionText}</p>
                  <input type="text" />
                </Accordion>
              </div>
            </div>
          </div>
        )}
      </Draggable>
    ));
  };


  return (
    <div className="mt-15 mb-7 pb-30">
      <div className="flex justify-center items-center">
        {loadingFormData ? <Loader /> : ""}
      </div>

      <div className="w-full md:w-3/5">
        <div className="border-t border-teal-500 rounded">
          <div className="bg-white shadow rounded w-full">
            {" "}
            {/* Paper equivalent */}
            <div className="flex flex-col items-start pl-6 pt-8 pb-8">
              {" "}
              {/* Typography and margin */}
              <h1 className="text-xl font-bold mb-6">{formData.name}</h1>{" "}
              {/* Typography variant h4 */}
              <p className="text-gray-600">{formData.description}</p>{" "}
              {/* Typography variant subtitle1 */}
            </div>
          </div>
        </div>

        <div className="pt-10">
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
              {(provided, snapshot) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="mb-10"
                >
                  {questionsUI()}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>

          <div className="flex justify-between">
            <button
              className="flex items-center px-4 py-2 rounded-md bg-blue-500 text-white font-bold m-5"
              onClick={addMoreQuestionField}
            >
              Añadir Pregunta <RiAddCircleLine className="ml-2" />
            </button>

            <button
              className="flex items-center px-4 py-2 rounded-md bg-blue-600 text-white font-bold m-5"
              onClick={copyQuestion}
            >
              Guardar <FaSave className="ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionsTab;
