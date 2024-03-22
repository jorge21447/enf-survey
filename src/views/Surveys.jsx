
import { useNavigate } from "react-router-dom"

const Surveys = () => {

  const navigate =  useNavigate();
  const handleCreateSurvey = (e) =>{
    e.preventDefault()
    navigate('/admin/surveys/create')
  }
  return (
    <>
      S
      <button type="button" className="py-5 px-5 bg-cyan-800 te" onClick={handleCreateSurvey}>
        Aqui
      </button>
    </>
  )
}

export default Surveys