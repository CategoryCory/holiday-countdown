const countdownTitle = document.getElementById("countdown-title");
const container = document.querySelector(".container");
const loadingSection = document.querySelector(".loading");
const holidayPicker = document.getElementById("holiday-picker");
const days = document.getElementById("days");
const hours = document.getElementById("hours");
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");

let intervalId;

function createPage() {
    if (intervalId) {
        clearInterval(intervalId);
    }

    const selectedHoliday = holidays[holidayPicker.value];
    const nextHoliday = getNextHoliday(selectedHoliday);

    countdownTitle.innerText = `${
        selectedHoliday.name
    } ${nextHoliday.getFullYear()}`;

    document.body.style.backgroundImage = `url('img/${selectedHoliday.img}.jpg')`;

    setTimeout(() => {
        container.style.display = "flex";
        // loadingSection.remove();
        // loadingSection.classList.add('hidden');
        loadingSection.classList.toggle("hidden");
    }, 1000);

    intervalId = setInterval(() => {
        const today = new Date();

        const timeDifference = nextHoliday - today;
        const deltaDay = Math.floor(timeDifference / 86400000);
        const deltaHour = Math.floor(timeDifference / 3600000) % 24;
        const deltaMinute = Math.floor(timeDifference / 60000) % 60;
        const deltaSecond = Math.floor(timeDifference / 1000) % 60;

        days.innerText = deltaDay;
        hours.innerText = deltaHour < 10 ? `0${deltaHour}` : deltaHour;
        minutes.innerText = deltaMinute < 10 ? `0${deltaMinute}` : deltaMinute;
        seconds.innerText = deltaSecond < 10 ? `0${deltaSecond}` : deltaSecond;
    }, 1000);
}

createPage();

holidayPicker.addEventListener("change", () => {
    container.style.display = "none";
    loadingSection.classList.toggle("hidden");
    createPage();
});
