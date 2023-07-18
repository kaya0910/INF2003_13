export const json = (questions) => {
  return {
    logoPosition: "right",
    pages: [
      {
        name: "page1",
        elements: [
          {
            type: "matrix",
            name: "Survey",
            title: "Happiness Index Survey",
            hideNumber: true,
            isRequired: true,
            requiredErrorText: "Please pick the option",
            columns: [
              {
                value: "Strongly Agree",
                text: "Strongly Agree",
              },
              {
                value: "Agree",
                text: "Agree",
              },
              {
                value: "Neutral",
                text: "Neutral",
              },
              {
                value: "Disagree",
                text: "Disagree",
              },
              {
                value: "Strongly Disagree",
                text: "Strongly Disagree",
              },
            ],
            rows: questions,
            isAllRowRequired: true,
          },
        ],
      },
    ],
  };
};
