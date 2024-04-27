import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AppService } from '../services/http-service';
import { of } from 'rxjs';
import { IConversation } from '../models/conversation';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {
    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;
    let conversationMock: IConversation[] = []
    let spyAppService = jasmine.createSpyObj({ getConversations: of(conversationMock) });

    beforeEach(async () => {
        TestBed.configureTestingModule({
            imports: [/* add all needed imports for AppComponent */],
            declarations: [ ],
            providers: [
                { provide: AppService, useValue: spyAppService },
            ]
        });
        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();  
      });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  })

  it('should create return empty component with no chat', () => {
    spyAppService.getConversations.and.returnValue(of([]))
    component.ngOnInit();  
    expect(component.activeConversationIndex).toEqual(0)
    expect(component.conversations).toEqual([])
    expect(component.conversationSelected).toBeUndefined()
    expect(component.messageInput).toEqual('')
  });

  it('should create return component with one chat', () => {
    const conversationMock = [{
      id: 3,
      name: "Bob",
      picture: "https://image.ibb.co/gSyTOb/bob_1.jpg",
      chatlog: [
        {
          text:
            "It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable",
          timestamp: "07:05 AM",
          sender: 0,
          message_id: 4
        },
        {
          text:
            "The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
          timestamp: "07:00 AM",
          sender: 1,
          message_id: 3
        },
        {
          text:
            "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested",
          timestamp: "06:58 AM",
          sender: 0,
          message_id: 2
        },
        {
          text:
            "Sections 1.10.32 and 1.10.33 from 'de Finibus Bonorum et Malorum' by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham",
          timestamp: "06:55 AM",
          sender: 1,
          message_id: 1
        }
      ]
    }]
    spyAppService.getConversations.and.returnValue(of(conversationMock))
    component.ngOnInit();  
    expect(component.activeConversationIndex).toEqual(0)
    expect(component.conversations).toEqual(conversationMock)
    expect(component.conversationSelected).toEqual(conversationMock[0])
    expect(component.messageInput).toEqual('')
  });

});
