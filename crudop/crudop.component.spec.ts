import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudopComponent } from './crudop.component';

describe('CrudopComponent', () => {
  let component: CrudopComponent;
  let fixture: ComponentFixture<CrudopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudopComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
