const eventSearch = document.getElementById("eventSearch");                    //تحديد عناصر البحث والتصفية//
const filterButtons = document.querySelectorAll(".filter-btn");
const eventCards = document.querySelectorAll("#eventsList .event-card");
const resultsCount = document.getElementById("resultsCount");
const noResults = document.getElementById("noResults");
const dateFilter =document.getElementById("dateFilter");

let selectedCategory = "all";

function filterEvents()                                  //تصفية حسب بحث وتصنيف وتاريخ//
{
  const searchText = eventSearch ? eventSearch.value.trim().toLowerCase():"";
  const selectedDate = dateFilter ? dateFilter.value:"";
  let visibleCount = 0;
  eventCards.forEach(function(card)
   {
    const title = card.querySelector("h3").textContent.toLowerCase();
    const description = card.querySelector(".event-info > p:not(.event-date)").textContent.toLowerCase();
    const category = card.dataset.category;
    const eventDate = card.dataset.eventDate;
    const matchesSearch = title.includes(searchText) || description.includes(searchText);
    const matchesCategory = selectedCategory === "all" || category === selectedCategory;
    const matchesDate = selectedDate === "" || eventDate === selectedDate;
    const shouldShow = matchesSearch && matchesCategory && matchesDate;
    card.hidden = !shouldShow;
    if (shouldShow) {visibleCount++}
   });

   if(resultsCount){resultsCount.textContent = "عدد الفعاليات:" + visibleCount;}
   if(noResults){noResults.hidden = visibleCount !==0;}
  
}

if(eventSearch){eventSearch.addEventListener("input",filterEvents)};    //البحث عند الكتابة//

filterButtons.forEach(function(button)          //تشغيل التصفية بعد التصنيف//
{
   button.addEventListener("click",function()
 {
    selectedCategory = button.dataset.filter;
    filterButtons.forEach(function(item) { item.classList.remove("active"); });
    button.classList.add("active"); filterEvents();
 });
});

if(dateFilter){dateFilter.addEventListener("change",filterEvents);}     //تصفية عند اختيار التاريخ//

