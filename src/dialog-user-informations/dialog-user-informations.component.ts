import { Component, Inject, OnInit } from '@angular/core';
import { IUser } from '../models/user';
import { AppService } from '../services/http-service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogNewConversationComponent } from '../dialog-newconversation/dialog-newconversation.component';

@Component({
  selector: 'app-dialog-user-informations',
  standalone: true,
  imports: [],
  templateUrl: './dialog-user-informations.component.html',
  styleUrl: './dialog-user-informations.component.scss'
})
export class DialogUserInformationsComponent implements OnInit {
  user!: IUser

  constructor(
    private readonly appService: AppService,
    public dialogRef: MatDialogRef<DialogNewConversationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {userId: number}
  ){}

  ngOnInit(){
    this.appService.getUsers().subscribe(users => this.user = users.filter((user)=> user.id === this.data.userId)[0])
  }
}
