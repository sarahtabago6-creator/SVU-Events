const contactForm = document.getElementById("contactForm");        //نموذج التواصل//
const formMessage = document.getElementById("formMessage");
if(contactForm && formMessage)
{
    contactForm.addEventListener("submit",function(event)               //التحقق من البينات//
    {
      event.preventDefault();                                         //منع إعادة تحميل الصفحة//
      const name = document.getElementById("name").value.trim();       //قراءة القيم//
      const email = document.getElementById("email").value.trim();
      const subject = document.getElementById("subject").value.trim();
      const message = document.getElementById("message").value.trim();

      if(!name || !email || !subject || !message)                        //التحقق من عدم ترك الحقول فارغة//
      {showMessage("يرجى تعبئة جميع الحقول" , "danger"); return;}
 
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;                 //التحقق من البريد//

      if (!emailPattern.test(email))
      {showMessage("يرجى إدخال بريد إلكتروني صحيح","danger"); return;}

      showMessage("تم التحقق من البيانات بنجاح،شكراً لتواصلك معنا","success");     //إظهار رسالة تحقق//
    });
}


function showMessage(message,type)                                                   //دالة عرض النجاح والخطأ بالرسائل//
{
    formMessage.textContent = message;
    formMessage.className = "alert alert-" +type;
}
