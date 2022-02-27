import { Component } from '@angular/core';
import { ChatbotService } from '@core/services/chatbot.service';

@Component({
  selector: 'se-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss']
})
export class ChatbotComponent {
  constructor(private botService: ChatbotService) {}

  toggleBot() {
    this.botService.toggleBot();
  }
}
