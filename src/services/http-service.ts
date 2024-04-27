import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { IUser } from "../models/user";
import { IConversation } from "../models/conversation";

@Injectable({
    providedIn: 'root',
})

export class AppService {
    usersUrl: string = '/assets/users.json';
    messagesUrl: string = '/assets/messages.json';

    constructor(
      private readonly http: HttpClient) {
      }

      getUsers(): Observable<IUser[]>{
        return this.http.get<IUser[]>(this.usersUrl)
      }

      getConversations(): Observable<IConversation[]> {
        return this.http.get<IConversation[]>(this.messagesUrl)
      }
    
      getConversationsById(id: number): Observable<any> {
        return this.http.get<IConversation[]>(this.messagesUrl).pipe(map((conversations: IConversation[]) => conversations.filter(conversation => conversation.id === id)[0]))
      }
    
}