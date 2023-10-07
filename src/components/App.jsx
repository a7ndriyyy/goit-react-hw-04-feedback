import { useState } from 'react';
import { FeedbackOptions } from './Feedback/FeedbackOptions';
import { Section } from './Section/Section.jsx';
import { Notification } from './Notification/Notification';
import { Statistics } from './Statistics/Statistics';

export const App = () => {

  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  
  const feedbackNames = ["good", "neutral", "bad"];
  

 const countTotalFeedback = () => {
   return good + neutral + bad;
  };

  const countPositiveFeedbackPercentage = () => {
    return Math.round((good / countTotalFeedback()) * 100);
  };

  const handleLeaveFeedback = option => {
    option === 'good' && setGood(stat => ({ ...stat, good: stat.good + 1 }));
    option === 'neutral' && setNeutral(stat => ({ ...stat, neutral: stat.neutral + 1 }));
    option === 'bad' && setBad(stat => ({ ...stat, bad: stat.bad + 1 }));

  };

  return (
    <>
      <Section title="Please leave feedback">
        <FeedbackOptions
          options={feedbackNames}
          onLeaveFeedback={handleLeaveFeedback}
        />
      
      {countTotalFeedback() === 0 ? (
        <Notification message="There is no feedback"></Notification>
      ) : (
        <Statistics
          good={good}
          neutral={neutral}
          bad={bad}
          total={countTotalFeedback}
          positivePercentage={countPositiveFeedbackPercentage()}
        />
        )}
        </Section>
    </>
  );
};
