import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatListModule} from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { IConversation, Sender } from '../models/conversation';
import { FormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { DialogNewConversationComponent } from '../dialog-newconversation/dialog-newconversation.component';
import { AppService } from '../services/http-service';
import { DialogUserInformationsComponent } from '../dialog-user-informations/dialog-user-informations.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatListModule, CommonModule, FormsModule, MatIconModule, MatDialogModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  activeConversationIndex: number = 0;
  conversations: IConversation[] =[]
  conversationSelected!: IConversation | null;
  messageInput: string = ''
  senderEnum = Sender;
  constructor(
    private readonly appService: AppService,
    public dialog: MatDialog
  ){
    
  }

  ngOnInit(){
    this.appService.getConversations().subscribe((chats => {
      this.conversationSelected = chats[this.activeConversationIndex]
      this.conversations = chats
      this.scrollChatToBottom("content") 
    }))
  }

  onChangeSelectedConversation(index:number, userId: number): void{
    this.activeConversationIndex = index;
    this.conversationSelected = this.conversations.filter((conversation => conversation.id === userId))[0]
  }

  onSubmitNewMessage(message: string){
    this.conversationSelected?.chatlog.push({
      text: message,
      timestamp: "10:15 AM",
      sender: Sender.SENDER,
      message_id: this.conversationSelected.chatlog.length
    })
    this.messageInput =''
    this.scrollChatToBottom("content")
  }

  onDeleteConversation(){
    this.conversations.splice(this.activeConversationIndex,1)
    this.activeConversationIndex = this.activeConversationIndex - 1 < 0 ? 0 : this.activeConversationIndex - 1;
    this.conversationSelected = this.conversations[this.activeConversationIndex] ? this.conversations[this.activeConversationIndex] : null;
  }

  onStartConversation(){
    const userIds = this.conversations.map((conversation => conversation.id))
    const dialogRef = this.dialog.open(DialogNewConversationComponent,  {
      data: {userIds},
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        const newChat = {
          id: result.id,
          name: result.name,
          picture: result?.picture,
          chatlog: []
        }
        this.conversations.push(newChat)
        this.activeConversationIndex = this.conversations.length - 1;
        this.conversationSelected = newChat
      }
    });
  }

  onOpenUserDetailsDialog(){
    const dialogRef = this.dialog.open(DialogUserInformationsComponent,  {
      data: {userId: this.conversationSelected?.id},
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  private scrollChatToBottom(elementId: string): void{
    const element  = document.getElementById(elementId) as HTMLElement
    setTimeout(function() {
      if(element){
        element.scrollTop = element?.scrollHeight;
      }
    }, 50);
  }
}
