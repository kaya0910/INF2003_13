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
                value: "5",
                text: "Strongly Agree",
              },
              {
                value: "4",
                text: "Agree",
              },
              {
                value: "3",
                text: "Neutral",
              },
              {
                value: "2",
                text: "Disagree",
              },
              {
                value: "1",
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
