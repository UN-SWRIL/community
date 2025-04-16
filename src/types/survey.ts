export type QuestionType = 
  | 'radio' 
  | 'checkbox' 
  | 'slider' 
  | 'matrix' 
  | 'yesno';

export interface QuestionOption {
  id: string;
  text: string;
  value: string | number;
}

export interface MatrixRow {
  id: string;
  text: string;
}

export interface MatrixColumn {
  id: string;
  text: string;
  value: string | number;
}

export interface BaseQuestion {
  id: string;
  type: QuestionType;
  text: string;
  required: boolean;
  description?: string;
}

export interface RadioQuestion extends BaseQuestion {
  type: 'radio';
  options: QuestionOption[];
}

export interface CheckboxQuestion extends BaseQuestion {
  type: 'checkbox';
  options: QuestionOption[];
}

export interface SliderQuestion extends BaseQuestion {
  type: 'slider';
  minValue: number;
  maxValue: number;
  minLabel?: string;
  maxLabel?: string;
  step?: number;
}

export interface YesNoQuestion extends BaseQuestion {
  type: 'yesno';
}

export interface MatrixQuestion extends BaseQuestion {
  type: 'matrix';
  rows: MatrixRow[];
  columns: MatrixColumn[];
}

export type SurveyQuestion = 
  | RadioQuestion 
  | CheckboxQuestion 
  | SliderQuestion 
  | YesNoQuestion 
  | MatrixQuestion;

export interface SurveyAnswer {
  questionId: string;
  value: string | number | string[] | number[] | Record<string, string | number>;
}

export interface Survey {
  id: string;
  title: string;
  description: string;
  instructions?: string;
  questions: SurveyQuestion[];
}

// This is the UN Quality of Life Survey structure that exactly matches the original
export const UN_QUALITY_OF_LIFE_SURVEY: Survey = {
  id: 'un-qol-survey',
  title: 'Quality of Life Survey',
  description: 'This short survey is seeking your feedback on your experience of living in your city. The survey is part of a collaboration with UN-Habitat in understanding how residents rate their quality of life.',
  instructions: 'The survey should not take more than 5 minutes of your time. We will not collect any personally identifiable information from you and all responses will remain confidential, and only used in aggregate. We value your feedback.',
  questions: [
    {
      id: 'q1',
      type: 'radio',
      text: 'Which age group do you belong to?',
      required: true,
      options: [
        { id: 'a1', text: '0-14', value: '0-14' },
        { id: 'a2', text: '15-24', value: '15-24' },
        { id: 'a3', text: '25-40', value: '25-40' },
        { id: 'a4', text: '41-64', value: '41-64' },
        { id: 'a5', text: '65+', value: '65+' }
      ]
    },
    {
      id: 'q2',
      type: 'radio',
      text: 'What is your sex?',
      required: true,
      options: [
        { id: 'b1', text: 'Male', value: 'male' },
        { id: 'b2', text: 'Female', value: 'female' },
        { id: 'b3', text: 'Prefer not to answer', value: 'no_answer' }
      ]
    },
    {
      id: 'q3',
      type: 'radio',
      text: 'What part of the city would you say you live in',
      required: true,
      options: [
        { id: 'c1', text: 'North-East', value: 'north-east' },
        { id: 'c2', text: 'East', value: 'east' },
        { id: 'c3', text: 'South-East', value: 'south-east' },
        { id: 'c4', text: 'North-West', value: 'north-west' },
        { id: 'c5', text: 'West', value: 'west' },
        { id: 'c6', text: 'South-West', value: 'south-west' },
        { id: 'c7', text: 'North', value: 'north' },
        { id: 'c8', text: 'South', value: 'south' },
        { id: 'c9', text: 'Central', value: 'central' }
      ]
    },
    {
      id: 'q4',
      type: 'radio',
      text: 'Would you say that you have a disability?',
      required: true,
      options: [
        { id: 'd1', text: 'Yes', value: 'yes' },
        { id: 'd2', text: 'No', value: 'no' },
        { id: 'd3', text: 'Prefer not to answer', value: 'no_answer' }
      ]
    },
    {
      id: 'q5',
      type: 'matrix',
      text: 'To what extent do you agree or disagree with each of the following statements?',
      required: true,
      rows: [
        { id: 'q5r1', text: 'It is easy to find a good job in my city' },
        { id: 'q5r2', text: 'It is easy to find good housing in my city at a reasonable price' }
      ],
      columns: [
        { id: 'q5c1', text: 'Strongly Agree', value: 'strongly_agree' },
        { id: 'q5c2', text: 'Somewhat Agree', value: 'somewhat_agree' },
        { id: 'q5c3', text: 'Somewhat Disagree', value: 'somewhat_disagree' },
        { id: 'q5c4', text: 'Strongly Disagree', value: 'strongly_disagree' },
        { id: 'q5c5', text: 'Don\'t know/No Answer/Prefer not to Answer', value: 'no_answer' }
      ]
    },
    {
      id: 'q6',
      type: 'radio',
      text: 'How safe do you feel walking alone in your neighborhood after dark?',
      required: true,
      options: [
        { id: 'f1', text: 'Very Safe', value: 'very_safe' },
        { id: 'f2', text: 'Safe', value: 'safe' },
        { id: 'f3', text: 'Unsafe', value: 'unsafe' },
        { id: 'f4', text: 'Very Unsafe', value: 'very_unsafe' },
        { id: 'f5', text: 'I never go out alone at night/does not apply', value: 'not_applicable' },
        { id: 'f6', text: 'Don\'t know/No answer/Prefer not to answer', value: 'no_answer' }
      ]
    },
    {
      id: 'q7',
      type: 'slider',
      text: 'On a scale of 0 to 10, where 0 is the worst possible and 10 is the best possible, how would you rate your overall mental health?',
      required: true,
      minValue: 0,
      maxValue: 10,
      minLabel: '0 - Worst possible',
      maxLabel: '10 - Best possible',
      step: 1
    },
    {
      id: 'q8',
      type: 'radio',
      text: 'To what extent do you feel a sense of belonging to your community in your city?',
      required: true,
      options: [
        { id: 'h1', text: 'Very Strong', value: 'very_strong' },
        { id: 'h2', text: 'Somewhat Strong', value: 'somewhat_strong' },
        { id: 'h3', text: 'Rather Weak', value: 'rather_weak' },
        { id: 'h4', text: 'Very Weak', value: 'very_weak' },
        { id: 'h5', text: 'Don\'t know/No answer/Prefer not to answer', value: 'no_answer' }
      ]
    },
    {
      id: 'q9',
      type: 'matrix',
      text: 'Generally speaking, please tell us if you are very satisfied, rather satisfied, rather unsatisfied or very unsatisfied with each of the following in your city:',
      required: true,
      rows: [
        { id: 'q9r1', text: 'Public transport (e.g., bus, tram or metro)' },
        { id: 'q9r2', text: 'Public healthcare services (e.g., clinics and hospitals)' },
        { id: 'q9r3', text: 'Public sport and other cultural facilities (e.g., sports fields, concert halls, theaters, museums and libraries)' },
        { id: 'q9r4', text: 'Public green spaces (e.g., parks and gardens)' },
        { id: 'q9r5', text: 'Public spaces (e.g., markets, squares, pedestrian areas)' },
        { id: 'q9r6', text: 'Public schools and other public educational facilities' }
      ],
      columns: [
        { id: 'q9c1', text: 'Very satisfied', value: 'very_satisfied' },
        { id: 'q9c2', text: 'Rather satisfied', value: 'rather_satisfied' },
        { id: 'q9c3', text: 'Rather unsatisfied', value: 'rather_unsatisfied' },
        { id: 'q9c4', text: 'Very unsatisfied', value: 'very_unsatisfied' },
        { id: 'q9c5', text: 'I have not had engagements with this public service in the last 12 months', value: 'no_engagement' },
        { id: 'q9c6', text: 'Don\'t know/No answer/Prefer not to answer', value: 'no_answer' }
      ]
    },
    {
      id: 'q10',
      type: 'yesno',
      text: 'In the city where you live, do you have confidence in the local police force?',
      required: true
    },
    {
      id: 'q11',
      type: 'yesno',
      text: 'In the city where you live, do you have confidence in the municipal courts?',
      required: true
    },
    {
      id: 'q12',
      type: 'matrix',
      text: 'Below you will see a few statements about the local public administration in your city. To what extent do you agree or disagree with each of these statements?',
      required: true,
      rows: [
        { id: 'q12r1', text: 'I am satisfied with the amount of time it takes to get a request solved by my local public administration' },
        { id: 'q12r2', text: 'The procedures used by my local public administration are straightforward and easy to understand' },
        { id: 'q12r3', text: 'The fees charged by my local public administration are reasonable' },
        { id: 'q12r4', text: 'Information and services of my local public administration can be easily accessed online' },
        { id: 'q12r5', text: 'There is corruption in my local public administration' }
      ],
      columns: [
        { id: 'q12c1', text: 'Strongly agree', value: 'strongly_agree' },
        { id: 'q12c2', text: 'Somewhat agree', value: 'somewhat_agree' },
        { id: 'q12c3', text: 'Somewhat disagree', value: 'somewhat_disagree' },
        { id: 'q12c4', text: 'Strongly disagree', value: 'strongly_disagree' },
        { id: 'q12c5', text: 'Don\'t know/No answer/Prefer not to answer', value: 'no_answer' }
      ]
    },
    {
      id: 'q13',
      type: 'radio',
      text: 'As weather patterns change with the climate (heat, rain, flooding, sea level rise, etc.), how concerned do you feel about the future of your city?',
      required: true,
      options: [
        { id: 'm1', text: 'Very concerned', value: 'very_concerned' },
        { id: 'm2', text: 'Somewhat concerned', value: 'somewhat_concerned' },
        { id: 'm3', text: 'Somewhat not concerned', value: 'somewhat_not_concerned' },
        { id: 'm4', text: 'Not concerned at all', value: 'not_concerned' },
        { id: 'm5', text: 'Don\'t know/No answer/Prefer not to answer', value: 'no_answer' }
      ]
    },
    {
      id: 'q14',
      type: 'yesno',
      text: 'Do you feel that if you needed material help (e.g., money, loan or an object) you could receive it from relatives, friends, neighbours or other persons you know?',
      required: true
    },
    {
      id: 'q15',
      type: 'yesno',
      text: 'Do you feel that if you needed non-material help (e.g., somebody to talk to, help with doing something or collecting something) you could receive it from relatives, friends, neighbors or other persons you know?',
      required: true
    },
    {
      id: 'q16',
      type: 'slider',
      text: 'Taking everything in your life into consideration, on a scale of 0 to 10, with 0 being \'Not satisfied at all\' and 10 being \'Extremely satisfied\', how satisfied are you with your life these days?',
      required: true,
      minValue: 0,
      maxValue: 10,
      minLabel: '0 - Not satisfied at all',
      maxLabel: '10 - Extremely satisfied',
      step: 1
    }
  ]
}; 