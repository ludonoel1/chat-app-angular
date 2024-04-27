import { Component, Inject, OnInit } from '@angular/core';
import { IUser } from '../models/user';
import { AppService } from '../services/http-service';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-newconversation',
  standalone: true,
  imports: [CommonModule, MatListModule, MatIconModule],
  templateUrl: './dialog-newconversation.component.html',
  styleUrl: './dialog-newconversation.component.scss'
})
export class DialogNewConversationComponent implements OnInit{
  users: IUser[] = []

  constructor(
    private readonly appService: AppService,
    public dialogRef: MatDialogRef<DialogNewConversationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {userIds: number[]}
  ){}

  ngOnInit(){
    this.appService.getUsers().subscribe(users => this.users = users.filter((user)=> !this.data.userIds.includes(user.id)))
  }

  onCloseDialog(index: number): void{
    this.dialogRef.close(this.users[index])
  }

}
