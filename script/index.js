const loadLessons = () => {
  const url = "https://openapi.programming-hero.com/api/levels/all";
  fetch(url)
    .then((response) => response.json())
    .then((json) => displayLessons(json.data));
};

const displayLessons = (lessons) => {
  const levelContainer = document.getElementById("level-container");
  levelContainer.innerHTML = "";

  lessons.forEach((lesson) => {
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
        <button onclick="loadLevelWord(${lesson.level_no})" id="lesson-btn-${lesson.level_no}" class="btn btn-outline btn-primary lesson-btn">
            <i class="fa-solid fa-book-open"></i>Lesson - ${lesson.level_no}
        </button>
        `;
    levelContainer.appendChild(btnDiv);
  });
};
// Call function Lesson menu
loadLessons();


// Word Load Function
const loadLevelWord = (id) => {
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      removeActive(); // remove all active class
      activeLessonBtn(id); // Active all toggle button
      displayLevelWord(data.data);
    });
};

const displayLevelWord = (words) => {
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";
  
  if(words.length === 0){
    wordContainer.innerHTML =
      `<div class="text-center col-span-full py-10 space-y-6 font-bangla">
          <img class="mx-auto" src="./assets/alert-error.png">
          <p class="text-[#79716B] text-sm">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
          <h2 class="text-[#292524] text-4xl font-medium">নেক্সট Lesson এ যান</h2>
      </div>`
  }

  words.forEach(word => {
    const card = document.createElement("div");
    card.innerHTML = `
        <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-4">
            <h2 class="font-bold text-2xl">${word.word ? word.word : "শব্দ পাওয়া যায়নি"}</h2>
            <p class="font-semibold">Meaning / Pronunciation</p>
            <div class="text-2xl font-medium font-bangla">${word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"} / ${word.pronunciation ? word.pronunciation : "উচ্চারণ পাওয়া যায়নি"}</div>
            <div class="flex justify-between items-center">
                <button onclick="loadWordDetails(${word.id})" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]">
                    <i class="fa-solid fa-circle-info"></i>
                </button>
                <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]">
                    <i class="fa-solid fa-volume-high"></i>
                </button>
            </div>
        </div>
    `;
    wordContainer.appendChild(card);
  });
};
// Call Function for word load
loadLevelWord();


// Remove Active Toggle Lesson Button
const removeActive = () => {
  const lessonButtons = document.querySelectorAll(".lesson-btn");
  lessonButtons.forEach(btn => {
    btn.classList.remove("active");
  })
}

// Active Toggle Lesson Button 
const activeLessonBtn = (id) => {
  const clickBtn = document.getElementById(`lesson-btn-${id}`);
  clickBtn.classList.add("active");
}

// Load word Details show Async & await
const loadWordDetails = async(id) => {
  const url = `https://openapi.programming-hero.com/api/word/${id}`;
  const res = await fetch(url);
  const details = await res.json();
  displayWordDetails(details.data);
}

// Display word Details
const displayWordDetails = (word) => {
  const detailsContainer = document.getElementById("details-container");
  const showModel = document.getElementById("word_model");

  showModel.showModal();
  detailsContainer.innerHTML = `
    <div class="space-y-2">
        <h2 class="text-2xl font-bold font-bangla">${word.word ? word.word : "শব্দ পাওয়া যায়নি"} ( <i class="fa-solid fa-microphone-lines"></i> : ${word.pronunciation ? word.pronunciation : "উচ্চারণ পাওয়া যায়নি"})</h2>
    </div>
    <div class="space-y-2">
        <h2 class="font-bold">Meaning :</h2>
        <p class="font-bangla">${word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"}</p>
    </div>
    <div class="space-y-2">
        <h2 class="font-bold">Example :</h2>
        <p>${word.sentence}</p>
    </div>
    <div class="space-y-2">
        <h2 class="font-bold">Synonym :</h2>
        <div class="">${showSynonyms(word.synonyms)}</div>
    </div>
  `;
}

// Show Synonyms Funtion
const showSynonyms = (synonyms) => {
  const htmlElements = synonyms.map((el) => `<span class="btn">${el}</span>`);
  return htmlElements.join(" ");
}