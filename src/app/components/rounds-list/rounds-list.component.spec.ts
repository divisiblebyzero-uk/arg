import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { RoundsListComponent } from './rounds-list.component';

describe('RoundsListComponent', () => {
  let component: RoundsListComponent;
  let fixture: ComponentFixture<RoundsListComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoundsListComponent ],
      imports: [
        FormsModule,
        RouterTestingModule.withRoutes([
          { path: "*", component: RoundsListComponent}
        ])
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoundsListComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    jest.spyOn(router, 'navigate').mockImplementation(() => of(true).toPromise());

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
