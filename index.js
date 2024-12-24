document.addEventListener("DOMContentLoaded", function () {


    const searchButton = document.getElementById("search-btn");
    const usernameInput = document.getElementById("user-input");
    const statsContainer = document.querySelector(".stats-container");
    const easyProgressCircle = document.querySelector(".easy-progress");
    const mediumProgressCircle = document.querySelector(".medium-progress");
    const hardProgressCircle = document.querySelector(".hard-progress");
    const easyLabel = document.getElementById("easy-label");
    const mediumLabel = document.getElementById("medium-label");
    const hardLabel = document.getElementById("hard-label");
    const cardStatsContainer = document.querySelector(".stats-card");


    function validateUsername(username) {

        if (username.trim() === "") {
            alert("Username should not be empty");
            return false;
        }
        const regex = /^[a-zA-Z0-9_-]{1,15}$/;
        const isMatching = regex.test(username);
        if (!isMatching) {
            alert("Invalid Username");
        }

        return isMatching;
        // console.log("validate ", username)
    }


    async function fetchUserDetails(username) {

        const url = `https://leetcode-stats-api.herokuapp.com/${username}`
        try {
            searchButton.textContent = "Searching...";
            searchButton.disabled = true;
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error("Unable to fetch the user details");
            }

            const data = await response.json();
            console.log("user data: ", data);

            displayUserData(data)

            // statsContainer.textContent = data.status
            // easyProgressCircle.textContent = data.easySolved
            // mediumProgressCircle.textContent = data.mediumSolved
            // hardProgressCircle.textContent = data.hardSolved;


            // easyLabel.textContent = data.easySolved;
        }
        catch (err) {
            // console.log("Error: " , err.message);

            statsContainer.innerHTML = `<p>${err.message}</p>`
        }

        finally {
            searchButton.textContent = "Search";
            searchButton.disabled = false;
        }
    }


    function updateProgerss(solved, total, label, circle) {

        const progressDegree = (solved / total) * 100
        circle.style.setProperty("--progress-degree", `${progressDegree}%`);
        label.textContent = `${solved}/${total}`;


        // cardStatsContainer.textContent = solved
    }


    function displayUserData(data) {

        // if(statsContainer.style.display === 'none'){
        //     statsContainer.style.display = 'block'
        // }

        const totalQuestions = data.totalQuestions
        const totalHardQuestion = data.totalHard;
        const totalMediumQuestion = data.totalMedium;


        const totalEasyQuestion = data.totalEasy;


        const totalSolved = data.totalSolved;

        const easySolved = data.easySolved;

        const hardSolved = data.hardSolved;
        const mediumSolved = data.mediumSolved;

        console.log(hardSolved, mediumSolved)

        statsContainer.style.display = 'block'

        updateProgerss(easySolved, totalEasyQuestion, easyLabel, easyProgressCircle)
        updateProgerss(mediumSolved, totalMediumQuestion, mediumLabel, mediumProgressCircle)

        updateProgerss(hardSolved, totalHardQuestion, hardLabel, hardProgressCircle)


        const cardsData = [
            { "label": "Acceptance Rate", value: data.acceptanceRate },
            { "label": "Total Solved", value: data.totalSolved },
            { "label": "Ranking", value: data.ranking }
        ]


        console.log("cards Data: ", cardsData)

        cardStatsContainer.innerHTML = cardsData.map(
            (d) => {


                return `<div class ="card"> 
             <h4 class ="label">${d.label} : </h4>
             <p class ="value">  ${d.value}</p>
             </div>
             `
            }

        ).join("")

    }



    usernameInput.addEventListener("keyup", function (e) {
        console.log("befor keycode")


        if (e.keyCode === 13) {

            const username = usernameInput.value;
            // console.log("loggin username" ,  username);

            statsContainer.style.display = 'none'

            // cardStatsContainer.textContent = "REMOVE"
            if (validateUsername(username)) {
                // alert("Your username is: ", username)
                fetchUserDetails(username);

            }
        }
    }
    )

    searchButton.addEventListener("click", function () {
        const username = usernameInput.value;
        // console.log("loggin username" ,  username);

        statsContainer.style.display = 'none'

        // cardStatsContainer.textContent = "REMOVE"
        if (validateUsername(username)) {
            // alert("Your username is: ", username)
            fetchUserDetails(username);

        }

    })
})
























