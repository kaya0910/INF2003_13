import React, { useState, useEffect } from "react";
import { Table } from "antd";
import { getData } from "../../../API";

const Results = () => {
  return (
    <div style={{ display: "flex" }}>
      <RecentSurveys />
    </div>
  );
};

const getRandomMessage = (messages) => {
  const randomIndex = Math.floor(Math.random() * messages.length);
  return messages[randomIndex];
};


const getAdditionalMessage = (question) => {

  const messagesForQuestion1 = [
    ' - Seek support: Reach out to friends, family, or even a counselor or therapist to talk about your feelings. Sometimes, expressing your concerns and fears can be a relief, and having someone listen and understand can make a significant difference.',
    ' - Take it one step at a time: The future can seem daunting when we try to tackle it all at once. Instead, break it down into smaller, manageable steps. Focus on what you can do today or this week to move forward, and celebrate your achievements, no matter how small they may seem.',
    ' - Set realistic goals: It\'s great to have big dreams, but it\'s also essential to set realistic and achievable short-term goals. This will help you build a sense of accomplishment and confidence as you progress.',
    ' - Identify your strengths: Recognize your unique skills and talents. Leverage these strengths to overcome challenges and find opportunities that align with your abilities and interests.',
    ' - Practice gratitude: Take time to appreciate the good things in your life. This can help you feel more positive and optimistic about the future.',
  ];

  const messagesForQuestion2 = [
    ' - Self-reflection: Take some time to reflect on what aspects of your life are causing dissatisfaction. Understanding the root causes of your dissatisfaction can help you identify areas that need attention and improvement.',
    ' - Set clear goals: Define what you want to achieve in different areas of your life. Setting specific and achievable goals can provide direction and motivation to work towards a more satisfying life.',
    ' - Prioritize self care: Make self-care a priority in your daily routine. Engage in activities that bring you joy, relaxation, and inner peace, whether it\'s exercise, hobbies, spending time with loved ones, or simply taking time for yourself.',
    ' - Gratitude practice: Cultivate a habit of gratitude. Focus on the positive aspects of your life and the things you are thankful for. Regularly expressing gratitude can shift your perspective and increase your overall satisfaction.',
    ' - Embrace change: Sometimes, dissatisfaction can arise from resistance to change. Be open to exploring new opportunities and experiences, even if they may seem intimidating at first.'
  ];

  const messagesForQuestion3 = [
    ' - Identify what brings you joy: Reflect on activities or experiences that genuinely make you happy and fulfilled. Focus on incorporating more of these positive elements into your daily life.',
    ' - Set meaningful goals: Define what success means to you personally, and set realistic and achievable goals aligned with your values. Working towards meaningful objectives can bring a sense of purpose and accomplishment.',
    ' - Cultivate gratitude: Practice gratitude regularly by acknowledging the positive aspects of your life, no matter how small they may seem. Gratitude can shift your focus from what\'s lacking to what you already have.',
    ' - Find purpose in helping others: Engaging in acts of kindness or contributing to the well-being of others can be rewarding and fulfilling. Volunteering or supporting a cause you care about can give you a sense of purpose.',
    ' - Explore new interests and passions: Be open to trying new things and discovering activities or hobbies that ignite your passion. Exploring different avenues can lead to rewarding experiences.'
  ];

  const messagesForQuestion4 = [
    ' - Consult a healthcare professional: If you are experiencing persistent or concerning health issues, it\'s crucial to consult a healthcare professional. They can assess your condition, provide an accurate diagnosis, and recommend appropriate treatment or lifestyle changes.',
    ' - Maintain a balanced diet: Focus on consuming a balanced diet that includes a variety of fruits, vegetables, whole grains, lean proteins, and healthy fats. Avoid excessive intake of processed foods, sugary snacks, and drinks high in added sugars.',
    ' - Stay hydrated: Drink an adequate amount of water throughout the day to stay hydrated. Water is essential for various bodily functions and can help improve overall well-being.',
    ' - Engage in regular exercise: Incorporate regular physical activity into your routine. Aim for at least 150 minutes of moderate-intensity aerobic activity or 75 minutes of vigorous-intensity aerobic activity per week, along with muscle-strengthening activities on two or more days a week.',
    ' - Get enough sleep: Ensure you are getting enough quality sleep each night. Most adults need 7-9 hours of sleep for optimal health and functioning.',
  ];

  const messagesForQuestion5 = [
    ' - Practice self-acceptance: Recognize that nobody is perfect, and it\'s okay to have flaws and imperfections. Embrace your uniqueness and understand that being human means having both strengths and weaknesses.',
    ' - Focus on your strengths: Acknowledge and celebrate your positive qualities and accomplishments. Identifying your strengths can boost your self-esteem and help you build on them to achieve more.',
    ' - Challenge negative self-talk: Be mindful of negative thoughts or self-criticism. Whenever you catch yourself engaging in negative self-talk, challenge those thoughts and replace them with more positive and encouraging affirmations.',
    ' - Set realistic expectations: Avoid comparing yourself to others, as it can lead to feelings of inadequacy. Set realistic and achievable goals for yourself, and remember that everyone\'s journey is different.',
    ' - Take care of yourself: Prioritize self-care and engage in activities that make you feel good and promote well-being. This can include exercise, spending time with loved ones, pursuing hobbies, and seeking relaxation.'
  ];
  const messagesForQuestion6 = [
    ' - Practice self-acceptance: Recognize that nobody is perfect, and it\'s okay to have flaws and imperfections. Embrace your uniqueness and understand that being human means having both strengths and weaknesses.',
    ' - Focus on your strengths: Acknowledge and celebrate your positive qualities and accomplishments. Identifying your strengths can boost your self-esteem and help you build on them to achieve more.',
    ' - Challenge negative self-talk: Be mindful of negative thoughts or self-criticism. Whenever you catch yourself engaging in negative self-talk, challenge those thoughts and replace them with more positive and encouraging affirmations.',
    ' - Set realistic expectations: Avoid comparing yourself to others, as it can lead to feelings of inadequacy. Set realistic and achievable goals for yourself, and remember that everyone\'s journey is different.',
    ' - Take care of yourself: Prioritize self-care and engage in activities that make you feel good and promote well-being. This can include exercise, spending time with loved ones, pursuing hobbies, and seeking relaxation.'
  ];
  const messagesForQuestion7 = [
    ' - Explore Your Passions: Take the time to explore different activities and interests that genuinely excite you. Engaging in new experiences can help you discover what brings you joy and fulfillment.',
    ' - Set Small Goals: Start by setting small, achievable goals that align with your values and interests. As you accomplish these goals, you may find a sense of purpose and direction beginning to emerge.',
    ' - Seek Inspiration: Read books, watch documentaries, or listen to podcasts about people who have found their purpose in life. Learning from their journeys may provide insights and motivation for your own path.',
    ' - Practice Self-Reflection: Spend time introspecting and contemplating what truly matters to you. Reflect on your values, strengths, and aspirations. This self-discovery process can lead you towards finding your purpose.'
  ];
  const messagesForQuestion8 = [
    ' - Practice Empathy: Try to understand others\' perspectives and feelings. Showing empathy and compassion can lead to more meaningful connections and positive interactions.',
    ' - Engage in Acts of Kindness: Look for opportunities to perform small acts of kindness for others. Acts of kindness, no matter how simple, can brighten someone\'s day and create a positive impact.',
    ' - Surround Yourself with Positive Influences: Spend time with people who uplift and inspire you. Positive and supportive relationships can encourage you to be your best self and have a more positive impact on others.',
    ' - Offer Support and Encouragement: Be a source of support and encouragement for those around you. Sometimes, a few words of encouragement or a listening ear can make a significant difference in someone\'s life.',
    ' - Focus on Positivity: Strive to maintain a positive attitude and outlook. Your optimism can be contagious and inspire others to see the brighter side of things.'
  ];
  const messagesForQuestion9 = [
    ' - Focus on the Present: Try to focus on the present moment and engage in activities that bring you joy and fulfillment now. Redirecting your attention to positive experiences in the present can help you create new happy memories.',
    ' - Seek Professional Support: Consider seeking the help of a therapist or counselor to work through past experiences and emotions. Talking to a professional can provide valuable insights and support in processing difficult memories.',
    ' - Practice Gratitude: Cultivate a practice of gratitude by acknowledging and appreciating the positive aspects of your life, no matter how small. This can help shift your focus towards more positive emotions.',
    ' - Engage in Self-Compassion: Be kind to yourself and practice self-compassion. Understand that it is natural to have challenging memories, and it\'s okay to give yourself time and space to heal.',
    ' - Create New Positive Experiences: Engage in activities and hobbies that bring you joy and a sense of accomplishment. By creating new positive experiences, you can gradually replace negative associations with more positive ones.'
  ];
  const messagesForQuestion10 = [
    ' - Establish a Consistent Sleep Schedule: Try to go to bed and wake up at the same time every day, even on weekends. A consistent sleep schedule can help regulate your body\'s internal clock and improve sleep quality.',
    ' - Create a Relaxing Bedtime Routine: Develop a relaxing routine before bedtime to signal to your body that it\'s time to wind down. This could include activities such as reading, meditating, or taking a warm bath.',
    ' - Limit Screen Time Before Bed: Avoid using electronic devices with screens (e.g., smartphones, tablets, computers) before bedtime. The blue light emitted by screens can interfere with your sleep-wake cycle.',
    ' - Create a Comfortable Sleep Environment: Make your bedroom conducive to sleep by ensuring it is dark, quiet, and at a comfortable temperature. Invest in a comfortable mattress and pillows that support restful sleep.',
    ' - Avoid Stimulants and Heavy Meals: Minimize the consumption of caffeine and large, heavy meals close to bedtime. These can disrupt your sleep and make it harder to feel rested in the morning.'
  ];
  
  

  // Add your custom messages for each question here
  switch (question) {
    case 'I am optimistic about the future':
      return getRandomMessage(messagesForQuestion1);

    case 'I am well satisfied about everything in my life':
      return getRandomMessage(messagesForQuestion2);

    case 'I feel life is very rewarding':
      return getRandomMessage(messagesForQuestion3);

    case 'I feel particularly healthy':
      return getRandomMessage(messagesForQuestion4);

    case 'I feel particularly pleased with the way I am':
      return getRandomMessage(messagesForQuestion5);

    case 'I find beauty in some things':
      return getRandomMessage(messagesForQuestion6);

    case 'I have a particular sense of meaning and purpose in life':
      return getRandomMessage(messagesForQuestion7);

    case 'I have a positive impact on others around me':
      return getRandomMessage(messagesForQuestion8);

    case 'I have happy memories of the past':
      return getRandomMessage(messagesForQuestion9);

    case 'I wake up feeling well rested':
      return getRandomMessage(messagesForQuestion10);
    default:
      return '';
  }
};

const RecentSurveys = () => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getData().then((res) => {
      setDataSource(res);
      setLoading(false);
    });
  }, []);

  const columns = [
    // {
    //   title: "ID",
    //   dataIndex: "id",
    //   key: "id",
    // },
    {
      title: "Survey Results",
      dataIndex: "Survey",
      key: "Survey",
      render: (survey) => (
        <ul>
          {Object.entries(survey).map(([question, answer]) => (
            <li key={question}>
              <strong>{question}:</strong> {answer}
              {(answer === 'Neutral' || answer === 'Disagree' || answer === 'Strongly Disagree') && <><br /> <span>{getAdditionalMessage(question)}</span></>}

            </li>
          ))}
        </ul>
      ),
    },
  ];

  return <Table columns={columns} dataSource={dataSource} />;
};

export default Results;
