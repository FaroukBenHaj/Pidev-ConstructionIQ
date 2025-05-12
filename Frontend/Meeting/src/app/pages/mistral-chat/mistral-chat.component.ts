// src/app/components/mistral-chat/mistral-chat.component.ts
import { Component } from '@angular/core';
import { MistralService } from 'src/app/services/mistral-chat.service';


@Component({
  selector: 'app-mistral-chat',
  templateUrl: './mistral-chat.component.html',
  styleUrls: ['./mistral-chat.component.scss']
})
export class MistralChatComponent {
  messages: { role: string, content: string }[] = [];
  userInput = '';
  isLoading = false;

  constructor(private mistralService: MistralService) {}

  sendMessage() {
    if (!this.userInput.trim()) return;

    this.messages.push({ role: 'user', content: this.userInput });
    this.isLoading = true;
    
    this.mistralService.askChat(this.userInput).subscribe({
      next: (response) => {
        const aiMessage = response;
        this.messages.push({role: 'ai',content: aiMessage});
        this.userInput = '';
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error calling Mistral API:', error);
        this.messages.push({role: 'ai', content: "Error calling Mistral API, Please try again later"});
        this.isLoading = false;
      }
    });
  }
}