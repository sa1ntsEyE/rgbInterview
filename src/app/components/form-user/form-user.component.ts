import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import emailjs from 'emailjs-com';

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.scss']
})
export class FormUserComponent {
  private readonly EMAILJS_USER_ID = 'ePL0dYBO7xOBk_XUH';
  private readonly EMAILJS_SERVICE_ID = 'service_559nnte';
  private readonly EMAILJS_TEMPLATE_ID = 'template_zet7uzs';

  constructor(private http: HttpClient) {}

  onSubmit(signupForm: NgForm) {
    if (signupForm.valid) {
      const formData = signupForm.value;
      this.sendToTelegram(formData);
      this.sendEmail(formData);

      alert('Form submitted successfully!');
    }
  }

  sendToTelegram(formData: any) {
    const telegramApiUrl = 'https://api.telegram.org/bot7358972849:AAFelx_d2kkeM9iYKnGnEVBhmbuAm9GJHQI/sendMessage';
    const chatId = '6163382681';
    const message = `Имя: ${formData.fullName}\nТелефон: ${formData.phone}\nEmail: ${formData.email}`;

    this.http.post(telegramApiUrl, {
      chat_id: chatId,
      text: message
    }).subscribe(response => {
      console.log('Message sent to Telegram', response);
    }, error => {
      console.error('Error sending message to Telegram', error);
    });
  }

  sendEmail(formData: any) {
    const templateParams = {
      from_name: formData.fullName,
      phone_number: formData.phone,
      email_address: formData.email,
      to_email: 'hr@rgbweb.studio'
    };

    emailjs.send(this.EMAILJS_SERVICE_ID, this.EMAILJS_TEMPLATE_ID, templateParams, this.EMAILJS_USER_ID)
      .then(response => {
        console.log('Email sent successfully', response);
      })
      .catch(error => {
        console.error('Error sending email', error);
      });
  }
}
