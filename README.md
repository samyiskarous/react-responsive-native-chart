# Responsive Native Chart Bar with React, Native CSS & Styled Components

This project was bootstrapped with [Create React App](https:\\github.com\facebook\create-react-app).
Implemented by [Samy George Escarous](https:\\github.com\samyiskarous).
\

### Libraries Used
For Styling : [Styled Components](https:\\github.com\styled-components\styled-components).
For the Date Pickers: [React Datepicker](https:\\www.npmjs.com\package\react-datepicker).
For Promise-based APIs Handling: [Axios](https:\\github.com\axios\axios).
For Responsiveness: [React Responsive](https:\\www.npmjs.com\package\react-responsive).

## Notes About the project's structure.

`util` Folder helpers including and Abstraction for the APIs Invocations.
\
\
`components` Folder is divided into two main folders: `charts-containers` and `reusable`\
`reusable` Folder will contain Components that can be used anywhere like the "BarChart"\
`charts-containers` Folder is made to hold containers for charts, like the "ReviewsScoreToTime" component.\
\
`reducers` Folder has a reducer for each State that has multiple statuses (Loading, error...etc), like States that hold APIs' Data. It maintain the predictability of updating that state. All in once place.\
`action-creators` Folder contains functions responsible for handling the APIs invocations, getting the data, dispatching it to the reducer, and finally return a predictable piece of data to be used as a state. It serves the concept of separation of concerns, where APIs handling is away from our View Components, which makes it cleaner to read.\
\


## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http:\\localhost:3000](http:\\localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.
