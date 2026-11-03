const events =
{
    1:
    {
        category:" تقنية",
        title: " من الفكرة إلى صفحة الويب ",
        date: " 11 April",
        description: " تعرّف على الخطوات الأولى في تصميم صفحات الويب",
        time: " 10:00 am",
        place: " online ",
        audience: "  المبتدئون والمهتمون بالتقنية",
        about: " تهدف هذه الفعالية إلى التعريف بالخطوات الأولى لتصميم صفحات الويب وفهم كيفية الانتقال من الفكرة إلى صفحة ويب",
    },

    2:
    {
        category:" ثقافة",
        title: " حكايات من حولنا",
        date: " 14 April ",
        description: " لقاء تبادل الأفكار والتعرّف على تجارب جديدة",
        time: " سيتم الإعلان عنه قريبا",
        place: " سيتم الإعلان عنه قريبا",
        audience: " للمهتمون بالثقافة وتبادل الأفكار",
        about: " لقاء يتيح للمشاركين تبادل الأفكار والتعرّف على تجارب ووجهات نظر جديدة ",
    },

    3:
    {
        category:" تطوير ذات",
        title: " خطوة نحو هدفك",
        date: " 18 April ",
        description: " أفكار عملية لتنظيم الوقت،وتطوير عادات الدراسة",
        time: " سيتم الإعلان عنه قريبا",
        place: " سيتم الإعلان عنه قريبا",
        audience: " للطلاب والمهتمون بتطوير الذات",
        about: " تتناول الفعالية أفكاراً عملية تساعد على تنظيم الوقت وتطوير عادات دراسية أفضل",
    },

    4:
    {
        category:" تقنية",
        title: " أسرار الأمان الرقمي",
        date: " 21 April",
        description: " تعلم مبادئ حماية الحسابات والبيانات الشخصية",
        time: " سيتم الإعلان عنه قريبا",
        place: " سيتم الإعلان عنه قريبا",
        audience: "  المهتمون بالتقنية والأمان الرقمي",
        about: " تهدف الفعالية إلى التعريف بمبادئ حماية الحسابات والبيانات الشخصية",
    },

    5:
    {
        category:" ثقافة",
        title: " القراءة تفتح أبواباً جديدة",
        date: " 24 April",
        description: " مساحة لمشاركة الكتب والأفكار التي تركت أثراً فينا",
        time: " سيتم الإعلان عنه قريبا",
        place: " سيتم الإعلان عنه قريبا",
        audience: " محبو القراءة والكتب",
        about: " مساحة لمشاركة الكتب والأفكار والتجارب التي تركت أثراً لدى المشاركين",
    },

    6:
    {
        category:" تطوير ذات",
        title: " مهارات العمل الجماعي",
        date: " 26 April ",
        description: " اكتشف طرقاً جديدة للتواصل وتبادل الأفكار والعمل مع الآخرين",
        time: " سيتم الإعلان عنه قريبا",
        place: " سيتم الإعلان عنه قريبا",
        audience: " للطلاب والمهتمون بالعمل الجماعي",
        about: " تتناول الفعالية أهمية التواصل وتبادل الأفكار والتعاون مع الآخرين",
    },

};

const params = new URLSearchParams(window.location.search);
const eventId = params.get("id");
const selectedEvent = events[eventId];
if(selectedEvent)
{
    document.getElementById("eventCategory").textContent = selectedEvent.category;
    document.getElementById("eventTitle").textContent = selectedEvent.title;
    document.getElementById("eventDate").textContent = selectedEvent.date;
    document.getElementById("eventDescription").textContent = selectedEvent.description;
    document.getElementById("eventTime").textContent = selectedEvent.time;
    document.getElementById("eventPlace").textContent = selectedEvent.place;
    document.getElementById("eventAudience").textContent = selectedEvent.audience;
    document.getElementById("eventAbout").textContent = selectedEvent.about;
}
else
{
    document.getElementById("eventTitle").textContent = "الفعالية غير موجودة";
    document.getElementById("eventDescription").textContent = "يرجى العودة إلى صفحة الفعاليات وإختيار فعالية من القائمة ";
    document.getElementById("eventCategory").textContent = "";
    document.getElementById("eventAbout").textContent = "";
    document.querySelector(".event-details").hidden = true;
    
}

const shareButton = document.getElementById("shareEvent");             //أزرار تعارف//
const calendarButton = document.getElementById("calendarEvent");
const actionMessage = document.getElementById("eventActionMessage");
 
if(shareButton)           //مشاركة الفعالية//
{
    shareButton.addEventListener("click",async function()
    {
        const shareDate = 
        {
            title:document.getElementById("eventTitle").textContent,
            text:document.getElementById("eventDescription").textContent,
            url:window.location.href
        };

        try {
                if(navigator.share){await navigator.share(shareDate);}
                else{ await navigator.clipboard.writeText(shareDate.url);
                        actionMessage.textContent = "تم نسخ رابط الفعالية";
                    }
            }
            
        catch(error){actionMessage.textContent="تعذرت مشاركة الرابط";}    
    });
}

if(calendarButton)           //إضافة الفعالية للتقويم//
{
    calendarButton.addEventListener("click", function()
    {
        const title = document.getElementById("eventTitle").textContent;
        const description = document.getElementById("eventDescription").textContent;
        const calendarText = "BEGIN:VCALENDAR\n"+"VERSION:2.0\n"+"BEGIN:VEVENT\n"+"SUMMARY:"+title +"\n"
        +"DESCRIPTION:"+description+"\n" + "END:VEVENT\n" +"EVD:VCALENDAR";
        const file = new Blob([calendarText],{type:"text/calendar;charset=utf-8"});
        const link = document.createElement("a");
        link.href = URL.createObjectURL(file);
        link.download = "SVU-Event.ics";
        link.click();

        URL.revokeObjectURL(link.href);
        actionMessage.textContent = " تم تجيز ملف التقويم";
       
    });
}