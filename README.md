# My_Journary
By Thananya Amornwiriya ID: 6610609 section 542

# Data Models
1. Trip: name, destination, country, startDate, endDate, budget, picture, note
2. Planner: place, time, date, placeInfo, activity, reminder, GoogleMap, tripId
3. Diary: place, date, emotion, diary, photo, tripId

There are 3 pages: Trip, Planner, Diary
## 1. Trip page
(Menu can be hidden by click the menu icon)
> ![My_Journary-01](https://github.com/user-attachments/assets/1df739d2-a3ff-4ae0-97b0-7a5c4c505c0f)


There are 3 parts in Trip page.
> ![My_Journary-02](https://github.com/user-attachments/assets/b516e76e-7a3e-45b2-afb5-6e5a0d01c0b6)


### 1.1 Create a trip.
- To create a trip, click at “+ CREATE NEW TRIP” button and this form will show up
> ![My_Journary-03](https://github.com/user-attachments/assets/d31ecdbf-2d7e-4c53-b8de-2fc16c9a9d83)

- Trip name, destination, country, start date, end date are required to build a new trip.
- for picture, enter picture URL (how to get picture URL is provided below)
- click save to finish the process

### 1.2 Update and Delete a trip.
- click an ‘Icon’ next to “VIEW TRIP” button, edit and delete button will show up.
- To update, click “edit”, the form will show up, with the filled information
- edit and click “save.”
> ![My_Journary-04](https://github.com/user-attachments/assets/dc6e43ab-8810-4b5a-8f2f-713061dfb2ac)

- To delete, click “delete” and the data will be deleted right away.

### 1.3 “VIEW TRIP”
- inside there are 2 parts: 1) planner, 2) diary (view only)
> ![My_Journary-05](https://github.com/user-attachments/assets/74b8ddff-4442-4897-bc14-b6479a005d31)


> Planner Part
> - “Planner >>” will linked to planner page for that trip
> - plan are ordered by day and time
> - to see the map, click map icon, and click “< back” to go back
>> ![My_Journary-06](https://github.com/user-attachments/assets/16c5b921-ef0f-4a33-b112-5eb622ec6c4f)


> Diary Part
- “Diary >>” will linked to diary page for that trip
- to slide a diary book, click “<, >” icon or drag the cursor left or right
- some page in diary might be too long, scroll down to see the rest
> ![My_Journary-07](https://github.com/user-attachments/assets/b7773c78-3cb9-4c85-b35c-bf11552d5675)


## 2. Planner Page
- click planner card, to plan a trip
> ![My_Journary-08](https://github.com/user-attachments/assets/5f766def-4511-4432-98cd-e33568609969)

- This is planner page for each trip
- there is trip information and calendar highlighted from start – end trip
- choose “Day _” to see and plan for that day.
> ![My_Journary-09](https://github.com/user-attachments/assets/7893f561-22e8-4096-a827-4925785d3085)


### 2.1 Create a plan.
- click “+ ADD PLAN”, the form will show up
- day, place, time are required.
- for google maps URL, it needs to be embed link of the place (how to get google maps embed URL is provided below)
- click add plan to finish the form
> ![My_Journary-10](https://github.com/user-attachments/assets/ae3d9b95-3a9f-41c6-bda5-70d97c08312a)

- plans will show like this, it is daily plan
> ![My_Journary-11](https://github.com/user-attachments/assets/e847d2f4-c09c-4651-a00c-f05ff6c5adc0)


### 2.2 Update and Delete a plan
- click map icon to see the map (map icon only show up when there is map link in that plan)
- click icon next to map, to edit or delete
- when click edit, the form will show up with filled information, edit and click save
- to delete, just click delete button
> ![My_Journary-12](https://github.com/user-attachments/assets/ef4936d0-ee1b-4e70-aa57-5b43c7ee9dae)


## 3. Diary Page
- click icon to go to diary
> ![My_Journary-13](https://github.com/user-attachments/assets/cacd543f-1c2f-4c57-abf1-b88bb8021d11)

- on the page, there are “+ADD DIARY” button
- to read diary, it works like the one in trip page, to slide a diary book, click “<, >” icon or drag the cursor left or right, some page in diary might be too long, scroll down to see the rest
- there are edit and delete buttons as well.
> ![My_Journary-14](https://github.com/user-attachments/assets/75e44631-6964-4ed5-9810-bb6e97334af3)


### 3.1 Create Diary
- click “+ADD DIARY” button” it will show the form
- choose place (the place come from a planner), date, emotion, diary are required
- to add picture, is the same way as add trip picture (how to get picture URL is provided below)
> ![My_Journary-15](https://github.com/user-attachments/assets/9f790bfe-74fb-442b-8953-7c3f380540bb)

- if there is no plan, it will show “no place available.”
- click the link to go to planner and at some plans, otherwise diary cannot be created
> ![My_Journary-16](https://github.com/user-attachments/assets/6a711bcb-a867-4846-b7b7-6df6ad09dc8d)


### 3.2 Update and Delete Diary
- in each diary page there is pencil and bin on the bottom right
- click pencil to edit and click bin to delete.
> ![My_Journary-14](https://github.com/user-attachments/assets/299b7c64-52c7-4e57-8d1e-d0572ef3dc11)

## How to get image URL
1. serch image on google
2. right click the picuture
3. click "copy Image Address" or click "open Image in New Tab" and copy the link
> ![Get_picture_url](https://github.com/user-attachments/assets/48bf8453-6095-4262-bd93-54a1b1ec6886)

## How to get Google maps embed URL
1. choose place
2. click share
3. choose "Embed a map" and click "copy HTML'
4. it should look like this
"<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3877.5853642933707!2d100.84803581124942!3d13.622117286701117!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x311d4306fed8263d%3A0x36375aeed51f8ea7!2sSoi%20Abac%2C%20Chang%20Wat%20Samut%20Prakan!5e0!3m2!1sen!2sth!4v1727542425115!5m2!1sen!2sth" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>"
5. copy src and done!
> ![Get_map_url](https://github.com/user-attachments/assets/412b4527-cf35-44af-9b6a-4618e254287c)


# Blog App
Next.js 14
This app shows
1. MongoDB CRUD operations using Mongoose
2. Client Components interacting with APIs
3. Server Components Interacting with Server Actions# next-mongo
