# Teamname
short fun name

# Application name
Timesheet Organizer

# Team Overview
Tristan Carel: TCarel01

# Application Idea
My current plan for this applicaton is to give Mario Kart players a place to organize all their best times on various categories. 
Every resource that currently exists for this purpose does not allow players to do it themselves, since they are all leaderboards or rankings.
This will allow players who are interested in keeping track of their best times the ability to do so. Currently, I plan on allowing input of their times
through two methods. One would be to allow them to type in their time directly, and the other would be to give a ghost link (from chadsoft.co.uk) or an RKG file to automatically
fill in missing data for an entry. In addition, if they would like to link a video or a picture of their personal record, I would like to allow them to do so. I would also 
like to display things such as the times, splits, and recordings of the current top 10s, as well as (potentially) regional records, and compare the data the user has input to each time in that list. 

As of now I do not have any idea of what other data interactions to include, but I will likely think of others in the future.


# Functionality
For direct input from the user, I would like to be able to take that text and display it next to the selected track. (eg, Luigi Circuit is selected, it is displayed next to Luigi Circuit.) Times that are input directly from a ghost link or file will parse the ghost file and display the data contained within the file (the format for which data is stored within this file is available on the internet). It will then display these times, and if desired compare them with other top level times at the user's request. 

# Video Link
https://drive.google.com/file/d/1mkCcoF8aLWvsR74MYDQbKq5MTCX3w0Wk/view?usp=sharing

cursor field so it does not default to a worse looking cursor when mousing over uneditable text
.normal-cursor {
    cursor: default;
}

for design of the track layout
.track-name {
    background-color: lightcoral;
    color: black;
}

for design of the track layout
.slowDifference{
    color: red;
}

display green when the compared ghost is slower
.fastDifference {
    color: green;
}

display black when the ghost is exactly the same speed
.neutralDifference {
    color: black;
}

makes it so when mousing over a track, only the time is highlighted
.entry {
    background-color: brown;
}

does the highlighting of the time
.entry:hover {
    background-color: aqua;
}
