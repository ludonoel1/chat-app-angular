import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogUserInformationsComponent } from './dialog-user-informations.component';
import { AppService } from '../services/http-service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('DialogUserInformationsComponent', () => {
  let component: DialogUserInformationsComponent;
  let fixture: ComponentFixture<DialogUserInformationsComponent>;
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
      imports: [DialogUserInformationsComponent],
      providers: [
        { provide: AppService, useValue: spyAppService },
        { provide: MatDialogRef, useValue: {} }, { provide: MAT_DIALOG_DATA, useValue: {userId: 1} }]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogUserInformationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should verify that fake user data are displaied in component', () => {
    const imageElement = fixture.debugElement.query(By.css('img')).nativeElement;
    const pElements = fixture.debugElement.queryAll(By.css('p'));
    expect(pElements[0].nativeElement.textContent).toContain('name: Luca');
    expect(pElements[1].nativeElement.textContent).toContain('gender: male');
    expect(pElements[2].nativeElement.textContent).toContain('email: luca@gmail.com');
    expect(imageElement.src).toContain('https://image.ibb.co/k0wVTm/profile_pic.jpg');
    expect(component.user).toEqual(usersDetails[0])
  });
});