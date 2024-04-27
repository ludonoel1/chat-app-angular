import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogNewConversationComponent } from './dialog-newconversation.component';
import { AppService } from '../services/http-service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';


describe('DialogNewconversationComponent', () => {
  let component: DialogNewConversationComponent;
  let fixture: ComponentFixture<DialogNewConversationComponent>;
  const usersDetails = [{  
    id: 1,  
    name: "Luca",  
    email: "luca@gmail.com",  
    gender: "male",
    picture: "https://image.ibb.co/k0wVTm/profile_pic.jpg"
  }];
  let spyAppService = jasmine.createSpyObj({ getUsers: of(usersDetails) });
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogNewConversationComponent],
      providers: [
        { provide: AppService, useValue: spyAppService },
        { provide: MatDialogRef, useValue: {} }, { provide: MAT_DIALOG_DATA, useValue: {userIds: []} }]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogNewConversationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should verify that fake user data are displaied in component', () => {
    expect(component.users).toEqual(usersDetails)
    const usersElement = fixture.debugElement.queryAll(By.css('.user'));
    expect(usersElement[0].query(By.css('img')).nativeElement.src).toContain('https://image.ibb.co/k0wVTm/profile_pic.jpg');
    expect(usersElement[0].nativeElement.textContent).toContain('Luca');
    expect(usersElement[1]).toBeUndefined();
  });
});