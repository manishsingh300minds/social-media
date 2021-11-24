import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PublicComponent } from './public.component';
import {PostsService} from "../services/posts.service";
import { HttpClientModule} from "@angular/common/http";
import {RouterTestingModule} from "@angular/router/testing";

describe('PublicComponent', () => {
  let component: PublicComponent;
  let fixture: ComponentFixture<PublicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicComponent ],
      imports: [HttpClientModule, RouterTestingModule],
      providers: [PostsService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
