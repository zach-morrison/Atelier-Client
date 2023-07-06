import React, { useEffect, useState } from 'react';
import Question from './Question.jsx';
import QuestionModal from './QuestionModal.jsx';
import { getAllQuestions, getProductName } from '../routes.js';

const QuestionList = ({ productID, questionData, setQuestionData, filterData }) => {

  const [sortedQuestions, setSortedQuestions] = useState([]);
  const [productName, setProductName] = useState('');
  const [visibleQuestions, setVisibleQuestions] = useState(2);
  const [allQuestionsLoaded, setAllQuestionsLoaded] = useState(false);

  useEffect(() => {
    getAllQuestions(productID)
      .then(data => {
        setQuestionData(data);
      })
      .catch(error => {
        console.error('Error fetching questions:', error);
      });
  }, [productID]);

  useEffect(() => {
    if (filterData && filterData.length > 0) {
      const testingArr = [...filterData];
      testingArr.sort((a,b) => a.helpfulness - b.helpfulness)
      setSortedQuestions(testingArr);
    }
  }, [filterData]);

  useEffect(() => {
    getProductName(productID)
      .then((response) => {
        setProductName(response.name);
      })
      .catch((error) => console.error('Error fetching answers in Question component', error));
  }, [productID]);

  useEffect(() => {
    if (visibleQuestions >= sortedQuestions.length) {
      setAllQuestionsLoaded(true);
    }
  }, [visibleQuestions, sortedQuestions]);

  const handleLoadMore = () => {
    setVisibleQuestions(visibleQuestions+2);
    setAllQuestionsLoaded(true);
  };

  //overflowY: 'auto'

  return (
    <>
    <div class="flex flex-col w-full overflow-scroll" style={{ maxHeight: '400px', overflowY: 'auto' }}>
      {sortedQuestions.slice(0, visibleQuestions).map((question) => (
        <Question key={question.question_id} questionId={question.question_id} question={question} productName={productName}/>
      ))}
    </div>
      <div class="flex flex-row items-center justify-between items-center w-full">
      <div class="flex flex-row items-center justify-between">
      {sortedQuestions.length > visibleQuestions && (
        <div >
        <button
          className="btn"
          style={{
            textAlign: 'center',
            lineHeight: '29px',
            fontSize: '13px',
            margin: '10px',
            cursor: 'pointer',
          }}
          onClick={handleLoadMore}>
          More Answered Questions
        </button>
        </div>
      )}
      <br />
      <QuestionModal productID={productID} setQuestionData={setQuestionData} productName={productName}/>
      </div>
      </div>
    </>
  );
};

export default QuestionList;