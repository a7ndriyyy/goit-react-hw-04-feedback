import {useState } from 'react';
import { FeedbackOptions } from './Feedback/FeedbackOptions';
import { Section } from './Section/Section.jsx';
import { Notification } from './Notification/Notification';
import { Statistics } from './Statistics/Statistics';

export const App = () => {

  const [stats, setState] = useState({ good: 0, neutral: 0, bad: 0, });
  const feedbackNames = ['good', 'neutral', 'bad'];

 const countTotalFeedback = () => {
   const { good, neutral, bad } = stats;
   return good + neutral + bad;
  };

  const countPositiveFeedbackPercentage = () => {
    const { good } = stats;
    return Math.round((good / countTotalFeedback()) * 100);
  };

  const handleLeaveFeedback = option => {
    option === 'good' && setState(stat => ({ ...stat, good: stat.good + 1 }));
    option === 'neutral' && setState(stat => ({ ...stat, neutral: stat.neutral + 1 }));
    option === 'bad' && setState(stat => ({ ...stat, bad: stat.bad + 1 }));

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
          good={stats.good}
          neutral={stats.neutral}
          bad={stats.bad}
          total={countTotalFeedback}
          positivePercentage={countPositiveFeedbackPercentage()}
        />
        )}
        </Section>
    </>
  );
};
