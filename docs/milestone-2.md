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


<html>
    <head>
        <title>html test file</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" 
        integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor" crossorigin="anonymous">
        <link rel="stylesheet" href="main.css" />
    </head>
    <script type="module" src="main.js"></script>
    <body> 
        <!--Created a navbar just for the purpose of learning how, may or may not use this in the final application-->
        <nav class="navbar  navbar-expan-sm navbar-light bg-light">
            <div class="h1">Navbar</div>
            <div class="collapse navbar-collapse" id="navbar">
            </div>
        </nav>
        <!--Container from bootstrap with dynamically added html in data reader.js, represents the actual timesheet-->
        <div class="container" id="track-display"></div>   
        <form>
            <table>
                <tr>
                    <td></td>
                    <!--allows for data to be input into the timesheet-->
                    <td><label for="trackInput">Track: &nbsp;</label><input type="text" id="trackInput" /></td>
                    <td><label for="time"> Time: &nbsp;</label><input type = "text" id="time" /></td>
                    <td><label for="split1"> Lap 1: &nbsp;</label><input type = "text" id="split1" />&nbsp;</td>
                    <td><label for="split2"> Lap 2: &nbsp;</label><input type = "text" id="split2" />&nbsp;</td>
                    <td><label for="split3"> Lap 3: &nbsp;</label><input type = "text" id="split3" />&nbsp;</td>
                    <td><input type="button" id="submit-button" value="Submit" /></td>
                    <td><input type="file" id="file" value="Choose Ghost File"/></td>
                </tr>
                <tr>
                </tr>
                <tr>
                <!--allows for input of times for comparison feature-->
                    <td><label for="comparison"> &nbsp; Comparison Ghost: </label><input type="file" id="rivalGhost" value="Rival Ghost File: " /></td>
                    <td><label for='rivalTrackInput'> Track: &nbsp;</label><input type='text' id='rivalTrackInput' /></td>
                    <td><label for="rivalTime"> Time: &nbsp;</label><input type = "text" id="rivalTime" /></td>
                    <td><label for="rivalSplit1"> Lap 1: &nbsp;</label><input type = "text" id="rivalSplit1" />&nbsp;</td>
                    <td><label for="rivalSplit2"> Lap 2: &nbsp;</label><input type = "text" id="rivalSplit2" />&nbsp;</td>
                    <td><label for="rivalSplit3"> Lap 3: &nbsp;</label><input type = "text" id="rivalSplit3" />&nbsp;</td>
                    <td><input type="button" id="rival-submit-button" value="Submit" /></td>
                </tr>
                <tr></tr>
                <tr></tr>
            </table>
            <table>
                <tr>
                    <!--output for comparison feature-->
                    <td><label for="difference"> Difference: &nbsp;</label><input type="text" id="diffOutput" readonly="readonly" size="50" class="normal-cursor"></td>
                    <!--clears the entire timesheet-->
                    <td><input type="button" id="clear" value="Clear" /></td>
                </tr>
            </table>
        </form>    
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/js/bootstrap.bundle.min.js" 
        integrity="sha384-pprn3073KE6tl6bjs2QrFaJGz5/SUsLqktiwsUTF55Jfv3qYSDhgCecCxMW52nD2" crossorigin="anonymous"></script>
    </body>
</html>

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
