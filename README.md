# Firebase Authentication and Initial Analysis

In HW4, we built the project with Ionic and Firebase. It's
using Angular as the programming framework.

# Command
To run the application, 
- 1: install with the following npm command:
  npm install -g @angular/cli
  npm install -g ionic
- 2: "npm install" in the root folder
- 3: "npm install" in the function folder
- 4: run with "ng serve"

## Adding Contents with Librarys

- Login Page(Firebase auth)
- Signup Page(Firebase auth)
- Reset Password Page(Firebase auth)
- Profile Page(Firebase auth)
- Speed Page(HighCharts)
- Browser Page

## Speed Page
This page consists of 3 charts containing same data: bar chart, pie chart and line chart. The data is static data. The library we use is HighCharts.

## Browser Page
This page consists of a data grid with static data. The data grid supports features including sorting, filtering, searching and pagination. The library we used is Zing-Grid.

This is a static page that is not included in the app. You can open it directly through browser.html under root folder. We will implement data grid in our final project.


# Diagram and Wireframes

App-diagram.pdf and wireframe.pdf provide the overall architechture of our application and the per page structure. In our app, we will implement an analytic system to track user actions on each page as well as browser information. We will store the data both locally and in firebase database. The analytic results will be finally shown on speed page and browser page using charts and data grids.
