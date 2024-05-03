import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getDataQuiz, postSubmitQuiz } from "../../services/apiServices";
import _, { values } from 'lodash';
import './DatailQuiz.scss';
import Question from "./Question";
import ModalResult from "./ModalResult";
const DetailQuiz = (props) => {
    const params = useParams();
    const location = useLocation();
    const quizId = params.id;
    const [dataQuiz, setDataQuiz] = useState([]);
    const [index, setIndex] = useState(0);
    const [isShowModalResult, setIsShowModalResult] = useState(false)
    const [dataModalResult, setDataModalResult] = useState({})
    useEffect(() => {
        fetchQuestion();
    }, [quizId])
    const fetchQuestion = async () => {
        let res = await getDataQuiz(quizId);
        // console.log("Check question: ", res);
        if (res && res.EC === 0) {
            let raw = res.DT;
            let data = _.chain(raw)
                .groupBy("id")
                .map((value, key) => {
                    let answers = [];
                    let questionDescription, image = null;

                    value.forEach((item, index) => {
                        if (index === 0) {
                            questionDescription = item.description;;
                            image = item.image;
                        }
                        item.answers.isSelected = false;
                        answers.push(item.answers);

                    })


                    return { questionId: key, answers, questionDescription, image }
                }
                )
                .value();
            // console.log(data);
            setDataQuiz(data)
        }
    }
    // console.log(">>>check DATAQuIZ ", dataQuiz);
    const handlePrev = () => {
        if (index - 1 < 0) return;
        setIndex(index - 1)
    }
    const handleNext = () => {
        if (dataQuiz && dataQuiz.length > index + 1)
            setIndex(index + 1)

    }

    const handleCheckbox = (answerId, questionId) => {
        let dataQuizClone = _.cloneDeep(dataQuiz);//react hook doesn't merge start
        //clone: sao chep object ben ngoai
        //cloneDeep: sao chep tat ca
        let question = dataQuizClone.find(item => +item.questionId === +questionId)
        if (question && question.answers) {
            // console.log("q: ",question);
            let b = question.answers.map(item => {
                if (+item.id === answerId) {
                    item.isSelected = !item.isSelected;
                }
                return item;
            })
            question.answers = b;
            // console.log(b);
        }
        let index = dataQuizClone.findIndex(item => +item.questionId === +questionId)
        if (index > -1) {
            dataQuizClone[index] = question;
            setDataQuiz(dataQuizClone);
        }

    }
    const handleFinishQuiz = async () => {
        let payload = {
            quizId: +quizId,
            answers: []
        };

        let answers = [];
        if (dataQuiz && dataQuiz.length > 0) {
            dataQuiz.forEach(question => {
                let questionId = question.questionId;
                let userAnswerId = [];
                //todo:userAnswerID
                question.answers.forEach(a => {
                    if (a.isSelected === true) {
                        userAnswerId.push(a.id)
                    }
                })
                answers.push({
                    questionId: +questionId,
                    userAnswerId: userAnswerId
                })
            })
            payload.answers = answers;
            // console.log("fina payload: ", payload);
            //submit APi
            let res = await postSubmitQuiz(payload);
            if (res && res.EC === 0) {
                setDataModalResult({
                    countCorrect: res.DT.countCorrect,
                    countTotal: res.DT.countTotal,
                    quizData: res.DT.quizData
                })
                setIsShowModalResult(true);
            } else {
                alert("Something wrongs...")
            }
            console.log("Check res, ", res);
        }
    }
    return (
        <div className="detail-quiz-container">
            <div className="left-content">
                <div className="title">
                    {location?.state?.quizTitle}
                </div>
                <hr />
                <div className="q-image">
                    <img />
                </div>
                <div className="q-content">
                    <Question
                        index={index}
                        handleCheckbox={handleCheckbox}
                        data={dataQuiz && dataQuiz.length > 0
                            ? dataQuiz[index] : []} />
                </div>
                <div className="footer">
                    <button className="btn btn-secondary"
                        onClick={() => { handlePrev() }}
                    >Prev</button>
                    <button className="btn btn-primary"
                        onClick={() => { handleNext() }}
                    >Next</button>
                    <button className="btn btn-warning"
                        onClick={() => { handleFinishQuiz() }}
                    >Finish</button>
                </div>
            </div>
            <div className="right-content">
                count down
            </div>
            <ModalResult
                show={isShowModalResult}
                setShow={setIsShowModalResult}
                dataModalResult={dataModalResult}
            />
        </div>
    )
}
export default DetailQuiz;