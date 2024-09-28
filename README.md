# My_Journary
By Thananya Amornwiriya ID: 6610609 section 542

# Data Models
1. Trip: name, destination, country, startDate, endDate, budget, picture, note
2. Planner: place, time, date, placeInfo, activity, reminder, GoogleMap, tripId
3. Diary: place, date, emotion, diary, photo, tripId

There are 3 pages: Trip, Planner, Diary
## 1. Trip page
(Menu can be hidden by click the menu icon)
(1/16)

There are 3 parts in Trip page.
(2/16)

### 1.1 Create a trip.
- To create a trip, click at “+ CREATE NEW TRIP” button and this form will show up
(3/16)
- Trip name, destination, country, start date, end date are required to build a new trip.
- for picture, enter picture URL (how to get picture URL is provided below)
- click save to finish the process

### 1.2 Update and Delete a trip.
- click an ‘Icon’ next to “VIEW TRIP” button, edit and delete button will show up.
- To update, click “edit”, the form will show up, with the filled information
- edit and click “save.”
(4/16)
- To delete, click “delete” and the data will be deleted right away.

### 1.3 “VIEW TRIP”
- inside there are 2 parts: 1) planner, 2) diary (view only)
(5/16)

> Planner Part (in trip page)
- “Planner >>” will linked to planner page for that trip
- plan are ordered by day and time
- to see the map, click map icon, and click “< back” to go back
(6/16)

> Diary Part (in trip page)
- “Diary >>” will linked to diary page for that trip
- to slide a diary book, click “<, >” icon or drag the cursor left or right
- some page in diary might be too long, scroll down to see the rest
(7/16)

## 2. Planner Page
- click planner card, to plan a trip
(8/16)
- This is planner page for each trip
- there is trip information and calendar highlighted from start – end trip
- choose “Day _” to see and plan for that day.
(9/16)

### 2.1 Create a plan.
- click “+ ADD PLAN”, the form will show up
- day, place, time are required.
- for google maps URL, it needs to be embed link of the place (how to get google maps embed URL is provided below)
- click add plan to finish the form
(10/16)
- plans will show like this, it is daily plan

### 2.2 Update and Delete a plan
- click map icon to see the map (map icon only show up when there is map link in that plan)
- click icon next to map, to edit or delete
- when click edit, the form will show up with filled information, edit and click save
- to delete, just click delete button
(12/16)

## 3. Diary Page
- click icon to go to diary
(13/16)
- on the page, there are “+ADD DIARY” button
- to read diary, it works like the one in trip page, to slide a diary book, click “<, >” icon or drag the cursor left or right, some page in diary might be too long, scroll down to see the rest
- there are edit and delete buttons as well.
(14/16)

### 3.1 Create Diary
- click “+ADD DIARY” button” it will show the form
- choose place (the place come from a planner), date, emotion, diary are required
- to add picture, is the same way as add trip picture (how to get picture URL is provided below)
(15/16)
- if there is no plan, it will show “no place available.”
- click the link to go to planner and at some plans, otherwise diary cannot be created
(16/16)

### 3.2 Update and Delete Diary
- in each diary page there is pencil and bin on the bottom right
- click pencil to edit and click bin to delete.
(14/16)

# Blog App
Next.js 14
This app shows
1. MongoDB CRUD operations using Mongoose
2. Client Components interacting with APIs
3. Server Components Interacting with Server Actions# next-mongo
